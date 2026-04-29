import { Link } from 'react-router-dom'
import { Check } from '@phosphor-icons/react'

interface Tier {
  name: string
  price: string
  period: string
  tag: string
  features: string[]
  cta: string
  to: string
  highlight?: boolean
  disabled?: boolean
}

const VODA_TIERS: Tier[] = [
  {
    name: 'VODA Studio',
    price: 'HK$199',
    period: '/month',
    tag: 'For production teams',
    features: [
      'Unlimited NEPA diagnostics',
      'Full Vodec corrective workflows',
      'Shared workflows across teams',
      'Audit trails for every operation',
      'API access for integrations',
      'Standard SLA, business-hours support',
    ],
    cta: 'Start Studio',
    to: '/signup?plan=voda-studio',
    highlight: true,
  },
  {
    name: 'VODA Enterprise',
    price: 'HK$499',
    period: '/month',
    tag: 'Licensing for studios + platforms',
    features: [
      'Everything in Studio',
      'Multi-tenant licensing',
      'On-prem deployment option',
      'Custom integration support',
      'Dedicated account manager',
      '24/7 priority SLA',
    ],
    cta: 'Talk to sales',
    to: '/about/contact?plan=voda-enterprise',
  },
]

const STORE_TIERS: Tier[] = [
  {
    name: 'Pilot',
    price: 'Custom',
    period: '',
    tag: 'Store / robot pilot deployment',
    features: [
      'Single-site SODA + RODA',
      'Jetson Orin NX hardware bundle',
      'NERMM robotic arm integration',
      'CODA daily video reports',
      'Dedicated onboarding engineer',
    ],
    cta: 'Request pilot',
    to: '/about/contact?plan=soda-roda-pilot',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    tag: 'Multi-site fleet',
    features: [
      'Multi-store deployment',
      'Fleet orchestration console',
      'Federated SignatureMap learning',
      'Custom NISSM integration',
      '24/7 mission-critical SLA',
    ],
    cta: 'Talk to sales',
    to: '/about/contact?plan=soda-roda-enterprise',
  },
]

const STUDIO_TIERS: Tier[] = [
  {
    name: 'AuraStudio',
    price: 'Coming Soon',
    period: '',
    tag: 'Launching soon',
    features: [
      'Cinematic generation studio',
      'NEPA-aware corrective workflows',
      'Cloud render + edge preview',
      'Direct VODA / CODA pipeline',
      'Early-access waitlist now open',
    ],
    cta: 'Join waitlist',
    to: '/about/contact?plan=aurastudio-waitlist',
    disabled: true,
  },
]

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={`relative bg-[#050508] border rounded-xl p-8 flex flex-col transition-colors ${
        tier.highlight
          ? 'border-cyan-400/40 ring-1 ring-cyan-400/20'
          : 'border-white/10 hover:border-white/20'
      } ${tier.disabled ? 'opacity-70' : ''}`}
    >
      {tier.highlight ? (
        <span className="absolute -top-2.5 left-6 inline-block text-[10px] font-bold tracking-wider text-black bg-cyan-400 px-2.5 py-0.5 rounded-full">
          RECOMMENDED
        </span>
      ) : null}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-1">{tier.name}</h3>                                  <p className="text-white/40 text-xs mb-5">{tier.tag}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{tier.price}</span>
          {tier.period ? <span className="text-white/35 text-sm">{tier.period}</span> : null}
        </div>
      </div>

      <div className="space-y-2.5 mb-8 flex-1">
        {tier.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5">
            <Check size={14} weight="bold" className="shrink-0 mt-0.5 text-cyan-400/70" />
            <span className="text-[13px] text-white/65 leading-relaxed">{f}</span>
          </div>
        ))}
      </div>

      <Link
        to={tier.disabled ? '#' : tier.to}
        aria-disabled={tier.disabled}
        onClick={(e) => { if (tier.disabled) e.preventDefault() }}
        className={`text-center text-sm font-semibold py-2.5 px-4 rounded-md transition-colors ${
          tier.highlight
            ? 'bg-cyan-400 text-black hover:bg-cyan-300'
            : 'border border-white/15 text-white/70 hover:border-white/30 hover:text-white hover:bg-white/5'
        } ${tier.disabled ? 'cursor-not-allowed' : ''}`}
      >
        {tier.cta}
      </Link>
    </div>
  )
}

function TierGroup({ label, eyebrow, tiers }: { label: string; eyebrow: string; tiers: Tier[] }) {
  return (
    <section className="py-16 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-xs text-cyan-400/60 tracking-[0.28em] font-mono uppercase mb-3">
          {eyebrow}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
          {label}
        </h2>
        <div className={`grid gap-5 ${tiers.length === 1 ? 'md:max-w-md mx-auto' : 'md:grid-cols-2'}`}>
          {tiers.map((t) => <TierCard key={t.name} tier={t} />)}
        </div>
      </div>
    </section>
  )
}

export function PricingPage() {
  return (
    <main className="min-h-screen bg-[#080B12] text-white">
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-xs text-cyan-400/60 tracking-[0.28em] font-mono uppercase mb-4">
            Pricing
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5">
            Simple. Two tiers. Edge-first.
          </h1>
          <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Pick a tier. Talk to us if you need scale. AuraStudio is launching soon.
          </p>
        </div>
      </section>

      <TierGroup eyebrow="VIDEO DIAGNOSTICS & CORRECTION" label="VODA" tiers={VODA_TIERS} />
      <TierGroup eyebrow="STORE + ROBOTIC OPERATIONS" label="SODA / RODA" tiers={STORE_TIERS} />
      <TierGroup eyebrow="GENERATIVE STUDIO" label="AuraStudio" tiers={STUDIO_TIERS} />

      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Need something custom?
          </h2>
          <p className="text-white/55 mb-8 leading-relaxed">
            Fleet deployments, on-prem licensing, federated learning across stores —
            talk to us.
          </p>
          <Link
            to="/about/contact"
            className="inline-block bg-cyan-400 text-black font-semibold text-sm px-7 py-3 rounded-md hover:bg-cyan-300 transition-colors"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </main>
  )
}

export default PricingPage
