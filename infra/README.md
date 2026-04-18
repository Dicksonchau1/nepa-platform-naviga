# VPS Infrastructure — Reproducibility Artifacts

## Purpose

This directory captures the production VPS infrastructure state at `root@76.13.177.39` as reproducibility artifacts, so the server configuration can be reconstructed from source control if needed.

**Captured on:** 2026-04-18

---

## Directory Structure

```
infra/
├── README.md                                    ← this file
├── nginx/
│   ├── nginx.conf                               ← root nginx config (/etc/nginx/nginx.conf)
│   └── sites-available/
│       ├── aurasensehk                          ← main SPA + /api/ reverse proxy
│       ├── voda.aurasensehk.com.conf            ← poe-voda subdomain proxy
│       └── coda.aurasensehk.com.conf            ← poe-coda subdomain proxy
└── compose/
    └── docker-compose.nepa-api.yml              ← 17-service production compose file
```

**Note:** `poe-bots` was not present under `/etc/nginx/sites-available/` on the VPS at capture time — its routing is handled by `voda.aurasensehk.com.conf` and `coda.aurasensehk.com.conf`.

---

## VPS File Paths (Reference)

| File in this repo | Path on VPS |
|---|---|
| `nginx/nginx.conf` | `/etc/nginx/nginx.conf` |
| `nginx/sites-available/aurasensehk` | `/etc/nginx/sites-available/aurasensehk` |
| `nginx/sites-available/voda.aurasensehk.com.conf` | `/etc/nginx/sites-available/voda.aurasensehk.com.conf` |
| `nginx/sites-available/coda.aurasensehk.com.conf` | `/etc/nginx/sites-available/coda.aurasensehk.com.conf` |
| `compose/docker-compose.nepa-api.yml` | `/root/AuraSense_NEPA/docker-compose.yml` |

---

## How to Redeploy

### nginx

1. Copy site configs to the server:
   ```bash
   scp infra/nginx/nginx.conf root@76.13.177.39:/etc/nginx/nginx.conf
   scp infra/nginx/sites-available/aurasensehk root@76.13.177.39:/etc/nginx/sites-available/
   scp infra/nginx/sites-available/voda.aurasensehk.com.conf root@76.13.177.39:/etc/nginx/sites-available/
   scp infra/nginx/sites-available/coda.aurasensehk.com.conf root@76.13.177.39:/etc/nginx/sites-available/
   ```

2. Symlink into `sites-enabled/` (if not already linked):
   ```bash
   ln -sf /etc/nginx/sites-available/aurasensehk /etc/nginx/sites-enabled/
   ln -sf /etc/nginx/sites-available/voda.aurasensehk.com.conf /etc/nginx/sites-enabled/
   ln -sf /etc/nginx/sites-available/coda.aurasensehk.com.conf /etc/nginx/sites-enabled/
   ```

3. Test and reload:
   ```bash
   nginx -t && systemctl reload nginx
   ```

### docker-compose (NEPA API services)

1. Copy compose file to the VPS:
   ```bash
   scp infra/compose/docker-compose.nepa-api.yml root@76.13.177.39:/root/AuraSense_NEPA/docker-compose.yml
   ```

2. Ensure `.env` is in place at `/root/AuraSense_NEPA/.env` (see Secrets section below).

3. Bring services up:
   ```bash
   cd /root/AuraSense_NEPA
   docker compose pull
   docker compose up -d
   ```

---

## Services Defined in docker-compose.nepa-api.yml

The compose file defines **17 services** plus supporting volumes and a network:

| Service | Role |
|---|---|
| `db` | PostgreSQL 15 database |
| `api` | Main FastAPI backend (port 8001) |
| `nepa-engine` | NEPA core processing engine |
| `nepa-dashboard` | Streamlit monitoring dashboard |
| `whatsapp-gateway` | WhatsApp webhook gateway (port 8000) |
| `dashy` | Dashboard / home page (public internet) |
| `nepa-loop-planner` | Planning loop — calls Anthropic Claude |
| `nepa-world-model` | Vision/world model inference (CUDA) |
| `nepa-learning-orchestrator` | Online learning orchestrator |
| `nepa-slow-learner` | Slow (daily) learning worker |
| `dashy-internal` | Internal Dashy instance (Tailscale only) |
| `nginx` | Internal nginx reverse proxy (port 80) |
| `openclaw` | OpenCLAW service |
| `nats` | NATS message broker |
| `redis` | Redis cache / queue backend |
| `poe-voda` | Poe bot — Voda video-diagnosis assistant (port 8002) |
| `poe-coda` | Poe bot — Coda creative director assistant (port 8003) |

**Volumes:** `postgres_data`, `nats_data`, `redis_data`, `nepa-openclaw-data`, `voda-frames`, `coda-assets`

**Network:** `nepa-net` (internal bridge)

---

## Secrets

**No secrets are committed in this directory.**

All sensitive values in `docker-compose.nepa-api.yml` are referenced via `${VAR_NAME}` environment variable placeholders and must be present in a `.env` file at runtime.

Required `.env` variables include (non-exhaustive):

- `POSTGRES_PASSWORD`
- `SUPABASE_SERVICE_KEY`, `SUPABASE_ANON_KEY`, `SUPABASE_URL`
- `RESEND_API_KEY`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `VODA_ENCRYPTION_KEY`, `EVIDENCE_ENCRYPTION_KEY`
- `ANTHROPIC_API_KEY`
- `ACCESS_TOKEN`, `WA_TOKEN`, `VERIFY_TOKEN`
- `NATS_PASSWORD`

**See the secure credentials store** for actual values. The `.env` file lives at `/root/AuraSense_NEPA/.env` on the VPS and is **never committed to any repository**.

---

## About docker-compose.nepa-api.yml

This file originates from the separate `AuraSense_NEPA` repository (`/root/AuraSense_NEPA/` on the VPS, branch `deploy/poe-pipeline-20260418-0449`, commit `8800a8b2`). It is copied here as a **documentation/reproducibility artifact only** — this `nepa-platform-naviga` repo is not the authoritative workspace for the compose file. Any changes should be made in the `AuraSense_NEPA` repo first, then re-synced here.
