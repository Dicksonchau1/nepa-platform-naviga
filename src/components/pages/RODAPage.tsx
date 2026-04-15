import ProductPage from './ProductPage'
import { ArrowsClockwise, Cpu, Package, Gear } from '@phosphor-icons/react'
export { RODAPage } from '@/routes/products/RODAPage'
import { ProductPage } from './ProductPage'
import { Path, GitBranch, UserCircleGear } from '@phosphor-icons/react'

export default function RODAPage() {
  return (
    <ProductPage
      name="RODA"
      fullName="Robotic Operations Dispatch Agent"
      tagline="NEPA-dispatched autonomous restocking. When NEPA detects a low-stock zone or clears a shrinkage alert, RODA dispatches the robotic arm — closing the loop from perception to physical action."
      nepaLayer="dispatch"
      nepaLayerLabel="NEPA ACT layer → NERMN physical execution"
      pipelineSteps={[
        { step: 'detect', label: 'NEPA Detects Low Stock', active: true },
        { step: 'score', label: 'Anomaly Score Fires', active: true },
        { step: 'dispatch', label: 'NERMNDispatcher', active: true },
        { step: 'execute', label: 'Robotic Arm Restocks', active: true },
        { step: 'confirm', label: 'NISSM Confirms', active: false },
      ]}
      ctaLabel="Request RODA integration spec"
      ctaHref="mailto:support@aurasensehk.com?subject=RODA Integration"
      ctaSecondaryLabel="Read RODA documentation"
      ctaSecondaryHref="/docs/roda"
      integrationNote="Add-on to SODA Professional or Enterprise plan"
      deployTarget="NERMN robotic arm + Jetson Orin NX"
      features={[
        {
          icon: Cpu,
          title: 'NEPA-Native Dispatch',
          description:
            'NERMN receives dispatch commands from NEPA\'s ACT layer via NERMNDispatcher. Each restock command carries store ID, zone, SKU, priority, and the triggering anomaly score.',
        },
        {
          icon: ArrowsClockwise,
          title: 'Closed-Loop Execution',
          description:
            'RODA operates in the full NEPA perception loop — not as a standalone robotics system. Every dispatch is triggered by a real behavioral signal, not a timer or manual trigger.',
        },
        {
          icon: Package,
          title: 'NISSM Operations Sync',
          description:
            'NISSM ties RODA into the full store management loop — inventory sync, supplier reorder triggers, and operational reporting via CODA. The store knows it has been restocked.',
        },
        {
          icon: Gear,
          title: 'Edge-First Execution',
          description:
            'Runs on Jetson Orin NX. Full stack boots via docker-compose up in under 90 seconds. RODA operates independently of cloud — decisions made at the edge, actions executed locally.',
        },
      ]}
      terminalLines={[
        '> RODA v1.0 — NERMN dispatcher ONLINE',
        '> AWAITING NEPA dispatch signal...',
        '> [NEPA] anomaly_score=0.73 zone=SHELF_B sku=SKU-4421',
        '> [RODA] dispatch: { store: HK-KLN-01, zone: SHELF_B, sku: SKU-4421, priority: HIGH }',
        '> [NERMN] arm ENGAGED — navigating to SHELF_B',
        '> [NERMN] restock COMPLETE — 4 units placed',
        '> [NISSM] inventory updated: SKU-4421 +4 units',
        '> [NEPA] anomaly cleared — zone SHELF_B → NORMAL',
      ]}
    />
  )
}
