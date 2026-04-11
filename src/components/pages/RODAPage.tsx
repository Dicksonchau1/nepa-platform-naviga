import { ProductPage } from './ProductPage'
import { Path, GitBranch, UserCircleGear } from '@phosphor-icons/react'

interface RODAPageProps {
  onNavigate: (page: string) => void
}

export function RODAPage({ onNavigate }: RODAPageProps) {
  return (
    <ProductPage
      eyebrow="NEPA PLATFORM · ROBOTIC AGENT"
      title="RODA — Robotic Operations Decision Agent"
      subtitle="Spike-timing adaptive navigation and mission control for autonomous ground systems."
      features={[
        {
          icon: <Path size={40} />,
          title: 'Path Adaptation',
          description:
            'Real-time neuromorphic path planning using spike-timing-dependent plasticity. Dynamic obstacle avoidance with deterministic decision replay for post-mission analysis.',
        },
        {
          icon: <GitBranch size={40} />,
          title: 'Mission State Machine',
          description:
            'Structured mission control with explicit state transitions. Every command and sensor input logged with cryptographic timestamps for complete mission traceability.',
        },
        {
          icon: <UserCircleGear size={40} />,
          title: 'HRI Escalation',
          description:
            'Human-robot interaction escalation when confidence thresholds are not met. Operator-in-the-loop decision points with full context handoff and resumption support.',
        },
      ]}
      integrationTitle="How RODA Connects to NEPA Core"
      integrationDescription="RODA leverages the NEPA spike-timing inference core for real-time path adaptation and mission control. Deploy on embedded robotic platforms or command-and-control stations. Full ROS2 compatibility for sensor fusion and actuator control."
      onNavigate={onNavigate}
    />
  )
}
