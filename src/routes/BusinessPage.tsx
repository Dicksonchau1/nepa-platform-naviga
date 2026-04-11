import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HudPanel } from '@/components/HudPanel'

const CASE_STUDIES = [
  {
    tag: 'Unmanned Retail',
    location: 'Hong Kong',
    headline: 'Cashierless convenience store powered by NEPA',
    body: "NEPA's edge inference engine manages product detection, shelf monitoring, and transaction validation across a fully unmanned retail environment - without cloud dependency.",
    stats: [
      { label: 'Inference latency', value: '< 36ms' },
      { label: 'Uptime', value: '99.4%' },
      { label: 'Cloud dependency', value: 'None' },
    ],
    cta: 'Read case study',
    to: '/business/case-studies/unmanned-retail-hk',
    accent: 'cyan',
  },
  {
    tag: 'Drone Inspection',
    location: 'Building Facade · Hong Kong',
    headline: 'Automated facade inspection at inference speed',
    body: 'UAV-mounted NEPA inference detects surface anomalies, structural deviations, and maintenance flags across high-rise building facades — replacing manual inspection cycles.',
    stats: [
      { label: 'Inspection time reduction', value: '74%' },
      { label: 'Anomaly detection accuracy', value: '96.1%' },
      { label: 'On-device processing', value: 'Full' },
    ],
    cta: 'Read case study',
    to: '/business/case-studies/drone-inspection-facade',
    accent: 'indigo',
  },
  {
    tag: 'Robotic Delivery',
    location: 'Logistics Campus',
    headline: 'Autonomous last-mile delivery orchestrated by RODA',
    body: 'RODA coordinates multi-robot delivery fleets across logistics campuses — routing tasks, resolving conflicts, and escalating exceptions without human dispatch intervention.',
    stats: [
      { label: 'Dispatch automation', value: '91%' },
      { label: 'Fleet size managed', value: 'Up to 25 units' },
      { label: 'Operator interventions', value: '— 68%' },
    ],
    cta: 'Read case study',
    to: '/business/case-studies/robotic-delivery-logistics',
    accent: 'amber',
  },
]

const ENTERPRISE_FEATURES = [
  {
    icon: '◈',
    label: 'On-site deployment',
    desc: 'AuraSense engineers configure and commission NEPA hardware at your location.',
  },
  {
    icon: '◎',
    label: 'Workflow configuration',
    desc: 'Custom inference pipelines, alert routing, and escalation policies designed around your operational requirements.',
  },
  {
    icon: '◧',
    label: 'Dedicated engineer support',
    desc: 'A named AuraSense engineer assigned to your account throughout deployment and beyond.',
  },
  {
    icon: '⊕',
    label: 'SLA-backed uptime',
    desc: 'Guaranteed operational availability with defined response windows and incident escalation.',
  },
  {
    icon: '⊞',
    label: 'Compliance and audit',
    desc: 'Evidence retention, tamper-evident logs, and structured export for regulatory and insurance requirements.',
  },
  {
    icon: '⊟',
    label: 'Ongoing model tuning',
    desc: 'Regular inference optimisation and model updates as your environment and requirements evolve.',
  },
]

const ACCENT_COLORS: Record<string, { bg: string; border: string; text: string; pill: string }> = {
  cyan: {
    bg: 'bg-cyan-500/5',
    border: 'border-cyan-500/20',
    text: 'text-cyan-400',
    pill: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  },
  indigo: {
    bg: 'bg-indigo-500/5',
    border: 'border-indigo-500/20',
    text: 'text-indigo-400',
    pill: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
  },
  amber: {
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    pill: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  },
}

export function BusinessPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-24">
        
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
          }}
        />

        {/* Bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 55% at 30% 50%, rgba(0,212,255,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.012) 2px, rgba(0,212,255,0.012) 4px)',
          }}
        />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            
            {/* Eyebrow */}
            <p
              className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyan-400/50 mb-5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              AuraSense NEPA — Business
            </p>

            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s',
              }}
            >
              Edge AI built for operations at scale.
            </h1>

            {/* Subtext */}
            <p
              className="text-base text-white/50 max-w-2xl leading-relaxed mb-10"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
              }}
            >
              From unmanned retail to drone inspection and robotic delivery — NEPA deploys at the edge, 
              runs without cloud dependency, and gives your operations team structured intelligence from day one.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-4"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.8s ease 0.8s',
              }}
            >
              <Link
                to="/about/contact"
                className="bg-cyan-500 text-black font-semibold text-sm px-8 py-3 hover:bg-cyan-400 transition-colors"
              >
                Talk to our team
              </Link>
              <Link
                to="/products/eoda"
                className="border border-white/20 text-white/70 text-sm px-8 py-3 hover:border-white/40 hover:text-white transition-colors"
              >
                Explore NEPA Enterprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES GRID ──────────────────────────────────────── */}
      <section className="py-24 border-t border-white/8">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="mb-14">
            <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyan-400/50 mb-3">
              Case Studies
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              NEPA deployed in the field.
            </h2>
            <p className="text-white/40 max-w-2xl leading-relaxed">
              Real deployments across unmanned retail, aerial inspection, and autonomous logistics 
              operations in Asia-Pacific.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study, i) => {
              const colors = ACCENT_COLORS[study.accent]
              return (
                <div
                  key={i}
                  className={`border rounded-2xl ${colors.bg} ${colors.border} hover:border-opacity-40 transition-all p-6 flex flex-col`}
                  style={{
                    opacity: 0,
                    animation: `fade-in 0.6s ease-out ${0.1 + i * 0.1}s forwards`,
                  }}
                >
                  {/* Tag */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`font-mono text-[10px] px-2.5 py-1 border rounded ${colors.pill} tracking-wider`}>
                      {study.tag}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-xs text-white/30 font-mono mb-3 tracking-wide">
                    {study.location}
                  </p>

                  {/* Headline */}
                  <h3 className="text-lg font-semibold mb-3 leading-snug">
                    {study.headline}
                  </h3>

                  {/* Body */}
                  <p className="text-sm text-white/45 leading-relaxed mb-6 flex-1">
                    {study.body}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                    {study.stats.map((stat, j) => (
                      <div key={j} className="flex items-center justify-between text-xs">
                        <span className="text-white/30 font-mono">{stat.label}</span>
                        <span className={`font-mono font-semibold ${colors.text}`}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to={study.to}
                    className={`text-sm ${colors.text} hover:opacity-70 transition-opacity inline-flex items-center gap-2`}
                  >
                    {study.cta}
                    <span>→</span>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE ONBOARDING ──────────────────────────────────── */}
      <section className="py-24 border-t border-white/8 bg-white/[0.02]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left — Copy */}
            <div>
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyan-400/50 mb-3">
                Enterprise Services
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Premium services for Enterprise customers.
              </h2>
              <p className="text-white/45 leading-relaxed mb-6">
                Our professional services are designed to get your NEPA deployment operational from day one — 
                and keep it running at full performance as your environment scales. Services and availability 
                are scoped to your site count, device fleet, and operational requirements.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/about/contact"
                  className="bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors"
                >
                  Contact Sales
                </Link>
                <Link
                  to="/products/eoda"
                  className="border border-white/20 text-white/65 text-sm px-7 py-3 hover:border-white/35 hover:text-white transition-colors"
                >
                  Explore NEPA Enterprise
                </Link>
              </div>
            </div>

            {/* Right — Feature List */}
            <div className="space-y-5">
              {ENTERPRISE_FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start"
                  style={{
                    opacity: 0,
                    animation: `fade-in 0.5s ease-out ${0.2 + i * 0.08}s forwards`,
                  }}
                >
                  <span className="text-2xl text-cyan-400/70 shrink-0 mt-1">
                    {feature.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-sm mb-1">{feature.label}</p>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER PROGRAMME STRIP ────────────────────────────────── */}
      <section className="py-20 border-t border-white/5 border-b border-white/5 bg-[#050508]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyan-400/50 mb-3">
            Partners
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Work with AuraSense.
          </h2>
          <p className="text-white/45 leading-relaxed max-w-2xl mx-auto mb-8">
            We partner with system integrators, property managers, logistics operators, and technology 
            platforms to deploy NEPA in new environments. If you are building something that needs edge 
            perception, let's talk.
          </p>
          <Link
            to="/about/contact"
            className="inline-block bg-cyan-500 text-black font-semibold text-sm px-8 py-3 hover:bg-cyan-400 transition-colors"
          >
            Become a partner
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyan-400/50 mb-3">
            Next steps
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to deploy NEPA in your operation?
          </h2>
          <p className="text-white/45 leading-relaxed max-w-2xl mx-auto mb-8">
            Talk to our team about your environment, site count, and operational requirements. 
            We scope every deployment before any contract is signed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/about/contact"
              className="bg-cyan-500 text-black font-semibold text-sm px-8 py-3 hover:bg-cyan-400 transition-colors"
            >
              Talk to our team
            </Link>
            <Link
              to="/products/voda"
              className="border border-white/20 text-white/65 text-sm px-8 py-3 hover:border-white/35 hover:text-white transition-colors"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* ── KEYFRAMES ──────────────────────────────────────────────── */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
