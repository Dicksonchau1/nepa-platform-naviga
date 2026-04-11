import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X } from '@phosphor-icons/react'

const STATS = [
  { label: 'Active Camera Lanes', value: '24' },
  { label: 'Alert Latency', value: '<38 ms' },
  { label: 'Audit Events Today', value: '5,214' },
  { label: 'Compliance Mode', value: 'GDPR · HIPAA' },
]

const FEATURES = [
  {
    title: 'Multi-Lane Camera Processing',
    body: 'Each camera feed runs in its own isolated neuromorphic inference lane. No shared mutable state between streams means a fault or anomaly in one feed cannot contaminate decisions on another. Spike-timing decisions are deterministic per lane, so results are reproducible and auditable.',
  },
  {
    title: 'Deterministic Alert Escalation',
    body: 'Every detection event triggers a rule-based escalation chain rather than a probabilistic score. Alerts carry full inference provenance: which frames, which regions, which rules, and a cryptographic hash sealing the decision record. Operators receive structured findings, not just notifications.',
  },
  {
    title: 'Operator-Authenticated Chain of Custody',
    body: 'Every session requires operator authentication. All actions — view, acknowledge, escalate, dismiss — are timestamped, hashed, and sealed into an immutable audit trail from camera ingestion to operator response. Suitable for compliance, legal proceedings, and insurance documentation.',
  },
]

const PIPELINE = [
  {
    step: '01',
    title: 'Ingest',
    body: 'SODA connects to ONVIF-compatible cameras and custom RTSP streams without requiring vendor lock-in. Feeds are registered to the central NEPA control plane and assigned independent inference lanes.',
  },
  {
    step: '02',
    title: 'Perceive',
    body: 'NEPA processes each lane using neuromorphic spike-timing inference at the edge — no frames leave the local node unless explicitly configured for compliance archiving. Detections are expressed as structured events: class, confidence, bounding region, timestamp, and frame hash.',
  },
  {
    step: '03',
    title: 'Decide',
    body: 'The SODA escalation engine evaluates incoming events against operator-defined rule sets. Rules are composable: loitering duration thresholds, zone intrusion, crowd density triggers, after-hours access. Each rule match generates a structured alert with full provenance attached.',
  },
  {
    step: '04',
    title: 'Audit',
    body: 'Every alert, acknowledgement, and operator action is written to an append-only audit log. Logs are cryptographically sealed per session. SODA supports export to SIEM systems and compliance reporting pipelines.',
  },
]

const COMPARISON = [
  {
    conventional: 'Cloud-dependent alert processing adds latency and creates data egress risk',
    soda: 'All inference runs at the edge node; alerts are generated locally in <38 ms',
  },
  {
    conventional: 'Alert scoring is probabilistic; no reproducible explanation per trigger',
    soda: 'Every alert carries deterministic inference provenance and a cryptographic proof',
  },
  {
    conventional: 'Operator actions logged in application DB with no cryptographic integrity',
    soda: 'Audit trail is append-only, timestamped, and cryptographically sealed per session',
  },
  {
    conventional: 'Rule configuration is per-vendor and not portable',
    soda: 'Rule sets are portable, composable, and version-controlled',
  },
  {
    conventional: 'Compliance exports are manual and retroactive',
    soda: 'GDPR and HIPAA compliance mode built in; audit export via API at any time',
  },
]

const USE_CASES = [
  {
    title: 'Unmanned Retail',
    body: 'Monitor self-checkout zones, stockroom access, and after-hours entry across multiple camera angles simultaneously. SODA flags anomalies without staff on-site and routes structured alerts to a remote operations centre with full clip provenance.',
  },
  {
    title: 'Building & Facility Management',
    body: 'Cover lobbies, plant rooms, server floors, and perimeter zones from a single SODA control plane. Each zone runs its own rule set and escalation chain. Audit trails satisfy building insurance and regulatory inspection requirements.',
  },
  {
    title: 'Drone Payload & Ground Operations',
    body: 'SODA can ingest feeds from stationary ground cameras coordinated with UAV patrol paths. When a ground sensor triggers an alert, SODA can dispatch a RODA-coordinated drone for aerial confirmation — all logged under a single chain of custody.',
  },
]

const PLANS = [
  {
    name: 'NEPA Watch',
    price: 'Free',
    period: '',
    highlight: false,
    tag: 'Run diagnostics on up to 2 live feeds',
    features: [
      '2 camera lanes',
      'Motion detection',
      'Basic alert log',
      'NEPA inference engine access',
    ],
    cta: 'Start for free',
    to: '/signup',
  },
  {
    name: 'Operator',
    price: '$49',
    period: 'per month',
    highlight: false,
    tag: 'Active alert escalation for small facilities',
    features: [
      'Everything in Free',
      '8 camera lanes',
      'Rule builder',
      'Operator authentication',
      'Email escalation',
    ],
    cta: 'Start Operator',
    to: '/signup',
  },
  {
    name: 'Facility',
    price: '$199',
    period: 'per month',
    highlight: true,
    tag: 'Multi-zone, multi-operator deployments',
    features: [
      'Everything in Operator',
      '32 camera lanes',
      'Multi-operator support',
      'Audit export',
      'GDPR mode',
    ],
    cta: 'Start Facility',
    to: '/signup',
  },
  {
    name: 'Enterprise',
    price: '$799',
    period: 'per month',
    highlight: false,
    tag: 'High-volume, multi-site with compliance mode',
    features: [
      'Everything in Facility',
      'Unlimited camera lanes',
      'HIPAA mode',
      'SIEM integration',
      'API access',
      'SLA',
    ],
    cta: 'Talk to us',
    to: '/about/contact',
  },
  {
    name: 'Custom',
    price: 'Custom',
    period: '',
    highlight: false,
    tag: 'Platform embedding and white-label',
    features: [
      'Everything in Enterprise',
      'White-label deployment',
      'Dedicated infrastructure',
      'Custom ingest pipelines',
      'Dedicated account manager',
    ],
    cta: 'Contact sales',
    to: '/about/contact',
  },
]

const FAQ = [
  {
    q: 'What cameras does SODA support?',
    a: 'SODA connects to any ONVIF-compatible IP camera and custom RTSP streams. Enterprise deployments support custom ingest pipelines including raw MIPI feeds from embedded hardware.',
  },
  {
    q: 'Does video leave the edge node?',
    a: 'No. NEPA processes all inference locally. Clips are not transmitted to cloud servers unless you explicitly configure compliance archiving to a designated storage target under your own infrastructure.',
  },
  {
    q: 'How are alert rules configured?',
    a: 'Rules are defined through the SODA rule builder in the NEPA Console or via API. They are composable, version-controlled, and portable across deployments. Changes take effect without restarting inference lanes.',
  },
  {
    q: 'What does the audit trail contain?',
    a: 'Each audit record includes: operator ID, session token, action type, timestamp, alert reference, frame hash, and rule match provenance. Records are append-only and cryptographically sealed per session.',
  },
  {
    q: 'Is SODA suitable for legal proceedings?',
    a: 'The chain-of-custody design is built for evidentiary use. Cryptographic sealing of audit records and frame hashes means records cannot be tampered with after the fact. Consult your legal team on jurisdiction-specific admissibility requirements.',
  },
  {
    q: 'Can SODA coordinate with RODA drones?',
    a: 'Yes. SODA can emit structured dispatch events that RODA-coordinated UAVs can consume as mission triggers, enabling ground-sensor-to-drone confirmation workflows under a unified NEPA audit trail.',
  },
]

export function SODAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen text-white overflow-x-hidden relative">

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 -z-10" />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 40% 30%, rgba(0,212,255,0.10) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 65% 70%, rgba(0,102,255,0.07) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, transparent 30%, rgba(107,33,255,0.05) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest text-white/60 uppercase mb-8">
              NEPA PLATFORM · SURVEILLANCE AGENT
            </div>

            {/* H1 */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6"
              style={{
                color: 'white',
                textShadow: '0 4px 12px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              SODA — Surveillance Operations Decision Agent
            </h1>

            {/* Taglines */}
            <p
              className="text-xl md:text-2xl font-light text-white/80 mb-2"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              Multi-camera facility intelligence at the edge.
            </p>
            <p
              className="text-xl md:text-2xl font-light text-white/60 mb-8"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
            >
              Deterministic alert escalation. Operator-authenticated chain of custody.
            </p>

            {/* Body */}
            <p
              className="text-base md:text-lg text-white/50 max-w-3xl mx-auto mb-10 leading-relaxed"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}
            >
              SODA is a surveillance agent built on the NEPA inference core. It ingests concurrent
              camera feeds across a facility, runs independent neuromorphic inference on each stream
              without shared mutable state, and escalates structured alerts with full cryptographic
              provenance — from the triggering frame through to the operator response log. No cloud
              round-trip. No black-box decision. Every action auditable.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link
                to="/about/contact"
                className="bg-white text-black font-semibold text-base px-10 py-4 hover:bg-zinc-100 transition-all shadow-2xl"
                style={{
                  boxShadow: '0 4px 16px rgba(255,255,255,0.2), 0 8px 32px rgba(255,255,255,0.1)',
                }}
              >
                Request Briefing →
              </Link>
              <Link
                to="/resources/api"
                className="border-2 border-white/30 text-white font-semibold text-base px-10 py-4 hover:border-white/50 hover:bg-white/5 transition-all"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                API Docs →
              </Link>
            </div>

            {/* Live stat strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 border border-white/10 rounded px-4 py-4 text-center"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
                >
                  <div
                    className="text-2xl font-black mb-1"
                    style={{
                      color: 'white',
                      textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-white/40 tracking-wide uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT SODA DOES ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              What SODA Does
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 border border-white/10 rounded-lg p-8"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'white', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
                >
                  {f.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW SODA CONNECTS TO NEPA ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-6">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              How SODA Connects to NEPA
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              SODA is the surveillance orchestration layer running over the NEPA inference core
              distributed across edge nodes.
            </p>
          </div>

          <div className="mt-14 space-y-6">
            {PIPELINE.map((p, i) => (
              <div
                key={p.step}
                className="flex gap-8 items-start bg-gradient-to-r from-zinc-900/60 to-zinc-950/40 border border-white/10 rounded-lg px-8 py-7"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
              >
                <div
                  className="shrink-0 text-4xl font-black tabular-nums leading-none"
                  style={{
                    color: 'rgba(255,255,255,0.12)',
                    textShadow: 'none',
                  }}
                >
                  {p.step}
                </div>
                <div>
                  <div
                    className="text-xs font-bold tracking-widest text-white/30 uppercase mb-1"
                  >
                    Step {p.step}
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SODA vs CONVENTIONAL VMS ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              SODA vs Conventional VMS
            </h2>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="text-center text-sm font-bold tracking-widest text-white/30 uppercase">
              Conventional VMS
            </div>
            <div className="text-center text-sm font-bold tracking-widest text-white/60 uppercase">
              SODA on NEPA
            </div>
          </div>

          <div className="space-y-4">
            {COMPARISON.map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-6">
                <div
                  className="bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 border border-white/5 rounded-lg px-6 py-5 flex items-start gap-3"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                >
                  <X size={16} weight="bold" className="shrink-0 mt-0.5 text-white/20" />
                  <span className="text-sm text-white/35 leading-relaxed">{row.conventional}</span>
                </div>
                <div
                  className="bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 border border-white/15 rounded-lg px-6 py-5 flex items-start gap-3"
                  style={{ boxShadow: '0 4px 16px rgba(0,212,255,0.04)' }}
                >
                  <Check size={16} weight="bold" className="shrink-0 mt-0.5 text-white/50" />
                  <span className="text-sm text-white/65 leading-relaxed">{row.soda}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-14">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              Use Cases
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 border border-white/10 rounded-lg p-8"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: 'white', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
                >
                  {u.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── API BLOCK ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              API
            </h2>
            <p className="text-white/50 text-lg">
              Integrate SODA into your platform or SIEM pipeline.
            </p>
          </div>
          <div
            className="bg-zinc-950 border border-white/10 rounded-lg overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <div className="flex items-center gap-2 px-5 py-3 bg-white/5 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="text-xs text-white/30 ml-2 font-mono tracking-wide">soda-api.sh</span>
            </div>
            <pre
              className="px-6 py-6 text-sm font-mono text-white/70 leading-7 overflow-x-auto"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >{`# Ingest a camera stream
POST https://api.nepa.io/v1/soda/streams
{ "rtsp_url": "...", "lane_id": "CAM_04", "rule_set": "retail_v2" }

# Query alert log
GET https://api.nepa.io/v1/soda/alerts?lane=CAM_04&from=2026-04-12

# gRPC service
nepa.soda.v1.SurveillanceService`}</pre>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              Pricing
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Start free. Scale when your facility does.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 border rounded-lg p-8 flex flex-col ${
                  plan.highlight ? 'border-white/30 ring-2 ring-white/20' : 'border-white/10'
                }`}
                style={{
                  boxShadow: plan.highlight
                    ? '0 8px 32px rgba(255,255,255,0.08), 0 16px 64px rgba(255,255,255,0.04)'
                    : '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                <div className="mb-6">
                  {plan.highlight && (
                    <span className="inline-block text-xs font-bold tracking-wider text-black bg-white px-3 py-1 rounded-full mb-4">
                      RECOMMENDED
                    </span>
                  )}
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-white/40 text-xs mb-4">{plan.tag}</p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-3xl font-black"
                      style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-white/40 text-xs">{plan.period}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="shrink-0 mt-0.5 text-white/40" size={16} weight="bold" />
                      <span className="text-sm text-white/55">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={plan.to}
                  className={`text-center text-sm font-semibold py-3 px-4 rounded transition-all ${
                    plan.highlight
                      ? 'bg-white text-black hover:bg-zinc-100 shadow-lg'
                      : 'border border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5'
                  }`}
                  style={
                    plan.highlight
                      ? { boxShadow: '0 4px 16px rgba(255,255,255,0.15)' }
                      : {}
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 border border-white/10 rounded-lg overflow-hidden"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span
                    className="font-semibold text-base"
                    style={{ color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                  >
                    {item.q}
                  </span>
                  <span className="text-white/40 text-2xl font-light">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-white/55 leading-relaxed text-sm border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            Ready to secure your facility?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Start with two camera lanes for free. No cloud. No credit card.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="bg-white text-black font-semibold text-base px-10 py-4 hover:bg-zinc-100 transition-all shadow-2xl"
              style={{
                boxShadow: '0 4px 16px rgba(255,255,255,0.2), 0 8px 32px rgba(255,255,255,0.1)',
              }}
            >
              Start for free
            </Link>
            <Link
              to="/agent"
              className="text-white/60 hover:text-white transition-colors underline underline-offset-4"
            >
              Ask NEPA about SODA →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

