import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Brain,
  MagnifyingGlass,
  Gear,
  Warning,
  Camera,
  ShieldCheck,
  CheckCircle,
  CaretRight,
  PaperPlaneRight,
  UserCircle,
} from '@phosphor-icons/react'
import { askNepaAgent, type NepaAgentMessage } from '@/lib/nepaAgent'
import { WorldModelSection } from '@/components/sections/WorldModelSection'

const NODE_STATUS = [
  { name: 'NUC_01',    latency: '16 ms', color: 'bg-green-400' },
  { name: 'JETSON_02', latency: '23 ms', color: 'bg-green-400' },
  { name: 'NUC_03',    latency: '12 ms', color: 'bg-green-400' },
]

const ALERTS = [
  { icon: <Warning size={18} className="text-amber-400"  />, label: '3 Critical Alerts',     className: 'text-amber-400'  },
  { icon: <Warning size={18} className="text-yellow-300" />, label: '5 Warnings',            className: 'text-yellow-300' },
  { icon: <Warning size={18} className="text-red-400"    />, label: 'ROI Anomaly Detected', className: 'text-red-400'    },
]

const QUICK_ACTIONS = [
  { label: 'Run Diagnostic', text: 'Run a VODA diagnostic' },
  { label: 'Check Latency',  text: 'Check inference latency' },
  { label: 'Show Alerts',    text: 'Show last 10 alert events' },
]

const MOCK_JUDGE = {
  images: [{}, { error: 'Stabilization Error Detected' }, {}, {}],
  frameDrift: 3.3,
  exposureMismatch: true,
  report: 'Issue Report Generated',
}
const MOCK_COMPOSER = {
  status: 'Auto-Fixed & Ready',
  lighting: true,
  artifact: true,
  updated: true,
}
const MOCK_DIRECTOR = {
  cameras: [
    { id: 'CAM 01', videoUrl: '/SFSVC_Herosection.mp4', overlayUrl: '/panel-demo-cam01.png' },
    { id: 'CAM 02', videoUrl: '/SFSVC_Herosection.mp4', overlayUrl: '/panel-demo-cam02.png' },
  ],
  action: 'Deploy Camera 5 to Lane B',
}
const MOCK_AUDITOR = {
  logs: [
    { label: 'Audit Trail Summary',    status: 'pending' },
    { label: 'Node Event Log',         status: 'pending' },
    { label: 'Diagnostic Completed',   status: 'done'    },
    { label: 'File Export Secured',    status: 'done'    },
  ],
  exportReady: true,
}

export function NepaAgent() {
  const [messages, setMessages] = useState<NepaAgentMessage[]>([])
  const [input, setInput] = useState('')
  const transcriptRef = useRef<HTMLDivElement>(null)

  const [judge]    = useState(MOCK_JUDGE)
  const [composer] = useState(MOCK_COMPOSER)
  const [director] = useState(MOCK_DIRECTOR)
  const [auditor]  = useState(MOCK_AUDITOR)

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const els = document.querySelectorAll('[data-fade]')
    const io = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('opacity-100', 'translate-y-0')
        })
      },
      { threshold: 0.18 }
    )
    els.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500')
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  async function handleSend(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg) return
    setMessages((p) => [...p, { role: 'user', content: msg, timestamp: new Date().toISOString() }])
    setInput('')
    try {
      const r = await askNepaAgent(messages, msg)
      setMessages((p) => [...p, { role: 'assistant', content: r.content, timestamp: new Date().toISOString() }])
    } catch {
      setMessages((p) => [...p, { role: 'assistant', content: 'Agent unavailable. Please try again.', timestamp: new Date().toISOString() }])
    }
  }

  function handleKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend()
  }

  const transcript = messages.slice(-3)

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white overflow-x-hidden">
      {/* Page-wide ambient grid + radial glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(0,212,255,0.08) 0%, transparent 70%)' }}
      />

      {/* HERO with looping world-model background video */}
      <section className="relative overflow-hidden" data-fade>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ zIndex: 0, opacity: 0.35 }}
        >
          <source src="/videos/world-model-stdp.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(180deg, rgba(11,15,20,0.78) 0%, rgba(11,15,20,0.62) 50%, rgba(11,15,20,0.95) 100%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto py-24 sm:py-32 text-center px-6" style={{ zIndex: 2 }}>
          <span className="font-mono text-xs tracking-[2px] uppercase text-primary inline-flex items-center gap-2 mb-6">
            <Brain size={18} className="text-primary" /> NEPA AGENT · OPERATIONAL AI
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4 text-white">
            Your Operational AI Agent.
          </h1>
          <p className="text-[#cdd3de] text-lg mb-8">
            Intelligent, reliable, autonomous — embedded in your live deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white font-semibold px-7 py-3 rounded-full hover:bg-primary/90">
              Activate Agent
            </button>
            <Link
              to="/dashboard"
              className="border border-white/20 text-white/80 font-semibold px-7 py-3 rounded-full hover:border-primary/40 hover:text-primary"
            >
              View Console →
            </Link>
          </div>
        </div>
      </section>

      {/* Node status / context / alerts cards */}
      <section className="container mx-auto px-6 max-w-6xl my-16" data-fade>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col gap-2">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">NODE STATUS</div>
            {NODE_STATUS.map((n) => (
              <div key={n.name} className="flex items-center justify-between py-1">
                <span className="font-mono text-xs text-white/80">{n.name}</span>
                <span className="font-mono text-xs text-white/55">Latency: {n.latency}</span>
                <span className={`w-2 h-2 rounded-full ml-2 ${n.color}`} />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <MagnifyingGlass size={20} className="text-primary" />
              <div>
                <div className="font-mono text-xs tracking-[2px] uppercase text-primary">Context Analysis</div>
                <div className="text-[#cdd3de] text-sm">Reads live node context</div>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <Gear size={20} className="text-primary" />
              <div>
                <div className="font-mono text-xs tracking-[2px] uppercase text-primary">Diagnostic Scan</div>
                <div className="text-[#cdd3de] text-sm">Find problems instantly</div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">ALERT QUEUE</div>
            {ALERTS.map((a, i) => (
              <div key={i} className={`flex items-center gap-2 py-1 ${a.className}`}>
                {a.icon}
                <span className={a.className}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transcript / chat input strip */}
      <section className="w-full bg-zinc-900/40 border-y border-white/10 py-6 mb-16" data-fade>
        <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-3">
          <div ref={transcriptRef} className="max-h-48 overflow-y-auto mb-2 flex flex-col gap-1">
            {transcript.map((m, i) => (
              <div key={i} className="flex items-start gap-2 font-mono text-xs">
                <span className={`tracking-[2px] uppercase ${m.role === 'user' ? 'text-primary' : 'text-white/55'}`}>
                  {m.role === 'user' ? 'YOU>' : 'AGENT>'}
                </span>
                <span className="whitespace-pre-line">{m.content}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center mr-2">
              <UserCircle size={28} className="text-primary" />
            </span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask NEPA Agent..."
              className="flex-1 bg-transparent font-mono text-xs text-white/80 placeholder:text-white/25 outline-none border-0 focus:ring-0"
            />
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a.label}
                onClick={() => handleSend(a.text)}
                className="font-mono text-xs tracking-[2px] uppercase border border-white/15 rounded-full px-3 py-1 text-primary hover:border-primary/30 transition-colors"
              >
                {a.label}
              </button>
            ))}
            <button
              onClick={() => handleSend()}
              className="ml-2 bg-primary text-white rounded-full p-2 hover:bg-primary/90 transition-colors flex items-center justify-center"
              aria-label="Send"
            >
              <PaperPlaneRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Judge / Composer / Director / Auditor panels */}
      <section className="container mx-auto px-6 max-w-6xl mb-20" data-fade>
        <div className="grid md:grid-cols-2 gap-6">

          {/* JUDGE */}
          <div className="bg-zinc-900/40 border-white/10 border rounded-xl p-6 flex flex-col min-h-[320px]">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-3 flex items-center gap-2">
              <MagnifyingGlass size={16} className="text-primary" />JUDGE
              <span className="ml-2 text-white/40 font-normal">Real-Time Analysis</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {judge.images.map((img, idx) => {
                const hasError = (img as { error?: string }).error
                return (
                  <div
                    key={idx}
                    className={`aspect-video bg-gradient-to-br from-zinc-800 to-zinc-950 rounded relative flex items-center justify-center ${hasError ? 'border-2 border-red-500' : ''}`}
                  >
                    {hasError ? (
                      <span className="text-red-400 font-mono text-xs px-2 py-1 bg-zinc-950/80 rounded border border-red-400 flex items-center gap-1">
                        <Warning size={14} />{hasError}
                      </span>
                    ) : (
                      <span className="text-white/20 font-mono text-xs">IMG</span>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="text-xs text-white/80 font-mono mb-1">▸ Frame Drift: {judge.frameDrift}px</div>
            <div className="text-xs text-white/80 font-mono mb-1">
              ▸ {judge.exposureMismatch ? 'Exposure Mismatch' : 'Exposure OK'}
            </div>
            <div className="text-xs text-white/55 font-mono mt-2">{judge.report}</div>
          </div>

          {/* COMPOSER */}
          <div className="bg-zinc-900/40 border-white/10 border rounded-xl p-6 flex flex-col min-h-[320px]">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-3 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />COMPOSER
              <span className="ml-2 text-white/40 font-normal">Scene Adjustments</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-950 rounded mb-4 flex items-center justify-center">
              <span className="text-white/20 font-mono text-xs">IMG</span>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-green-400" />
                <span className="text-green-400 text-xs">{composer.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-green-400" />
                <span className="text-white/80 text-xs">
                  {composer.lighting ? 'Lighting Balanced' : 'Lighting Issue'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-green-400" />
                <span className="text-white/80 text-xs">
                  {composer.artifact ? 'Artifact Removed' : 'Artifact Present'}
                </span>
              </div>
            </div>
            <div className="text-xs text-white/55 font-mono mt-2">
              {composer.updated ? 'Scene Updated Successfully' : 'Update Pending'}
            </div>
          </div>

        <div className="bg-zinc-900/40 border-white/10 border rounded-xl p-6 flex flex-col min-h-[320px]">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-3 flex items-center gap-2">
              <Camera size={16} className="text-primary" />DIRECTOR
              <span className="ml-2 text-white/40 font-normal">Scene Control</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-950 rounded mb-4 flex items-center justify-center">
              <span className="text-white/20 font-mono text-xs">IMG</span>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-green-400" />
                <span className="text-white/80 text-xs">
                  {director.cameras.map((cam) => (
                    <>
                      <span key={cam.id}>{cam.id}</span>
                      <span> </span>
                    </>
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-green-400" />
                <span className="text-white/80 text-xs">{director.action}</span>
              </div>
            </div>
            <div className="text-xs text-white/55 font-mono mt-2">
              {director.action ? 'Action Executed' : 'Pending Action'}
            </div>
          </div>

          {/* AUDITOR */}
          <div className="bg-zinc-900/40 border-white/10 border rounded-xl p-6 flex flex-col min-h-[320px]">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-3 flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />AUDITOR
              <span className="ml-2 text-white/40 font-normal">System Integrity</span>
            </div>
            <div className="flex flex-col gap-2">
              {auditor.logs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={12} className={log.status === 'done' ? 'text-green-400' : 'text-yellow-400'} />
                  <span className="text-white/80 text-xs">{log.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <CheckCircle size={12} className="text-green-400" />
              <span className="text-white/80 text-xs">
                {auditor.exportReady ? 'Export Ready' : 'Export Pending'}
              </span>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
