# Backend Patch Overlays (Block #7 Stripe Provisioning)

This directory contains mounted Python file overlays that customize the
running `nepa-api` container without rebuilding the image. All three files
are bound into the container via `infra/compose/docker-compose.nepa-api.yml`
volume mounts.

## Files

### `stripe_provision/router.py` → `/app/services/stripe_provision.py`

Block #7 Stripe Checkout webhook handler.

- Endpoint: `POST /v1/stripe/webhook`
- Reached from the public internet at `https://www.aurasensehk.com/api/v1/stripe/webhook`
  (nginx strips the `/api/` prefix via a trailing-slash `proxy_pass`).
- Validates `Stripe-Signature` header using `STRIPE_WEBHOOK_SECRET`.
- On `checkout.session.completed`:
  1. Calls Supabase SECURITY DEFINER RPC `record_pending_provision`
  2. Triggers Supabase OTP magic-link for the customer email
  3. Sends branded welcome email via Resend

### `api_main/main.py` → `/app/api/main.py`

The live entrypoint (`uvicorn api.main:app`). Patched to import and mount
the `stripe_provision` router. Original file is the legacy VODA/CODA alias
and is preserved intact; only two blocks were added:

1. Import block after `stripe_billing` imports (try/except wrapper so the
   container still boots if the mount is missing).
2. `app.include_router(stripe_provision_router)` after the other
   `app.include_router(...)` calls.

### `engine/main.py` → `/app/main.py` (prepared, not currently mounted)

The full NEPA engine entrypoint with RODA/SODA/EODA/FODA + cognitive
routers. Patched with the same Block #7 include so that if deployment
switches from `api.main:app` to `main:app`, the Stripe webhook continues
to work unchanged. Currently staged but not active — to activate, update
the `command:` in `docker-compose.nepa-api.yml` from `uvicorn api.main:app`
to `uvicorn main:app` and add the mount line for `/app/main.py`.

## Mount Configuration

Current active mounts (see `infra/compose/docker-compose.nepa-api.yml` → `api` service):

```yaml
volumes:
  - ./mounts/stripe_provision/router.py:/app/services/stripe_provision.py:ro
  - ./mounts/api_main/main.py:/app/api/main.py:ro
```

## Verifying the Webhook

```bash
# Unsigned → 400 Invalid Stripe signature
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  https://www.aurasensehk.com/api/v1/stripe/webhook \
  -H "Content-Type: application/json" -d "{}"

# Expected: 400
```

## Change History

- **2026-04-18** — Initial Block #7 provisioning mount. Patched `api.main`
  entrypoint. Fixed nginx `/api/` proxy_pass trailing-slash to strip prefix
  correctly. Signature validation verified end-to-end.
