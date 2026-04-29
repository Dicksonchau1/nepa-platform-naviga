export interface SearchEntry {
  id: string
  title: string
  content: string
  category: 'docs' | 'api' | 'guides' | 'changelog' | 'status' | 'products' | 'pricing'
  section?: string
  url: string
  keywords?: string[]
}

export const allSearchableContent: SearchEntry[] = [
  {
    id: 'docs-quickstart',
    title: 'Getting Started with VODA',
    content: 'Deploy your first video operations agent in under 10 minutes. Prerequisites: NVIDIA Jetson Xavier NX, Ubuntu 20.04 LTS, RTSP camera stream, NEPA API key. Installation: curl -fsSL https://install.nepa.dev | sh',
    category: 'docs',
    section: 'Quick Start',
    url: '/resources/docs',
    keywords: ['voda', 'installation', 'jetson', 'setup', 'quickstart', 'camera']
  },
  {
    id: 'docs-api-request',
    title: 'First API Request',
    content: 'Query the live world model from your application. Query entities using POST to /v1/query with window, entity_type, and zone parameters',
    category: 'docs',
    section: 'Quick Start',
    url: '/resources/docs',
    keywords: ['api', 'query', 'request', 'entities', 'world model']
  },
  {
    id: 'docs-signature-map',
    title: 'Signature Map',
    content: 'Time-indexed graph of entities, events, and relations detected across all camera streams',
    category: 'docs',
    section: 'Core Concepts',
    url: '/resources/docs',
    keywords: ['signature map', 'entities', 'events', 'graph', 'timeline']
  },
  {
    id: 'docs-event-stream',
    title: 'Event Stream',
    content: 'Monotonic log of all state changes with cryptographic timestamps and confidence scores',
    category: 'docs',
    section: 'Core Concepts',
    url: '/resources/docs',
    keywords: ['event stream', 'log', 'timestamps', 'monotonic']
  },
  {
    id: 'docs-action-validation',
    title: 'Action Validation',
    content: 'Safety and feasibility checks for all agent-proposed actions before execution',
    category: 'docs',
    section: 'Core Concepts',
    url: '/resources/docs',
    keywords: ['action', 'validation', 'safety', 'feasibility']
  },
  {
    id: 'docs-edge-runtime',
    title: 'Edge Runtime Architecture',
    content: 'Sparse event pipeline processing only salient changes. TensorRT-optimized inference at <50ms per frame. Local signature map maintained in lock-free data structures',
    category: 'docs',
    section: 'Architecture',
    url: '/resources/docs',
    keywords: ['edge', 'runtime', 'tensorrt', 'inference', 'neuromorphic']
  },
  {
    id: 'docs-deployment',
    title: 'Edge Deployment',
    content: 'Install NEPA runtime on edge hardware. Supported platforms: NVIDIA Jetson Xavier NX, AGX Orin, Orin Nano',
    category: 'docs',
    section: 'Deployment',
    url: '/resources/docs',
    keywords: ['deployment', 'jetson', 'nvidia', 'hardware', 'edge']
  },
  {
    id: 'api-query',
    title: 'POST /query - Query Entities',
    content: 'Query entities and events from the signature map. Request body includes window, entity_type, zone, filters with min_confidence and tags',
    category: 'api',
    section: 'Query',
    url: '/resources/api',
    keywords: ['query', 'entities', 'api', 'rest', 'endpoint']
  },
  {
    id: 'api-timeline',
    title: 'GET /query/timeline',
    content: 'Retrieve event timeline for an entity. Query parameters: entity_id, start, end, include_video',
    category: 'api',
    section: 'Query',
    url: '/resources/api',
    keywords: ['timeline', 'events', 'history', 'entity']
  },
  {
    id: 'api-aggregate',
    title: 'POST /query/aggregate',
    content: 'Aggregate statistics over time windows. Count entities by type and zone, average dwell time, peak occupancy by hour',
    category: 'api',
    section: 'Query',
    url: '/resources/api',
    keywords: ['aggregate', 'statistics', 'analytics', 'metrics']
  },
  {
    id: 'api-action-propose',
    title: 'POST /action/propose',
    content: 'Propose an action for safety validation and execution. Actions: light_control, door_control, alert, audio_announce. Includes safety, feasibility, and policy checks',
    category: 'api',
    section: 'Action',
    url: '/resources/api',
    keywords: ['action', 'propose', 'control', 'safety', 'validation']
  },
  {
    id: 'api-action-history',
    title: 'GET /action/history',
    content: 'Retrieve execution history with audit trail. Returns actions with execution_id, status, and cryptographic signatures',
    category: 'api',
    section: 'Action',
    url: '/resources/api',
    keywords: ['history', 'audit', 'actions', 'log']
  },
  {
    id: 'api-stream-events',
    title: 'WebSocket /stream/events',
    content: 'Real-time event stream for live monitoring. Subscribe to event types: entity_detected, zone_entered, anomaly',
    category: 'api',
    section: 'Stream',
    url: '/resources/api',
    keywords: ['websocket', 'stream', 'real-time', 'events']
  },
  {
    id: 'api-grpc-stream',
    title: 'gRPC StreamEvents',
    content: 'High-throughput streaming via gRPC. Service definition with StreamRequest and Event messages',
    category: 'api',
    section: 'Stream',
    url: '/resources/api',
    keywords: ['grpc', 'stream', 'protobuf', 'high-throughput']
  },
  {
    id: 'api-auth',
    title: 'API Key Management',
    content: 'Create and manage API keys with scopes and expiration. POST /admin/keys/create with name, scopes, expires_at',
    category: 'api',
    section: 'Admin',
    url: '/resources/api',
    keywords: ['authentication', 'api key', 'security', 'authorization']
  },
  {
    id: 'guides-voda-quickstart',
    title: 'Quick Start: VODA in 10 Minutes',
    content: 'Deploy your first video operations agent from scratch. Provision edge hardware, install runtime, connect cameras, activate and verify',
    category: 'guides',
    section: 'Getting Started',
    url: '/resources/guides',
    keywords: ['quickstart', 'voda', 'tutorial', 'beginner', 'setup']
  },
  {
    id: 'guides-retail',
    title: 'Unmanned Retail Deployment',
    content: 'Full production setup for autonomous stores. Multi-camera layout planning, zone configuration, event rules, POS and gate integration',
    category: 'guides',
    section: 'Use Cases',
    url: '/resources/guides',
    keywords: ['retail', 'unmanned', 'store', 'deployment', 'production']
  },
  {
    id: 'guides-roda',
    title: 'RODA: Robotic Path Adaptation',
    content: 'Deploy neuromorphic navigation for autonomous robots. Robot platform setup, mission state machine, spike-timing path adaptation, telemetry',
    category: 'guides',
    section: 'Advanced',
    url: '/resources/guides',
    keywords: ['roda', 'robot', 'navigation', 'autonomous', 'neuromorphic']
  },
  {
    id: 'guides-foda',
    title: 'FODA: Aerial Facade Inspection',
    content: 'Drone-based structural inspection with cryptographic audit trails. Drone edge node, flight path planning, thermal RGB fusion, evidence chain',
    category: 'guides',
    section: 'Advanced',
    url: '/resources/guides',
    keywords: ['foda', 'drone', 'inspection', 'facade', 'aerial']
  },
  {
    id: 'guides-llm-integration',
    title: 'LLM Agent Integration',
    content: 'Connect GPT-4, Claude, or custom LLMs to query the NEPA world model via tool APIs',
    category: 'guides',
    section: 'Integration',
    url: '/resources/guides',
    keywords: ['llm', 'integration', 'gpt', 'claude', 'agent']
  },
  {
    id: 'guides-webhooks',
    title: 'Webhook Event Stream',
    content: 'Subscribe to real-time events and route them to your backend, Slack, PagerDuty, or custom systems',
    category: 'guides',
    section: 'Integration',
    url: '/resources/guides',
    keywords: ['webhook', 'events', 'integration', 'notifications']
  },
  {
    id: 'guides-best-practices-hardware',
    title: 'Hardware & Networking Best Practices',
    content: 'Use wired Ethernet for camera streams, deploy UPS backup, monitor temperature, reserve bandwidth headroom',
    category: 'guides',
    section: 'Best Practices',
    url: '/resources/guides',
    keywords: ['hardware', 'networking', 'production', 'best practices']
  },
  {
    id: 'guides-best-practices-security',
    title: 'Security & Compliance Best Practices',
    content: 'Rotate API keys every 90 days, enable audit log export, configure video retention policy, use site-specific encryption',
    category: 'guides',
    section: 'Best Practices',
    url: '/resources/guides',
    keywords: ['security', 'compliance', 'gdpr', 'encryption', 'audit']
  },
  {
    id: 'product-soda',
    title: 'SODA — Unmanned Store OS',
    content: 'Autonomous store operations with perception, alerting, and robotic handoff.',
    category: 'products',
    section: 'Products',
    url: '/products/soda',
    keywords: ['soda', 'store', 'unmanned', 'operations']
  },
  {
    id: 'product-roda',
    title: 'RODA — Robotic Execution',
    content: 'Physical restocking and task execution triggered by NEPA dispatch.',
    category: 'products',
    section: 'Products',
    url: '/products/roda',
    keywords: ['roda', 'robotics', 'dispatch', 'restock']
  },
  {
    id: 'product-voda',
    title: 'VODA / CODA — Video Intelligence',
    content: 'Video-to-evidence SaaS pipeline with anomaly escalation.',
    category: 'products',
    section: 'Products',
    url: '/products/voda-coda',
    keywords: ['voda', 'coda', 'video', 'evidence']
  },
  {
    id: 'product-hri',
    title: 'HRI — HR Intelligence API',
    content: 'Interview analytics and scorecards delivered via API.',
    category: 'products',
    section: 'Products',
    url: '/products/hri',
    keywords: ['hri', 'hr', 'interview', 'analytics']
  },
  {
    id: 'product-nepa',
    title: 'NEPA — World Model Engine',
    content: 'Live operational world model powering AuraSense products.',
    category: 'products',
    section: 'Platform',
    url: '/nepa',
    keywords: ['nepa', 'world model', 'signaturemap']
  },
  {
    id: 'pricing-soda',
    title: 'SODA Pricing Plans',
    content: 'Pilot, Store, and Fleet plans for unmanned retail deployments.',
    category: 'pricing',
    section: 'Pricing',
    url: '/pricing',
    keywords: ['pricing', 'soda', 'plans', 'pilot']
  },
  {
    id: 'pricing-voda',
    title: 'VODA/CODA Usage Pricing',
    content: 'Usage-based pricing for processed minutes and reports rendered.',
    category: 'pricing',
    section: 'Pricing',
    url: '/pricing',
    keywords: ['pricing', 'voda', 'usage', 'minutes']
  },
  {
    id: 'pricing-hri',
    title: 'HRI API Packages',
    content: 'API call packages with quotas, overage rates, and retention.',
    category: 'pricing',
    section: 'Pricing',
    url: '/pricing',
    keywords: ['pricing', 'hri', 'api', 'packages']
  },
  {
    id: 'docs-nepa-overview',
    title: 'NEPA overview',
    content: 'Platform overview of NEPA perception, STDP-driven learning, and SignatureMap intelligence.',
    category: 'docs',
    url: '/docs/nepa',
    keywords: ['nepa', 'perception', 'stdp', 'signaturemap']
  },
  {
    id: 'docs-soda-setup',
    title: 'SODA setup guide',
    content: 'Configure SODA for unmanned retail environments with store-level setup steps.',
    category: 'docs',
    url: '/docs/soda',
    keywords: ['soda', 'unmanned', 'store', 'setup']
  },
  {
    id: 'docs-roda-integration',
    title: 'RODA integration',
    content: 'Integrate RODA with NERMN robotics dispatch and mission orchestration.',
    category: 'docs',
    url: '/docs/roda',
    keywords: ['roda', 'nermn', 'robotics', 'dispatch']
  },
  {
    id: 'docs-voda-pipeline',
    title: 'VODA pipeline',
    content: 'Understand the VODA video analysis pipeline and event extraction flow.',
    category: 'docs',
    url: '/docs/voda',
    keywords: ['voda', 'video', 'analysis', 'pipeline']
  },
  {
    id: 'docs-coda-reports',
    title: 'CODA reports',
    content: 'Generate CODA evidence reports and MP4 exports.',
    category: 'docs',
    url: '/docs/coda',
    keywords: ['coda', 'reports', 'evidence', 'mp4']
  },
  {
    id: 'docs-hri-quickstart',
    title: 'HRI API quickstart',
    content: 'Quickstart guide for the HRI API interview workflow.',
    category: 'docs',
    url: '/docs/hri',
    keywords: ['hri', 'hr', 'interview', 'api']
  },
  {
    id: 'docs-signaturemap-algorithm',
    title: 'SignatureMap algorithm',
    content: 'Algorithm details for SignatureMap behavioral clustering and STDP signals.',
    category: 'docs',
    url: '/docs/nepa/signaturemap',
    keywords: ['signaturemap', 'stdp', 'behavioral']
  },
  {
    id: 'docs-dopamine-modulator',
    title: 'DopamineModulator',
    content: 'DopamineModulator reference for reinforcement feedback in NEPA.',
    category: 'docs',
    url: '/docs/nepa/dopaminemodulator',
    keywords: ['dopamine', 'modulator', 'reinforcement']
  },
  {
    id: 'docs-docker-deployment',
    title: 'docker-compose deployment',
    content: 'Deploy NEPA services with docker-compose on Jetson hardware.',
    category: 'docs',
    url: '/docs/deployment',
    keywords: ['docker', 'jetson', 'deployment']
  },
  {
    id: 'docs-stripe-billing',
    title: 'Stripe billing guide',
    content: 'Manage subscriptions and billing with Stripe.',
    category: 'docs',
    url: '/docs/billing',
    keywords: ['stripe', 'billing', 'subscription']
  },
  {
    id: 'docs-pdpo-compliance',
    title: 'PDPO compliance',
    content: 'PDPO compliance guidance for privacy requirements in Hong Kong.',
    category: 'docs',
    url: '/docs/compliance',
    keywords: ['pdpo', 'compliance', 'privacy', 'hk']
  }
]
