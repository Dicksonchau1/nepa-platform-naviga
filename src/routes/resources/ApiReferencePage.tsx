import { useState } from 'react'
import { Code, Lock, Plugs, Lightning } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DocsSearch, SearchTrigger } from '@/components/DocsSearch'

export function ApiReferencePage() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen relative">
      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />
      
      <div className="page-bg">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="mb-12">
          <Badge className="mb-4 mono" variant="outline">RESOURCES · API</Badge>
          <h1 className="text-5xl font-bold mb-6">API Reference</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-6">
            REST and gRPC interfaces for querying the NEPA world model, proposing actions, and managing edge deployments.
          </p>
          <div className="flex gap-4 mb-6 flex-wrap">
            <Badge variant="outline" className="mono">Base URL: https://api.nepa.dev/v1</Badge>
            <Badge variant="outline" className="mono">gRPC: grpc.nepa.dev:443</Badge>
          </div>
          <div className="max-w-md">
            <SearchTrigger onOpen={() => setSearchOpen(true)} />
          </div>
        </div>

        <Tabs defaultValue="query" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-3xl">
            <TabsTrigger value="query">Query</TabsTrigger>
            <TabsTrigger value="action">Action</TabsTrigger>
            <TabsTrigger value="stream">Stream</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="query" className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <Code className="w-8 h-8 text-primary mb-2" />
                <CardTitle>POST /query</CardTitle>
                <CardDescription>Query entities and events from the signature map</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold mono text-sm text-primary">Request Body</h4>
                  <pre className="bg-secondary p-4 rounded-lg text-xs mono overflow-x-auto">
{`{
  "window": "last_5m" | "last_1h" | { "start": "ISO8601", "end": "ISO8601" },
  "entity_type": "person" | "object" | "vehicle" | "anomaly",
  "zone": "string",
  "filters": {
    "min_confidence": 0.0-1.0,
    "tags": ["string"]
  },
  "include_relations": boolean
}`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold mono text-sm text-primary">Response 200</h4>
                  <pre className="bg-secondary p-4 rounded-lg text-xs mono overflow-x-auto">
{`{
  "entities": [
    {
      "id": "ent_xK9mP2zQ",
      "type": "person",
      "zone": "checkout_area",
      "first_seen": "2024-01-15T14:32:01.523Z",
      "last_seen": "2024-01-15T14:35:12.891Z",
      "confidence": 0.94,
      "attributes": {
        "trajectory": [[x,y,t], ...],
        "dwell_time_ms": 191368
      },
      "relations": [
        {
          "type": "interacted_with",
          "target": "obj_2kX9mP",
          "timestamp": "2024-01-15T14:33:45.123Z"
        }
      ]
    }
  ],
  "metadata": {
    "query_time_ms": 12,
    "total_entities": 1,
    "window_start": "2024-01-15T14:30:00.000Z",
    "window_end": "2024-01-15T14:35:00.000Z"
  }
}`}
                  </pre>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm">Rate Limits</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between"><span>Starter</span><span className="mono">60 req/min</span></div>
                      <div className="flex justify-between"><span>Growth</span><span className="mono">300 req/min</span></div>
                      <div className="flex justify-between"><span>Enterprise</span><span className="mono">Custom</span></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm">Headers</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="mono">Authorization: Bearer &lt;key&gt;</div>
                      <div className="mono">Content-Type: application/json</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg mono">GET /query/timeline</CardTitle>
                  <CardDescription>Retrieve event timeline for an entity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="font-semibold mono text-xs text-primary">Query Parameters</h4>
                    <div className="text-xs text-muted-foreground space-y-1 mono">
                      <div>entity_id: string (required)</div>
                      <div>start: ISO8601 timestamp</div>
                      <div>end: ISO8601 timestamp</div>
                      <div>include_video: boolean</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg mono">POST /query/aggregate</CardTitle>
                  <CardDescription>Aggregate statistics over time windows</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="font-semibold mono text-xs text-primary">Aggregations</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Count entities by type and zone</div>
                      <div>Average dwell time per zone</div>
                      <div>Peak occupancy by hour</div>
                      <div>Event frequency distribution</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="action" className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <Lightning className="w-8 h-8 text-primary mb-2" />
                <CardTitle>POST /action/propose</CardTitle>
                <CardDescription>Propose an action for safety validation and execution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold mono text-sm text-primary">Request Body</h4>
                  <pre className="bg-secondary p-4 rounded-lg text-xs mono overflow-x-auto">
{`{
  "action": "light_control" | "door_control" | "alert" | "audio_announce",
  "zone": "string",
  "params": {
    // Action-specific parameters
    "brightness": 0.0-1.0,      // for light_control
    "state": "open" | "close",  // for door_control
    "message": "string",        // for alert or audio_announce
    "priority": "low" | "medium" | "high"
  },
  "reason": "string",  // Human-readable justification
  "proposed_by": "agent_id or user_id"
}`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold mono text-sm text-primary">Response 200</h4>
                  <pre className="bg-secondary p-4 rounded-lg text-xs mono overflow-x-auto">
{`{
  "approved": true,
  "execution_id": "exec_9Km2Pz",
  "executed_at": "2024-01-15T14:35:23.456Z",
  "validation": {
    "safety_check": "passed",
    "feasibility_check": "passed",
    "policy_check": "passed",
    "conflicts": []
  },
  "result": {
    "status": "completed",
    "confirmation": "Light brightness set to 0.8 in checkout_area"
  }
}`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold mono text-sm text-primary">Validation Rules</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      <span><strong className="text-foreground">Safety:</strong> No action that could harm persons or damage equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      <span><strong className="text-foreground">Feasibility:</strong> Zone and actuator must exist and be operational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      <span><strong className="text-foreground">Policy:</strong> Action must comply with site-specific policies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      <span><strong className="text-foreground">Conflict:</strong> No conflicting actions in progress</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg mono">GET /action/history</CardTitle>
                <CardDescription>Retrieve execution history with audit trail</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <pre className="bg-secondary p-4 rounded-lg text-xs mono overflow-x-auto">
{`{
  "actions": [
    {
      "execution_id": "exec_9Km2Pz",
      "action": "light_control",
      "zone": "checkout_area",
      "proposed_by": "agent_llm_gpt4",
      "executed_at": "2024-01-15T14:35:23.456Z",
      "status": "completed",
      "signature": "sha256:a3f5c..."
    }
  ]
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stream" className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <Plugs className="w-8 h-8 text-primary mb-2" />
                <CardTitle>WebSocket /stream/events</CardTitle>
                <CardDescription>Real-time event stream for live monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold mono text-sm text-primary">Connection</h4>
                  <pre className="bg-secondary p-4 rounded-lg text-xs mono overflow-x-auto">
{`wss://api.nepa.dev/v1/stream/events?token=<api_key>&site=<site_id>

// Subscribe to event types
{
  "subscribe": {
    "event_types": ["entity_detected", "zone_entered", "anomaly"],
    "zones": ["checkout_area", "entrance"]
  }
}`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold mono text-sm text-primary">Event Message</h4>
                  <pre className="bg-secondary p-4 rounded-lg text-xs mono overflow-x-auto">
{`{
  "event_id": "evt_xK9mP2zQ",
  "event_type": "zone_entered",
  "timestamp": "2024-01-15T14:32:01.523Z",
  "entity": {
    "id": "ent_2kX9mP",
    "type": "person",
    "confidence": 0.94
  },
  "zone": "checkout_area",
  "metadata": {
    "camera": "cam_01",
    "frame_id": 1234567
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg mono">gRPC StreamEvents</CardTitle>
                <CardDescription>High-throughput streaming via gRPC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <pre className="bg-secondary p-4 rounded-lg text-xs mono overflow-x-auto">
{`service NepaStream {
  rpc StreamEvents(StreamRequest) returns (stream Event);
}

message StreamRequest {
  string site_id = 1;
  repeated string event_types = 2;
  repeated string zones = 3;
}

message Event {
  string event_id = 1;
  string event_type = 2;
  google.protobuf.Timestamp timestamp = 3;
  Entity entity = 4;
  string zone = 5;
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <Lock className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">API Key Management</h4>
                    <pre className="bg-secondary p-3 rounded-lg text-xs mono overflow-x-auto">
{`POST /admin/keys/create
{
  "name": "Production Backend",
  "scopes": ["query:read", "action:write"],
  "expires_at": "2025-01-15T00:00:00Z"
}

Response:
{
  "key": "nepa_live_xK9mP2zQ...",
  "key_id": "key_abc123"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Site Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">Create Site</h4>
                    <pre className="bg-secondary p-3 rounded-lg text-xs mono overflow-x-auto">
{`POST /admin/sites
{
  "name": "Store 01",
  "timezone": "America/New_York",
  "config": {
    "retention_days": 90,
    "alert_email": "ops@example.com"
  }
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">SDKs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Python</span><Badge variant="outline" className="mono text-xs">v1.2.0</Badge></div>
              <div className="flex justify-between"><span>TypeScript/Node</span><Badge variant="outline" className="mono text-xs">v1.2.0</Badge></div>
              <div className="flex justify-between"><span>Go</span><Badge variant="outline" className="mono text-xs">v1.1.0</Badge></div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Status Codes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground mono">
              <div>200 - Success</div>
              <div>400 - Invalid request</div>
              <div>401 - Unauthorized</div>
              <div>429 - Rate limit exceeded</div>
              <div>500 - Server error</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div>API issues: api@nepa.dev</div>
              <div>Status: status.nepa.dev</div>
              <div>Discord: discord.gg/nepa</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
