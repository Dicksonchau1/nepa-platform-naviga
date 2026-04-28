// Single source of truth for NEPA agent calls.
// Today: returns canned responses from a local knowledge table.
// Tomorrow: swap body to fetch('/api/v1/nepa-agent', { method:'POST', ... })
// — no other file changes needed.

export interface NepaAgentMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface NepaAgentResponse {
  content: string
  citations?: { title: string; url: string }[]
  mock?: boolean  // true when running against the local knowledge table
}

const KNOWLEDGE_TABLE: Array<{ patterns: RegExp[]; reply: string }> = [
  {
    patterns: [/what is nepa/i, /tell me about nepa/i, /how does nepa work/i],
    reply: `NEPA (Neuromorphic Edge Perception Agent) is AuraSense's deterministic inspection infrastructure. It combines V-JEPA 2 world modeling with spike-timing-dependent plasticity for edge-only anomaly detection. Every inference is signed with a cryptographic audit trail for replay verification.`,
  },
  {
    patterns: [/voda/i],
    reply: `VODA (Video Operation Decision Agent) processes inspection and retail video streams through the NEPA engine. It produces signature maps, severity scores, and structured enhancement plans. Live in the console at /dashboard/voda.`,
  },
  {
    patterns: [/foda|drone|inspect/i],
    reply: `FODA (Facade Operation Decision Agent) is our building inspection product — drone capture flows through the NEPA world model and emits structured findings with severity, bounding boxes, and repair priorities. HK$5,600–9,800 per unit for inspection alone.`,
  },
  {
    patterns: [/roda|robot/i],
    reply: `RODA (Robot Operation Decision Agent) manages autonomous robot fleets — missions, telemetry, position oracle from the NEPA world model. See live state at /dashboard/robotic-ops.`,
  },
  {
    patterns: [/soda|retail|store|shelf/i],
    reply: `SODA (Store Operation Decision Agent) runs neuromorphic theft detection and shelf monitoring for unmanned retail. Alerts flow to WhatsApp in real time, with zero video storage.`,
  },
  {
    patterns: [/pricing|price|cost|plan/i],
    reply: `Pilot: HK$20,000 one-time. Monthly Support: HK$9,000/mo. Production: custom. See /pricing or contact pilot@aurasensehk.com.`,
  },
  {
    patterns: [/hri|hr intelligence|interview/i],
    reply: `HRI is AuraSense's HR intelligence API — structured interview scoring, transcript analysis, and decision analytics. Four API tiers: Launch, Growth, Scale, Enterprise.`,
  },
  {
    patterns: [/api|developer|integrate/i],
    reply: `Each product exposes a REST API under /api/v1. Keys are managed per-user in the portal's Developer Mode tab. Full reference at /docs/api.`,
  },
  {
    patterns: [/compliance|pdpo|gdpr|audit/i],
    reply: `NEPA is PDPO and GDPR-aligned by design — all inference is edge-only, no video is stored, and every decision is signed with a tamper-evident cryptographic hash. Full field-level RBAC with configurable retention windows.`,
  },
]

const DEFAULT_REPLY = `I can help with questions about NEPA, VODA, FODA, RODA, SODA, HRI, pricing, compliance, and APIs. Try asking "how does NEPA work?" or "what's the FODA pricing?"`

export async function askNepaAgent(
  history: NepaAgentMessage[],
  userMessage: string
): Promise<NepaAgentResponse> {
  try {
    const r = await fetch('/api/nepa/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, message: userMessage }),
    })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const data = await r.json()
    return {
      content: data.content,
      mock: false,
    }
  } catch (e) {
    // Fallback to local knowledge table on network failure
    await new Promise((res) => setTimeout(res, 200))
    const match = KNOWLEDGE_TABLE.find((k) => k.patterns.some((p) => p.test(userMessage)))
    return {
      content: match ? match.reply : DEFAULT_REPLY,
      mock: true,
    }
  }
}

const ROTATING_TIPS = [
  'Ask me: How does NEPA work?',
  'Ask me: What is FODA pricing?',
  'Ask me: Tell me about SODA retail detection',
  'Ask me: What APIs are available?',
  'Ask me: Is NEPA GDPR compliant?',
  'Ask me: What is VODA?',
  'Ask me: How does RODA manage robots?',
]

export function getRotatingTip(): string {
  return ROTATING_TIPS[Math.floor(Date.now() / 8000) % ROTATING_TIPS.length]
}
