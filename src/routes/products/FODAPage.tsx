import { ProductPage } from '@/components/pages/ProductPage'
import { Drone, ShieldCheck, Camera, MapPin, ChartLine, FileText } from '@phosphor-icons/react'

const featureGrid = [
  {
    icon: <Drone size={28} weight="duotone" />,
    title: 'Autonomous inspection',
    description: 'Edge-guided drone and facade inspection workflows.',
  },
  {
    icon: <Camera size={28} weight="duotone" />,
    title: 'Multispectral capture',
    description: 'Fuse thermal, RGB, and depth signals in the NEPA model.',
  },
  {
    icon: <MapPin size={28} weight="duotone" />,
    title: 'Geo-tagged memory',
    description: 'SignatureMaps retain building and structural memory.',
  },
  {
    icon: <ChartLine size={28} weight="duotone" />,
    title: 'Condition scoring',
    description: 'Detect drift and anomaly progression across inspections.',
  },
  {
    icon: <FileText size={28} weight="duotone" />,
    title: 'Evidence packs',
    description: 'CODA-ready reports with audit traces.',
  },
  {
    icon: <ShieldCheck size={28} weight="duotone" />,
    title: 'Safety governance',
    description: 'Flight safety and compliance controls per zone.',
  },
]

export function FODAPage() {
  return (
    <ProductPage
      eyebrow="FODA"
      title="FODA — Inspection intelligence for drone operations"
      subtitle="Optional aerial inspection layer for facilities and structural monitoring."
      ctaLabel="Book a briefing"
      ctaHref="/contact"
      secondaryCtaLabel="View docs"
      secondaryCtaHref="/docs"
      featureGrid={featureGrid}
      architectureTitle="Inspection pipeline"
      architectureDescription="FODA connects drone capture to NEPA world modeling and CODA reporting."
      pricingAnchor={{
        label: 'Need inspection deployments?',
        href: '/pricing',
        description: 'Contact us for inspection-specific pilots and compliance workflows.',
      }}
    />
  )
}
