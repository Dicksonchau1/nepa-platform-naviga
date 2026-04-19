"""
AuraSense NEPA — services entry-point.

Start with:
    uvicorn main:app --host 0.0.0.0 --port 8000
"""

from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from services.auth.client import AuthClient
from services.config.settings import get_settings
from services.messaging.nats_client import NATSClient
from services.roda.api import router as roda_router, set_roda_service
from services.roda.service import RODAService
from services.soda.api import router as soda_router, set_soda_service
from services.soda.config import SODAConfig
from services.soda.service import SODAService
from services.eoda.api import router as eoda_router, set_eoda_service
from services.eoda.config import EODAConfig
from services.eoda.service import EODAService
from services.foda.api import router as foda_router, set_foda_service
from services.foda.config import FODAConfig
from services.foda.service import FODAService

# ── Stripe Checkout Provisioning (Block #7, mounted via compose volume) ──
try:
    from services.stripe_provision import router as stripe_router
    _STRIPE_PROVISION_LOADED = True
except Exception as _stripe_import_err:
    _STRIPE_PROVISION_LOADED = False
    import logging as _lg
    _lg.getLogger(__name__).warning(f"stripe_provision router not loaded: {_stripe_import_err}")

# ── NEPA Cognitive Architecture (gated by NEPA_COGNITIVE_ENABLED) ──
from services.cognitive.world_state.api import (
    router as cognitive_world_router,
    set_world_state_service as set_cognitive_world_service,
)
from services.cognitive.world_state.service import WorldStateService
from services.cognitive.memory.api import (
    router as cognitive_memory_router,
    set_memory_bus as set_cognitive_memory_bus,
)
from services.cognitive.memory.memory_bus import MemoryBus
from services.cognitive.reasoning.api import (
    reasoning_router as cognitive_reasoning_router,
    explain_router as cognitive_explain_router,
    set_reasoning_engine as set_cognitive_reasoning_engine,
)
from services.cognitive.reasoning.reasoning_engine import ReasoningEngine
from services.cognitive.agency.planner_api import (
    router as cognitive_planner_router,
    set_planner as set_phase6_planner,
    set_executor as set_phase6_executor,
)
from services.cognitive.agency.nats_subscriber import start_planner_subscriber
from services.cognitive.agency.recovery_manager import RecoveryManager
from services.cognitive.agency.audit_writer import set_mirror_audit_log, CognitiveAuditWriter, set_default_writer
from services.cognitive.agency.api import (
    router as cognitive_agency_router,
    set_executor as set_cognitive_executor,
    set_hitl as set_cognitive_hitl,
    set_planner as set_cognitive_planner,
)
from services.cognitive.agency.hitl_gate import HITLGate
from services.cognitive.agency.planner import Planner
from services.cognitive.agency.skill_executor import SkillExecutor
from services.cognitive.governance.api import (
    router as cognitive_governance_router,
    set_audit as set_cognitive_audit,
    set_metacognition as set_cognitive_metacognition,
)
from services.cognitive.governance.audit import AuditLog
from services.cognitive.governance.metacognition import Metacognition

logger = logging.getLogger(__name__)
settings = get_settings()

# Module-level singleton so routers can import it
nats_client: NATSClient = NATSClient(
    url=settings.nats_url,
    user=settings.nats_user,
    password=settings.nats_password,
)
auth_client: AuthClient = AuthClient(
    auth_url=settings.auth_service_url,
    realm=settings.auth_realm,
)
roda_service: RODAService | None = None
soda_service: SODAService | None = None
eoda_service: EODAService | None = None
foda_service: FODAService | None = None


# Adapter builders — return ``None`` if the backend package isn't importable.
# Lets main.py boot in dev/test environments that don't have the full backend
# SQLAlchemy layer on sys.path while still giving production the real adapters.


def _build_signature_map_row_source():
    try:
        from backend.app.db.session import async_session  # type: ignore[import-not-found]
        from services.foda.row_sources import SignatureMapRowSource
    except Exception as exc:  # noqa: BLE001
        logger.info("FODA row_source unavailable (%s) — running without DB", exc)
        return None
    return SignatureMapRowSource(session_factory=async_session)


def _build_edge_config_fetcher():
    try:
        from backend.app.db.session import async_session  # type: ignore[import-not-found]
        from backend.app.services.edge_sync_service import (  # type: ignore[import-not-found]
            EdgeSyncService,
        )
        from services.eoda.config_fetcher import EdgeSyncConfigFetcher
    except Exception as exc:  # noqa: BLE001
        logger.info("EODA config_fetcher unavailable (%s) — running without DB", exc)
        return None
    return EdgeSyncConfigFetcher(
        session_factory=async_session,
        service_factory=EdgeSyncService,
    )


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Connect external resources on startup, disconnect on shutdown."""
    logging.basicConfig(
        level=settings.log_level,
        format="%(asctime)s %(levelname)-8s %(name)s — %(message)s",
    )
    logger.info("Starting AuraSense NEPA service (env=%s)", settings.app_env)

    # NATS
    try:
        await nats_client.connect()
        await nats_client.ensure_stream(
            "NEPA_FRAMES",
            ["nepa.frame.>"],
            max_age_seconds=3600,
        )
        await nats_client.ensure_stream(
            "NEPA_TELEMETRY",
            ["nepa.telemetry.>", "nepa.anomaly.>", "nepa.lane.>"],
            max_age_seconds=86400,
        )
        logger.info("NATS JetStream ready")
    except Exception as exc:  # noqa: BLE001
        logger.warning("NATS unavailable at startup: %s — continuing", exc)

    global roda_service, soda_service, eoda_service, foda_service
    if settings.roda_enabled:
        try:
            roda_service = RODAService(
                nats_client=nats_client,
                auth_client=auth_client,
            )
            set_roda_service(roda_service)
            await roda_service.start()
            app.state.roda_service = roda_service
            logger.info("RODA service started for robot=%s", roda_service.config.robot_id)
        except Exception as exc:  # noqa: BLE001
            logger.warning("RODA service failed to start: %s", exc)
            roda_service = None
            set_roda_service(None)

    # ── SODA ──────────────────────────────────────────────────────────
    if getattr(settings, "soda_enabled", False):
        try:
            soda_cfg = SODAConfig.from_env()
            soda_cfg.enabled = True
            soda_service = SODAService(
                config=soda_cfg,
                publisher=nats_client,
            )
            set_soda_service(soda_service)
            await soda_service.start()
            app.state.soda_service = soda_service
            logger.info("SODA service started site=%s", soda_cfg.site_id)
        except Exception as exc:  # noqa: BLE001
            logger.warning("SODA service failed to start: %s", exc)
            soda_service = None
            set_soda_service(None)

    # ── EODA ──────────────────────────────────────────────────────────
    if getattr(settings, "eoda_enabled", False):
        try:
            eoda_cfg = EODAConfig.from_env()
            eoda_cfg.enabled = True
            config_fetcher = _build_edge_config_fetcher()
            eoda_service = EODAService(
                config=eoda_cfg,
                publisher=nats_client,
                config_fetcher=config_fetcher,
            )
            set_eoda_service(eoda_service)
            await eoda_service.start()
            app.state.eoda_service = eoda_service
            fetcher_status = "db-backed" if config_fetcher else "none"
            logger.info(
                "EODA service started site=%s fetcher=%s",
                eoda_cfg.site_id,
                fetcher_status,
            )
        except Exception as exc:  # noqa: BLE001
            logger.warning("EODA service failed to start: %s", exc)
            eoda_service = None
            set_eoda_service(None)

    # ── FODA ──────────────────────────────────────────────────────────
    # ── NEPA Cognitive Architecture ──────────────────────────────────
    if getattr(settings, "nepa_cognitive_enabled", False):
        try:
            try:
                await nats_client.ensure_stream(
                    settings.nepa_cognitive_stream,
                    ["nepa.L3.>", "nepa.L4.>", "nepa.L5.>", "nepa.L6.>", "nepa.L7.>"],
                    max_age_seconds=86400,
                )
            except Exception as _jsexc:  # noqa: BLE001
                logger.warning(
                    "JetStream ensure_stream failed (%s) — continuing cognitive init without stream",
                    _jsexc,
                )
            cognitive_world = WorldStateService(nats_client=nats_client)
            set_cognitive_world_service(cognitive_world)
            cognitive_memory = MemoryBus(nats_client=nats_client)
            set_cognitive_memory_bus(cognitive_memory)
            cognitive_reasoning = ReasoningEngine(nats_client=nats_client)
            set_cognitive_reasoning_engine(cognitive_reasoning)
            # Wire the cognitive audit writer to Supabase (DATABASE_URL from env).
            try:
                _audit_db_url = settings.database_url if hasattr(settings, "database_url") else os.environ.get("DATABASE_URL")
                if _audit_db_url:
                    _audit_writer = CognitiveAuditWriter(database_url=_audit_db_url)
                    set_default_writer(_audit_writer)
                    logger.info("Cognitive audit writer wired to DATABASE_URL (persistence enabled)")
                else:
                    logger.warning("DATABASE_URL not set — cognitive audit chain runs in-memory only")
            except Exception as _awexc:  # noqa: BLE001
                logger.warning("Failed to wire cognitive audit writer: %s", _awexc)
            hitl_gate = HITLGate(
                timeout_seconds=settings.nepa_cognitive_hitl_timeout_seconds,
                nats_client=nats_client,
            )
            recovery_manager = RecoveryManager()
            planner = Planner(nats_client=nats_client)
            executor = SkillExecutor(
                nats_client=nats_client,
                hitl_gate=hitl_gate,
                recovery_manager=recovery_manager,
                autonomous_threshold=settings.nepa_cognitive_autonomy_threshold,
            )
            set_cognitive_planner(planner)
            set_cognitive_executor(executor)
            set_cognitive_hitl(hitl_gate)
            set_phase6_planner(planner)
            set_phase6_executor(executor)
            audit_log = AuditLog(nats_client=nats_client)
            set_cognitive_audit(audit_log)
            set_mirror_audit_log(audit_log)
            set_cognitive_metacognition(Metacognition())
            # Phase 6: start advisory → planner → executor subscriber.
            try:
                app.state.phase6_subscriber = await start_planner_subscriber(
                    nats_client, planner, executor
                )
            except Exception as exc:  # noqa: BLE001
                logger.warning("Phase 6 planner subscriber failed to start: %s", exc)
            app.state.cognitive_world = cognitive_world
            app.state.cognitive_memory = cognitive_memory
            app.state.cognitive_reasoning = cognitive_reasoning
            app.state.cognitive_planner = planner
            app.state.cognitive_executor = executor
            app.state.cognitive_hitl = hitl_gate
            logger.info("NEPA Cognitive Architecture enabled")
        except Exception as exc:  # noqa: BLE001
            logger.warning("Cognitive arch failed to start: %s — continuing", exc)

    if getattr(settings, "foda_enabled", False):
        try:
            foda_cfg = FODAConfig.from_env()
            foda_cfg.enabled = True
            row_source = _build_signature_map_row_source()
            foda_service = FODAService(
                config=foda_cfg,
                publisher=nats_client,
                row_source=row_source,
            )
            set_foda_service(foda_service)
            app.state.foda_service = foda_service
            src_status = "db-backed" if row_source else "none"
            logger.info("FODA service started row_source=%s", src_status)
        except Exception as exc:  # noqa: BLE001
            logger.warning("FODA service failed to start: %s", exc)
            foda_service = None
            set_foda_service(None)

    yield

    # Cleanup
    if roda_service is not None:
        await roda_service.stop()
        roda_service = None
        set_roda_service(None)
    if soda_service is not None:
        await soda_service.stop()
        soda_service = None
        set_soda_service(None)
    if eoda_service is not None:
        await eoda_service.stop()
        eoda_service = None
        set_eoda_service(None)
    if foda_service is not None:
        foda_service = None
        set_foda_service(None)
    await nats_client.disconnect()
    logger.info("AuraSense NEPA service stopped")


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version="1.0.0",
        lifespan=lifespan,
        docs_url="/docs" if settings.debug else None,
        redoc_url="/redoc" if settings.debug else None,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"] if settings.debug else [],
        allow_methods=["GET", "POST"],
        allow_headers=["Authorization", "Content-Type"],
    )


    app.include_router(roda_router)
    app.include_router(soda_router)
    app.include_router(eoda_router)
    app.include_router(foda_router)

    # Stripe Checkout webhook (Block #7)
    if _STRIPE_PROVISION_LOADED:
        app.include_router(stripe_router)

    if getattr(settings, "nepa_cognitive_enabled", False):
        app.include_router(cognitive_world_router)
        app.include_router(cognitive_memory_router)
        app.include_router(cognitive_reasoning_router)
        app.include_router(cognitive_explain_router)
        app.include_router(cognitive_agency_router)
        app.include_router(cognitive_planner_router)
        app.include_router(cognitive_governance_router)

    # Mount STDP signature router
    try:
        from api.nepa.stdp_router import router as stdp_router
        app.include_router(stdp_router)
    except ImportError as e:
        logger.warning(f"Could not import STDP router: {e}")

    # ------------------------------------------------------------------
    # Optional single-process mounts: VODA agent API, CODA render API,
    # and Stripe billing. Production uses the separate poe-voda /
    # poe-coda services; these flags exist so a developer / demo host
    # can run the entire NEPA public surface from one uvicorn worker.
    # See RUNTIME_TOPOLOGY.md § "Single-process mode" for caveats.
    # ------------------------------------------------------------------

    if settings.voda_enabled:
        try:
            from api.voda.routes import router as voda_router
            app.include_router(voda_router)
            logger.info("Mounted VODA router (single-process mode)")
        except Exception as exc:  # noqa: BLE001
            logger.warning("Could not mount VODA router: %s", exc)

    if settings.coda_enabled:
        try:
            from api.coda.routes import router as coda_router
            app.include_router(coda_router)
            logger.info("Mounted CODA router (single-process mode)")
        except Exception as exc:  # noqa: BLE001
            logger.warning("Could not mount CODA router: %s", exc)

    if settings.voda_billing_enabled:
        try:
            from api.voda.stripe_billing import router as billing_router
            app.include_router(billing_router)
            logger.info("Mounted VODA billing router (single-process mode)")
        except Exception as exc:  # noqa: BLE001
            logger.warning("Could not mount VODA billing router: %s", exc)


    # ------------------------------------------------------------------
    # Built-in health / readiness endpoints
    # ------------------------------------------------------------------

    @app.get("/health", tags=["ops"])
    async def health() -> JSONResponse:
        return JSONResponse({"status": "ok"})

    @app.get("/ready", tags=["ops"])
    async def ready() -> JSONResponse:
        nats_ok = nats_client.is_connected
        if not nats_ok:
            return JSONResponse(
                {"status": "degraded", "nats": "disconnected"}, status_code=503
            )
        return JSONResponse({"status": "ready", "nats": "connected"})

    return app


app = create_app()
