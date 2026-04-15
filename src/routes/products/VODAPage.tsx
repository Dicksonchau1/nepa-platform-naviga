import { ProductPage } from '@/components/pages/ProductPage'
import { VideoCamera, Sparkle, ShieldCheck, FlowArrow, FileText, ChartLine } from '@phosphor-icons/react'

const featureGrid = [
  {
    icon: <VideoCamera size={28} weight="duotone" />,
    title: 'Ingest',
    description: 'RTSP, uploaded clips, CCTV, and edge capture.',
  },
  {
    icon: <Sparkle size={28} weight="duotone" />,
    title: 'Interpret',
    description: 'Object, behavior, and zone-state anomaly scoring.',
  },
  {
    icon: <FlowArrow size={28} weight="duotone" />,
    title: 'Consult',
    description: 'Optional LLM escalation only when thresholds fire.',
  },
  {
    icon: <FileText size={28} weight="duotone" />,
    title: 'Compose',
    description: 'Timeline, captions, narration, and evidence packs.',
  },
  {
    icon: <ChartLine size={28} weight="duotone" />,
    title: 'Deliver',
    description: 'Dashboard, email, webhooks, and API responses.',
  },
  {
    icon: <ShieldCheck size={28} weight="duotone" />,
    title: 'Cost discipline',
    description: 'Fast path for normal frames; escalate anomalies only.',
  },
]

const architectureDiagram = (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-3">Example result object</h3>
      <div className="rounded-lg border border-border/40 bg-background/40 p-4 text-xs font-mono text-muted-foreground whitespace-pre-wrap">
        {`{
  "anomaly_score": 0.91,
  "triggers": ["loitering", "zone_breach"],
  "predicted_state": "risk",
  "consultation": { "provider": "claude", "confidence": 0.87 },
  "coda_report_queued": true
}`}
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Use cases</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>• Retail incident reporting</li>
        <li>• Compliance evidence packs</li>
        <li>• Security review summaries</li>
        <li>• Operations + executive reporting</li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">SaaS product modes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
        {[
          'Upload + report',
          'Live monitor + alert',
          'Fleet summary + weekly trends',
          'API-only integration',
        ].map((mode) => (
          <div key={mode} className="rounded-lg border border-border/40 bg-background/40 p-3">
            {mode}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export function VODAPage() {
  return (
    <ProductPage
      eyebrow="VODA / CODA"
      title="VODA / CODA — From raw video to decision-ready evidence"
      subtitle="VODA delivers neuromorphic video intelligence. CODA synthesizes narrative evidence reports so every alert is boardroom-ready."
      ctaLabel="Start pilot"
      ctaHref="/contact"
      secondaryCtaLabel="View API"
      secondaryCtaHref="/docs/api"
      featureGrid={featureGrid}
      architectureTitle="Full pipeline"
      architectureDescription="VODA and CODA form a video-to-decision SaaS pipeline with intelligent routing and cost-efficient escalation."
      architectureDiagram={architectureDiagram}
      pricingAnchor={{
        label: 'Usage-based pricing',
        href: '/pricing',
        description: 'Meter by processed minutes, live stream hours, reports rendered, and consultation calls.',
      }}
    />
  )
}
