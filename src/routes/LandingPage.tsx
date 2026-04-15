import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LiveBadge } from '@/components/LiveBadge'
import { HudPanel } from '@/components/HudPanel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const AGENTS = [
  {
    code: 'VODA',
    name: 'Video Agent',
    desc: 'Multi-camera real-time detection and behavioural intelligence on-device.',
    to: '/products/voda',
    status: 'OPERATIONAL',
  },
  {
    code: 'RODA',
    name: 'Robotic Agent',
    desc: 'Autonomous navigation, mission planning, and robot task orchestration.',
    to: '/products/roda',
    status: 'IN DEVELOPMENT',
  },
  {
    code: 'EODA',
    name: 'Edge Agent',
    desc: 'The core hardware-agnostic inference runtime all agents are built on.',
    to: '/products/eoda',
    status: 'OPERATIONAL',
  },
  {
    code: 'FODA',
    name: 'Facade Agent',
    desc: 'Drone-based aerial building inspection with BRS and defect classification.',
    to: '/products/foda',
    status: 'BETA',
  },
  {
    code: 'SODA',
    name: 'Surveillance Agent',
    desc: 'Multi-site facility monitoring with pattern recognition and alert routing.',
    to: '/products/soda',
    status: 'IN DEVELOPMENT',
  },
]

const STATUS_COLOR: Record<string, string> = {
  'OPERATIONAL':    'text-cyan-400 bg-cyan-400/10',
  'BETA':           'text-yellow-400 bg-yellow-400/10',
  'IN DEVELOPMENT': 'text-white/40 bg-white/5',
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-400"
          style={{
            width:  Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            left:   Math.random() * 50 + '%',
            top:    Math.random() * 100 + '%',
            opacity: Math.random() * 0.25 + 0.05,
            animation: `float-up ${Math.random() * 12 + 8}s linear ${Math.random() * 8}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export function LandingPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden">

      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 60% at 30% 40%, rgba(0,212,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 70% 60%, rgba(0,102,255,0.08) 0%, transparent 50%)'
          }}
        />

        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(120deg, rgba(0,212,255,0.06) 0%, transparent 35%, rgba(107,33,255,0.04) 65%, transparent 100%)'
          }}
        />

        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
          }}
        />

        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 70% at 20% 50%, rgba(0,102,255,0.09) 0%, transparent 70%)',
          }}
        />

        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.012) 2px, rgba(0,212,255,0.012) 4px)',
          }}
        />

        <Particles />

        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(0,212,255,0.5) 0%, transparent 60%)',
            animation: 'sweep 8s linear infinite',
          }}
        />

        <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-28 pb-20">
          <div className="max-w-3xl">

            <div className="flex items-center gap-3 mb-10">
              <LiveBadge label="· AURASENSE" />
              <span className="text-xs text-white/35 tracking-[0.2em] font-mono uppercase">
                NEPA Platform · Video Agent
              </span>
            </div>

            <div
              className="mb-8 transition-all duration-1000 ease-out"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
              }}
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.0] mb-2">
                Neuromorphic
              </h1>
              <h2
                className="text-3xl md:text-5xl font-light tracking-tight leading-tight text-white/70 mb-0"
                style={{
                  transition: 'opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s',
                  opacity:   visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                }}
              >
                Edge Perception Agent
              </h2>
            </div>

            <p
              className="text-base md:text-lg text-white/45 max-w-xl leading-relaxed mb-10"
              style={{
                transition: 'opacity 1s ease-out 0.9s',
                opacity: visible ? 1 : 0,
              }}
            >
              Deterministic inference at the edge. No cloud. No dependencies. Domain agnostic.
            </p>

            <div
              className="flex flex-wrap items-center gap-4 mb-16"
              style={{
                transition: 'opacity 1s ease-out 1.1s',
                opacity: visible ? 1 : 0,
              }}
            >
              <Link
                to="/dashboard"
                className="bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors"
              >
                Launch NEPA Console →
              </Link>
              <Link
                to="/about/contact"
                className="border border-white/20 text-white/70 text-sm px-7 py-3 hover:border-white/40 hover:text-white transition-colors"
              >
                Request pilot access →
              </Link>
            </div>

            <div
              className="flex flex-wrap gap-10 border-t border-white/8 pt-8"
              style={{
                transition: 'opacity 1s ease-out 1.3s',
                opacity: visible ? 1 : 0,
              }}
            >
              {[
                { label: 'Inference Latency',  value: '< 0.8 ms',  note: '' },
                { label: 'Edge Nodes Active',  value: '12',        note: '' },
                { label: 'Audit Events Today', value: '3,847',     note: '' },
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

      <section className="py-28 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs text-cyan-400/60 tracking-widest uppercase font-mono mb-4">
                What is NEPA
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Inference at the source.<br />
                Not the server.
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                NEPA is a spike-timing inference engine built in C++ and deployed
                on commodity edge hardware — NVIDIA Jetson Nano and Intel NUC.
                It runs YOLOv8 perception models via ONNX and TensorRT, delivering
                sub-42ms deterministic latency with no cloud dependency.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Every inference event is hash-chained into an immutable audit
                ledger. Operators get a tamper-evident compliance record of every
                decision the system made — essential for autonomous retail and
                regulated inspection environments.
              </p>
              <Link
                to="/about/technology"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
              >
                Read the technology overview →
              </Link>
            </div>

            <HudPanel className="bg-[#080B12] p-8">
              <p className="font-mono text-[10px] tracking-[0.24em] text-cyan-400/50 uppercase mb-6">
                Core specification
              </p>
              <div className="space-y-3">
                {[
                  { k: 'INFERENCE ENGINE', v: 'C++ spike-timing (STDP)' },
                  { k: 'MODEL RUNTIME',    v: 'ONNX + TensorRT' },
                  { k: 'PERCEPTION',       v: 'YOLOv8 fine-tuned' },
                  { k: 'LATENCY',          v: '< 42ms deterministic' },
                  { k: 'HARDWARE',         v: 'Jetson Nano · Intel NUC' },
                  { k: 'AUDIT',            v: 'SHA-256 hash-chained log' },
                  { k: 'DEPLOYMENT',       v: 'Edge-only — no cloud egress' },
                  { k: 'PATENT',           v: 'Provisional filed Feb 2026' },
                ].map((s) => (
                  <div key={s.k} className="flex items-start gap-4 text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="font-mono text-[11px] text-white/30 w-36 shrink-0 pt-0.5 tracking-wide">
                      {s.k}
                    </span>
                    <span className="text-white/80">{s.v}</span>
                  </div>
                ))}
              </div>
            </HudPanel>
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-14">
            <p className="text-xs text-cyan-400/60 tracking-widest uppercase font-mono mb-3">
              Platform agents
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Five agents. One platform.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGENTS.map((a) => (
              <Link key={a.code} to={a.to} className="group">
                <HudPanel className="p-6 bg-[#080B12] hover:bg-[#0A0E18] transition-colors h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1">
                      {a.code}
                    </span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 ${STATUS_COLOR[a.status]}`}>
                      {a.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white mb-2">{a.name}</p>
                  <p className="text-xs text-white/40 leading-relaxed flex-1">{a.desc}</p>
                  <p className="text-xs text-cyan-400/60 mt-4 group-hover:text-cyan-400 transition-colors">
                    Learn more →
                  </p>
                </HudPanel>
              </Link>
            ))}
          </div>

          <div className="mt-8 border border-cyan-500/20 bg-cyan-500/[0.03] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white mb-1">
                Not sure which agent you need?
              </p>
              <p className="text-xs text-white/40 leading-relaxed max-w-lg">
                Talk to NEPA directly. Describe your environment, upload a video,
                or paste a stream URL — NEPA will route your request to the right
                agent automatically.
              </p>
            </div>
            <Link
              to="/agent"
              className="shrink-0 bg-cyan-500 text-black font-semibold text-sm px-6 py-3 hover:bg-cyan-400 transition-colors whitespace-nowrap"
            >
              Ask NEPA →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-28 border-t border-white/8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 25%, #0F0F0F 50%, #1F1F1F 75%, #0D0D0D 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(40,40,40,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(50,50,50,0.4) 0%, transparent 50%)',
          }}
        />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs text-cyan-400/60 tracking-widest uppercase font-mono mb-4">
              Pricing
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white"
              style={{
                textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.4)',
                transform: 'translateZ(20px)',
              }}
            >
              Built for every stage
            </h2>
            <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">
              From free diagnostics to enterprise-scale deployment, NEPA grows with your operation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: 'NEPA Diagnostic',
                price: 'Free',
                period: '',
                highlight: false,
                tag: "Find what's wrong first",
                desc: "Run up to 3 diagnostic scans per month with NEPA's inference engine to detect motion inconsistency, jitter, lighting mismatch, background issues, and ROI anomalies.",
                cta: 'Start diagnosing',
                to: '/agent',
              },
              {
                name: 'Creator',
                price: '$29',
                period: '/month',
                highlight: false,
                tag: 'Turn diagnostics into action',
                desc: 'Use Vodec to execute corrective workflows, replay edits, and resolve localized issues with predictable control.',
                cta: 'Get started',
                to: '/about/contact',
              },
              {
                name: 'Studio',
                price: '$149',
                period: '/month',
                highlight: true,
                tag: 'Built for collaborative video operations',
                desc: 'Give your team shared workflows, audit trails, batch processing, and higher-volume execution capacity.',
                cta: 'Talk to us',
                to: '/about/contact',
              },
              {
                name: 'Growth',
                price: '$499',
                period: '/month',
                highlight: false,
                tag: 'Operationalize at scale',
                desc: 'Add governance, analytics, API access, and premium support for growing commercial workflows.',
                cta: 'Talk to us',
                to: '/about/contact',
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                highlight: false,
                tag: 'Embed NEPA into production systems',
                desc: 'For platforms, studios, and enterprise teams that need API access, governance, integrations, and high-volume infrastructure.',
                cta: 'Contact sales',
                to: '/about/contact',
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-lg transition-all duration-300 hover:transform hover:translateY(-2px) ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] border-2 border-cyan-500/40'
                    : 'bg-gradient-to-br from-[#141414] via-[#1F1F1F] to-[#141414] border border-white/10'
                }`}
                style={{
                  boxShadow: plan.highlight
                    ? '0 8px 32px rgba(0, 212, 255, 0.15), 0 4px 16px rgba(0, 0, 0, 0.6)'
                    : '0 4px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full">
                    POPULAR
                  </div>
                )}
                
                <div className="mb-4">
                  <h3
                    className="text-xl font-bold text-white mb-1"
                    style={{
                      textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.3)',
                      transform: 'translateZ(10px)',
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-xs text-cyan-400/70 font-mono tracking-wider mb-3">
                    {plan.tag}
                  </p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span
                      className="text-3xl font-bold text-white"
                      style={{
                        textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.3)',
                        transform: 'translateZ(10px)',
                      }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-white/40">{plan.period}</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed mb-6 min-h-[80px]">
                  {plan.desc}
                </p>

                <Link
                  to={plan.to}
                  className={`block w-full text-center py-3 px-4 rounded font-semibold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                      : 'border border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-white/40 mb-4">
              All plans include cryptographic audit logging and edge-only deployment
            </p>
            <Link
              to="/about/contact"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
            >
              Compare all features →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/8 bg-[#080B12]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-xs text-cyan-400/60 tracking-widest uppercase font-mono mb-4">
              Frequently asked questions
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight text-white"
              style={{
                textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.4)',
                transform: 'translateZ(20px)',
              }}
            >
              Questions? Answered.
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="what-is-nepa"
              className="border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] rounded-lg px-6 py-2"
            >
              <AccordionTrigger
                className="text-left text-white hover:text-cyan-400 transition-colors"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                What is NEPA and how does it work?
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pt-2 pb-4">
                NEPA (Neuromorphic Edge Perception Agent) is a spike-timing inference engine
                that runs entirely on edge hardware like NVIDIA Jetson Nano or Intel NUC.
                It processes video streams, detects objects and behaviors, and logs every
                decision to a cryptographic audit trail — all without sending data to the cloud.
                Think of it as an AI perception system that lives where your cameras are, not
                on someone else's server.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="free-vs-paid"
              className="border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] rounded-lg px-6 py-2"
            >
              <AccordionTrigger
                className="text-left text-white hover:text-cyan-400 transition-colors"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                What's included in the free NEPA Diagnostic plan?
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pt-2 pb-4">
                The free plan gives you up to 3 diagnostic scans per month. You can upload
                video clips or paste stream URLs, and NEPA will analyze them for motion
                inconsistency, jitter, lighting issues, background problems, and ROI anomalies.
                It's designed to help you identify problems before you invest in corrective
                workflows. No credit card required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="hardware-requirements"
              className="border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] rounded-lg px-6 py-2"
            >
              <AccordionTrigger
                className="text-left text-white hover:text-cyan-400 transition-colors"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                What hardware do I need to run NEPA on-site?
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pt-2 pb-4">
                NEPA is optimized for NVIDIA Jetson Nano (recommended), Intel NUC, or Jetson
                Xavier NX. It can also run on generic x86 Linux machines, though you won't get
                TensorRT acceleration. For pilot deployments, we assess your existing hardware
                and help you choose the right edge node for your environment. Most customers
                start with a single Jetson Nano per 4-8 camera feeds.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="data-privacy"
              className="border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] rounded-lg px-6 py-2"
            >
              <AccordionTrigger
                className="text-left text-white hover:text-cyan-400 transition-colors"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                Does NEPA send my video data to the cloud?
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pt-2 pb-4">
                No. NEPA runs entirely on your edge hardware. Video frames are processed locally,
                and only metadata (detection events, timestamps, classifications) is written to
                the audit log. No video stream ever leaves your network unless you explicitly
                configure external integrations. This architecture is PDPO and GDPR compliant
                by default — no additional configuration needed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="pilot-program"
              className="border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] rounded-lg px-6 py-2"
            >
              <AccordionTrigger
                className="text-left text-white hover:text-cyan-400 transition-colors"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                How does the pilot program work?
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pt-2 pb-4">
                Submit your interest via the contact form, and we'll review your use case
                within 2 business days. If accepted, we assess your hardware compatibility,
                prepare a deployment configuration, and schedule an on-site installation.
                You get full NEPA console access, live inference feeds, and audit log visibility
                from day one. After the pilot period, we review results together and discuss
                a commercial arrangement if NEPA delivers value to your operation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="monthly-support"
              className="border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] rounded-lg px-6 py-2"
            >
              <AccordionTrigger
                className="text-left text-white hover:text-cyan-400 transition-colors"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                What's included in the monthly support package?
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pt-2 pb-4">
                The HK$9,000/month support package includes full AuraSense team backup,
                remote monitoring, model updates, alert threshold reconfiguration, console
                and dashboard updates, monthly operational review reports, and priority
                support with a 4-hour response SLA. It's included from day one of your
                deployment and ensures your system stays tuned to your environment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="enterprise-custom"
              className="border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] rounded-lg px-6 py-2"
            >
              <AccordionTrigger
                className="text-left text-white hover:text-cyan-400 transition-colors"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                When should I consider the Enterprise plan?
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pt-2 pb-4">
                The Enterprise plan is for platforms, studios, and teams that need to embed
                NEPA into production systems at scale. It includes API access for integrations,
                custom model fine-tuning, unlimited audit log retention, SLA-backed uptime
                guarantees, and a dedicated account manager. If you're deploying across
                multiple sites or building NEPA into your own product, this is the right tier.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="agents-explained"
              className="border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] rounded-lg px-6 py-2"
            >
              <AccordionTrigger
                className="text-left text-white hover:text-cyan-400 transition-colors"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                What's the difference between VODA, FODA, SODA, RODA, and EODA?
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pt-2 pb-4">
                These are specialized agents built on the NEPA platform. <strong className="text-white">VODA</strong> handles
                multi-camera video operations and real-time detection. <strong className="text-white">FODA</strong> is for
                drone-based facade inspection with BRS and defect classification. <strong className="text-white">SODA</strong> manages
                multi-site surveillance with pattern recognition. <strong className="text-white">RODA</strong> orchestrates
                autonomous robot navigation and mission planning. <strong className="text-white">EODA</strong> is the core
                inference runtime all agents are built on. When you talk to NEPA, it automatically
                routes your request to the right agent based on your use case.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="cancel-anytime"
              className="border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] rounded-lg px-6 py-2"
            >
              <AccordionTrigger
                className="text-left text-white hover:text-cyan-400 transition-colors"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                Can I cancel my plan at any time?
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pt-2 pb-4">
                Yes. All monthly plans (Creator, Studio, Growth) can be cancelled at any time
                with no penalty. Your access continues until the end of your current billing
                period. For pilot programs and Enterprise deployments, terms are agreed on a
                case-by-case basis during the onboarding process. We don't lock you into
                multi-year contracts unless it's part of a custom enterprise agreement.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-white/40 mb-4">
              Still have questions?
            </p>
            <Link
              to="/about/contact"
              className="inline-block bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors"
            >
              Contact our team
            </Link>
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs text-cyan-400/60 tracking-widest uppercase font-mono mb-4">
                Early access
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Run a pilot before you commit.
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                We are onboarding a small number of pilot partners in Hong Kong
                for Q2 2026. Pilots run on your hardware, in your environment,
                with full access to the NEPA console and audit ledger. No upfront
                cost. No lock-in.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/about/contact"
                  className="bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors"
                >
                  Request pilot access
                </Link>
                <Link
                  to="/about/contact"
                  className="border border-white/20 text-white/70 text-sm px-7 py-3 hover:border-white/40 hover:text-white transition-colors"
                >
                  View roadmap
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Submit your interest',
                  desc: 'Tell us your environment — retail, inspection, or robotics. We review and respond within 2 business days.',
                },
                {
                  step: '02',
                  title: 'Hardware assessment',
                  desc: 'We confirm your edge hardware compatibility (Jetson Nano, Intel NUC, or equivalent) and prepare your deployment config.',
                },
                {
                  step: '03',
                  title: 'Live pilot deployment',
                  desc: 'NEPA is deployed to your site. You get full console access, live inference feeds, and audit log visibility from day one.',
                },
                {
                  step: '04',
                  title: 'Review and scale',
                  desc: 'After the pilot period, we review results together and discuss a commercial arrangement that fits your operation.',
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-5 items-start">
                  <span className="font-mono text-xs text-cyan-400/40 w-6 shrink-0 pt-1">
                    {s.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 py-10">
        <div className="container mx-auto px-6 max-w-6xl flex flex-wrap items-center justify-between gap-6">
          <p className="text-xs text-white/25 font-mono">
            © 2026 AuraSense Limited · Kowloon, Hong Kong
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { label: 'Privacy',  to: '/legal/privacy' },
              { label: 'Terms',    to: '/legal/terms' },
              { label: 'Security', to: '/about/security' },
              { label: 'Contact',  to: '/about/contact' },
              { label: 'Status',   to: '/docs/status' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes sweep {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes float-up {
          0%   { transform: translateY(0);     opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.15; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>

    </main>
  )
}
