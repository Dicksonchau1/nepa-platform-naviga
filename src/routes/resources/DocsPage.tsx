import { Book, Code, Cpu, Database, Globe, Lock, Lightning } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export function DocsPage() {
  return (
    <div className="min-h-screen relative">
      <div className="page-bg">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="mb-12">
          <Badge className="mb-4 mono" variant="outline">RESOURCES · DOCUMENTATION</Badge>
          <h1 className="text-5xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Complete technical documentation for deploying, integrating, and operating NEPA neuromorphic agents.
          </p>
        </div>

        <Tabs defaultValue="quickstart" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-3xl">
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="quickstart" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <div className="glyph">▸</div>
                  <CardTitle>Getting Started with VODA</CardTitle>
                  <CardDescription>Deploy your first video operations agent in under 10 minutes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">Prerequisites</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>NVIDIA Jetson Xavier NX or higher</li>
                      <li>Ubuntu 20.04 LTS with JetPack 5.0+</li>
                      <li>RTSP camera stream (H.264/H.265)</li>
                      <li>NEPA API key from console</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">Installation</h4>
                    <pre className="bg-secondary p-3 rounded-lg text-xs mono overflow-x-auto">
{`curl -fsSL https://install.nepa.dev | sh
nepa init --agent voda
nepa camera add rtsp://camera-ip/stream
nepa start`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <Code className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>First API Request</CardTitle>
                  <CardDescription>Query the live world model from your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">Query Entities</h4>
                    <pre className="bg-secondary p-3 rounded-lg text-xs mono overflow-x-auto">
{`curl -X POST https://api.nepa.dev/v1/query \\
  -H "Authorization: Bearer \${NEPA_KEY}" \\
  -d '{
    "window": "last_5m",
    "entity_type": "person",
    "zone": "checkout_area"
  }'`}
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">Response</h4>
                    <pre className="bg-secondary p-3 rounded-lg text-xs mono overflow-x-auto">
{`{
  "entities": [
    {
      "id": "ent_2kX9mP",
      "type": "person",
      "first_seen": "2024-01-15T14:32:01Z",
      "last_seen": "2024-01-15T14:35:12Z",
      "confidence": 0.94
    }
  ]
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <Book className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Core Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm">Signature Map</h4>
                    <p className="text-sm text-muted-foreground">
                      Time-indexed graph of entities, events, and relations detected across all camera streams.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm">Event Stream</h4>
                    <p className="text-sm text-muted-foreground">
                      Monotonic log of all state changes with cryptographic timestamps and confidence scores.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm">Action Validation</h4>
                    <p className="text-sm text-muted-foreground">
                      Safety and feasibility checks for all agent-proposed actions before execution.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <Cpu className="w-8 h-8 text-primary mb-2" />
                <CardTitle>NEPA System Architecture</CardTitle>
                <CardDescription>Neuromorphic edge processing with cloud orchestration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold mono text-sm text-primary">Edge Runtime</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>Sparse event pipeline processing only salient changes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>TensorRT-optimized inference at &lt;50ms per frame</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>Local signature map maintained in lock-free data structures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>Deterministic action execution with rollback semantics</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold mono text-sm text-primary">Cloud Console</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>Multi-site dashboard with real-time event aggregation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>API key management and webhook configuration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>Historical query interface with time-slice playback</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>Audit trail export for compliance and forensics</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <Database className="w-6 h-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Data Flow</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Camera streams → Sparse event extraction → Entity tracking → Signature map update → Cloud sync (event deltas only)
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <Lightning className="w-6 h-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Latency Budget</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Inference: &lt;50ms | Signature update: &lt;5ms | API query: &lt;20ms | Action validation: &lt;10ms
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <Lock className="w-6 h-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Security Model</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  TLS 1.3 for all connections | API key rotation | Event log signing | Local control plane isolation
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <Cpu className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Edge Deployment</CardTitle>
                  <CardDescription>Install NEPA runtime on edge hardware</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">Supported Platforms</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between py-1">
                        <span>NVIDIA Jetson Xavier NX</span>
                        <Badge variant="outline" className="mono text-xs">Recommended</Badge>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>NVIDIA Jetson AGX Orin</span>
                        <Badge variant="outline" className="mono text-xs">High Performance</Badge>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Jetson Orin Nano</span>
                        <Badge variant="outline" className="mono text-xs">Entry Level</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">Installation</h4>
                    <pre className="bg-secondary p-3 rounded-lg text-xs mono overflow-x-auto">
{`# Download and install NEPA runtime
wget https://dl.nepa.dev/edge/latest/nepa-arm64.deb
sudo dpkg -i nepa-arm64.deb

# Initialize site configuration
nepa init --site production-store-01

# Add camera streams
nepa camera add --name checkout \\
  --rtsp rtsp://10.0.1.100/stream

# Start agent
sudo systemctl enable nepa
sudo systemctl start nepa`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <Globe className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Cloud Configuration</CardTitle>
                  <CardDescription>Connect edge nodes to NEPA console</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">Site Registration</h4>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Create site in NEPA console</li>
                      <li>Generate site activation token</li>
                      <li>Run activation command on edge device</li>
                      <li>Configure camera zones and event rules</li>
                      <li>Verify connectivity in dashboard</li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold mono text-sm text-primary">Activation</h4>
                    <pre className="bg-secondary p-3 rounded-lg text-xs mono overflow-x-auto">
{`# Activate edge node with console
nepa activate --token act_xK9mP2zQw...

# Verify connection
nepa status

# Output:
# ✓ Connected to console.nepa.dev
# ✓ Site: production-store-01
# ✓ Cameras: 4 active
# ✓ Signature map: 127 entities`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <Code className="w-8 h-8 text-primary mb-2" />
                <CardTitle>LLM Agent Integration</CardTitle>
                <CardDescription>Connect any LLM to query the NEPA world model and propose actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold mono text-sm text-primary">Tool Definition (MCP Format)</h4>
                  <pre className="bg-secondary p-3 rounded-lg text-xs mono overflow-x-auto">
{`{
  "name": "nepa_query_world_model",
  "description": "Query entities and events from NEPA perception layer",
  "parameters": {
    "type": "object",
    "properties": {
      "window": {
        "type": "string",
        "description": "Time window: 'last_5m', 'last_1h', or ISO range"
      },
      "entity_type": {
        "type": "string",
        "enum": ["person", "object", "vehicle", "anomaly"]
      },
      "zone": {
        "type": "string",
        "description": "Spatial zone identifier"
      }
    }
  }
}`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold mono text-sm text-primary">Action Proposal</h4>
                  <pre className="bg-secondary p-3 rounded-lg text-xs mono overflow-x-auto">
{`POST /v1/action/propose
{
  "action": "light_control",
  "zone": "checkout_area",
  "params": { "brightness": 0.8 },
  "reason": "Person detected in checkout zone after hours"
}

Response:
{
  "approved": true,
  "execution_id": "exec_9Km2Pz",
  "validation": {
    "safety_check": "passed",
    "feasibility_check": "passed"
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
