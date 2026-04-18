import { ProductPage } from '@/components/pages/ProductPage'
import { User, FileText, ChartLine, Key, Bell, Lightning } from '@phosphor-icons/react'

const featureGrid = [
  {
    icon: <User size={28} weight="duotone" />,
    title: 'Interview sessions',
    description: 'Capture structured interview signals across sessions.',
  },
  {
    icon: <FileText size={28} weight="duotone" />,
    title: 'Transcript intelligence',
    description: 'Analyze transcripts with behavioral scoring.',
  },
  {
    icon: <ChartLine size={28} weight="duotone" />,
    title: 'Scorecards',
    description: 'Generate consistent scorecards and insight objects.',
  },
  {
    icon: <Lightning size={28} weight="duotone" />,
    title: 'Decision analytics',
    description: 'Track hiring outcomes and bias signals over time.',
  },
  {
    icon: <Key size={28} weight="duotone" />,
    title: 'API-first access',
    description: 'Tokenized API packages with clear quotas.',
  },
  {
    icon: <Bell size={28} weight="duotone" />,
    title: 'Webhook delivery',
    description: 'Push insights to ATS or internal tooling.',
  },
]

const architectureDiagram = (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-3">HRI API packages</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
        {[
          'Launch — small monthly API quota',
          'Growth — richer insight objects',
          'Scale — high-volume + batch jobs',
          'Enterprise — private tenancy + audit export',
        ].map((tier) => (
          <div key={tier} className="rounded-lg border border-border/40 bg-background/40 p-3">
            {tier}
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Metered by</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>• Interview sessions</li>
        <li>• Transcript minutes</li>
        <li>• Scorecards generated</li>
        <li>• API calls + webhook deliveries</li>
      </ul>
    </div>
  </div>
)

export function HRIPage() {
  return (
    <ProductPage
      eyebrow="HRI"
      title="HRI — HR intelligence API & interview analytics"
      subtitle="Developer-first HR intelligence with structured scoring, analytics, and evidence-ready reporting."
      ctaLabel="Start with HRI"
      ctaHref="/auth/sign-up"
      secondaryCtaLabel="View API"
      secondaryCtaHref="/docs/api"
      featureGrid={featureGrid}
      architectureTitle="Developer-ready packages"
      architectureDescription="HRI offers clean API call packages with quotas, overage, and retention controls."
      architectureDiagram={architectureDiagram}
      pricingAnchor={{
        label: 'HRI pricing packages',
        href: '/pricing',
        description: 'Select a package based on interview volume, transcript minutes, and webhook needs.',
      }}
    />
  )
}
