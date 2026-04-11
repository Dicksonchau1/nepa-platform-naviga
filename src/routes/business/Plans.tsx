import { Link } from 'react-router-dom'

const AGENTS = [
  {
    code: 'VODA',
    name: 'Video Operations & Detection Agent',
    tiers: [
      { name: 'Free',       price: '$0',     capability: '3 diagnostic scans/mo, NEPA Diagnostic access' },
      { name: 'Creator',    price: '$29/mo',  capability: 'Vodec corrective workflows, unlimited diagnostics' },
      { name: 'Studio',     price: '$149/mo', capability: 'Team collaboration, batch processing, audit trails' },
      { name: 'Growth',     price: '$499/mo', capability: 'API access, analytics dashboard, governance tools' },
      { name: 'Enterprise', price: 'Custom',  capability: 'White-label, full API, dedicated SLA' },
    ],
  },
  {
    code: 'RODA',
    name: 'Robotic Operations & Dispatch Agent',
    tiers: [
      { name: 'Free',       price: '$0',     capability: 'Single robot simulation, mission preview' },
      { name: 'Operator',   price: '$49/mo',  capability: 'Live dispatch, obstacle detection, route logging' },
      { name: 'Fleet',      price: '$199/mo', capability: 'Multi-robot coordination, fleet audit trail' },
      { name: 'Enterprise', price: '$799/mo', capability: 'API access, GPS-denied ops, custom mission rules' },
      { name: 'Custom',     price: 'Custom',  capability: 'Full platform embedding, dedicated infrastructure' },
    ],
  },
  {
    code: 'SODA',
    name: 'Surveillance Operations Decision Agent',
    tiers: [
      { name: 'Free',       price: '$0',     capability: '2 camera lanes, motion detection, basic alert log' },
      { name: 'Operator',   price: '$49/mo',  capability: '8 lanes, rule builder, operator auth, email escalation' },
      { name: 'Facility',   price: '$199/mo', capability: '32 lanes, multi-operator, audit export, GDPR mode' },
      { name: 'Enterprise', price: '$799/mo', capability: 'Unlimited lanes, HIPAA mode, SIEM integration' },
      { name: 'Custom',     price: 'Custom',  capability: 'White-label, custom ingest pipelines, dedicated deployment' },
    ],
  },
  {
    code: 'EODA',
    name: 'Edge Operations & Diagnostics Agent',
    tiers: [
      { name: 'Free',       price: '$0',     capability: 'Single node monitoring, health dashboard' },
      { name: 'Node',       price: '$29/mo',  capability: 'Alert rules, firmware diff tracking, edge audit log' },
      { name: 'Fleet',      price: '$149/mo', capability: 'Multi-node, OTA management, compliance export' },
      { name: 'Enterprise', price: '$499/mo', capability: 'API access, SLA monitoring, custom rule sets' },
      { name: 'Custom',     price: 'Custom',  capability: 'Full platform embedding, dedicated node infrastructure' },
    ],
  },
  {
    code: 'FODA',
    name: 'Facility Operations & Detection Agent',
    tiers: [
      { name: 'Free',       price: '$0',     capability: 'Single zone, shelf anomaly detection preview' },
      { name: 'Operator',   price: '$49/mo',  capability: '4 zones, stock alert rules, session audit log' },
      { name: 'Facility',   price: '$199/mo', capability: '16 zones, multi-operator, GDPR mode, export' },
      { name: 'Enterprise', price: '$799/mo', capability: 'Unlimited zones, API access, analytics dashboard' },
      { name: 'Custom',     price: 'Custom',  capability: 'White-label, custom detection models, dedicated SLA' },
    ],
  },
]

const COLUMN_HEADERS = ['Tier', 'Price', 'Key capability']

export function Plans() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden relative">

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 -z-10" />
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(0,212,255,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 70% 75%, rgba(0,102,255,0.06) 0%, transparent 50%)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest text-white/60 uppercase mb-8">
            NEPA PLATFORM · BUSINESS
          </div>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6"
            style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)' }}
          >
            Plans
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/70 mb-6">
            One platform. Five agents. Transparent pricing.
          </p>
          <p className="text-base text-white/50 max-w-3xl leading-relaxed">
            Every NEPA agent — VODA, RODA, SODA, EODA, FODA — follows the same five-tier plan
            structure. Choose the agent you need and the tier that matches your operational scale.
            All plans include edge-native inference, audit trails, and NEPA Console access.
          </p>
        </div>
      </section>

      {/* Pricing tables */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-6xl space-y-12">
          {AGENTS.map((agent) => (
            <div key={agent.code}>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-1">
                  {agent.code}
                </span>
                <span className="text-sm text-white/50">{agent.name}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      {COLUMN_HEADERS.map((h) => (
                        <th
                          key={h}
                          className="text-left text-[11px] font-mono tracking-widest uppercase text-white/30 pb-3 pr-8 font-normal"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {agent.tiers.map((tier, i) => (
                      <tr
                        key={tier.name}
                        className={`border-b border-white/5 last:border-0 ${
                          i === 0 ? 'text-white/40' : 'text-white/80'
                        }`}
                      >
                        <td className="py-3 pr-8 text-sm font-medium w-32">{tier.name}</td>
                        <td className="py-3 pr-8 text-sm font-mono w-28">{tier.price}</td>
                        <td className="py-3 text-sm text-white/55 leading-relaxed">{tier.capability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="pb-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="border border-white/10 bg-white/[0.03] px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-base text-white/60 max-w-md">
              Not sure which agent fits your operation?
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about/contact"
                className="bg-white text-black font-semibold text-sm px-7 py-3 hover:bg-zinc-100 transition-colors"
              >
                Talk to us →
              </Link>
              <Link
                to="/resources/docs"
                className="border border-white/20 text-white/70 text-sm px-7 py-3 hover:border-white/40 hover:text-white transition-colors"
              >
                Read the docs →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
