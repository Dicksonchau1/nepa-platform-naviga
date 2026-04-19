"""Legacy standalone FastAPI app for the VODA / CODA / billing surface.

This entrypoint predates the unified ``main:app`` host and is kept only
for backward compatibility with deployments that still run
``uvicorn api.main:app``. New work should target the unified entrypoint:

    # Single-process NEPA host (SODA + EODA + FODA + RODA + optional
    # VODA + CODA + billing):
    VODA_ENABLED=true CODA_ENABLED=true VODA_BILLING_ENABLED=true \\
    SODA_ENABLED=true EODA_ENABLED=true FODA_ENABLED=true \\
    RODA_ENABLED=true uvicorn main:app --host 0.0.0.0 --port 8000

See RUNTIME_TOPOLOGY.md Â§ "Single-process mode" for the full matrix,
and PIPELINE_DOC_AUDIT_2026-04-17.md item #4 for the audit history.

The surface mounted here is exactly the legacy surface: VODA chat routes
at ``/voda``, CODA render routes at ``/coda``, and Stripe billing at
``/voda/billing`` with a top-level ``/webhook/stripe`` alias.
"""
from __future__ import annotations

import logging

from fastapi import Depends, FastAPI, Request

from api.coda.routes import router as coda_router
from api.voda.routes import router as voda_router
from api.voda.stripe_billing import (
    get_db,
    process_stripe_webhook,
    router as billing_router,
)

# ── Block #7 Stripe Checkout Provisioning (mounted via compose volume) ──
try:
    from services.stripe_provision import router as stripe_provision_router
    _STRIPE_PROVISION_LOADED = True
    _stripe_provision_load_error = None
except Exception as _stripe_import_err:  # noqa: BLE001
    _STRIPE_PROVISION_LOADED = False
    _stripe_provision_load_error = _stripe_import_err


logger = logging.getLogger(__name__)
logger.info(
    "api.main is a legacy VODA/CODA alias; prefer main:app with "
    "VODA_ENABLED / CODA_ENABLED / VODA_BILLING_ENABLED for new work.",
)

app = FastAPI(
    title="VODA V1 API (legacy alias)",
    version="1.0.0",
    description=(
        "Legacy VODA V1 commercial backend for NEPA-powered video "
        "processing. Prefer ``main:app`` for new deployments — see "
        "RUNTIME_TOPOLOGY.md."
    ),
)

app.include_router(voda_router)
app.include_router(billing_router)
app.include_router(coda_router)

# Mount Block #7 Stripe Checkout provisioning (webhook at /v1/stripe/webhook)
if _STRIPE_PROVISION_LOADED:
    app.include_router(stripe_provision_router)
    logger.info("Block #7 stripe_provision router mounted at /v1/stripe/webhook")
else:
    logger.warning(f"Block #7 stripe_provision router FAILED to load: {_stripe_provision_load_error}")



@app.post("/webhook/stripe")
async def stripe_webhook(request: Request, db=Depends(get_db)):
    return await process_stripe_webhook(request, db)


@app.get("/health", tags=["ops"])
async def health() -> dict[str, str]:
    """Lightweight liveness probe. Kept here so the legacy alias has a\n    non-auth health endpoint that matches the unified ``main:app`` contract."""
    return {"status": "ok", "entrypoint": "api.main:app (legacy alias)"}

