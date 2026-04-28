import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HudPanel } from '@/components/HudPanel'
import { LiveBadge } from '@/components/LiveBadge'

const CAPABILITIES = [
  {
    n: '01',
    title: 'Operational Awareness',
    desc: 'NEPA Agent reads your live node status, active camera lanes, alert queues, and recent audit events. Ask it what is running, what has fired, or what needs attention — and it answers from your actual deployment state, not a general knowledge base.',
  },
  {
    n: '02',
    title: 'Diagnostic Execution',
    desc: 'Trigger NEPA Diagnostic scans, request inference health reports, and surface ROI anomaly maps directly through the agent interface. Results are returned as structured findings you can act on immediately.',
  },
  {
    n: '03',
    title: 'Platform Navigation',
    desc: 'NEPA Agent can route you to the right Console view, documentation page, or configuration panel based on what you describe. Describe the problem — it finds the path.',
  },
  {
    n: '04',
    title: 'Audit & Compliance Queries',
    desc: 'Ask NEPA Agent to surface audit events, session logs, or alert provenance records for a given time range, node, or operator. Results are formatted for inspection or export — no manual log trawling required.',
  },
]

const STEPS = [
  {
    step: '01',
    title: 'Context Load',
    desc: 'When you open NEPA Agent, it reads your current deployment state: active nodes, running lanes, recent alerts, and open audit events. Every response is grounded in your actual platform context, not a static knowledge base.',
  },
  {
    step: '02',
    title: 'Structured Tool Calls',
    desc: 'When you ask NEPA Agent to do something — run a diagnostic, pull an audit log, check node health — it issues a structured tool call to the NEPA platform API rather than generating a freeform answer. Responses are deterministic and traceable.',
  },
  {
    step: '03',
    title: 'Replayable Actions',
    desc: 'Every action NEPA Agent takes is logged to your audit trail under your operator session. You can inspect, replay, or export any agent-initiated action just like a manual operator action — full chain of custody maintained.',
  },
]

const STARTER_PROMPTS = [
  'What nodes are active?',
  'Run a VODA diagnostic',
  'Show last 10 alert events',
  'What is my inference latency?',
  'Check SODA lane status',
]

type Message = { role: 'user' | 'agent'; text: string }

const CONTEXT_TEXT = `NODE STATUS
├── NUC_01       ACTIVE    <0.8ms
├── JETSON_02    ACTIVE    <1.1ms
└── NUC_03       STANDBY   —

ACTIVE LANES
├── SODA CAM_04  LIVE
├── FODA ZONE_2  LIVE
└── VODA CLIP_7  PROCESSING

LAST ALERT
└── SODA CAM_04 · 07:03:14 HKT
    INTRUSION · ZONE_B · ESCALATED

AUDIT EVENTS TODAY
└── 3,847 sealed records`

export function NepaAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      text: 'NEPA Agent online. Deployment context loaded. How can I assist you?',
    },
  ])
  const [input, setInput] = useState('')
  const [visible, setVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  async function handleSend(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg) return

    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setInput('')

    try {
      const r = await fetch('/api/nepa/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: [], message: msg }),
      })
      if (!r.ok) throw new Error('HTTP ' + r.status)
      const data = await r.json()
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: data.content || 'No response.' },
      ])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: 'NEPA agent is temporarily unreachable. Please try again.' },
      ])
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden">

      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(0,102,255,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.010) 2px, rgba(0,212,255,0.010) 4px)',
        }}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[72vh] flex items-center overflow-hidden pt-24 pb-20">

        {/* Watermark glyph */}
        <div aria-hidden className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-mono font-black text-[20vw] text-cyan-500/[0.03] tracking-widest">
            AGENT
          </span>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="max-w-3xl">

            <div
              className="flex items-center gap-3 mb-10 transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
            >
              <LiveBadge label="SYSTEM ONLINE · NEPA AGENT" />
            </div>

            <div
              className="mb-8 transition-all duration-1000 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)' }}
            >
              <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-5">
                AuraSense NEPA — Autonomous Agent
              </p>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-4">
                NEPA Agent
              </h1>
              <p
                className="text-xl md:text-2xl font-light text-white/70 mb-6 leading-snug"
                style={{
                  transition: 'opacity 1s ease-out 0.3s',
                  opacity: visible ? 1 : 0,
                }}
              >
                Your operational AI agent for the NEPA platform.
                <br />
                Ask anything. Run diagnostics. Inspect deployments.
              </p>
            </div>

            <p
              className="text-base text-white/45 max-w-xl leading-relaxed mb-10"
              style={{ transition: 'opacity 1s ease-out 0.55s', opacity: visible ? 1 : 0 }}
            >
              NEPA Agent is a persistent, context-aware AI assistant embedded directly into the
              AuraSense platform. It is not a general-purpose chatbot. It has operational awareness
              of your active edge nodes, running inference lanes, alert queues, and audit logs — and
              it can execute platform actions on your behalf through structured NEPA tool calls, not
              freeform text generation.
            </p>

            <div
              className="flex flex-wrap gap-10 border-t border-white/8 pt-8"
              style={{ transition: 'opacity 1s ease-out 0.75s', opacity: visible ? 1 : 0 }}
            >
              {[
                { label: 'Context source', value: 'Live',     note: 'deployment state' },
                { label: 'Action type',    value: 'Structured', note: 'tool calls' },
                { label: 'Audit trail',    value: 'Full',     note: 'chain of custody' },
                { label: 'Cloud egress',   value: 'Zero',     note: 'edge-only' },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-white/30 text-xs mb-1">{m.label}</p>
                  <p className="text-white font-semibold text-lg font-mono">{m.value}</p>
                  <p className="text-white/25 text-[11px] mt-0.5">{m.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITY STRIP ── */}
      <section className="py-24 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-3">
            Core capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-14">
            What NEPA Agent can do
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map((c) => (
              <HudPanel key={c.n} className="bg-[#080B12] p-6 flex flex-col">
                <span className="font-mono text-xs text-cyan-400/40 mb-3">{c.n}</span>
                <h3 className="text-sm font-semibold text-white mb-3">{c.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed flex-1">{c.desc}</p>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENT INTERFACE ── */}
      <section className="py-24 border-t border-white/8 bg-[#080B12]">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-10">
            Agent Interface
          </p>

          <div className="grid lg:grid-cols-[1fr_340px] gap-6">

            {/* Left — chat interface */}
            <HudPanel className="bg-[#050508] p-0 flex flex-col overflow-hidden" showScanlines={false}>

              {/* header bar */}
              <div className="flex items-center gap-3 border-b border-cyan-500/15 px-5 py-3">
                <LiveBadge />
                <span className="font-mono text-[10px] tracking-widest text-white/35 uppercase">
                  NEPA Agent — Session Active
                </span>
              </div>

              {/* message history */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-5 py-4 space-y-3 min-h-[320px] max-h-[400px]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.008) 2px, rgba(0,212,255,0.008) 4px)',
                }}
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'agent' && (
                      <span className="font-mono text-[9px] text-cyan-400/50 mt-1 shrink-0 tracking-widest">
                        AGENT
                      </span>
                    )}
                    <p
                      className={`font-mono text-xs leading-relaxed max-w-[75%] px-3 py-2 ${
                        m.role === 'user'
                          ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/25'
                          : 'text-white/60 border border-white/8 bg-white/[0.03]'
                      }`}
                    >
                      {m.text}
                    </p>
                    {m.role === 'user' && (
                      <span className="font-mono text-[9px] text-white/30 mt-1 shrink-0 tracking-widest">
                        YOU
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* starter prompt pills */}
              <div className="px-5 pt-3 pb-2 flex flex-wrap gap-2 border-t border-white/5">
                {STARTER_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    className="font-mono text-[10px] text-cyan-400/60 border border-cyan-500/20 px-3 py-1 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* input bar */}
              <div className="flex items-center gap-3 border-t border-cyan-500/15 px-4 py-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask NEPA Agent..."
                  className="flex-1 bg-transparent font-mono text-xs text-white/80 placeholder:text-white/25 outline-none border-0 focus:ring-0"
                />
                <button
                  onClick={() => handleSend()}
                  className="bg-cyan-500 text-black font-semibold text-xs px-5 py-2 rounded-full hover:bg-cyan-400 transition-colors shrink-0"
                >
                  SEND
                </button>
              </div>
            </HudPanel>

            {/* Right — live context strip */}
            <HudPanel title="PLATFORM CONTEXT" className="bg-[#050508] p-6 flex flex-col">
              <pre className="font-mono text-[11px] text-cyan-300/70 leading-relaxed whitespace-pre flex-1">
                {CONTEXT_TEXT}
              </pre>
              <p className="font-mono text-[9px] text-white/20 mt-6 leading-relaxed border-t border-white/5 pt-4">
              </p>
            </HudPanel>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-14">
            Three-step operation
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <HudPanel key={s.step} className="bg-[#080B12] p-8 flex flex-col">
                <span className="font-mono text-xs text-cyan-400/40 mb-4">Step {s.step}</span>
                <h3 className="text-base font-semibold text-white mb-4">{s.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed flex-1">{s.desc}</p>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 border-t border-white/8 bg-[#080B12]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">

            <HudPanel className="bg-[#050508] p-8 flex flex-col gap-4">
              <p className="text-xs text-cyan-400/50 tracking-[0.2em] font-mono uppercase">
                Get started
              </p>
              <h3 className="text-xl font-bold text-white leading-snug">
                Connect your deployment to NEPA Agent
              </h3>
              <p className="text-sm text-white/40 leading-relaxed flex-1">
                NEPA Agent reads directly from your active deployment state. Open the Console to
                see your nodes, alert queues, and inference lanes in context.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors w-fit"
              >
                Go to Console →
              </Link>
            </HudPanel>

            <HudPanel className="bg-[#050508] p-8 flex flex-col gap-4">
              <p className="text-xs text-cyan-400/50 tracking-[0.2em] font-mono uppercase">
                Developers
              </p>
              <h3 className="text-xl font-bold text-white leading-snug">
                Building a product on NEPA?
              </h3>
              <p className="text-sm text-white/40 leading-relaxed flex-1">
                Integrate NEPA Agent tool calls into your own product via the NEPA Platform API.
                Structured responses, audit-linked actions, and deterministic outputs by design.
              </p>
              <Link
                to="/docs/api"
                className="inline-flex items-center justify-center border border-white/20 text-white/70 font-semibold text-sm px-7 py-3 hover:border-white/40 hover:text-white transition-colors w-fit"
              >
                Read API Docs →
              </Link>
            </HudPanel>

          </div>
        </div>
      </section>

    </main>
  )
}
