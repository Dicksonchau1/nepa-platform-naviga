import { ProductPage } from '@/components/pages/ProductPage'
import { Eye, Radar, ShieldCheck, SquaresFour, Bell, Layout } from '@phosphor-icons/react'

const featureGrid = [
  {
    icon: <Eye size={28} weight="duotone" />,
    title: 'Entrance Intelligence',
    description: 'Track entry, exit, and customer flow with precision and zone context.',
  },
  {
    icon: <Radar size={28} weight="duotone" />,
    title: 'Shelf & Zone Analytics',
    description: 'Detect dwell, depletion, and unusual movement in every lane.',
  },
  {
    icon: <ShieldCheck size={28} weight="duotone" />,
    title: 'Loss Prevention',
    description: 'Identify shrinkage signals and anomaly patterns in real time.',
  },
  {
    icon: <SquaresFour size={28} weight="duotone" />,
    title: 'Inventory Awareness',
    description: 'Maintain live stock-state awareness for every SKU zone.',
  },
  {
    icon: <Bell size={28} weight="duotone" />,
    title: 'Alert Orchestration',
    description: 'Queue actions, lock zones, and notify operators instantly.',
  },
  {
    icon: <Layout size={28} weight="duotone" />,
    title: 'Operator Dashboard',
    description: 'Unified command center with audit-ready reporting.',
  },
]

const architectureDiagram = (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-3">How SODA works</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-muted-foreground">
        {[
          ['Observe', 'Cameras, shelf zones, entry/exit, POS context'],
          ['Interpret', 'Customer path, dwell anomalies, shrinkage signals'],
          ['Respond', 'Notify operator, queue RODA restock, CODA report'],
          ['Learn', 'Zone-level memory and operational tuning'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-lg border border-border/40 bg-background/40 p-4">
            <div className="text-xs uppercase tracking-widest text-primary/70">{title}</div>
            <p className="mt-2 text-xs leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Store command center</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
        {[
          'Live camera lanes + zone map',
          'Anomaly queue + low-stock heatmap',
          'Active incidents + operator actions',
          'RODA task queue + CODA reports',
        ].map((item) => (
          <div key={item} className="rounded-lg border border-border/40 bg-background/40 p-4">
            {item}
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Pilot-ready deployment</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>• 1 room / kiosk deployment</li>
        <li>• 3 cameras + store layout map</li>
        <li>• One operator dashboard + alert channel</li>
        <li>• One restocking flow via RODA dispatch</li>
      </ul>
    </div>
  </div>
)

export function SODAPage() {
  return (
    <ProductPage
      eyebrow="SODA"
      title="SODA — The unmanned store operating system"
      subtitle="Turn any retail space into a 24/7 autonomous unit with perception, behavioral intelligence, alerting, and robotic handoff."
      ctaLabel="Book pilot"
      ctaHref="/contact"
      secondaryCtaLabel="View architecture"
      secondaryCtaHref="/docs"
      featureGrid={featureGrid}
      architectureTitle="Autonomous store loop"
      architectureDescription="SODA observes, interprets, responds, and learns — all within the NEPA world model."
      architectureDiagram={architectureDiagram}
      pricingAnchor={{
        label: 'Ready for pilot deployment?',
        href: '/pricing',
        description: 'Start with a single store pilot and scale to a fleet-ready SODA deployment.',
      }}
    />
  )
}
