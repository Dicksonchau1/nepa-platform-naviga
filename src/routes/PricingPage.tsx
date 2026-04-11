import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Minus } from '@phosphor-icons/react'

type Product = 'VODA' | 'SODA' | 'RODA'
type BillingPeriod = 'monthly' | 'annual'

const PRODUCT_COLORS = {
  VODA: '#00C8F0',
  SODA: '#6366F1',
  RODA: '#F59E0B',
}

const PRODUCT_DESCRIPTORS = {
  VODA: 'Video control substrate',
  SODA: 'Facility surveillance intelligence',
  RODA: 'Robot dispatch & orchestration',
}

const VODA_TIERS = [
  {
    name: 'Starter',
    price: 29,
    period: 'month',
    descriptor: 'Turn diagnostics into action.',
    features: [
      'Up to 3 diagnostic scans per month',
      'Basic corrective execution via VODA',
      'Localized ROI correction workflows',
      '1 seat · 10 active projects',
      '30-day project history',
      'Standard processing',
      'Email support',
    ],
    recommended: false,
  },
  {
    name: 'Team / Pro',
    price: 149,
    period: 'month',
    descriptor: 'Built for collaborative video operations.',
    features: [
      'Unlimited diagnostic scans',
      'Batch correction workflows',
      'Replayable audit-trailed edit histories',
      '3 seats · 50 active projects',
      '90-day project history',
      'Priority processing',
      'Usage analytics',
      'Priority support + email',
    ],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: null,
    period: 'custom',
    descriptor: 'Embed VODA into production systems.',
    features: [
      'API access + private deployment option',
      'Custom model routing and substrate config',
      'OEM / white-label options',
      'Unlimited seats and projects',
      'Custom project history retention',
      'SLA-backed uptime',
      'Dedicated onboarding',
      'Custom workflow and fine-tuning',
    ],
    recommended: false,
  },
]

const RODA_TIERS = [
  {
    name: 'Starter',
    price: 39,
    period: 'month',
    descriptor: 'Get your first robots dispatched.',
    features: [
      'Up to 5 registered devices (robots or drones)',
      'Basic fleet telemetry and status dashboard',
      'Basic task assignment and routing',
      'Single operator seat',
      'Mission queue with status tracking',
      'Standard response logging',
      'Email support',
    ],
    recommended: false,
  },
  {
    name: 'Team / Pro',
    price: 179,
    period: 'month',
    descriptor: 'Coordinate your fleet across zones.',
    features: [
      'Up to 25 registered devices',
      'Automated task routing and re-routing',
      'Full fleet management dashboard',
      'Mission planning and replay',
      '3 operator seats',
      'Cross-zone coordination',
      'Incident escalation and audit trail',
      'Priority support',
    ],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: null,
    period: 'custom',
    descriptor: 'Operate at fleet scale.',
    features: [
      'Unlimited registered devices',
      'AI-assisted autonomous dispatch decisions',
      'Multi-site fleet visibility and orchestration',
      'Custom operator seat count',
      'Custom mission workflows',
      'Full integration with VODA and SODA data layers',
      'SLA-backed operations',
      'Dedicated fleet operations engineer',
    ],
    recommended: false,
  },
]

const VODA_COMPARISON = [
  { feature: 'Diagnostic scans per month', starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Corrective execution', starter: true, pro: true, enterprise: true },
  { feature: 'Batch workflows', starter: false, pro: true, enterprise: true },
  { feature: 'Audit trail', starter: false, pro: true, enterprise: true },
  { feature: 'Seats included', starter: '1', pro: '3', enterprise: 'Custom' },
  { feature: 'Active projects', starter: '10', pro: '50', enterprise: 'Unlimited' },
  { feature: 'Project history', starter: '30 days', pro: '90 days', enterprise: 'Custom' },
  { feature: 'Processing priority', starter: 'Standard', pro: 'Priority', enterprise: 'Guaranteed' },
  { feature: 'API access', starter: false, pro: false, enterprise: true },
  { feature: 'White-label options', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated onboarding', starter: false, pro: false, enterprise: true },
  { feature: 'Custom fine-tuning', starter: false, pro: false, enterprise: true },
]

const RODA_COMPARISON = [
  { feature: 'Registered devices', starter: '5', pro: '25', enterprise: 'Unlimited' },
  { feature: 'Fleet telemetry', starter: 'Basic', pro: 'Full', enterprise: 'Advanced' },
  { feature: 'Task routing', starter: 'Basic', pro: 'Automated', enterprise: 'AI-assisted' },
  { feature: 'Operator seats', starter: '1', pro: '3', enterprise: 'Custom' },
  { feature: 'Mission planning', starter: false, pro: true, enterprise: true },
  { feature: 'Cross-zone coordination', starter: false, pro: true, enterprise: true },
  { feature: 'Multi-site orchestration', starter: false, pro: false, enterprise: true },
  { feature: 'Incident escalation', starter: false, pro: true, enterprise: true },
  { feature: 'Audit trail', starter: false, pro: true, enterprise: true },
  { feature: 'VODA/SODA integration', starter: false, pro: false, enterprise: true },
  { feature: 'SLA-backed uptime', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated engineer', starter: false, pro: false, enterprise: true },
]

export function PricingPage() {
  const [activeProduct, setActiveProduct] = useState<Product>('VODA')
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly')

  const accentColor = PRODUCT_COLORS[activeProduct]
  const currentTiers = activeProduct === 'VODA' ? VODA_TIERS : activeProduct === 'RODA' ? RODA_TIERS : []
  const currentComparison = activeProduct === 'VODA' ? VODA_COMPARISON : activeProduct === 'RODA' ? RODA_COMPARISON : []

  const getDiscountedPrice = (price: number | null) => {
    if (!price) return null
    return billingPeriod === 'annual' ? Math.round(price * 0.8) : price
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-20">
      
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
                >
                  Annual
                  {billingPeriod === 'annual' && (
                    <span className="ml-2 text-green-400 text-[10px]">Save 20%</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-7xl py-16">
        
        {/* SODA Enterprise Card */}
        {activeProduct === 'SODA' && (
          <div className="max-w-4xl mx-auto">
            <div
              className="border rounded-xl p-12 bg-white/[0.02] backdrop-blur-sm"
              style={{ borderColor: PRODUCT_COLORS.SODA + '40' }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4" style={{ color: PRODUCT_COLORS.SODA }}>
                  Surveillance intelligence built for your environment.
                </h2>
                <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
                  SODA is configured per facility, per fleet, and per jurisdictional requirement.
                  Pricing is scoped to your site count, zone complexity, and compliance obligations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {[
                  'Multi-site facility surveillance intelligence',
                  'Loitering, dwell, and scene anomaly detection',
                  'Cross-zone and cross-site event correlation',
                  'Severity-classified alert orchestration',
                  'Tamper-evident audit trail and evidence retention',
                  'Operator console with role-based access',
                  'Full integration with VODA and RODA data layers',
                  'SLA-backed uptime and dedicated operations engineer',
                  'Custom escalation and compliance workflows',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={18} weight="bold" style={{ color: PRODUCT_COLORS.SODA, flexShrink: 0, marginTop: 2 }} />
                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/about/contact"
                  className="inline-block font-semibold px-8 py-4 rounded-lg transition-all text-black"
                  style={{ backgroundColor: PRODUCT_COLORS.SODA }}
                >
                  Talk to the sales team
                </Link>
                <p className="text-xs text-white/30 mt-6 font-mono">
                  SODA is available to enterprise and institutional clients only. No self-serve plan is available.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VODA & RODA Tier Cards */}
        {activeProduct !== 'SODA' && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {currentTiers.map((tier) => {
                const discountedPrice = getDiscountedPrice(tier.price)
                const originalPrice = tier.price

                return (
                  <div
                    key={tier.name}
                    className={`border rounded-xl p-8 bg-white/[0.02] backdrop-blur-sm transition-all ${
                      tier.recommended ? 'ring-2' : ''
                    }`}
                    style={{
                      borderColor: tier.recommended ? accentColor + '60' : 'rgba(255,255,255,0.1)',
                      boxShadow: tier.recommended ? `0 0 40px ${accentColor}20, 0 0 0 2px ${accentColor}40` : 'none',
                    }}
                  >
                    {tier.recommended && (
                      <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                        style={{ backgroundColor: accentColor + '20', color: accentColor }}
                      >
                        RECOMMENDED
                      </div>
                    )}

                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-sm text-white/40 mb-6">{tier.descriptor}</p>

                    <div className="mb-8">
                      {tier.price ? (
                        <>
                          {billingPeriod === 'annual' && (
                            <div className="text-white/30 line-through text-lg mb-1">
                              ${originalPrice}
                            </div>
                          )}
                          <div className="flex items-baseline gap-1">
                            <span
                              className="text-5xl font-bold"
                              style={{ color: billingPeriod === 'annual' ? accentColor : 'white' }}
                            >
                              ${discountedPrice}
                            </span>
                            <span className="text-white/40">/{tier.period}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-4xl font-bold text-white/70">Custom</div>
                      )}
                    </div>

                    <div className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check size={16} weight="bold" style={{ color: accentColor, flexShrink: 0, marginTop: 2 }} />
                          <span className="text-sm text-white/60">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={tier.price ? '/signup' : '/about/contact'}
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                        tier.recommended
                          ? 'text-black'
                          : 'border text-white/70'
                      }`}
                      style={{
                        backgroundColor: tier.recommended ? accentColor : 'transparent',
                        borderColor: tier.recommended ? 'transparent' : 'rgba(255,255,255,0.15)',
                      }}
                    >
                      {tier.price ? 'Get started' : 'Contact us'}
                    </Link>
                  </div>
                )
              })}
            </div>

            {/* Feature Comparison Table */}
            <div className="border border-white/8 rounded-xl overflow-hidden bg-[#080B12]">
              <div className="p-6 border-b border-white/8">
                <h3 className="text-xl font-bold">Feature comparison</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="text-left p-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                        Feature
                      </th>
                      <th className="text-center p-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                        Starter
                      </th>
                      <th className="text-center p-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                        Team / Pro
                      </th>
                      <th className="text-center p-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentComparison.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-sm text-white/60">{row.feature}</td>
                        <td className="p-4 text-center">
                          {typeof row.starter === 'boolean' ? (
                            row.starter ? (
                              <Check size={18} weight="bold" style={{ color: accentColor, margin: '0 auto' }} />
                            ) : (
                              <Minus size={18} className="text-white/20 mx-auto" />
                            )
                          ) : (
                            <span className="font-mono text-xs text-white/60">{row.starter}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.pro === 'boolean' ? (
                            row.pro ? (
                              <Check size={18} weight="bold" style={{ color: accentColor, margin: '0 auto' }} />
                            ) : (
                              <Minus size={18} className="text-white/20 mx-auto" />
                            )
                          ) : (
                            <span className="font-mono text-xs text-white/60">{row.pro}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.enterprise === 'boolean' ? (
                            row.enterprise ? (
                              <Check size={18} weight="bold" style={{ color: accentColor, margin: '0 auto' }} />
                            ) : (
                              <Minus size={18} className="text-white/20 mx-auto" />
                            )
                          ) : (
                            <span className="font-mono text-xs text-white/60">{row.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Footer Note */}
        <div className="mt-16 text-center border-t border-white/8 pt-12">
          <p className="text-white/40 text-sm leading-relaxed max-w-3xl mx-auto">
            All plans include the NEPA edge inference engine.
            <br />
            No video, sensor, or operational data leaves your device.
          </p>
        </div>
      </div>
    </div>
  )
}
