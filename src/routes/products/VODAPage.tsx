import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HudPanel } from '@/components/HudPanel'
import { LiveBadge } from '@/components/LiveBadge'

const TICKER = [
  'MOTION_EVENT: AISLE_2 — CLEAR',
  'SHOPFRONT: NOMINAL',
  'CROWD_DENSITY: LOW',
  'LOITERING_ALERT: NONE',
  'CAMERA_HEALTH: ALL_NOMINAL',
  'INFERENCE_FPS: 27.8',
  'AUDIT_WRITE: OK — HASH CONFIRMED',
]

const FEED_LABELS = [
  { id: 'A', label: 'PERSON',     status: 'TRACKED',   x: '14%', y: '22%' },
  { id: 'B', label: 'SHELF_ZONE', status: 'MONITORED', x: '55%', y: '35%' },
  { id: 'C', label: 'OCCUPANCY',  status: '3',         x: '70%', y: '58%' },
  { id: 'D', label: 'ANOMALY',    status: 'NONE',      x: '30%', y: '65%' },
  { id: 'E', label: 'DWELL',      status: '00:47s',    x: '78%', y: '18%' },
]

const SPEC = [
  { k: 'AGENT_ID',      v: 'VODA-v2.3' },
  { k: 'DOMAIN',        v: 'Video operations & real-time detection' },
  { k: 'INFERENCE_RT',  v: '< 42ms average' },
  { k: 'MODEL_BACKEND', v: 'YOLOv8 + vision transformers' },
  { k: 'VIDEO_INPUTS', v: 'Files, streams, URLs, live feeds' },
  { k: 'AUDIT_CHAIN',   v: 'SHA-256 hash-linked event log' },
  { k: 'DEPLOYMENT',    v: 'Cloud, edge, or hybrid' },
  { k: 'COMPLIANCE',    v: 'PDPO · GDPR by default' },
  { k: 'STATUS',        v: 'Operational' },
]

const CAPABILITIES = [
  {
    n: '01',
    title: 'Real-time object detection',
    desc: 'YOLOv8-powered multi-class detection across video files, streams, and live feeds. People, objects, zones, and events classified with high accuracy.',
  },
  {
    n: '02',
    title: 'Multi-source video processing',
    desc: 'VODA handles video files, URLs, live camera streams, and RTSP feeds with independent per-source inference and unified event tracking.',
  },
  {
    n: '03',
    title: 'Behavioural pattern recognition',
    desc: 'Dwell time tracking, crowd density estimation, loitering detection, and movement trajectory analysis with configurable alert thresholds.',
  },
  {
    n: '04',
    title: 'Anomaly classification',
    desc: 'Fine-tuned classification for operational anomalies — zone breaches, tampering events, equipment failures — with adjustable sensitivity.',
  },
  {
    n: '05',
    title: 'Cryptographic audit logging',
    desc: 'Every detection event is SHA-256 hash-chained into an immutable audit record, timestamped to millisecond precision for compliance.',
  },
  {
    n: '06',
    title: 'Flexible deployment architecture',
    desc: 'Deploy on edge hardware for zero-cloud privacy, in cloud for scale, or hybrid for balanced performance. PDPO and GDPR compliant across all modes.',
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

const PLANS = [
  {
    name:      'Starter',
    price:     'HK$15,000',
    period:    'one-time setup',
    highlight: false,
    tag:       '30-day trial programme',
    features: [
      'Initial setup and configuration',
      'VODA agent deployment (up to 8 video sources)',
      'NEPA console — full access',
      'Full audit ledger (30-day retention)',
      'Dedicated AuraSense engineer for setup',
      'Team support throughout trial period',
      'Joint review session at trial close',
    ],
    cta: 'Start trial',
    to:  '/about/contact',
  },
  {
    name:      'Monthly Support',
    price:     'HK$9,000',
    period:    'per month',
    highlight: true,
    tag:       'Included from day one',
    features: [
      'Full AuraSense team support',
      'Remote monitoring & incident response',
      'Model updates and inference tuning',
      'Alert threshold reconfiguration',
      'Console and dashboard updates',
      'Monthly operational review report',
      'Priority support — response within 4 hours',
      'Ongoing audit ledger access & export',
    ],
    cta: 'Talk to us',
    to:  '/about/contact',
  },
  {
    name:      'Production',
    price:     'Custom',
    period:    'per deployment',
    highlight: false,
    tag:       'Multi-site commercial rollout',
    features: [
      'Unlimited video sources',
      'Multi-site deployment',
      'Custom model fine-tuning',
      'Unlimited audit log retention',
      'API + webhook integrations',
      'SLA-backed uptime guarantee',
      'Dedicated account manager',
    ],
    cta: 'Talk to us',
    to:  '/about/contact',
  },
]

const TRIAL_STEPS = [
  {
    n:     '01',
    title: 'Contact us to arrange the trial',
    desc:  'Submit your requirements — video sources, use case, and what you want to detect. We respond within 2 business days.',
  },
  {
    n:     '02',
    title: 'Configuration & setup',
    desc:  'Our team configures VODA for your specific deployment model (edge, cloud, or hybrid) and prepares your configuration.',
  },
  {
    n:     '03',
    title: 'Deployment & integration',
    desc:  'AuraSense engineers deploy VODA, configure video sources, zones, and alert thresholds for your environment.',
  },
  {
    n:     '04',
    title: 'Live inference from day one',
    desc:  'VODA begins classifying objects, behaviours, and anomalies immediately. All detections appear live in the NEPA console and audit ledger.',
  },
  {
    n:     '05',
    title: 'Joint review and scale decision',
    desc:  'At trial close we review results together. If VODA delivers value, we discuss a production rollout scoped to your needs.',
  },
]

export function VODAPage() {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [visible,     setVisible]     = useState(false)
  const [time,        setTime]        = useState(
    new Date().toLocaleTimeString('en-HK', { hour12: false })
  )

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setInterval(() =>
      setTickerIndex((i) => (i + 1) % TICKER.length), 2600)
    const t3 = setInterval(() =>
      setTime(new Date().toLocaleTimeString('en-HK', { hour12: false })), 1000)
    return () => { clearTimeout(t1); clearInterval(t2); clearInterval(t3) }
  }, [])

  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden">

      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">

        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }} />

        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 65% 60% at 35% 50%, rgba(0,102,255,0.09) 0%, transparent 70%)',
        }} />

        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.012) 2px, rgba(0,212,255,0.012) 4px)',
        }} />

        <div aria-hidden className="absolute right-[-2vw] top-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-mono font-black text-[22vw] text-cyan-500/[0.03] tracking-widest select-none">
            VODA
          </span>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="max-w-3xl">

            <div
              className="flex items-center gap-3 mb-10"
              style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}
            >
              <LiveBadge />
              <span className="text-xs text-white/30 tracking-[0.2em] font-mono uppercase">
                VODA Agent — Operational
              </span>
              <span className="text-white/10 font-mono text-xs">|</span>
              <span className="text-xs text-white/20 font-mono">
                NEPA Platform · AuraSense
              </span>
              <span className="text-white/10 font-mono text-xs">|</span>
              <span className="text-xs text-white/20 font-mono">{time}</span>
            </div>

            <p
              className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-5"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition:'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              AuraSense NEPA — Video Agent
            </p>

            <div className="mb-6">
              <h1
                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] mb-2"
                style={{
                  opacity:   visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition:'opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s',
                }}
              >
                Video Operations
              </h1>
              <h1
                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-cyan-400"
                style={{
                  opacity:   visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition:'opacity 0.9s ease 0.4s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s',
                }}
              >
                & Detection
              </h1>
            </div>

            <p
              className="text-base text-white/45 max-w-xl leading-relaxed mb-10"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition:'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
              }}
            >
              VODA is the video intelligence agent of the NEPA platform. It
              processes video files, live streams, and camera feeds to classify
              objects, behaviours, and anomalies in real time — with every
              event cryptographically logged to a tamper-evident audit chain.
            </p>

            <div
              className="flex flex-wrap items-center gap-4 mb-14"
              style={{
                opacity:   visible ? 1 : 0,
                transition:'opacity 0.8s ease 0.8s',
              }}
            >
              <Link
                to="/about/contact"
                className="bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors"
              >
                Apply for pilot
              </Link>
              <Link
                to="/about/contact"
                className="border border-white/20 text-white/65 text-sm px-7 py-3 hover:border-white/35 hover:text-white transition-colors"
              >
                Request more info
              </Link>
              <Link
                to="/dashboard"
                className="text-sm text-cyan-400/60 hover:text-cyan-400 transition-colors underline underline-offset-4"
              >
                Launch console →
              </Link>
            </div>

            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/8 pt-8"
              style={{
                opacity:   visible ? 1 : 0,
                transition:'opacity 0.8s ease 1s',
              }}
            >
              {[
                { label: 'Inference latency', value: '< 42ms',   note: 'average' },
                { label: 'Video sources',     value: 'Files, streams, URLs', note: 'all formats' },
                { label: 'Audit log',         value: 'SHA-256',  note: 'hash-chained' },
                { label: 'Deployment',        value: 'Flexible', note: 'cloud, edge, hybrid' },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-white/25 text-xs mb-1">{m.label}</p>
                  <p className="text-white font-bold text-xl font-mono">{m.value}</p>
                  <p className="text-white/20 text-[11px] mt-0.5">{m.note}</p>
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
            <span className="text-xs text-white/30 tracking-[0.2em] font-mono uppercase">
              Live inference feed — Camera array HK-01
            </span>
          </div>

          <HudPanel className="relative w-full aspect-video bg-[#080B12] overflow-hidden">

            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `
                linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              opacity: 0.3,
            }} />

            {FEED_LABELS.map((obj) => (
              <div
                key={obj.id}
                className="absolute"
                style={{ left: obj.x, top: obj.y }}
              >
                <div className="border border-cyan-400/50 px-2 py-1 min-w-[88px] bg-[#050508]/50">
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
                <div className="absolute top-0 left-1/2 w-px h-3 bg-cyan-400/20 -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-px h-3 bg-cyan-400/20 -translate-x-1/2" />
                <div className="absolute left-0 top-1/2 w-3 h-px bg-cyan-400/20 -translate-y-1/2" />
                <div className="absolute right-0 top-1/2 w-3 h-px bg-cyan-400/20 -translate-y-1/2" />
                <div
                  className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-cyan-400/40"
                  style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
                />
              </div>
            </div>

            <div className="absolute top-3 left-4 font-mono text-[9px] text-cyan-400/30 tracking-widest">
              CAM_ARRAY // HK-01
            </div>
            <div className="absolute top-3 right-4 font-mono text-[9px] text-cyan-400/30 tracking-widest flex items-center gap-1.5">
              <span
                className="w-1 h-1 rounded-full bg-red-400 inline-block"
                style={{ animation: 'flicker 1.2s infinite' }}
              />
              REC · LIVE
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t border-cyan-500/10 bg-[#050508]/80 px-4 py-2.5">
              <p className="font-mono text-[10px] tracking-[0.18em] text-cyan-400/55">
                ▶ {TICKER[tickerIndex]}
              </p>
            </div>
          </HudPanel>

          <p className="text-xs text-white/15 mt-3 font-mono">
            Simulated feed for demonstration. Actual deployment processes your video sources with real-time inference.
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
                    <span className="font-mono text-[10px] text-white/22 w-32 shrink-0 pt-0.5 tracking-wider uppercase">
                      {s.k}
                    </span>
                    <span className="text-sm text-white/70">{s.v}</span>
                  </div>
                ))}
              </div>
            </HudPanel>

            <div className="flex flex-col gap-4">

              <HudPanel className="bg-[#050508] p-6">
                <p className="text-xs text-cyan-400/50 tracking-widest font-mono uppercase mb-4">
                  What VODA is not
                </p>
                <div className="space-y-2.5">
                  {[
                    'A cloud-dependent SaaS with monthly subscriptions',
                    'A generic video player or converter',
                    'A black-box system with no audit trail',
                    'Limited to specific camera brands or hardware',
                    'A one-size-fits-all recording solution',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-red-400/50 shrink-0 mt-0.5 text-sm">✕</span>
                      <span className="text-sm text-white/35 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </HudPanel>

              <HudPanel className="bg-[#050508] p-6 flex-1">
                <p className="text-xs text-cyan-400/50 tracking-widest font-mono uppercase mb-4">
                  Deployment options
                </p>
                <div className="space-y-2.5">
                  {[
                    { mode: 'Edge hardware',  note: 'On-site privacy, zero cloud egress' },
                    { mode: 'Cloud inference',           note: 'Scale processing, managed infrastructure' },
                    { mode: 'Hybrid deployment',    note: 'Balance local privacy with cloud scale' },
                    { mode: 'API-first integration',   note: 'Embed into existing systems' },
                  ].map((h) => (
                    <div
                      key={h.mode}
                      className="flex items-center justify-between border-b border-white/5 pb-2.5 last:border-0 last:pb-0"
                    >
                      <span className="text-xs font-mono text-white/55">{h.mode}</span>
                      <span className="text-xs text-white/25">{h.note}</span>
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
                <span className="font-mono text-xs text-cyan-400/35 mb-3">{c.n}</span>
                <h3 className="text-sm font-semibold text-white mb-3">{c.title}</h3>
                <p className="text-xs text-white/35 leading-relaxed">{c.desc}</p>
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
            {USE_CASES.map((uc) => (
              <HudPanel key={uc.env} className="bg-[#050508] p-6 flex flex-col">
                <h3 className="text-base font-semibold text-cyan-400/80 mb-3">{uc.env}</h3>
                <p className="text-xs text-white/35 leading-relaxed">{uc.desc}</p>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-3">
            Pricing & trial programme
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How to get VODA
          </h2>
          <p className="text-white/35 max-w-2xl mb-14 text-sm leading-relaxed">
            Start with a 30-day trial. We set up, configure, and validate VODA for your
            environment. Monthly support ensures your deployment stays operational. Production
            rollouts are scoped to your requirements.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <HudPanel
                key={plan.name}
                className={`bg-[#080B12] p-6 flex flex-col ${
                  plan.highlight ? 'border-cyan-500/30 bg-[#080B12]' : ''
                }`}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">{plan.name}</h3>
                    {plan.highlight && (
                      <span className="text-[9px] font-mono tracking-widest text-cyan-400/60 bg-cyan-400/10 px-2 py-1">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/20 mb-4 font-mono">{plan.tag}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{plan.price}</span>
                    <span className="text-xs text-white/25">{plan.period}</span>
                  </div>
                </div>
                <div className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="text-cyan-400/40 shrink-0 text-xs mt-0.5">✓</span>
                      <span className="text-xs text-white/40 leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={plan.to}
                  className={`text-center text-sm py-2.5 px-4 transition-colors ${
                    plan.highlight
                      ? 'bg-cyan-500 text-black font-semibold hover:bg-cyan-400'
                      : 'border border-white/15 text-white/55 hover:border-white/30 hover:text-white/80'
                  }`}
                >
                  {plan.cta}
                </Link>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/8 bg-[#080B12]">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/50 tracking-[0.28em] font-mono uppercase mb-3">
            Trial programme
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How the trial works
          </h2>
          <p className="text-white/35 max-w-2xl mb-14 text-sm leading-relaxed">
            We handle everything from configuration to deployment. You
            see live results from day one. At trial close, we review together and decide
            if a full rollout makes sense.
          </p>
          <div className="space-y-6">
            {TRIAL_STEPS.map((step) => (
              <HudPanel key={step.n} className="bg-[#050508] p-6 flex gap-6">
                <div className="shrink-0 w-10 h-10 rounded-full border border-cyan-500/25 bg-cyan-500/5 flex items-center justify-center">
                  <span className="font-mono text-xs text-cyan-400/70">{step.n}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{step.desc}</p>
                </div>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to deploy VODA?
          </h2>
          <p className="text-white/35 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
            Contact us to arrange a trial. We respond within 2 business days and
            can have VODA processing your video sources within a week.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/about/contact"
              className="bg-cyan-500 text-black font-semibold text-sm px-8 py-3.5 hover:bg-cyan-400 transition-colors"
            >
              Start trial
            </Link>
            <Link
              to="/dashboard"
              className="border border-white/20 text-white/65 text-sm px-8 py-3.5 hover:border-white/35 hover:text-white transition-colors"
            >
              View live console
            </Link>
            <Link
              to="/agent"
              className="text-sm text-cyan-400/60 hover:text-cyan-400 transition-colors underline underline-offset-4"
            >
              Ask NEPA about VODA →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 12px rgba(0,200,240,0.5), 0 0 32px rgba(0,200,240,0.2); }
          50%       { box-shadow: 0 0 24px rgba(0,200,240,0.8), 0 0 64px rgba(0,200,240,0.3); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.3; }
          94% { opacity: 1; }
          96% { opacity: 0.5; }
          97% { opacity: 1; }
        }
      `}</style>
    </main>
  )
}
