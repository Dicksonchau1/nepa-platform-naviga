import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GitCommit, Sparkle, Bug, Lightning } from '@phosphor-icons/react'

export function ChangelogPage() {
  return (
    <div className="min-h-screen relative">
      <div className="page-bg">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      <section className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <div className="mb-12">
          <Badge className="mb-4 mono" variant="outline">RESOURCES · CHANGELOG</Badge>
          <h1 className="text-5xl font-bold mb-6">Changelog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Latest updates, releases, and improvements to the NEPA neuromorphic platform.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-2xl mb-2">Version 1.2.0</CardTitle>
                  <div className="flex gap-2 items-center text-sm text-muted-foreground mono">
                    <GitCommit className="w-4 h-4" />
                    <span>January 15, 2024</span>
                  </div>
                </div>
                <Badge className="mono">Latest</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkle className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold">New Features</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span><strong className="text-foreground">RODA Mission Telemetry:</strong> Real-time robot position, battery, and mission state streaming via WebSocket and gRPC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span><strong className="text-foreground">Multi-Site Dashboard:</strong> Aggregate view across all deployments with drill-down per site and zone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span><strong className="text-foreground">Thermal Camera Support (FODA):</strong> FLIR and Seek Thermal integration for facade inspection with temperature overlay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span><strong className="text-foreground">LLM Tool Schema v2:</strong> Updated tool definitions with stricter type validation and confidence thresholds</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightning className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold">Improvements</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Reduced signature map query latency by 40% through index optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Edge runtime now supports H.265 (HEVC) streams for 50% bandwidth reduction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>API rate limits increased for Growth tier: 300 req/min (was 200)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Enhanced entity tracking across camera handoffs with 95% identity persistence</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Bug className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold">Bug Fixes</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Fixed edge runtime crash when camera stream drops mid-session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Corrected timestamp drift in event logs under high inference load</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Resolved action validation edge case for conflicting zone states</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-2xl mb-2">Version 1.1.0</CardTitle>
                  <div className="flex gap-2 items-center text-sm text-muted-foreground mono">
                    <GitCommit className="w-4 h-4" />
                    <span>December 1, 2023</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkle className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold">New Features</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span><strong className="text-foreground">EODA Edge Agent:</strong> Thin-client neuromorphic inference for low-power hardware (Jetson Orin Nano)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span><strong className="text-foreground">Action History API:</strong> Query past action executions with cryptographic audit signatures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span><strong className="text-foreground">Zone Heatmaps:</strong> Dwell time and occupancy visualization in console dashboard</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightning className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold">Improvements</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Entity confidence scoring now factors in temporal consistency across frames</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Webhook delivery reliability improved with exponential backoff retry (max 5 attempts)</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Bug className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold">Bug Fixes</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Fixed memory leak in long-running edge sessions (&gt;48 hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Corrected WebSocket reconnection logic when cloud connection is lost</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-2xl mb-2">Version 1.0.0</CardTitle>
                  <div className="flex gap-2 items-center text-sm text-muted-foreground mono">
                    <GitCommit className="w-4 h-4" />
                    <span>October 15, 2023</span>
                  </div>
                </div>
                <Badge variant="outline" className="mono">Initial Release</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkle className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold">Core Platform</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>VODA agent with multi-camera signature map and entity tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>REST and gRPC APIs for world model queries and action proposals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Edge runtime for Jetson Xavier NX with TensorRT optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Cloud console with site management, event monitoring, and API key administration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Python and TypeScript SDKs for LLM agent integration</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Upcoming Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span><strong className="text-foreground">Q1 2024:</strong> SODA multi-camera surveillance with alert escalation engine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span><strong className="text-foreground">Q1 2024:</strong> On-premises deployment option with VPC peering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span><strong className="text-foreground">Q2 2024:</strong> Embedded model training pipeline from signature map replay</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span><strong className="text-foreground">Q2 2024:</strong> Audio event detection and classification (VODA audio module)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
