"""
app/routers/stripe_provision.py

Stripe webhook handler — Block #7 Checkout Provisioning
---------------------------------------------------------
Mounts as router into app.main:app under /api/v1/stripe/webhook.

On checkout.session.completed:
  1. Calls Supabase SECURITY DEFINER RPC `record_pending_provision` (anon key)
  2. Triggers Supabase OTP magic-link for the customer email
  3. Sends branded welcome email via Resend

Env vars (add to .env / docker-compose):
  STRIPE_SECRET_KEY      — live Stripe secret key
  STRIPE_WEBHOOK_SECRET  — Stripe webhook signing secret
  SUPABASE_URL           — https://nyalnpkcyirhbmjlfcpl.supabase.co
  SUPABASE_ANON_KEY      — Supabase anon (publishable) key
  RESEND_API_KEY         — Resend API key (MISSING until Dickson adds it)
"""

from __future__ import annotations

import datetime
import logging
import os
from typing import Any, Optional

import httpx
import stripe
from fastapi import APIRouter, HTTPException, Request, status
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Config — read from env only
# ---------------------------------------------------------------------------

STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET: str = os.getenv("STRIPE_WEBHOOK_SECRET", "")
SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://nyalnpkcyirhbmjlfcpl.supabase.co")
SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")
SITE_BASE_URL: str = "https://www.aurasensehk.com"

stripe.api_key = STRIPE_SECRET_KEY

# ---------------------------------------------------------------------------
# Product → Portal mapping
# portal_type enum in DB: facility_watch | robotic_ops | drone_inspect
# ---------------------------------------------------------------------------

PRODUCT_TO_PORTAL: dict[str, tuple[str, str]] = {
    "prod_UKJ7PTchbQzjll": ("robotic_ops", "NSSIM Starter"),
    "prod_UKJ7y9SkYpwWJk": ("robotic_ops", "NSSIM Growth"),
    "prod_UKJErwXaxy0JuW": ("robotic_ops", "NSSIM Pro"),
    "prod_UKJ8Qvjicn46el": ("robotic_ops", "NSSIM Enterprise"),
}

DEFAULT_PORTAL = "facility_watch"
DEFAULT_PRODUCT_NAME = "AuraSense Platform"

# ---------------------------------------------------------------------------
# Supabase / Resend helpers
# ---------------------------------------------------------------------------

async def _supabase_rpc(rpc_name: str, params: dict) -> Any:
    if not SUPABASE_ANON_KEY:
        logger.warning("SUPABASE_ANON_KEY not set — cannot call RPC %s", rpc_name)
        return None
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/rpc/{rpc_name}"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.post(url, headers=headers, json=params)
        if r.status_code not in (200, 201):
            logger.error("Supabase RPC %s → %d: %s", rpc_name, r.status_code, r.text)
            return None
        return r.json() if r.text else None


async def _supabase_patch(table: str, row_id: str, body: dict) -> None:
    if not SUPABASE_ANON_KEY:
        return
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{table}?id=eq.{row_id}"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.patch(url, headers=headers, json=body)
        if r.status_code not in (200, 204):
            logger.warning("Supabase PATCH %s failed: %d %s", table, r.status_code, r.text)


async def _send_magic_link(email: str, redirect_to: str) -> None:
    if not SUPABASE_ANON_KEY:
        logger.warning("SUPABASE_ANON_KEY not set — skipping magic-link for %s", email)
        return
    url = f"{SUPABASE_URL.rstrip('/')}/auth/v1/otp"
    headers = {"apikey": SUPABASE_ANON_KEY, "Content-Type": "application/json"}
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.post(url, headers=headers, json={
            "email": email,
            "create_user": True,
            "options": {"email_redirect_to": redirect_to},
        })
        if r.status_code not in (200, 201):
            logger.error("Supabase OTP failed for %s: %d %s", email, r.status_code, r.text)
            return
    logger.info("Magic-link OTP sent to %s", email)


async def _send_welcome_email(email: str, product_name: str, portal: Optional[str]) -> Optional[str]:
    if not RESEND_API_KEY:
        logger.warning(
            "RESEND_API_KEY not set — welcome email not sent to %s. "
            "Add RESEND_API_KEY to .env to enable.", email,
        )
        return None

    portal_display = {
        "robotic_ops": "SODA — Smart Operations Dashboard",
        "drone_inspect": "FODA — Facility & Operations Drone Analytics",
        "facility_watch": "RODA — Real-time Operations Dashboard",
    }.get(portal or "", "AuraSense Platform")

    portal_url = {
        "robotic_ops": f"{SITE_BASE_URL}/dashboard/portals/robotic-ops",
        "drone_inspect": f"{SITE_BASE_URL}/dashboard/portals/drone-inspect",
        "facility_watch": f"{SITE_BASE_URL}/dashboard/portals/facility-watch",
    }.get(portal or "", f"{SITE_BASE_URL}/dashboard")

    html_body = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,sans-serif;background:#0a0a0a;color:#e5e5e5;margin:0;padding:0;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;padding:0 20px;">
  <tr><td>
    <div style="border:1px solid #27272a;border-radius:12px;padding:40px;background:#111;">
      <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0 0 6px;">Welcome to AuraSense</h1>
      <p style="color:#a1a1aa;margin:0 0 28px;font-size:14px;">Your <strong style="color:#e5e5e5;">{product_name}</strong> subscription is now active.</p>
      <p style="color:#e5e5e5;font-size:15px;line-height:1.6;margin:0 0 20px;">
        You have been granted access to <strong>{portal_display}</strong>.
        To set your password and access your portal, use the sign-in link that Supabase Auth has sent to this address in a separate message.
      </p>
      <p style="color:#e5e5e5;font-size:15px;line-height:1.6;margin:0 0 20px;">After signing in, your portal will be available at:</p>
      <div style="background:#18181b;border:1px solid #27272a;border-radius:8px;padding:14px;margin:0 0 28px;">
        <a href="{portal_url}" style="color:#818cf8;text-decoration:none;font-family:monospace;font-size:14px;">{portal_url}</a>
      </div>
      <p style="color:#71717a;font-size:13px;line-height:1.6;margin:0;">
        Questions? Reply to this email or contact <a href="mailto:hello@aurasensehk.com" style="color:#818cf8;">hello@aurasensehk.com</a>.
      </p>
    </div>
    <p style="color:#52525b;font-size:12px;text-align:center;margin:20px 0;">AuraSense &mdash; Neuromorphic Edge Intelligence &mdash; Hong Kong</p>
  </td></tr>
</table>
</body>
</html>"""

    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {RESEND_API_KEY}", "Content-Type": "application/json"},
            json={
                "from": "AuraSense <welcome@aurasensehk.com>",
                "to": [email],
                "replyTo": "hello@aurasensehk.com",
                "subject": f"Welcome to AuraSense — your {product_name} is ready",
                "html": html_body,
            },
        )
        if r.status_code not in (200, 201):
            logger.error("Resend failed for %s: %d %s", email, r.status_code, r.text)
            return None
        msg_id: Optional[str] = r.json().get("id")
        logger.info("Welcome email sent to %s (Resend id=%s)", email, msg_id)
        return msg_id


# ---------------------------------------------------------------------------
# Core provisioning
# ---------------------------------------------------------------------------

async def _provision_new_customer(session: dict) -> None:
    session_id: str = session.get("id", "")
    customer_id: str = session.get("customer") or ""
    email: str = (
        (session.get("customer_details") or {}).get("email")
        or session.get("customer_email")
        or ""
    )
    currency: str = session.get("currency", "hkd")
    amount_total: int = session.get("amount_total") or 0

    if not email:
        logger.error(
            "checkout.session.completed (session=%s) missing email — cannot provision.", session_id
        )
        return

    product_id = ""
    portal: Optional[str] = None
    product_name = DEFAULT_PRODUCT_NAME

    try:
        items = stripe.checkout.Session.list_line_items(session_id, limit=5)
        for item in items.auto_paging_iter():
            price = item.get("price") or {}
            pid = price.get("product") or ""
            if pid:
                product_id = pid
                portal, product_name = PRODUCT_TO_PORTAL.get(pid, (DEFAULT_PORTAL, DEFAULT_PRODUCT_NAME))
                break
    except Exception as exc:
        logger.warning("Could not fetch line items for %s: %s", session_id, exc)
        portal = DEFAULT_PORTAL

    logger.info(
        "Block#7 provisioning: session=%s email=%s product=%s portal=%s amount=%d%s",
        session_id, email, product_id, portal, amount_total, currency,
    )

    provision_id: Optional[str] = None
    try:
        result = await _supabase_rpc("record_pending_provision", {
            "p_session_id": session_id,
            "p_customer_id": customer_id or None,
            "p_email": email,
            "p_product_id": product_id or "unknown",
            "p_product_name": product_name,
            "p_portal": portal,
            "p_amount": amount_total,
            "p_currency": currency,
            "p_metadata": {
                "stripe_event": "checkout.session.completed",
                "payment_status": session.get("payment_status"),
                "mode": session.get("mode"),
            },
        })
        provision_id = result if isinstance(result, str) else None
        logger.info("pending_provisions row: id=%s", provision_id)
    except Exception as exc:
        logger.error("record_pending_provision RPC failed: %s", exc, exc_info=True)

    magic_link_sent_at: Optional[str] = None
    try:
        await _send_magic_link(email, f"{SITE_BASE_URL}/dashboard")
        magic_link_sent_at = datetime.datetime.utcnow().isoformat() + "Z"
    except Exception as exc:
        logger.error("Magic-link send failed for %s: %s", email, exc, exc_info=True)

    welcome_email_id: Optional[str] = None
    try:
        welcome_email_id = await _send_welcome_email(email, product_name, portal)
    except Exception as exc:
        logger.error("Welcome email failed for %s: %s", email, exc, exc_info=True)

    if provision_id and magic_link_sent_at:
        try:
            patch_body: dict = {"magic_link_sent_at": magic_link_sent_at}
            if welcome_email_id:
                patch_body["welcome_email_id"] = welcome_email_id
            await _supabase_patch("pending_provisions", provision_id, patch_body)
        except Exception as exc:
            logger.warning("Could not update provision email fields: %s", exc)

    logger.info(
        "Block#7 done: email=%s portal=%s magic_link_sent=%s resend_id=%s",
        email, portal, bool(magic_link_sent_at), welcome_email_id,
    )


# ---------------------------------------------------------------------------
# Router
# ---------------------------------------------------------------------------

router = APIRouter(prefix="/v1/stripe", tags=["stripe-provisioning"])


@router.post(
    "/webhook",
    status_code=status.HTTP_200_OK,
    summary="Stripe checkout webhook — Block #7 provisioning",
    include_in_schema=False,
)
async def stripe_webhook(request: Request) -> JSONResponse:
    """
    POST /api/v1/stripe/webhook

    Verifies Stripe-Signature, dispatches checkout.session.completed to
    _provision_new_customer(). Returns 200 immediately; all failures are
    caught internally so Stripe does not retry due to 5xx.
    """
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    if not STRIPE_WEBHOOK_SECRET:
        logger.error("STRIPE_WEBHOOK_SECRET not configured")
        raise HTTPException(status_code=400, detail="Webhook secret not configured")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError as e:
        logger.warning("Stripe signature verification failed: %s", e)
        raise HTTPException(status_code=400, detail="Invalid Stripe signature")
    except Exception as e:
        logger.error("Stripe event construction error: %s", e)
        raise HTTPException(status_code=400, detail="Malformed event")

    event_type: str = event["type"]
    logger.info("Stripe event: %s id=%s", event_type, event.get("id"))

    if event_type == "checkout.session.completed":
        try:
            await _provision_new_customer(event["data"]["object"])
        except Exception as exc:
            logger.error("_provision_new_customer raised: %s", exc, exc_info=True)

    return JSONResponse(content={"received": True})
