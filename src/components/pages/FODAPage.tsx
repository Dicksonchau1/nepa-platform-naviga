export { FODAPage } from '@/routes/products/FODAPage'
import { ProductPage } from './ProductPage'
import { Drone, Scan, Certificate } from '@phosphor-icons/react'

export function FODAPage() {
  return (
    <ProductPage
      eyebrow="NEPA PLATFORM · FACADE AGENT"
      title="FODA — Facade Operations Decision Agent"
      subtitle="Aerial inspection infrastructure for building facades. Every run cryptographically sealed."
      features={[
        {
          icon: <Drone size={40} />,
          title: 'Drone Edge Node',
          description:
            'Real-time neuromorphic inference running on-board the drone during flight. No telemetry delays. Immediate fault detection with GPS-tagged evidence and thermal overlay.',
        },
        {
          icon: <Scan size={40} />,
          title: 'Thermal + RGB Fusion',
          description:
            'Multi-spectral sensor fusion using spike-timing correlation. Detect structural anomalies invisible to human inspection. Surface temperature variance mapped to structural stress points.',
        },
        {
          icon: <Certificate size={40} />,
          title: 'Replay-Certified Evidence',
          description:
            'Every flight run cryptographically sealed at completion. Full deterministic replay capability for regulatory compliance and insurance claims. Immutable chain of custody from flight to report.',
        },
      ]}
      integrationTitle="How FODA Connects to NEPA Core"
      integrationDescription="FODA deploys the NEPA inference core on drone edge hardware for real-time facade inspection. Supports DJI SDK and custom flight controllers. Post-flight evidence packages include raw sensor data, inference decisions, and cryptographic seals."
    />
  )
}
