import ProductPage from './ProductPage'
export { FODAPage } from '@/routes/products/FODAPage'
import { ProductPage } from './ProductPage'
import { Drone, Scan, Certificate } from '@phosphor-icons/react'

export default function FODAPage() {
  return (
    <ProductPage
      name="FODA"
      fullName="Facade Operations Decision Agent"
      tagline="Aerial inspection infrastructure for building facades. Every run cryptographically sealed."
      nepaLayer="perceive"
      nepaLayerLabel="NEPA spike processing — drone frame analysis"
      pipelineSteps={[
        { step: 'drone', label: 'Drone Frame Capture', active: true },
        { step: 'nepa', label: 'NEPA Spike Processing', active: true },
        { step: 'audit', label: 'Audit Chain Sealed', active: true },
        { step: 'replay', label: 'Replay Verified', active: true },
        { step: 'report', label: 'Governance Report', active: false },
      ]}
      ctaLabel="Request FODA briefing"
      ctaHref="mailto:support@aurasensehk.com?subject=FODA Inspection Briefing"
      ctaSecondaryLabel="View governance documentation"
      ctaSecondaryHref="/docs/foda"
      integrationNote="Deterministic replay — audit-grade evidence"
      deployTarget="Drone edge node + enterprise hub"
      features={[
        {
          icon: Drone,
          title: 'Drone Edge Node',
          description:
            'Real-time neuromorphic inference running on-board the drone during flight. No telemetry delays. Immediate fault detection with GPS-tagged evidence and thermal overlay.',
        },
        {
          icon: Scan,
          title: 'Thermal + RGB Fusion',
          description:
            'Multi-spectral sensor fusion using spike-timing correlation. Detect structural anomalies invisible to human inspection. Surface temperature variance mapped to structural stress points.',
        },
        {
          icon: Certificate,
          title: 'Replay-Certified Evidence',
          description:
            'Every flight run cryptographically sealed at completion. Full deterministic replay capability for regulatory compliance and insurance claims. Immutable chain of custody from flight to report.',
        },
      ]}
      terminalLines={[
        '> FODA v1.0 — drone node CONNECTED',
        '> frame_batch=204 → spike stream READY',
        '> anomaly=facade_crack score=0.82',
        '> audit_chain sealed — hash 9f2a…b71d',
        '> replay verified — 0 drift detected',
        '> governance_report queued: HK-CENTRAL-12',
      ]}
    />
  )
}
