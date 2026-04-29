import { ProductPage } from './ProductPage'
import { MonitorPlay, BellRinging, IdentificationBadge } from '@phosphor-icons/react'

export function SODAPage() {
  return (
    <ProductPage
      eyebrow="NEPA PLATFORM · SURVEILLANCE AGENT"
      title="SODA — Surveillance Operations Decision Agent"
      subtitle="Multi-camera facility intelligence. Deterministic alert escalation. Operator-authenticated chain of custody."
      features={[
        {
          icon: <MonitorPlay size={40} />,
          title: 'Multi-Lane Camera Processing',
          description:
            'Independent neuromorphic inference lanes per camera. No shared mutable state. Each stream processed in isolation with deterministic spike-timing decisions and per-lane audit trails.',
        },
        {
          icon: <BellRinging size={40} />,
          title: 'Alert Escalation Engine',
          description:
            'Rule-based escalation from detection to operator notification. Every alert includes full inference provenance: which frames triggered which rules, with cryptographic proof.',
        },
        {
          icon: <IdentificationBadge size={40} />,
          title: 'Audit Trail Per Session',
          description:
            'Operator authentication logged for every session. All actions timestamped and sealed. Complete chain of custody from camera feed to operator response for compliance and legal proceedings.',
        },
      ]}
      integrationTitle="How SODA Connects to NEPA Core"
      integrationDescription="SODA runs the NEPA inference core across distributed camera nodes. Central control plane for rule management and alert aggregation. Supports ONVIF cameras and custom RTSP streams. Full GDPR and HIPAA compliance mode available."
    />
  )
}
