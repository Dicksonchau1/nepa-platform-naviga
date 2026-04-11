import { useState, useEffect, useMemo } from 'react'
import { MagnifyingGlass, X, FileText, Code, Book, Clock, ListChecks } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useNavigate } from 'react-router-dom'

export interface SearchableContent {
  id: string
  title: string
  content: string
  category: 'docs' | 'api' | 'guides' | 'changelog' | 'status'
  section?: string
  url: string
  keywords?: string[]
}

const allSearchableContent: SearchableContent[] = [
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
  }
]

const categoryIcons = {
  docs: FileText,
  api: Code,
  guides: Book,
  changelog: Clock,
  status: ListChecks
}

const categoryLabels = {
  docs: 'Documentation',
  api: 'API Reference',
  guides: 'Guides',
  changelog: 'Changelog',
  status: 'Status'
}

interface DocsSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocsSearch({ open, onOpenChange }: DocsSearchProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const searchResults = useMemo(() => {
    if (!query.trim()) return []

    const lowerQuery = query.toLowerCase()
    const terms = lowerQuery.split(/\s+/).filter(Boolean)

    return allSearchableContent
      .map(item => {
        let score = 0
        const lowerTitle = item.title.toLowerCase()
        const lowerContent = item.content.toLowerCase()
        const lowerSection = (item.section || '').toLowerCase()
        const keywords = item.keywords || []

        if (lowerTitle.includes(lowerQuery)) score += 100
        if (lowerContent.includes(lowerQuery)) score += 50
        if (lowerSection.includes(lowerQuery)) score += 30

        keywords.forEach(keyword => {
          if (keyword.includes(lowerQuery)) score += 40
        })

        terms.forEach(term => {
          if (lowerTitle.includes(term)) score += 20
          if (lowerContent.includes(term)) score += 10
          if (lowerSection.includes(term)) score += 5
          keywords.forEach(keyword => {
            if (keyword.includes(term)) score += 8
          })
        })

        return { ...item, score }
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15)
  }, [query])

  const handleSelect = (result: SearchableContent) => {
    navigate(result.url)
    onOpenChange(false)
    setQuery('')
  }

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="sr-only">Search Documentation</DialogTitle>
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search docs, API reference, guides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[500px]">
          <div className="px-6 pb-6">
            {!query && (
              <div className="text-center py-12 text-muted-foreground">
                <MagnifyingGlass className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-sm">Start typing to search across all documentation</p>
              </div>
            )}

            {query && searchResults.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">No results found for "{query}"</p>
                <p className="text-xs mt-2">Try different keywords or check the spelling</p>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((result) => {
                  const Icon = categoryIcons[result.category]
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className="w-full text-left p-4 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                              {result.title}
                            </h4>
                            <Badge variant="outline" className="mono text-xs">
                              {categoryLabels[result.category]}
                            </Badge>
                          </div>
                          {result.section && (
                            <p className="text-xs text-muted-foreground mb-2 mono">
                              {result.section}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.content}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border px-6 py-3 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="mono">↑↓ Navigate</span>
              <span className="mono">↵ Select</span>
              <span className="mono">ESC Close</span>
            </div>
            <span>{searchResults.length > 0 && `${searchResults.length} results`}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface SearchTriggerProps {
  onOpen: () => void
}

export function SearchTrigger({ onOpen }: SearchTriggerProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpen()
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onOpen])

  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all text-sm text-muted-foreground hover:text-foreground group"
    >
      <MagnifyingGlass className="w-4 h-4" />
      <span>Search docs...</span>
      <kbd className="ml-auto mono text-xs px-2 py-0.5 rounded bg-muted border border-border group-hover:border-primary/30">
        ⌘K
      </kbd>
    </button>
  )
}
