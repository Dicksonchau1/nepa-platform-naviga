import { ProductPage } from './ProductPage'
import { Video, GitBranch, CheckCircle } from '@phosphor-icons/react'

interface VODAPageProps {
  onNavigate: (page: string) => void
}

export function VODAPage({ onNavigate }: VODAPageProps) {
  return (
    <ProductPage
      eyebrow="NEPA PLATFORM · VIDEO AGENT"
      title="VODA — Video Operations Decision Agent"
      subtitle="Governed video diagnostics infrastructure. Deterministic. Auditable. Edge-deployable."
      features={[
        {
          icon: <Video size={40} />,
          title: 'Stream Ingestion',
          description:
            'Multi-lane video ingestion with per-stream isolation. Frame-level timestamping ensures reproducible replay of entire inference sessions.',
        },
        {
          icon: <GitBranch size={40} />,
          title: 'Governed Inference',
          description:
            'Every detection passes through deterministic spike-timing gates. No probabilistic drift across runs. Identical frames always produce identical outputs.',
        },
        {
          icon: <CheckCircle size={40} />,
          title: 'POE Evidence Chain',
          description:
            'Cryptographically sealed proof-of-execution for every frame processed. Complete audit trail from camera feed to final decision, immutable and verifiable.',
        },
      ]}
      integrationTitle="How VODA Connects to NEPA Core"
      integrationDescription="VODA runs on the same neuromorphic inference engine as all other XODA agents. Deploy via REST or gRPC endpoints. Real-time or batch processing modes available. Fully containerized for edge or cloud deployment."
      onNavigate={onNavigate}
    />
  )
}
