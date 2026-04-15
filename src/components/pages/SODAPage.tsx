import ProductPage from './ProductPage'
import { ShieldCheck, Eye, Brain, Robot } from '@phosphor-icons/react'
export { SODAPage } from '@/routes/products/SODAPage'
import { ProductPage } from './ProductPage'
import { MonitorPlay, BellRinging, IdentificationBadge } from '@phosphor-icons/react'

export default function SODAPage() {
  return (
    <ProductPage
      name="SODA"
      fullName="Store Operating Decision Agent"
      tagline="A fully autonomous unmanned store intelligence system. SODA turns any convenience store into a 24/7 self-operating unit — no staff required, zero blind spots, real-time behavioral intelligence."
      nepaLayer="dispatch"
      nepaLayerLabel="NEPA DISPATCH layer — perception drives store decisions"
      pipelineSteps={[
        { step: 'perceive', label: 'NEPA Perceives', active: true },
        { step: 'map', label: 'SignatureMap Updates', active: true },
        { step: 'decide', label: 'ACT Dispatcher', active: true },
        { step: 'ops', label: 'Store Operations', active: true },
        { step: 'report', label: 'CODA Report', active: false },
      ]}
      ctaLabel="Book a pilot store demo"
      ctaHref="/auth?mode=signup"
      ctaSecondaryLabel="Read SODA documentation"
      ctaSecondaryHref="/docs/soda"
      integrationNote="Requires NEPA engine v0.8+"
      deployTarget="Jetson Orin NX (docker-compose up)"
      features={[
        {
          icon: Eye,
          title: 'Layer 1 — Real-Time Perception',
          description:
            'YOLO detection feeds STDP-learning SignatureMaps on-device. Multilane perception engine builds a behavioral world model of every customer, product zone, and anomaly — without cloud dependency.',
        },
        {
          icon: Brain,
          title: 'Layer 2 — Agentic Decision Engine',
          description:
            'ACT dispatcher translates perceptions into store actions — door locks, alerts, restocking triggers, CODA report generation — all sandboxed and memory-augmented.',
        },
        {
          icon: ShieldCheck,
          title: 'Layer 3 — World Model API',
          description:
            'REST API giving operators real-time access to the store\'s learned behavioral model — zone stats, anomaly scores, spatial updates, and consultation triggers.',
        },
        {
          icon: Robot,
          title: 'Layer 4 — Operations & Fulfillment',
          description:
            'NISSM (unmanned shop operations system) handles inventory sync, supplier reorder triggers, RODA dispatch for restocking, and operational reporting via CODA.',
        },
      ]}
      terminalLines={[
        '> SODA v1.0 — STORE: HK-KLN-01',
        '> LANES: 08 ACTIVE — LATENCY: 1.9ms',
        '> SIGNATUREMAP: 847 behavioral vectors loaded',
        '> ANOMALY SCORE: 0.12 — STORE: NORMAL',
        '> ZONE_3: customer_dwell_time=47s → ACT: price_check_nudge',
        '> RODA: restocking queue EMPTY',
        '> CODA: 0 reports queued',
        '> WATCHDOG: all lanes GREEN',
      ]}
    />
  )
}
