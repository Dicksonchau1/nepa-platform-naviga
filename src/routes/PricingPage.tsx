import { Link } from 'react-router-dom'
import { Check } from '@phosphor-icons/react'

const sodaPlans = [
  {
    name: 'Pilot',
    description: 'Best for 1 test site with limited cameras.',
    features: ['NEPA core', 'Basic SODA dashboard', 'Anomaly alerts', 'CODA incident summaries', 'Email support'],
    cta: 'Start pilot',
    href: '/contact',
  },
  {
    name: 'Store',
    description: 'Best for 1 production unmanned store.',
    features: ['Full SODA stack', 'More camera lanes', 'Low-stock intelligence', 'RODA-ready dispatch', 'Priority support'],
    cta: 'Deploy store',
    href: '/contact',
  },
  {
    name: 'Fleet',
    description: 'Best for multi-store operations.',
    features: ['Multi-site management', 'Fleet reporting', 'SSO', 'Custom SLA', 'Deployment engineering'],
    cta: 'Talk to sales',
    href: '/contact',
  },
]

const rodaPlans = [
  {
    name: 'RODA Ready',
    description: 'Entry robotic integration package.',
    features: ['Dispatch contract', 'Task queue', 'Single robot integration'],
  },
  {
    name: 'RODA Integrated',
    description: 'Operational robotics for stores.',
    features: ['Multi-robot orchestration', 'Priority tasking', 'NISSM sync'],
  },
  {
    name: 'RODA Enterprise Robotics',
    description: 'Custom robotics deployments.',
    features: ['Fleet-scale automation', 'Custom SLAs', 'Deployment engineering'],
  },
]

const vodaPlans = [
  {
    name: 'Starter',
    description: 'Monthly processed minutes for small teams.',
    metrics: ['Video minutes processed', 'Report renders', 'Consultation calls'],
  },
  {
    name: 'Growth',
    description: 'Higher volumes with exports + webhooks.',
    metrics: ['Higher minute volume', 'Live stream hours', 'Report exports'],
  },
  {
    name: 'Enterprise',
    description: 'Custom volume + SLA + private deployment.',
    metrics: ['Custom retention', 'Private tenancy', 'Dedicated support'],
  },
]

const hriPlans = [
  {
    name: 'Launch',
    description: 'Small monthly API quota.',
    metrics: ['Interview sessions', 'Transcript minutes', 'Scorecards'],
  },
  {
    name: 'Growth',
    description: 'Larger quota + richer insights.',
    metrics: ['API calls', 'Webhook deliveries', 'Batch jobs'],
  },
  {
    name: 'Scale',
    description: 'High volume + concurrency boosts.',
    metrics: ['Concurrency limit', 'Data retention', 'Audit export'],
  },
  {
    name: 'Enterprise',
    description: 'Private deployment + custom tenancy.',
    metrics: ['VPC deployment', 'Custom SLA', 'Security review'],
  },
]

export function PricingPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white pt-20">

      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="text-center max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-[0.28em] text-cyan-400/60 uppercase mb-4">
            One intelligence platform · Multiple execution domains
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            NEPA platform pricing
          </h1>
          <p className="text-white/50 leading-relaxed mb-8">
            NEPA perceives → reasons → predicts → dispatches → reports. Choose the execution domain that matches your deployment.
          </p>

          <div className="flex items-center gap-1 flex-wrap justify-center">
            {[
              { label: 'PERCEIVE', sublabel: 'NEPA engine' },
              { label: 'REASON', sublabel: 'SignatureMap' },
              { label: 'PREDICT', sublabel: 'DopamineModulator' },
              { label: 'DISPATCH', sublabel: 'ACT layer' },
              { label: 'REPORT', sublabel: 'CODA output' },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center gap-1">
                <div className="flex flex-col items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
                  <span className="font-mono text-xs tracking-[0.2em] text-white group-hover:text-cyan-300 transition-colors">
                    {step.label}
                  </span>
                  <span className="font-mono text-[10px] text-gray-600 mt-0.5">{step.sublabel}</span>
                </div>
                {i < arr.length - 1 && (
                  <span className="text-gray-700 font-mono text-xs mx-0.5">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Sticky Product Navigation */}
      <div className="sticky top-16 z-40 border-b border-white/8 bg-[#050508]/95 backdrop-blur-xl">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              {(['VODA', 'SODA', 'RODA'] as Product[]).map((product) => (
                <button
                  key={product}
                  onClick={() => setActiveProduct(product)}
                  className={`flex flex-col items-center gap-1 px-6 py-3 rounded-lg transition-all ${
                    activeProduct === product
                      ? 'bg-opacity-10'
                      : 'hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: activeProduct === product ? PRODUCT_COLORS[product] + '20' : 'transparent',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: activeProduct === product ? PRODUCT_COLORS[product] + '60' : 'transparent',
                  }}
                >
                  <span
                    className="font-mono text-sm font-bold tracking-widest"
                    style={{ color: activeProduct === product ? PRODUCT_COLORS[product] : 'rgba(255,255,255,0.4)' }}
                  >
                    {product}
                  </span>
                  <span className="text-xs text-white/30 font-mono">
                    {PRODUCT_DESCRIPTORS[product]}
                  </span>
                </button>
              ))}
            </div>

            {activeProduct !== 'SODA' && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`font-mono text-xs px-4 py-2 rounded transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('annual')}
                  className={`font-mono text-xs px-4 py-2 rounded transition-colors ${
                    billingPeriod === 'annual'
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/60'
                  }`}
    <div className="min-h-screen bg-[#050508] text-white pt-24 pb-24">
      <div className="container mx-auto px-6 max-w-6xl space-y-20">
        <section>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Pricing</h1>
          <p className="text-white/60 max-w-2xl">
            All plans include NEPA engine access, VODA API, and PDPO-aligned compliance tooling.
            Scale from a single pilot store to fleet-grade autonomous operations.
          </p>
        </section>

        <section>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="text-2xl font-semibold">SODA plans</h2>
            <Link to="/contact" className="text-sm text-cyan-300 hover:text-cyan-200">
              Book a pilot →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sodaPlans.map((plan) => (
              <div key={plan.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-white/60 mb-4">{plan.description}</p>
                <ul className="space-y-2 text-sm text-white/70">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check size={16} className="text-cyan-300 mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.href}
                  className="mt-6 inline-flex items-center justify-center w-full rounded-lg bg-cyan-500 text-black py-2 text-sm font-semibold"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-8">RODA add-on packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rodaPlans.map((plan) => (
              <div key={plan.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-white/60 mb-4">{plan.description}</p>
                <ul className="space-y-2 text-sm text-white/70">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check size={16} className="text-cyan-300 mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center w-full rounded-lg border border-white/20 py-2 text-sm text-white/80"
                >
                  Contact sales
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-8">VODA / CODA SaaS pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vodaPlans.map((plan) => (
              <div key={plan.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-white/60 mb-4">{plan.description}</p>
                <ul className="space-y-2 text-sm text-white/70">
                  {plan.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-2">
                      <Check size={16} className="text-cyan-300 mt-1" />
                      {metric}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center w-full rounded-lg border border-white/20 py-2 text-sm text-white/80"
                >
                  Request pricing
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-8">HRI API packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hriPlans.map((plan) => (
              <div key={plan.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-white/60 mb-4">{plan.description}</p>
                <ul className="space-y-2 text-sm text-white/70">
                  {plan.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-2">
                      <Check size={16} className="text-cyan-300 mt-1" />
                      {metric}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/auth/sign-up"
                  className="mt-6 inline-flex items-center justify-center w-full rounded-lg bg-white/10 py-2 text-sm text-white"
                >
                  Start with {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 pt-10 text-sm text-white/50">
          <p>
            Need a custom deployment? Contact us for multi-site SLAs, dedicated infrastructure, and on-premise support.
          </p>
        </section>
      </div>
    </div>
  )
import { PricingPage as PricingPageContent } from '@/components/pages/PricingPage'

export function PricingPage() {
  return <PricingPageContent />
}
