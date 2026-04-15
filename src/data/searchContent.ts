export interface SearchEntry {
  id: string
  title: string
  category: 'guide' | 'api' | 'product' | 'changelog' | 'concept'
  href: string
  content: string
  tags: string[]
}

export const searchContent: SearchEntry[] = [
  {
    id: 'nepa-overview',
    title: 'NEPA Platform Overview',
    category: 'product',
    href: '/resources/docs',
    content: 'High-level overview of the NEPA platform, its edge intelligence stack, and how products connect through the NEPA world model.',
    tags: ['nepa', 'overview', 'platform', 'world model', 'architecture'],
  },
  {
    id: 'soda-setup',
    title: 'SODA Setup Guide',
    category: 'guide',
    href: '/resources/guides',
    content: 'Configure SODA for unmanned stores with camera layout planning, zone rules, and event orchestration.',
    tags: ['soda', 'setup', 'unmanned store', 'configuration', 'deployment'],
  },
  {
    id: 'roda-integration',
    title: 'RODA Integration',
    category: 'guide',
    href: '/resources/guides',
    content: 'Integrate RODA into robotics fleets with mission dispatch hooks, telemetry sync, and safety checks.',
    tags: ['roda', 'integration', 'robotics', 'dispatch', 'telemetry'],
  },
  {
    id: 'voda-pipeline',
    title: 'VODA Pipeline',
    category: 'concept',
    href: '/resources/docs',
    content: 'Understand the VODA video pipeline from capture to inference, alerting, and audit trail generation.',
    tags: ['voda', 'pipeline', 'video intelligence', 'inference', 'alerts'],
  },
  {
    id: 'coda-reports',
    title: 'CODA Reports',
    category: 'product',
    href: '/resources/docs',
    content: 'Generate CODA reports with consultation summaries, anomaly insights, and compliance-ready exports.',
    tags: ['coda', 'reports', 'insights', 'export', 'analytics'],
  },
  {
    id: 'hri-api-quickstart',
    title: 'HRI API Quickstart',
    category: 'api',
    href: '/resources/api',
    content: 'Send your first HRI API request, authenticate with keys, and query the NEPA signature map.',
    tags: ['hri', 'api', 'quickstart', 'authentication', 'query'],
  },
  {
    id: 'signaturemap-algorithm',
    title: 'SignatureMap Algorithm',
    category: 'concept',
    href: '/resources/docs',
    content: 'Dive into the SignatureMap algorithm that indexes entities, events, and relationships over time.',
    tags: ['signaturemap', 'algorithm', 'entities', 'events', 'graph'],
  },
  {
    id: 'dopamine-modulator',
    title: 'DopamineModulator Concept',
    category: 'concept',
    href: '/resources/docs',
    content: 'Conceptual overview of the DopamineModulator system for adaptive reinforcement and prioritization.',
    tags: ['dopamine', 'modulator', 'reinforcement', 'concept', 'prioritization'],
  },
  {
    id: 'docker-compose-deployment',
    title: 'Docker Compose Deployment',
    category: 'guide',
    href: '/resources/guides',
    content: 'Deploy NEPA services with docker-compose, configure environment variables, and validate health checks.',
    tags: ['docker', 'compose', 'deployment', 'services', 'environment'],
  },
  {
    id: 'jetson-orin-nx-setup',
    title: 'Jetson Orin NX Setup',
    category: 'guide',
    href: '/resources/guides',
    content: 'Prepare Jetson Orin NX devices with drivers, runtime installation, and camera connectivity.',
    tags: ['jetson', 'orin nx', 'setup', 'hardware', 'edge'],
  },
  {
    id: 'stripe-billing-guide',
    title: 'Stripe Billing Guide',
    category: 'guide',
    href: '/resources/guides',
    content: 'Configure Stripe billing, manage subscriptions, and monitor invoices for NEPA plans.',
    tags: ['stripe', 'billing', 'subscriptions', 'payments', 'invoices'],
  },
  {
    id: 'pdpo-compliance',
    title: 'PDPO Compliance',
    category: 'guide',
    href: '/resources/guides',
    content: 'Checklist for PDPO compliance including data retention, audit trails, and consent handling.',
    tags: ['pdpo', 'compliance', 'privacy', 'retention', 'audit'],
  },
]
