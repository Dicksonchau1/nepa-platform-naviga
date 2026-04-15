import { ProductPage } from '@/components/pages/ProductPage'
import { Eye, Circuitry, MapPin, Lightning, ChatText, Rocket, FileText } from '@phosphor-icons/react'
import { LiveBadge } from '@/components/LiveBadge'
import { TerminalLine } from '@/components/TerminalLine'

const featureGrid = [
  {
    icon: <Eye size={28} weight="duotone" />,
    title: 'Edge Perception',
    description: 'Neuromorphic inference runs at the edge with deterministic latency.',
  },
  {
    icon: <Circuitry size={28} weight="duotone" />,
    title: 'SignatureMap Learning',
    description: 'Every frame updates time-indexed world state and behavioral priors.',
  },
  {
    icon: <MapPin size={28} weight="duotone" />,
    title: 'Spatial Memory',
    description: 'Live store memory of zones, entities, and persistent anomalies.',
  },
  {
    icon: <Lightning size={28} weight="duotone" />,
    title: 'Anomaly Prediction',
    description: 'Predictive state scoring for risk and operational drift.',
  },
  {
    icon: <ChatText size={28} weight="duotone" />,
    title: 'Consultation Layer',
    description: 'Optional LLM escalation only when thresholds fire.',
  },
  {
    icon: <Rocket size={28} weight="duotone" />,
    title: 'Dispatch Layer',
    description: 'Action contracts for alerts, gates, robots, and systems.',
  },
  {
    icon: <FileText size={28} weight="duotone" />,
    title: 'Replay & Evidence',
    description: 'CODA-compatible evidence traces for audits and reviews.',
  },
]

const architectureDiagram = (
  <div className="space-y-6">
    <LiveBadge label="WORLD MODEL LIVE" />
    <div className="space-y-2">
      <TerminalLine label="SignatureMap" value="zones + entities" delay={150} />
      <TerminalLine label="Memory" value="behavioral priors" delay={300} />
      <TerminalLine label="Consult" value="on-demand LLM" delay={450} />
      <TerminalLine label="Dispatch" value="alerts + robotics" delay={600} />
      <TerminalLine label="Replay" value="CODA evidence" delay={750} />
    </div>
    <p className="text-sm text-muted-foreground">
      Most systems detect events. NEPA maintains a world state.
    </p>
  </div>
)

export function NepaAgentPage() {
  return (
    <ProductPage
      eyebrow="NEPA"
      title="NEPA — The operational world model behind AuraSense"
      subtitle="NEPA builds a behavioral world model from SignatureMaps, updates on every frame, and continuously trains store state for autonomous operations."
      ctaLabel="Explore platform"
      ctaHref="/platform"
      secondaryCtaLabel="View docs"
      secondaryCtaHref="/docs"
      featureGrid={featureGrid}
      architectureTitle="Living system architecture"
      architectureDescription="NEPA is the intelligence core that perceives, reasons, and dispatches across all AuraSense products."
      architectureDiagram={architectureDiagram}
      pricingAnchor={{
        label: 'Need NEPA access?',
        href: '/pricing',
        description: 'All AuraSense plans include NEPA engine access and world-model APIs.',
      }}
    />
  )
}
