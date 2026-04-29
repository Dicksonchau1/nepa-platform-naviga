/**
 * NEPA Agent client — calls /api/agent/chat (Sonnet 4.5 via OpenRouter)
 * Falls back to local knowledge base on network/API failure.
 */

export type NepaAgentRole = 'user' | 'assistant' | 'system'

export interface NepaAgentMessage {
  role: NepaAgentRole
  content: string
  timestamp?: string
  model?: string
}

export interface NepaAgentResponse {
  content: string
  model?: string
  mock?: boolean
  sessionId?: string
}

const SESSION_KEY = 'nepa-agent-session-id'

function getSessionId(): string | null {
  try { return localStorage.getItem(SESSION_KEY) } catch { return null }
}

function setSessionId(sid: string) {
  try { localStorage.setItem(SESSION_KEY, sid) } catch {}
}

export function clearAgentSession() {
  try { localStorage.removeItem(SESSION_KEY) } catch {}
}

/**
 * Send a chat turn to the NEPA agent backend.
 * Signature kept compatible with the previous mock implementation:
 *   askNepaAgent(history, userMessage)
 */
export async function askNepaAgent(
  history: NepaAgentMessage[],
  userMessage?: string,
): Promise<NepaAgentResponse> {
  // Build the messages array. If userMessage is passed separately (legacy 2-arg usage),
  // append it. Otherwise assume history already contains the latest user turn.
  const fullHistory: NepaAgentMessage[] =
    userMessage !== undefined
      ? [...history, { role: 'user', content: userMessage }]
      : history

  const apiMessages = fullHistory.map(m => ({ role: m.role, content: m.content }))

  try {
    const r = await fetch('/api/agent/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: apiMessages,
        sessionId: getSessionId(),
      }),
      signal: AbortSignal.timeout(60_000),
    })

    const data = await r.json().catch(() => ({} as any))

    if (!r.ok || data.error) {
      throw new Error(data.error || `agent returned ${r.status}`)
    }

    if (data.sessionId) setSessionId(data.sessionId)

    return {
      content: data.content || '(no content)',
      model: data.model,
      sessionId: data.sessionId,
      mock: false,
    }
  } catch (e) {
    // Fallback to local knowledge table on failure (preserves UX if API down)
    await new Promise(res => setTimeout(res, 200))
    const text = userMessage ?? history[history.length - 1]?.content ?? ''
    const match = KNOWLEDGE_TABLE.find(k => k.patterns.some(p => p.test(text)))
    return {
      content: match ? match.reply : DEFAULT_REPLY,
      mock: true,
    }
  }
}

// ─── LOCAL KNOWLEDGE FALLBACK (preserves prior behaviour if API fails) ───

const KNOWLEDGE_TABLE: { patterns: RegExp[]; reply: string }[] = [
  {
    patterns: [/nepa.*work|how.*nepa|what.*nepa/i],
    reply: `NEPA is the neuromorphic edge perception agent core — STDP-trained spiking neural networks running on Jetson/NUC nodes, building a SignatureMap world state. All inference is on-device with sub-15ms latency. Cloud LLMs are only escalated for the ambiguous residual.`,
  },
  {
    patterns: [/voda/i],
    reply: `VODA is video diagnostics & correction. Frame-by-frame SignatureMap analysis, anomaly scoring, and corrective workflows. Outputs are deterministic and replayable.`,
  },
  {
    patterns: [/foda/i],
    reply: `FODA is the facade operations decision agent — aerial inspection for building facades. Drone edge nodes, cryptographically sealed audit chains, governance-grade evidence packs.`,
  },
  {
    patterns: [/roda/i],
    reply: `RODA is the robotic operations dispatch agent — NEPA-dispatched autonomous restocking via NERMN robotic arms. Triggered by anomaly score thresholds in the ACT layer.`,
  },
  {
    patterns: [/soda/i],
    reply: `SODA is the store operating decision agent — fully autonomous unmanned store intelligence. Layer 1 perception, Layer 2 ACT dispatcher, Layer 3 world model API, Layer 4 NISSM operations.`,
  },
  {
    patterns: [/hri/i],
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

// ─── ROTATING TIPS (for NepaAgentPopup) ───

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
