import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HudPanel } from '@/components/HudPanel'
import { LiveBadge } from '@/components/LiveBadge'
import { Brain, MagnifyingGlass, Gear, Warning, Camera, ShieldCheck, CheckCircle, ChevronRight } from '@phosphor-icons/react'
import { askNepaAgent, NepaAgentMessage } from '@/lib/nepaAgent'

const NODE_STATUS = [
  { label: 'NUC_01 Latency', value: '16 ms', color: 'bg-green-400' },
  { label: 'JETSON_02 Latency', value: '23 ms', color: 'bg-green-400' },
  { label: 'NUC_03 Latency', value: '12 ms', color: 'bg-green-400' },
]

const ALERTS = [
  { icon: <Warning size={18} className="text-amber-400" />, label: '3 Critical Alerts', className: 'text-amber-400' },
  { icon: <Warning size={18} className="text-yellow-300" />, label: '5 Warnings', className: 'text-yellow-300' },
  { icon: <Warning size={18} className="text-red-400" />, label: 'ROI Anomaly Detected', className: 'text-red-400' },
]

const QUICK_ACTIONS = [
  { label: 'Run Diagnostic', text: 'Run a VODA diagnostic' },
  { label: 'Check Latency', text: 'Check inference latency' },
  { label: 'Show Alerts', text: 'Show last 10 alert events' },
]

const STARTER_PROMPTS = [
  'What nodes are active?',
  'Run a VODA diagnostic',
  'Show last 10 alert events',
  'What is my inference latency?',
  'Check SODA lane status',
]

export function NepaAgent() {
  const [messages, setMessages] = useState<NepaAgentMessage[]>([])
  const [input, setInput] = useState('')
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [messages])

  // IntersectionObserver for fade-in
  useEffect(() => {
    const els = document.querySelectorAll('[data-fade]')
    const io = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
        }
      })
    }, { threshold: 0.18 })
    els.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500')
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  async function handleSend(text: string) {
    setMessages(p => [...p, { role: 'user', content: text, timestamp: new Date().toISOString() }])
    const r = await askNepaAgent(messages, text)
    setMessages(p => [...p, { role: 'assistant', content: r.content, timestamp: new Date().toISOString() }])
    setInput('')
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#cdd3de] overflow-x-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{
        backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
      }} />
      <div className="fixed inset-0 pointer-events-none -z-10" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(0,212,255,0.08) 0%, transparent 70%)',
      }} />

      {/* HERO BAND */}
      <section className="py-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto" data-fade>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain size={22} className="text-primary" />
          <span className="font-mono text-primary tracking-[2px] text-xs uppercase">NEPA AGENT · OPERATIONAL AI</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">Your Operational AI Agent.</h1>
        <p className="text-lg text-white/65 mb-8">Intelligent, reliable, autonomous — empowering your full studio crew.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
          <button className="bg-primary text-black px-6 py-3 rounded font-semibold">Activate Agent ▾</button>
          <button className="border border-white/20 text-white px-6 py-3 rounded font-medium">View Console →</button>
        </div>
      </section>

      {/* STATUS BAND */}
      <section className="py-8 max-w-6xl mx-auto w-full" data-fade>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Node Status */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-3">
              <MagnifyingGlass size={18} className="text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60">NODE STATUS</span>
            </div>
            {NODE_STATUS.map((n, i) => (
              <div key={i} className="flex items-center gap-3 font-mono text-sm">
                <span className={`w-2 h-2 rounded-full ${n.color} animate-pulse`} />
                <span>{n.label}:</span>
                <span className="ml-auto">{n.value}</span>
              </div>
            ))}
          </div>
          {/* Center Tiles */}
          <div className="flex flex-col gap-4">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 flex items-center gap-3">
              <MagnifyingGlass size={18} className="text-primary" />
              <div>
                <h3 className="font-semibold text-white">Context Analysis</h3>
                <p className="text-xs text-white/60">Reads live node context</p>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 flex items-center gap-3">
              <Gear size={18} className="text-primary" />
              <div>
                <h3 className="font-semibold text-white">Diagnostic Scan</h3>
                <p className="text-xs text-white/60">Find problems instantly</p>
              </div>
            </div>
          </div>
          {/* Alert Queue */}
          <div className="border border-white/10 rounded-xl p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-3">
              <Warning size={18} className="text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60">ALERT QUEUE</span>
            </div>
            {ALERTS.map((a, i) => (
              <div key={i} className={`flex items-center gap-2 font-mono text-sm ${a.className}`}>{a.icon}<span>{a.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENT TRANSCRIPT */}
      <section className="py-8 max-w-3xl mx-auto w-full" data-fade>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 mb-2 max-h-48 overflow-y-auto font-mono text-xs" ref={transcriptRef}>
          {messages.slice(-3).map((m, i) => (
            <div key={i} className="mb-2">
              <span className={`font-bold ${m.role === 'user' ? 'text-primary' : 'text-white/70'}`}>{m.role === 'user' ? 'YOU >' : 'AGENT >'}</span> {m.content}
            </div>
          ))}
        </div>
      </section>

      {/* AGENT INPUT BAR */}
      <section className="py-4 max-w-3xl mx-auto w-full flex items-center gap-3" data-fade>
        <div className="flex items-center gap-2 bg-zinc-900/40 border border-white/10 rounded-full px-4 py-2 flex-1">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
            <Brain size={20} className="text-primary" />
          </div>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(input) }}
            placeholder="Ask NEPA Agent..."
            className="flex-1 bg-transparent outline-none border-0 text-white/80 placeholder:text-white/30 font-mono text-xs"
          />
        </div>
        <div className="flex gap-2">
          {QUICK_ACTIONS.map((a, i) => (
            <button key={i} onClick={() => handleSend(a.text)} className="px-3 py-1 rounded-full bg-zinc-900/60 border border-white/10 text-white/80 font-mono text-xs hover:bg-primary/20 transition-colors">
              {a.label}
            </button>
          ))}
        </div>
      </section>

      {/* FOUR-PANEL DASHBOARD GRID */}
      <section className="py-16 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-6" data-fade>
        {/* JUDGE */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 hover:shadow-[0_0_0_2px_#00d4ff33] transition-shadow group flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-primary">JUDGE</span>
            <span className="font-mono text-xs text-white/60">Real-Time Analysis</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="aspect-video rounded bg-gradient-to-br from-zinc-800 to-zinc-950 relative flex items-center justify-center">
              <span className="text-white/20 font-bold">IMG</span>
            </div>
            <div className="aspect-video rounded bg-gradient-to-br from-zinc-800 to-zinc-950 border-2 border-red-400 flex items-center justify-center relative">
              <span className="absolute top-2 left-2 bg-red-900/80 border border-red-400 text-red-300 text-xs font-mono px-2 py-1 rounded">⚠️ Stabilization Error Detected</span>
              <span className="text-white/20 font-bold">IMG</span>
            </div>
            <div className="aspect-video rounded bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
              <span className="text-white/20 font-bold">IMG</span>
            </div>
            <div className="aspect-video rounded bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
              <span className="text-white/20 font-bold">IMG</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2 text-xs text-white/80 mb-1"><span>▸</span> Frame Drift: <span className="font-mono">3.3px</span></div>
            <div className="flex items-center gap-2 text-xs text-white/80 mb-1"><span>▸</span> Exposure Mismatch</div>
            <div className="text-xs text-white/50 text-center mt-3">Issue Report Generated</div>
          </div>
        </div>
        {/* COMPOSER */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 hover:shadow-[0_0_0_2px_#00d4ff33] transition-shadow group flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-primary">COMPOSER</span>
            <span className="font-mono text-xs text-white/60">Scene Adjustments</span>
          </div>
          <div className="aspect-video rounded bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center mb-3">
            <span className="text-white/20 font-bold">IMG</span>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <div className="bg-green-500/15 text-green-400 rounded px-3 py-1 text-xs flex items-center gap-2"><CheckCircle size={14} /> Auto-Fixed & Ready</div>
            <div className="text-white/70 text-xs flex items-center gap-2"><CheckCircle size={14} /> Lighting Balanced</div>
            <div className="text-white/70 text-xs flex items-center gap-2"><CheckCircle size={14} /> Artifact Removed</div>
          </div>
          <div className="text-xs text-white/50 mt-2">Scene Updated Successfully</div>
        </div>
        {/* DIRECTOR */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 hover:shadow-[0_0_0_2px_#00d4ff33] transition-shadow group flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-primary">DIRECTOR</span>
            <span className="font-mono text-xs text-white/60">Command & Control</span>
          </div>
          <div className="relative aspect-video rounded bg-gradient-to-br from-zinc-800 to-zinc-950 mb-3 flex items-center justify-center">
            <Camera size={22} className="absolute top-2 right-2 text-primary" />
            <Camera size={22} className="absolute top-2 left-2 text-primary" />
            <Camera size={22} className="absolute bottom-2 right-2 text-primary" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full animate-pulse" />
            <span className="text-white/20 font-bold">MAP</span>
          </div>
          <div className="text-xs font-mono text-white/80 mt-2">Deploy Camera 5 to Lane B</div>
        </div>
        {/* AUDITOR */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 hover:shadow-[0_0_0_2px_#00d4ff33] transition-shadow group flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-primary">AUDITOR</span>
            <span className="font-mono text-xs text-white/60">Audit & Review</span>
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-amber-400" /> <span>Audit Trail Summary</span> <span className="flex-1 h-1 rounded bg-gradient-to-r from-amber-400/40 to-amber-400/0" /></div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-amber-400" /> <span>Node Event Log</span> <span className="flex-1 h-1 rounded bg-gradient-to-r from-amber-400/40 to-amber-400/0" /></div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> <span>Diagnostic Completed</span> <span className="flex-1 h-1 rounded bg-gradient-to-r from-green-400/40 to-green-400/0" /></div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> <span>File Export: Secured</span> <span className="flex-1 h-1 rounded bg-gradient-to-r from-green-400/40 to-green-400/0" /></div>
          </div>
          <div className="text-xs text-white/50 mt-2">Log Export Ready</div>
        </div>
      </section>

      {/* NARRATIVE FOOTER BAND */}
      <section className="py-16 text-center" data-fade>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Connect. Diagnose. Direct. Verify.</h2>
        <p className="text-base text-white/65 mb-8">Sign up for free and run your first diagnostic scan. No credit card required.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-black rounded font-semibold text-sm hover:bg-primary/90 transition-colors">Open Console →</Link>
          <Link to="/docs/api" className="inline-flex items-center gap-1.5 px-6 py-3 border border-white/20 text-white rounded font-medium text-sm hover:bg-white/5 transition-colors">Read API Docs →</Link>
        </div>
      </section>
    </main>
  )
}
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

  function handleSend(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg) return
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: msg },
      {
        role: 'agent',
        text: 'This interface is connected to mock context. Wire to /v1/agent/context and /v1/agent/query when the live endpoint is available.',
      },
    ])
    setInput('')
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
                Mock context. Wire to /v1/agent/context when endpoint is available.
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
