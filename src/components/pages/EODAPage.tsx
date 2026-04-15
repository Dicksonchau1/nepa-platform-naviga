import ProductPage from './ProductPage'
import { Cpu, Lightning, CloudSlash, ShieldCheck } from '@phosphor-icons/react'

export default function EODAPage() {
  return (
    <ProductPage
      name="EODA"
      fullName="Edge Operations Decision Agent"
      tagline="Neuromorphic inference at the hardware boundary. No cloud dependency. No latency compromise."
      nepaLayer="perceive"
      nepaLayerLabel="NEPA PERCEIVE layer — edge-first inference"
      pipelineSteps={[
        { step: 'sense', label: 'Edge Sensors Live', active: true },
        { step: 'encode', label: 'Spike Encoding', active: true },
        { step: 'infer', label: 'NEPA Inference', active: true },
        { step: 'dispatch', label: 'Local Action', active: true },
        { step: 'report', label: 'Local Audit', active: false },
      ]}
      ctaLabel="Request EODA deployment brief"
      ctaHref="/auth?mode=signup"
      ctaSecondaryLabel="View edge documentation"
      ctaSecondaryHref="/docs/eoda"
      integrationNote="Edge-only inference — no cloud dependency"
      deployTarget="Jetson Orin · Xavier · x86 edge"
      features={[
        {
          icon: Cpu,
          title: 'Hardware-Agnostic Deployment',
          description:
            'Run on any edge-class hardware: ARM, x86, RISC-V, or neuromorphic accelerators. Same deterministic inference core across all platforms with platform-specific optimizations.',
        },
        {
          icon: Lightning,
          title: 'Sub-2ms Latency Contract',
          description:
            'Guaranteed inference latency under 2ms for edge-class workloads. No network round-trips. No variability from cloud infrastructure. Deterministic timing for safety-critical applications.',
        },
        {
          icon: CloudSlash,
          title: 'Bandwidth Reduction',
          description:
            'Process data at the edge, transmit only structured decisions. 1000x bandwidth reduction compared to raw sensor data upload. Works fully offline with eventual sync.',
        },
        {
          icon: ShieldCheck,
          title: 'Deterministic Audit Trail',
          description:
            'Local audit ledger seals every inference cycle with cryptographic hashes. Replay any decision without cloud access and verify compliance on-device.',
        },
      ]}
      terminalLines={[
        '> EODA v1.0 — edge node ONLINE',
        '> inference_cycle: 1.7ms (p95)',
        '> spike_encoder: ready — channels=64',
        '> local_action: trigger relay=DOOR_LOCK',
        '> audit_chain: 224 entries verified',
        '> sync: offline buffer 0 pending',
      ]}
    />
  )
}
