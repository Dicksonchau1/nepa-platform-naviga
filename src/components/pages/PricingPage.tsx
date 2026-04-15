import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from '@phosphor-icons/react'

type PricingTab = 'soda' | 'voda' | 'hri' | 'roda'

interface PlanCard {
  name: string
  price: string
  features: string[]
  cta: 'trial' | 'start' | 'contact'
}

interface TabConfig {
  id: PricingTab
  label: string
}

const tabs: TabConfig[] = [
  { id: 'soda', label: 'SODA Unmanned Store' },
  { id: 'voda', label: 'VODA/CODA Video Intelligence' },
  { id: 'hri', label: 'HRI API' },
  { id: 'roda', label: 'RODA Robotics' },
]

const sodaPlans: PlanCard[] = [
  {
    name: 'Pilot',
    price: 'HK$4,000/mo',
    features: ['1 store', '3 cameras', 'VODA+CODA included', '5,000 API calls', 'Email support'],
    cta: 'trial',
  },
  {
    name: 'Professional',
    price: 'HK$8,000/mo',
    features: ['5 stores', '16 cameras', 'SODA+RODA+VODA+CODA', '50,000 API calls', 'Dedicated support'],
    cta: 'start',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited stores', 'All products', 'SLA', 'On-prem option'],
    cta: 'contact',
  },
]

const vodaPlans: PlanCard[] = [
  {
    name: 'Starter',
    price: 'HK$1,500/mo',
    features: ['60 video minutes/mo', '100 consultations', 'Daily reports'],
    cta: 'trial',
  },
  {
    name: 'Professional',
    price: 'HK$5,500/mo',
    features: ['600 video minutes/mo', '1,000 consultations', 'Hourly reports'],
    cta: 'start',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited processing', 'Real-time reports', 'Custom retention'],
    cta: 'contact',
  },
]

const hriTiers = [
  { range: '0–200 calls', price: 'HK$4.00/call' },
  { range: '201–1,000 calls', price: 'HK$3.00/call' },
  { range: '1,001–5,000 calls', price: 'HK$2.00/call' },
  { range: '5,001+', price: 'Negotiated' },
]

const rodaFeatures = [
  'NERMN dispatch',
  'NERMNDispatcher config',
  'NISSM sync',
  'Up to 3 robotic arms',
]

const cardClass =
  'bg-[#0d1421] border border-cyan-500/20 rounded-2xl p-6 flex flex-col gap-6'

export function PricingPage() {
  const [activeTab, setActiveTab] = useState<PricingTab>('soda')
  const navigate = useNavigate()

  const activePlans = useMemo(() => {
    if (activeTab === 'soda') return sodaPlans
    if (activeTab === 'voda') return vodaPlans
    return []
  }, [activeTab])

  const handleSignup = () => {
    navigate('/auth?mode=signup')
  }

  const renderPlanCard = (plan: PlanCard) => {
    const buttonLabel =
      plan.cta === 'trial' ? 'Start free trial' : plan.cta === 'start' ? 'Get started' : 'Contact sales'

    return (
      <div key={plan.name} className={cardClass}>
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">Plan</p>
          <h3 className="text-2xl font-semibold text-cyan-300 font-mono">{plan.name}</h3>
          <p className="text-3xl font-semibold text-white">{plan.price}</p>
        </div>

        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
              <Check size={16} weight="bold" className="text-cyan-300 mt-0.5" />
              <span className="font-mono">{feature}</span>
            </li>
          ))}
        </ul>

        {plan.cta === 'contact' ? (
          <a
            href="mailto:support@aurasensehk.com"
            className="mt-auto text-center rounded-lg border border-cyan-500/40 px-4 py-2 text-sm font-semibold text-white hover:border-cyan-400"
          >
            {buttonLabel}
          </a>
        ) : (
          <button
            type="button"
            onClick={handleSignup}
            className="mt-auto rounded-lg bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-400"
          >
            {buttonLabel}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-10">
          <header className="text-center space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300/70">Pricing</p>
            <h1 className="text-4xl font-semibold">Choose the right NEPA plan</h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Flexible plans for unmanned stores, video intelligence, APIs, and robotics.
            </p>
          </header>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-5 py-2 text-xs font-mono uppercase tracking-widest transition ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-200 bg-cyan-500/10'
                    : 'border-white/10 text-white/50 hover:border-cyan-400/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {(activeTab === 'soda' || activeTab === 'voda') && (
            <div className="grid gap-6 md:grid-cols-3">
              {activePlans.map(renderPlanCard)}
            </div>
          )}

          {activeTab === 'hri' && (
            <div className={cardClass}>
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">HRI API Pricing</p>
                <h2 className="text-2xl font-semibold text-cyan-300 font-mono">Usage-based tiers</h2>
                <p className="text-sm text-white/60">
                  Minimum commitment: HK$500/mo.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-cyan-500/20">
                <table className="w-full text-left text-sm">
                  <thead className="bg-cyan-500/10 text-cyan-200 font-mono">
                    <tr>
                      <th className="px-4 py-3">Monthly usage</th>
                      <th className="px-4 py-3">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-500/10">
                    {hriTiers.map((tier) => (
                      <tr key={tier.range}>
                        <td className="px-4 py-3 text-white/70 font-mono">{tier.range}</td>
                        <td className="px-4 py-3 text-white">{tier.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'roda' && (
            <div className={cardClass}>
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">RODA Add-on</p>
                <h2 className="text-2xl font-semibold text-cyan-300 font-mono">HK$15,000/mo</h2>
                <p className="text-sm text-white/60">
                  Requires Professional or Enterprise base plan.
                </p>
              </div>

              <ul className="space-y-3">
                {rodaFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                    <Check size={16} weight="bold" className="text-cyan-300 mt-0.5" />
                    <span className="font-mono">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
