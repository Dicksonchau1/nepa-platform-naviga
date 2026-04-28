# app/routers/waitlist.py
from fastapi import APIRouter, BackgroundTasks, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
import os
import smtplib
from email.message import EmailMessage
from datetime import datetime
from threading import Lock

router = APIRouter()

# In-memory waitlist (replace with DB in production)
WAITLIST = []
WAITLIST_LOCK = Lock()

FOUNDER_EMAIL = os.getenv("FOUNDER_EMAIL", "founder@example.com")
SMTP_SERVER = os.getenv("SMTP_SERVER", "localhost")
SMTP_PORT = int(os.getenv("SMTP_PORT", "25"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@aurasense.ai")

class WaitlistEntry(BaseModel):
    email: EmailStr
    role: str = Field(..., min_length=2, max_length=32)
    use_case: str = Field(..., min_length=2, max_length=32)
    company: Optional[str] = Field(None, max_length=120)
    notes: Optional[str] = Field(None, max_length=500)
    source_page: Optional[str] = "soda"
    ts: Optional[int]
    hp: Optional[str] = ""
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    referrer: Optional[str] = None

@router.post("/api/waitlist")
async def join_waitlist(entry: WaitlistEntry, background_tasks: BackgroundTasks, request: Request):
    # Anti-bot: honeypot
    if entry.hp:
        raise HTTPException(status_code=400, detail="Bot detected.")
    # Basic deduplication
    with WAITLIST_LOCK:
        for idx, e in enumerate(WAITLIST):
            if e.email.lower() == entry.email.lower():
                return {"ok": True, "position": idx+1}
        WAITLIST.append(entry)
        position = len(WAITLIST)
    # Send emails in background
    background_tasks.add_task(send_welcome_email, entry.email, position)
    background_tasks.add_task(notify_founder, entry, position)
    return {"ok": True, "position": position}

def send_welcome_email(email: str, position: int):
    msg = EmailMessage()
    msg["Subject"] = "Welcome to the AuraSense Waitlist"
    msg["From"] = FROM_EMAIL
    msg["To"] = email
    msg.set_content(f"""
Thank you for joining the AuraSense early-access waitlist!

You're confirmed as spot #{position}.
We'll send a confirmation link and a founder note within 24 hours.

Best,
The AuraSense Team
""")
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            if SMTP_USER and SMTP_PASS:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
    except Exception as e:
        print(f"[waitlist] Failed to send welcome email: {e}")

def notify_founder(entry: WaitlistEntry, position: int):
    msg = EmailMessage()
    msg["Subject"] = f"[AuraSense Waitlist] New signup: {entry.email} (#{position})"
    msg["From"] = FROM_EMAIL
    msg["To"] = FOUNDER_EMAIL
    msg.set_content(f"""
New waitlist signup (#{position}):
Email: {entry.email}
Role: {entry.role}
Use case: {entry.use_case}
Company: {entry.company or '-'}
Notes: {entry.notes or '-'}
Source: {entry.source_page or '-'}
UTM: {entry.utm_source or '-'}, {entry.utm_medium or '-'}, {entry.utm_campaign or '-'}
Referrer: {entry.referrer or '-'}
Time: {datetime.utcfromtimestamp((entry.ts or 0)/1000).isoformat() if entry.ts else '-'}
IP: {getattr(entry, 'client_host', '-')}
""")
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            if SMTP_USER and SMTP_PASS:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
    except Exception as e:
        print(f"[waitlist] Failed to notify founder: {e}")
