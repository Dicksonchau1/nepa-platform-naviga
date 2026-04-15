import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HudPanel } from '@/components/HudPanel'
import { LiveBadge } from '@/components/LiveBadge'

interface VODAPageProps {
  onNavigate: (page: string) => void
}

const FEED_LABELS = [
  { id: 'A', label: 'PERSON',     status: 'TRACKED',   x: '15%', y: '25%' },
  { id: 'B', label: 'SHELF_ZONE', status: 'MONITORED', x: '58%', y: '38%' },
  { id: 'C', label: 'OCCUPANCY',  status: '3',         x: '72%', y: '62%' },
  { id: 'D', label: 'ANOMALY',    status: 'NONE',      x: '32%', y: '68%' },
  { id: 'E', label: 'DWELL',      status: '00:47s',    x: '80%', y: '20%' },
]

const TICKER = [
  'MOTION_EVENT: AISLE_2 — CLEAR',
  'SHOPFRONT: NOMINAL',
  'CROWD_DENSITY: LOW',
  'LOITERING_ALERT: NONE',
  'CAMERA_HEALTH: ALL_NOMINAL',
  'INFERENCE_FPS: 27.8',
  'AUDIT_WRITE: OK — HASH CONFIRMED',
]

const SPEC = [
  { k: 'AGENT_ID',      v: 'VODA-v2.3' },
  { k: 'DOMAIN',        v: 'Video operations & real-time detection' },
  { k: 'INFERENCE_RT',  v: '< 36ms on Jetson Nano' },
  { k: 'MODEL_BACKEND', v: 'YOLOv8 + ONNX + TensorRT' },
  { k: 'CAMERA_INPUTS', v: 'Up to 16 concurrent streams' },
  { k: 'AUDIT_CHAIN',   v: 'SHA-256 hash-linked event log' },
  { k: 'DEPLOYMENT',    v: 'Edge-only — no cloud egress' },
  { k: 'COMPLIANCE',    v: 'PDPO · GDPR by default' },
  { k: 'STATUS',        v: 'Operational' },
]

const CAPABILITIES = [
  {
    n: '01',
    title: 'Real-time object detection',
    desc: 'YOLOv8-powered multi-class detection at up to 30 FPS on edge hardware. People, objects, zones, and events — classified on-device without any cloud round-trip.',
  },
  {
    n: '02',
    title: 'Multi-camera stream management',
    desc: 'VODA handles up to 16 concurrent camera feeds with independent per-channel inference, frame buffering, and a unified event stream for the dashboard.',
  },
  {
    n: '03',
    title: 'Behavioural pattern recognition',
    desc: 'Dwell time tracking, crowd density estimation, loitering detection, and movement trajectory analysis. All alerts are generated on-device and written to the audit ledger.',
  },
  {
    n: '04',
    title: 'Anomaly classification',
    desc: 'A fine-tuned classification head flags operational anomalies — unauthorised zone access, shelf tampering, equipment failure — with configurable sensitivity per camera.',
  },
  {
    n: '05',
    title: 'Cryptographic audit logging',
    desc: 'Every detection event is SHA-256 hash-chained into an immutable audit record, timestamped to millisecond precision. Tamper-evident compliance out of the box.',
  },
  {
    n: '06',
    title: 'Edge-only privacy architecture',
    desc: 'No video frame ever leaves the edge node. Inference, classification, alerting, and logging all happen on-device. PDPO and GDPR compliant without additional configuration.',
  },
]

const USE_CASES = [
  {
    env: 'Unmanned retail',
    desc: 'Monitor shopfronts, aisles, and self-checkout zones around the clock with no staff required. VODA detects theft attempts, occupancy breaches, and equipment faults in real time.',
  },
  {
    env: 'Facility security',
    desc: 'Multi-camera coverage of lobbies, corridors, and perimeters. Behavioural alerts trigger within one inference cycle — under 36ms from event to audit log entry.',
  },
  {
    env: 'Logistics & warehousing',
    desc: 'Track pallet movement, worker safety compliance, and zone access across large floor plans. VODA correlates events across cameras into a unified operational picture.',
  },
]

export function VODAPage({ onNavigate }: VODAPageProps) {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [visible, setVisible]         = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setInterval(() => setTickerIndex((i) => (i + 1) % TICKER.length), 2600)
    return () => { clearTimeout(t1); clearInterval(t2) }
  }, [])

  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden">

      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24">

        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
          }}
        />

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 65% 60% at 35% 50%, rgba(0,102,255,0.09) 0%, transparent 70%)' }}
        />

        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.012) 2px, rgba(0,212,255,0.012) 4px)',
          }}
        />

        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        >
          <span
            className="font-mono font-black text-[22vw] text-cyan-500/[0.03] tracking-widest"
          >
            VODA
          </span>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="max-w-3xl">

            <div className="flex items-center gap-3 mb-10">
              <LiveBadge />
              <span className="text-xs text-white/35 tracking-[0.2em] font-mono uppercase">
                VODA Agent — Operational
              </span>
              <span className="text-white/15 font-mono text-xs">|</span>
              <span className="text-xs text-white/25 font-mono">
                NEPA Platform · AuraSense
              </span>
            </div>

            <div
              className="mb-8 transition-all duration-1000 ease-out"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
              }}
            >
              <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-5">
                AuraSense NEPA — Video Agent
              </p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] mb-3">
                Cinematic Reconstruction
              </h1>
              <h1
                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-cyan-400"
                style={{
                  transition: 'opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s',
                  opacity:   visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                & Correction
              </h1>
            </div>

            <p
              className="text-base text-white/45 max-w-xl leading-relaxed mb-10"
              style={{
                transition: 'opacity 1s ease-out 0.7s',
                opacity: visible ? 1 : 0,
              }}
            >
              VODA is a video agent that reconstructs and corrects cinematic clips on top of NEPA
              using a model&#8209;agnostic control surface, coordinated by a horizontal ensemble of
              LLMs. Instead of re&#8209;running heavy generative models over every frame, NEPA lifts
              each clip into a structured scene representation and VODA applies localised,
              deterministic diffs there — stabilising specific motion, harmonising lighting, or
              fixing background issues without disturbing the rest of the shot. This lets you cache
              the representation once and run many small, cheap control updates in parallel, cutting
              FLOPs and memory traffic, improving temporal consistency, and keeping per&#8209;edit
              latency low enough for real&#8209;time, edge&#8209;constrained deployments.
            </p>

            <div
              className="flex flex-wrap items-center gap-4 mb-14"
              style={{
                transition: 'opacity 1s ease-out 0.9s',
                opacity: visible ? 1 : 0,
              }}
            >
              <Link
                to="/auth/sign-up?plan=trial"
                className="bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors"
              >
                Start free trial
              </Link>
              <Link
                to="/about/contact"
                className="border border-white/20 text-white/70 text-sm px-7 py-3 hover:border-white/40 hover:text-white transition-colors"
              >
                Request pilot access
              </Link>
              <Link
                to="/dashboard"
                className="text-sm text-cyan-400/70 hover:text-cyan-400 transition-colors underline underline-offset-4"
              >
                Launch console →
              </Link>
            </div>

            <div
              className="flex flex-wrap gap-10 border-t border-white/8 pt-8"
              style={{
                transition: 'opacity 1s ease-out 1.1s',
                opacity: visible ? 1 : 0,
              }}
            >
              {[
                { label: 'Inference latency', value: '< 36ms',  note: 'on Jetson Nano' },
                { label: 'Camera streams',    value: 'Up to 16', note: 'concurrent' },
                { label: 'Audit log',         value: 'SHA-256',  note: 'hash-chained' },
                { label: 'Cloud dependency',  value: 'Zero',     note: 'edge-only' },
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

      <section className="py-20 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-6xl">

          <div className="flex items-center gap-3 mb-6">
            <LiveBadge />
            <span className="text-xs text-white/35 tracking-[0.2em] font-mono uppercase">
              Live inference feed — Camera array HK-01
            </span>
          </div>

          <HudPanel className="relative w-full aspect-video bg-[#080B12] overflow-hidden">

            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            {FEED_LABELS.map((obj) => (
              <div
                key={obj.id}
                className="absolute"
                style={{ left: obj.x, top: obj.y }}
              >
                <div className="border border-cyan-400/50 px-2 py-1 min-w-[88px] bg-[#050508]/60">
                  <p className="font-mono text-[9px] text-cyan-400/70 tracking-widest leading-tight">
                    {obj.label}
                  </p>
                  <p className="font-mono text-[9px] text-cyan-300 tracking-widest leading-tight">
                    {obj.status}
                  </p>
                </div>
              </div>
            ))}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-10 h-10">
                <div className="absolute top-0 left-1/2 w-px h-3 bg-cyan-400/25 -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-px h-3 bg-cyan-400/25 -translate-x-1/2" />
                <div className="absolute left-0 top-1/2 w-3 h-px bg-cyan-400/25 -translate-y-1/2" />
                <div className="absolute right-0 top-1/2 w-3 h-px bg-cyan-400/25 -translate-y-1/2" />
                <div
                  className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-cyan-400/50"
                  style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
                />
              </div>
            </div>

            <div className="absolute top-3 left-4 font-mono text-[9px] text-cyan-400/35 tracking-widest">
              CAM_ARRAY // HK-01
            </div>
            <div className="absolute top-3 right-4 font-mono text-[9px] text-cyan-400/35 tracking-widest flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block"
                style={{ animation: 'flicker 4s infinite' }}
              />
              REC · LIVE
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t border-cyan-500/15 bg-[#050508]/80 px-4 py-2.5">
              <p className="font-mono text-[10px] tracking-[0.18em] text-cyan-400/60">
                ▶ {TICKER[tickerIndex]}
              </p>
            </div>
          </HudPanel>

          <p className="text-xs text-white/20 mt-3 font-mono">
            Simulated feed for demonstration. Live deployment requires Jetson Nano or Intel NUC on-site.
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-white/8 bg-[#080B12]">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-10">
            System specification
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <HudPanel className="bg-[#050508] p-8">
              <div className="space-y-4">
                {SPEC.map((s) => (
                  <div
                    key={s.k}
                    className="flex items-start gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-[10px] text-white/25 w-32 shrink-0 pt-0.5 tracking-wider uppercase">
                      {s.k}
                    </span>
                    <span className="text-sm text-white/75">{s.v}</span>
                  </div>
                ))}
              </div>
            </HudPanel>

            <div className="flex flex-col gap-4">
              <HudPanel className="bg-[#050508] p-6 flex-1">
                <p className="text-xs text-cyan-400/50 tracking-widest font-mono uppercase mb-4">
                  What VODA is not
                </p>
                <div className="space-y-3">
                  {[
                    'A cloud-dependent surveillance SaaS',
                    'A proprietary hardware system',
                    'A black-box with no audit trail',
                    'A system that sends your video to a remote server',
                    'A one-size-fits-all CCTV recorder',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm">
                      <span className="text-red-400/60 mt-0.5 shrink-0">✕</span>
                      <span className="text-white/40">{item}</span>
                    </div>
                  ))}
                </div>
              </HudPanel>

              <HudPanel className="bg-[#050508] p-6">
                <p className="text-xs text-cyan-400/50 tracking-widest font-mono uppercase mb-4">
                  Compatible hardware
                </p>
                <div className="space-y-2">
                  {[
                    { hw: 'NVIDIA Jetson Nano',  note: 'Recommended — primary target' },
                    { hw: 'Intel NUC',           note: 'Supported — x86 edge deployment' },
                    { hw: 'Jetson Xavier NX',    note: 'Supported — higher throughput' },
                    { hw: 'Generic x86 Linux',   note: 'Compatible — no TensorRT optimisation' },
                  ].map((h) => (
                    <div key={h.hw} className="flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <span className="text-white/70 font-mono text-xs">{h.hw}</span>
                      <span className="text-white/30 text-xs">{h.note}</span>
                    </div>
                  ))}
                </div>
              </HudPanel>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-3">
            Core capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-14">
            What VODA can do
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <section className="py-24 border-t border-white/8 bg-[#080B12]">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-3">
            Deployment scenarios
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-14">
            Where VODA is deployed
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {USE_CASES.map((u) => (
              <HudPanel key={u.env} className="bg-[#050508] p-6">
                <h3 className="text-sm font-semibold text-cyan-300 mb-3">{u.env}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{u.desc}</p>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to deploy VODA?
          </h2>
          <p className="text-white/50 leading-relaxed mb-10 max-w-2xl mx-auto">
            Start with a pilot deployment and see how NEPA VODA transforms multi-camera 
            operations into actionable intelligence — on-device, in real time, with full audit visibility.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/auth/sign-up?plan=trial"
              className="bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors"
            >
              Start free trial
            </Link>
            <Link
              to="/about/contact"
              className="border border-white/20 text-white/70 text-sm px-7 py-3 hover:border-white/40 hover:text-white transition-colors"
            >
              Request pilot access
            </Link>
            <Link
              to="/dashboard"
              className="text-sm text-cyan-400/70 hover:text-cyan-400 transition-colors underline underline-offset-4"
            >
              Launch console →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
