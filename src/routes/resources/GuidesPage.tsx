import { Rocket, ShoppingCart, Robot, Building, Video, Wrench } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function GuidesPage() {
  return (
    <div className="min-h-screen relative">
      <div className="page-bg">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="mb-12">
          <Badge className="mb-4 mono" variant="outline">RESOURCES · GUIDES</Badge>
          <h1 className="text-5xl font-bold mb-6">Guides & Tutorials</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Step-by-step deployment guides, integration tutorials, and production best practices for NEPA agents.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <Rocket className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Quick Start: VODA in 10 Minutes</CardTitle>
              <CardDescription>Deploy your first video operations agent from scratch</CardDescription>
              <Badge variant="outline" className="w-fit mono text-xs">Beginner</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">01</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Provision Edge Hardware</h4>
                    <p className="text-sm text-muted-foreground">
                      Flash Ubuntu 20.04 LTS on Jetson Xavier NX, install JetPack 5.0+, and configure network access.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">02</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Install NEPA Runtime</h4>
                    <p className="text-sm text-muted-foreground">
                      Download and install the NEPA edge runtime package for ARM64 architecture.
                    </p>
                    <pre className="bg-secondary p-2 rounded text-xs mono mt-2">curl -fsSL https://install.nepa.dev | sh</pre>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">03</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Connect Camera Streams</h4>
                    <p className="text-sm text-muted-foreground">
                      Add RTSP camera streams and configure zones for detection areas.
                    </p>
                    <pre className="bg-secondary p-2 rounded text-xs mono mt-2">nepa camera add rtsp://camera-ip/stream</pre>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">04</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Activate & Verify</h4>
                    <p className="text-sm text-muted-foreground">
                      Activate the agent with your console token and verify signature map updates.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <ShoppingCart className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Unmanned Retail Deployment</CardTitle>
              <CardDescription>Full production setup for autonomous stores</CardDescription>
              <Badge variant="outline" className="w-fit mono text-xs">Intermediate</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">01</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Multi-Camera Layout Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      Design camera placement for full coverage: entrance, checkout, aisles, and blind spots. Aim for 30-50% overlap between zones.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">02</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Zone Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Define spatial zones (entrance, checkout, product_area, exit) and configure detection rules per zone.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">03</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Event Rules & Actions</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up pick/place detection, dwell time alerts, and automated lighting control based on occupancy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">04</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">POS & Gate Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect NEPA action API to door locks and payment terminals for automated checkout flow.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Robot className="w-8 h-8 text-primary mb-2" />
              <CardTitle>RODA: Robotic Path Adaptation</CardTitle>
              <CardDescription>Deploy neuromorphic navigation for autonomous robots</CardDescription>
              <Badge variant="outline" className="w-fit mono text-xs">Advanced</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">01</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Robot Platform Setup</h4>
                    <p className="text-sm text-muted-foreground">
                      Install RODA runtime on robot edge compute (Jetson Orin Nano). Configure IMU, odometry, and camera feeds.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">02</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Mission State Machine</h4>
                    <p className="text-sm text-muted-foreground">
                      Define mission states (idle, navigate, inspect, return) with HRI escalation triggers for anomalies.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">03</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Spike-Timing Path Adaptation</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure neuromorphic obstacle avoidance with temporal credit assignment for dynamic environments.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">04</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Telemetry & Remote Control</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up real-time mission telemetry stream and operator override interface via NEPA console.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Building className="w-8 h-8 text-primary mb-2" />
              <CardTitle>FODA: Aerial Facade Inspection</CardTitle>
              <CardDescription>Drone-based structural inspection with cryptographic audit trails</CardDescription>
              <Badge variant="outline" className="w-fit mono text-xs">Advanced</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">01</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Drone Edge Node</h4>
                    <p className="text-sm text-muted-foreground">
                      Mount compact edge compute on drone platform with RGB + thermal cameras. Ensure power budget under 25W.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">02</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Flight Path Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      Define facade scan pattern with waypoints, hover times, and camera angle sequences.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">03</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Real-Time Spike Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure thermal + RGB fusion for crack detection, moisture ingress, and structural anomalies during flight.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mono font-bold">04</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Cryptographic Evidence Chain</h4>
                    <p className="text-sm text-muted-foreground">
                      Seal each inspection run with SHA-256 signatures and GPS timestamps for compliance and insurance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Integration Patterns</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <Video className="w-6 h-6 text-primary mb-2" />
                <CardTitle className="text-lg">LLM Agent Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Connect GPT-4, Claude, or custom LLMs to query the NEPA world model via tool APIs.</p>
                <pre className="bg-secondary p-2 rounded text-xs mono">
{`{
  "tool": "nepa_query",
  "params": {
    "window": "last_5m",
    "entity_type": "person"
  }
}`}
                </pre>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <Wrench className="w-6 h-6 text-primary mb-2" />
                <CardTitle className="text-lg">Webhook Event Stream</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Subscribe to real-time events and route them to your backend, Slack, PagerDuty, or custom systems.</p>
                <pre className="bg-secondary p-2 rounded text-xs mono">
{`POST https://your.app/webhook
{
  "event": "zone_entered",
  "entity_id": "ent_123"
}`}
                </pre>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Time-Slice Queries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Query historical entity timelines for forensics, compliance audits, or ML training datasets.</p>
                <pre className="bg-secondary p-2 rounded text-xs mono">
{`GET /query/timeline
?entity_id=ent_123
&start=2024-01-15T14:00Z
&end=2024-01-15T15:00Z`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Production Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Hardware & Networking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Use wired Ethernet for camera streams; WiFi only for low-bandwidth telemetry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Deploy UPS backup for edge nodes; graceful shutdown on power loss</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Monitor GPU/CPU temperature; throttle inference at 75°C</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Reserve 20% bandwidth headroom for cloud sync during peak hours</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Rotate API keys every 90 days; revoke immediately on suspected compromise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Enable audit log export to immutable storage (S3 Glacier, Azure Archive)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Configure video retention policy per jurisdiction (GDPR, CCPA, local law)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Use site-specific encryption keys; never share across deployments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
