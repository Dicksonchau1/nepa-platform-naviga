import { ProductPage } from './ProductPage'
import { Users, Brain, ChartBar, ShieldCheck } from '@phosphor-icons/react'

export default function HRIPage() {
  return (
    <ProductPage
      eyebrow="NEPA PLATFORM · HRI API"
      title="HRI — Human Response Intelligence API"
      subtitle="Behavioral intelligence APIs for interviews, assessments, and high-stakes human decisions. NEPA cognition applied to human context with deterministic audit trails."
      features={[
        {
          icon: <Users size={40} />,
          title: 'Behavioral Signal Capture',
          description:
            'Multi-modal intake for video, audio, and text responses. NEPA encodes structured behavioral signatures without storing raw media.',
        },
        {
          icon: <Brain size={40} />,
          title: 'Cognitive Reasoning Layer',
          description:
            'SignatureMap-driven reasoning models surface decision-ready insights with deterministic replay for compliance reviews.',
        },
        {
          icon: <ChartBar size={40} />,
          title: 'Decision & Risk Scoring',
          description:
            'Configurable scoring for fit, risk, and integrity signals. Outputs include probability bands, confidence thresholds, and escalation triggers.',
        },
        {
          icon: <ShieldCheck size={40} />,
          title: 'Governance & Traceability',
          description:
            'Every inference is logged with cryptographic provenance. Export-ready reports align with enterprise HR governance workflows.',
        },
      ]}
      integrationTitle="How HRI Connects to NEPA Core"
      integrationDescription="Audit-grade scoring with full traceability across interview sessions. Deploy in cloud SaaS or private VPC environments with deterministic replay for compliance."
    />
  )
}
