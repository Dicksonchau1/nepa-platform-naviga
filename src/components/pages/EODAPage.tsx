import { ProductPage } from './ProductPage'
import { Cpu, Lightning, CloudSlash } from '@phosphor-icons/react'

export function EODAPage() {
  return (
    <ProductPage
      eyebrow="NEPA PLATFORM · EDGE AGENT"
      title="EODA — Edge Operations Decision Agent"
      subtitle="Neuromorphic inference at the hardware boundary. No cloud dependency. No latency compromise."
      features={[
        {
          icon: <Cpu size={40} />,
          title: 'Hardware-Agnostic Deployment',
          description:
            'Run on any edge-class hardware: ARM, x86, RISC-V, or neuromorphic accelerators. Same deterministic inference core across all platforms with platform-specific optimizations.',
        },
        {
          icon: <Lightning size={40} />,
          title: 'Sub-2ms Latency Contract',
          description:
            'Guaranteed inference latency under 2ms for edge-class workloads. No network round-trips. No variability from cloud infrastructure. Deterministic timing for safety-critical applications.',
        },
        {
          icon: <CloudSlash size={40} />,
          title: 'Bandwidth Reduction',
          description:
            'Process data at the edge, transmit only structured decisions. 1000x bandwidth reduction compared to raw sensor data upload. Works fully offline with eventual sync.',
        },
      ]}
      integrationTitle="How EODA Connects to NEPA Core"
      integrationDescription="EODA is a thin-client deployment of the NEPA inference engine optimized for edge hardware. Minimal footprint, maximum performance. Deploy as a binary, container, or embedded library. Full offline operation with optional cloud sync."
    />
  )
}
