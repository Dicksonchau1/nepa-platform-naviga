import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HudPanel } from '@/components/HudPanel'
import { LiveBadge } from '@/components/LiveBadge'
import { TerminalLine } from '@/components/TerminalLine'
import { CountUp } from '@/components/CountUp'
import { SensorSweep } from '@/components/SensorSweep'

interface VODAPageProps {
  onNavigate: (page: string) => void
}

const FEED_CYCLES = [
  { id: 'OBJ_01', label: 'PERSON',          status: 'TRACKED',   x: '18%', y: '28%' },
  { id: 'OBJ_02', label: 'ANOMALY',         status: 'NONE',      x: '54%', y: '42%' },
  { id: 'OBJ_03', label: 'SHELF_ZONE',      status: 'MONITORED', x: '72%', y: '60%' },
  { id: 'OBJ_04', label: 'OCCUPANCY',       status: '4',         x: '36%', y: '70%' },
  { id: 'OBJ_05', label: 'DWELL_TIME',      status: '00:34s',    x: '82%', y: '22%' },
]

const ALERT_CYCLE = [
  'MOTION_EVENT: AISLE_3 — CONFIRMED',
  'SHOPFRONT_CLEAR: TRUE',
  'CROWD_DENSITY: LOW',
  'LOITERING_ALERT: NONE',
  'CAMERA_HEALTH: ALL_NOMINAL',
  'INFERENCE_FPS: 28.4',
]

const SPEC_LINES = [
  { label: 'AGENT_ID',       value: 'VODA-v2.3' },
  { label: 'DOMAIN',         value: 'VIDEO OPERATIONS & DETECTION' },
  { label: 'INFERENCE_RT',   value: '<36ms @ Jetson Nano' },
  { label: 'MODEL_BACKEND',  value: 'YOLOv8 + ONNX + TensorRT' },
  { label: 'CAMERA_INPUTS',  value: 'UP TO 16 CONCURRENT STREAMS' },
  { label: 'AUDIT_CHAIN',    value: 'SHA-256 HASH-LINKED' },
  { label: 'DEPLOYMENT',     value: 'EDGE-ONLY — NO CLOUD EGRESS' },
  { label: 'STATUS',         value: 'OPERATIONAL' },
]

const CAPABILITIES = [
  {
    code: '01',
    title: 'Real-time object detection',
    desc: 'YOLOv8-powered multi-class detection running at up to 30 FPS on edge hardware. Detects people, objects, anomalies, and events without cloud round-trips.',
  },
  {
    code: '02',
    title: 'Multi-camera stream management',
    desc: 'VODA handles up to 16 concurrent camera streams with per-channel inference, independent frame buffers, and unified event aggregation.',
  },
  {
    code: '03',
    title: 'Behavioural pattern recognition',
    desc: 'Tracks dwell time, crowd density, loitering, and movement trajectories. Alerts are generated on-device and pushed to the NEPA audit ledger.',
  },
  {
    code: '04',
    title: 'Anomaly classification',
    desc: 'A fine-tuned classification head identifies operational anomalies — unauthorised access, shelf tampering, equipment failure — with configurable sensitivity thresholds.',
  },
  {
    code: '05',
    title: 'Cryptographic event logging',
    desc: 'Every inference event is hash-chained into an immutable audit record. Operators have a tamper-evident log of every detection VODA made, timestamped to millisecond precision.',
  },
  {
    code: '06',
    title: 'Edge-only privacy architecture',
    desc: 'No video frames leave the edge node. All inference, classification, and alerting happens on-device. PDPO and GDPR compliant by default.',
  },
]

const USE_CASES = [
  {
    env: 'Unmanned retail',
    desc: 'Monitor shopfronts, aisles, and self-checkout zones 24/7 with no staff required. Detect shoplifting attempts, occupancy limits, and equipment faults in real time.',
  },
  {
    env: 'Facility security',
    desc: 'Multi-camera coverage of lobbies, corridors, and perimeters. Behavioural alerts trigger within one inference cycle — no human review required for routine events.',
  },
  {
    env: 'Logistics & warehousing',
    desc: 'Track pallet movement, worker safety compliance, and zone access across large floor plans. VODA correlates events across cameras to build a unified operational picture.',
  },
]

export function VODAPage({ onNavigate }: VODAPageProps) {
  const [alertIndex, setAlertIndex] = useState(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const alertTimer = setInterval(() => {
      setAlertIndex((i) => (i + 1) % ALERT_CYCLE.length)
    }, 2800)
    const tickTimer = setInterval(() => setTick((t) => t + 1), 1000)
    return () => { clearInterval(alertTimer); clearInterval(tickTimer) }
  }, [])

  const uptime = `${String(Math.floor(tick / 3600)).padStart(2,'0')}:${String(Math.floor((tick % 3600) / 60)).padStart(2,'0')}:${String(tick % 60).padStart(2,'0')}`

  return (
    <main className="min-h-screen bg-[#050508] text-foreground overflow-x-hidden">

      <section className="relative min-h-screen flex flex-col justify-center grid-bg scanlines overflow-hidden pt-24">

        <SensorSweep />

        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="font-mono font-black text-[20vw] text-cyan-500/[0.04] tracking-widest">
            VODA
          </span>
        </div>

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 38% 50%, rgba(0,102,255,0.10) 0%, transparent 70%)',
          }}
        />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">

          <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-cyan-400/50 mb-12">
            <LiveBadge />
            <span>VODA AGENT // ACTIVE</span>
            <span className="text-cyan-500/30">|</span>
            <span>NODE: HK-KOWLOON-01</span>
            <span className="text-cyan-500/30">|</span>
            <span>SESSION: {uptime}</span>
          </div>

          <div className="mb-8">
            <p className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/50 uppercase mb-4">
              AuraSense NEPA — Video Agent
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-2 text-reveal"
                style={{ animationDelay: '0.2s' }}>
              VIDEO
            </h1>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-2 text-reveal"
                style={{ animationDelay: '0.5s' }}>
              OPERATIONS
            </h1>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-cyan-400 text-reveal"
                style={{ animationDelay: '0.8s' }}>
              & DETECTION
            </h1>
          </div>

          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed mb-10">
            VODA is the real-time video intelligence agent of the NEPA platform.
            It processes up to 16 concurrent camera streams on-device, classifying
            objects, behaviours, and anomalies in under 36 milliseconds — with
            every event logged to a tamper-evident audit chain.
          </p>

          <div className="flex items-center gap-4 mb-16">
            <Link
              to="/dashboard"
              className="glow-pulse font-mono text-[11px] tracking-[0.2em] uppercase border border-cyan-500/50 text-cyan-400 px-6 py-3 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
            >
              Launch console
            </Link>
            <Link
              to="/about/contact"
              className="font-mono text-[11px] tracking-[0.2em] uppercase border border-border/30 text-muted-foreground px-6 py-3 hover:border-cyan-500/30 hover:text-cyan-300/70 transition-all"
            >
              Request pilot access
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-cyan-300/60 border-t border-cyan-500/10 pt-6">
            <div>
              INFERENCE LATENCY&nbsp;
              <span className="text-cyan-300">
                &lt;<CountUp target={36} suffix="ms" />
              </span>
            </div>
            <span className="text-cyan-500/20">|</span>
            <div>
              CAMERA STREAMS&nbsp;
              <span className="text-cyan-300">
                <CountUp target={16} />
              </span>
            </div>
            <span className="text-cyan-500/20">|</span>
            <div>
              EVENTS LOGGED TODAY&nbsp;
              <span className="text-cyan-300">
                <CountUp target={5214} />
              </span>
            </div>
            <span className="text-cyan-500/20">|</span>
            <div>
              UPTIME&nbsp;
              <span className="text-cyan-300">99.97%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <LiveBadge />
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cyan-400/60">
            Live inference feed — Camera array HK-01
          </span>
        </div>

        <HudPanel className="relative w-full aspect-video bg-[#080B12] overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />

          {FEED_CYCLES.map((obj) => (
            <div
              key={obj.id}
              className="absolute"
              style={{ left: obj.x, top: obj.y }}
            >
              <div className="border border-cyan-400/60 px-2 py-1 min-w-[90px]">
                <p className="font-mono text-[9px] text-cyan-400/80 tracking-widest">
                  {obj.label}
                </p>
                <p className="font-mono text-[9px] text-cyan-300 tracking-widest">
                  {obj.status}
                </p>
              </div>
            </div>
          ))}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-1/2 w-px h-4 bg-cyan-400/30 -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-px h-4 bg-cyan-400/30 -translate-x-1/2" />
              <div className="absolute left-0 top-1/2 w-4 h-px bg-cyan-400/30 -translate-y-1/2" />
              <div className="absolute right-0 top-1/2 w-4 h-px bg-cyan-400/30 -translate-y-1/2" />
              <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-cyan-400/60 glow-pulse" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t border-cyan-500/20 bg-[#050508]/80 px-4 py-2">
            <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/70 flicker">
              ▶ {ALERT_CYCLE[alertIndex]}
            </p>
          </div>

          <div className="absolute top-3 left-3 font-mono text-[9px] text-cyan-400/40 tracking-widest">
            CAM_ARRAY // HK-01
          </div>
          <div className="absolute top-3 right-3 font-mono text-[9px] text-cyan-400/40 tracking-widest">
            REC ● LIVE
          </div>
        </HudPanel>
      </section>

      <section className="py-24 bg-[#080B12] border-y border-cyan-500/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyan-400/50 mb-10">
            System specification
          </p>
          <HudPanel className="bg-[#050508] p-8">
            <div className="space-y-2">
              {SPEC_LINES.map((line, i) => (
                <TerminalLine key={line.label} label={line.label} value={line.value} delay={i * 120} />
              ))}
            </div>
          </HudPanel>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyan-400/50 mb-12">
          Core capabilities
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap) => (
            <HudPanel key={cap.code} className="bg-[#080B12] p-6">
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded shrink-0">
                  {cap.code}
                </span>
                <div>
                  <h3 className="text-sm font-semibold mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                </div>
              </div>
            </HudPanel>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#080B12] border-y border-cyan-500/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyan-400/50 mb-12">
            Deployment scenarios
          </p>
          <div className="space-y-6">
            {USE_CASES.map((useCase) => (
              <HudPanel key={useCase.env} className="bg-[#050508] p-6">
                <h3 className="text-sm font-semibold text-cyan-300 mb-2">{useCase.env}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{useCase.desc}</p>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to deploy VODA?
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
          Start with a pilot deployment and see how NEPA VODA transforms multi-camera 
          surveillance into actionable intelligence — on-device, in real time.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="glow-pulse font-mono text-[11px] tracking-[0.2em] uppercase border border-cyan-500/50 text-cyan-400 px-6 py-3 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
          >
            Launch console
          </Link>
          <Link
            to="/about/contact"
            className="font-mono text-[11px] tracking-[0.2em] uppercase border border-border/30 text-muted-foreground px-6 py-3 hover:border-cyan-500/30 hover:text-cyan-300/70 transition-all"
          >
            Request pilot access
          </Link>
        </div>
      </section>
    </main>
  )
}
