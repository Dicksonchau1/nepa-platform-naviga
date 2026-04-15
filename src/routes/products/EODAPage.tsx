import EODAPageComponent from '@/components/pages/EODAPage'
import { ProductPage } from '@/components/pages/ProductPage'
import { Circuitry, CloudArrowUp, ShieldCheck } from '@phosphor-icons/react'

const featureGrid = [
  {
    icon: <Circuitry size={28} weight="duotone" />,
    title: 'Edge runtime',
    description: 'Hardware-agnostic inference runtime for edge nodes.',
  },
  {
    icon: <CloudArrowUp size={28} weight="duotone" />,
    title: 'Fleet provisioning',
    description: 'Provision, update, and monitor distributed edge fleets.',
  },
  {
    icon: <ShieldCheck size={28} weight="duotone" />,
    title: 'Compliance controls',
    description: 'Secure runtime with audit-ready logging.',
  },
]

export function EODAPage() {
  return (
    <ProductPage
      eyebrow="EODA"
      title="EODA — Edge runtime for NEPA deployments"
      subtitle="Deploy NEPA inference across Jetson-class hardware with fleet-grade management."
      ctaLabel="Request briefing"
      ctaHref="/contact"
      secondaryCtaLabel="View docs"
      secondaryCtaHref="/docs"
      featureGrid={featureGrid}
      architectureTitle="Edge runtime stack"
      architectureDescription="EODA powers the on-device runtime for SODA, RODA, and VODA deployments."
      pricingAnchor={{
        label: 'Need edge deployment?',
        href: '/pricing',
        description: 'EODA is bundled with NEPA deployments and enterprise pilots.',
      }}
    />
  )
import { EODAPage as OriginalEODAPage } from '@/components/pages/EODAPage'

export function EODAPage() {
  return <EODAPageComponent />
}
