import { ProductPage } from '@/components/pages/ProductPage'
import { Robot, Path, Lightning, Queue, ShieldCheck, Cube } from '@phosphor-icons/react'

const featureGrid = [
  {
    icon: <Robot size={28} weight="duotone" />,
    title: 'Restocking',
    description: 'Autonomous replenishment based on NEPA depletion signals.',
  },
  {
    icon: <Path size={28} weight="duotone" />,
    title: 'Aisle intervention',
    description: 'Recover blocked zones and resolve incidents in motion.',
  },
  {
    icon: <Lightning size={28} weight="duotone" />,
    title: 'Priority queueing',
    description: 'Task prioritization driven by anomaly scores and urgency.',
  },
  {
    icon: <Queue size={28} weight="duotone" />,
    title: 'NERMN task ingestion',
    description: 'Dispatch contracts flow directly from NEPA ACT layer.',
  },
  {
    icon: <ShieldCheck size={28} weight="duotone" />,
    title: 'Edge-safe execution',
    description: 'Local autonomy when connectivity is interrupted.',
  },
  {
    icon: <Cube size={28} weight="duotone" />,
    title: 'NISSM sync',
    description: 'Inventory reconciliation and operational reporting.',
  },
]

const architectureDiagram = (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-3">Closed-loop robotic flow</h3>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 text-xs text-muted-foreground">
        {[
          'Zone state detected',
          'NEPA anomaly score',
          'Dispatch generated',
          'NERMN receives task',
          'Robotic arm executes',
          'CODA logs completion',
        ].map((step) => (
          <div key={step} className="rounded-lg border border-border/40 bg-background/40 p-3 text-center">
            {step}
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Dispatch contract</h3>
      <div className="rounded-lg border border-border/40 bg-background/40 p-4 text-xs font-mono text-muted-foreground whitespace-pre-wrap">
        {`{
  "store_id": "HK-KLN-01",
  "zone": "A3",
  "sku": "WATER-500ML",
  "priority": "high",
  "trigger": "low_stock",
  "anomaly_score": 0.82
}`}
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Where RODA fits</h3>
      <p className="text-sm text-muted-foreground">SODA sees → NEPA reasons → RODA acts → CODA records.</p>
    </div>
  </div>
)

export function RODAPage() {
  return (
    <ProductPage
      eyebrow="RODA"
      title="RODA — Robotic execution for autonomous retail"
      subtitle="When NEPA detects a stock-out, blockage, or trigger, RODA converts intelligence into physical action."
      ctaLabel="Book pilot"
      ctaHref="/contact"
      secondaryCtaLabel="View dispatch contract"
      secondaryCtaHref="/docs"
      featureGrid={featureGrid}
      architectureTitle="Dispatch-to-action pipeline"
      architectureDescription="RODA executes NEPA decisions with deterministic task contracts and audit-ready completion signals."
      architectureDiagram={architectureDiagram}
      pricingAnchor={{
        label: 'Plan your robotic rollout',
        href: '/pricing',
        description: 'RODA is sold as a high-value add-on for SODA and fleet deployments.',
      }}
    />
  )
}
