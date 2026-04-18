import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X } from '@phosphor-icons/react'

const PLANS = [
  {
    name: 'NEPA Diagnostic',
    price: 'Free',
    period: '',
    highlight: false,
    tag: 'Find issues before regenerating',
    features: [
      'Up to 3 diagnostic scans per month',
      'Motion inconsistency detection',
      'Jitter and lighting mismatch analysis',
      'Background quality assessment',
      'ROI anomaly detection',
      'NEPA inference engine access',
    ],
    cta: 'Start for free',
    to: '/signup',
  },
  {
    name: 'Creator',
    price: '$29',
    period: 'per month',
    highlight: true,
    tag: 'Turn diagnostics into action',
    features: [
      'Everything in Free',
      'Vodec corrective workflows',
      'Replay edits with predictable control',
      'Resolve localized issues automatically',
      'Unlimited diagnostics',
      'Priority processing queue',
    ],
    cta: 'Start Creator',
    to: '/signup',
  },
  {
    name: 'Studio',
    price: '$149',
    period: 'per month',
    highlight: false,
    tag: 'Built for collaborative video operations',
    features: [
      'Everything in Creator',
      'Shared workflows across teams',
      'Audit trails for all operations',
      'Batch processing capability',
      'Higher execution volume capacity',
      'Team collaboration tools',
    ],
    cta: 'Start Studio',
    to: '/about/contact',
  },
  {
    name: 'Growth',
    price: '$499',
    period: 'per month',
    highlight: false,
    tag: 'Scale video diagnostics and correction',
    features: [
      'Everything in Studio',
      'Governance and compliance tools',
      'Analytics and reporting dashboard',
      'API access for integrations',
      'Premium support',
      'Custom workflow templates',
    ],
    cta: 'Talk to us',
    to: '/about/contact',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    highlight: false,
    tag: 'Embed NEPA into production systems',
    features: [
      'Everything in Growth',
      'Full API access for platform embedding',
      'High-volume infrastructure',
      'White-label options',
      'Dedicated account manager',
      'Custom SLA and support',
    ],
    cta: 'Contact sales',
    to: '/about/contact',
  },
]

const FAQ = [
  {
    q: 'What does NEPA Diagnostic detect?',
    a: 'NEPA scans your video for motion inconsistency, frame jitter, lighting mismatches, background artifacts, and ROI anomalies — issues that degrade quality or break immersion. You get a detailed report before deciding whether to regenerate or correct.',
  },
  {
    q: 'How is this different from other video editing tools?',
    a: 'Most tools require manual frame-by-frame inspection. NEPA uses inference to automatically detect issues, and Vodec executes targeted corrections without guesswork. You save time and get predictable results.',
  },
  {
    q: 'What is Vodec?',
    a: 'Vodec is the corrective workflow engine in NEPA. It takes diagnostic findings and executes localized fixes — replay edits, color correction, temporal smoothing — without requiring manual keyframing or timeline scrubbing.',
  },
  {
    q: 'Can I use NEPA for client work?',
    a: 'Yes. Creator and above plans allow commercial use. Studio and Growth plans add team collaboration, audit trails, and governance for agency or production environments.',
  },
  {
    q: 'Do you offer API access?',
    a: 'Yes. Growth and Enterprise plans include API access so you can embed NEPA diagnostics and Vodec corrections into your own platform, CMS, or production pipeline.',
  },
  {
    q: 'What file formats does NEPA support?',
    a: 'NEPA processes MP4, MOV, WebM, and most standard video formats. If you have a specific codec requirement, contact us.',
  },
]

export function VODAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen text-white overflow-x-hidden relative">
      
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 -z-10" />

      <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-20">
        
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 40% 30%, rgba(0,212,255,0.10) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 65% 70%, rgba(0,102,255,0.07) 0%, transparent 50%)'
          }}
        />
        
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, transparent 30%, rgba(107,33,255,0.05) 70%, transparent 100%)'
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
            
            <h1 
              className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-8"
              style={{
                color: 'white',
                textShadow: '0 4px 12px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.2)',
                transform: 'translateZ(20px)',
              }}
            >
              VODA
            </h1>

            <p 
              className="text-2xl md:text-3xl font-light mb-6"
              style={{
                color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              Video Diagnostics & Correction
            </p>

            <p 
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
              style={{
                textShadow: '0 2px 6px rgba(0,0,0,0.4)',
              }}
            >
              Find what's wrong before you spend time regenerating. Turn diagnostics 
              into action with Vodec's corrective workflows.
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
                to="/about/contact"
                className="border-2 border-white/30 text-white font-semibold text-base px-10 py-4 hover:border-white/50 hover:bg-white/5 transition-all"
                style={{
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              Pricing
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Start free. Scale when ready. All plans include NEPA diagnostic engine.
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
                    className="text-2xl font-bold mb-2"
                    style={{
                      color: 'white',
                      textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-white/40 text-sm mb-4">{plan.tag}</p>
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="text-4xl font-black"
                      style={{
                        color: 'white',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                      }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-white/40 text-sm">{plan.period}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="shrink-0 mt-0.5 text-white/40" size={16} weight="bold" />
                      <span className="text-sm text-white/60">{feature}</span>
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
                  style={plan.highlight ? {
                    boxShadow: '0 4px 16px rgba(255,255,255,0.15)',
                  } : {}}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              FAQ
            </h2>
            <p className="text-white/60 text-lg">
              Common questions about NEPA and Vodec
            </p>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 border border-white/10 rounded-lg overflow-hidden"
                style={{
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span 
                    className="font-semibold text-lg"
                    style={{
                      color: 'white',
                      textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    {item.q}
                  </span>
                  <span className="text-white/40 text-2xl font-light">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-white/60 leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: 'white',
              textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            Ready to get started?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Sign up for free and run your first diagnostic scan. No credit card required.
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
              Ask NEPA about VODA →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
