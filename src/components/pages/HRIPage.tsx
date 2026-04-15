import ProductPage from './ProductPage'
import { Users, Brain, ChartBar, ShieldCheck } from '@phosphor-icons/react'

export default function HRIPage() {
  return (
    <ProductPage
      name="HRI"
      fullName="Human Response Intelligence API"
      tagline="Behavioral intelligence APIs for interviews, assessments, and high-stakes human decisions. NEPA cognition applied to human context with deterministic audit trails."
      nepaLayer="decide"
      nepaLayerLabel="NEPA DECIDE layer — cognition applied to human signals"
      pipelineSteps={[
        { step: 'capture', label: 'Signal Capture', active: true },
        { step: 'encode', label: 'NEPA Encoding', active: true },
        { step: 'reason', label: 'Cognition Engine', active: true },
        { step: 'score', label: 'Risk & Fit Scoring', active: true },
        { step: 'report', label: 'Decision Report', active: false },
      ]}
      ctaLabel="Request HRI API access"
      ctaHref="mailto:support@aurasensehk.com?subject=HRI API Access"
      ctaSecondaryLabel="View HRI documentation"
      ctaSecondaryHref="/docs/hri"
      integrationNote="Audit-grade scoring with full traceability"
      deployTarget="Cloud SaaS or private VPC"
      features={[
        {
          icon: Users,
          title: 'Behavioral Signal Capture',
          description:
            'Multi-modal intake for video, audio, and text responses. NEPA encodes structured behavioral signatures without storing raw media.',
        },
        {
          icon: Brain,
          title: 'Cognitive Reasoning Layer',
          description:
            'SignatureMap-driven reasoning models surface decision-ready insights with deterministic replay for compliance reviews.',
        },
        {
          icon: ChartBar,
          title: 'Decision & Risk Scoring',
          description:
            'Configurable scoring for fit, risk, and integrity signals. Outputs include probability bands, confidence thresholds, and escalation triggers.',
        },
        {
          icon: ShieldCheck,
          title: 'Governance & Traceability',
          description:
            'Every inference is logged with cryptographic provenance. Export-ready reports align with enterprise HR governance workflows.',
        },
      ]}
      terminalLines={[
        '> HRI v1.0 — intake stream ONLINE',
        '> signal_vector: 128 dims loaded',
        '> cognition_score: 0.82 (confidence 0.91)',
        '> risk_flags: ["inconsistency_low"]',
        '> report_generated: hri_eval_2024_0415.json',
        '> audit_chain sealed — export ready',
      ]}
import { Placeholder } from '@/components/Placeholder'

export default function HRIPage() {
  return (
    <Placeholder
      title="HRI — HR Intelligence"
      description="Interview analysis and candidate scoring powered by NEPA intelligence."
    />
  )
}
