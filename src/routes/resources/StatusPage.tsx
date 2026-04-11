import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Globe, HardDrives, Database, Lightning } from '@phosphor-icons/react'
import { DocsSearch, SearchTrigger } from '@/components/DocsSearch'

export function StatusPage() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen relative">
      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />
      
      <div className="page-bg">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      <section className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <div className="mb-12">
          <Badge className="mb-4 mono" variant="outline">RESOURCES · STATUS</Badge>
          <h1 className="text-5xl font-bold mb-6">System Status</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-6">
            Current operational status and uptime for all NEPA platform services.
          </p>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-green-500" weight="fill" />
            <span className="text-lg font-semibold">All Systems Operational</span>
          </div>
          <div className="max-w-md">
            <SearchTrigger onOpen={() => setSearchOpen(true)} />
          </div>
        </div>

        <div className="space-y-6 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <CardTitle>API Services</CardTitle>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Operational</Badge>
              </div>
              <CardDescription>REST and gRPC endpoints for world model queries and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Uptime (30d)</div>
                  <div className="font-semibold mono text-lg">99.98%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Avg Response</div>
                  <div className="font-semibold mono text-lg">18ms</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Last Incident</div>
                  <div className="font-semibold mono text-lg">None</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HardDrives className="w-6 h-6 text-primary" />
                  <CardTitle>Edge Runtime Sync</CardTitle>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Operational</Badge>
              </div>
              <CardDescription>Cloud sync and telemetry ingestion from deployed edge nodes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Uptime (30d)</div>
                  <div className="font-semibold mono text-lg">99.95%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Active Nodes</div>
                  <div className="font-semibold mono text-lg">2,847</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Sync Latency</div>
                  <div className="font-semibold mono text-lg">420ms</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary" />
                  <CardTitle>Signature Map Storage</CardTitle>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Operational</Badge>
              </div>
              <CardDescription>Distributed signature map persistence and time-slice query layer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Uptime (30d)</div>
                  <div className="font-semibold mono text-lg">100%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Query P95</div>
                  <div className="font-semibold mono text-lg">22ms</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Replication</div>
                  <div className="font-semibold mono text-lg">3× Zones</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lightning className="w-6 h-6 text-primary" />
                  <CardTitle>WebSocket Event Stream</CardTitle>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Operational</Badge>
              </div>
              <CardDescription>Real-time event streaming and webhook delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Uptime (30d)</div>
                  <div className="font-semibold mono text-lg">99.97%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Active Connections</div>
                  <div className="font-semibold mono text-lg">1,423</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Delivery Rate</div>
                  <div className="font-semibold mono text-lg">99.92%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <CardTitle>Cloud Console</CardTitle>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Operational</Badge>
              </div>
              <CardDescription>Web dashboard and configuration interface</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Uptime (30d)</div>
                  <div className="font-semibold mono text-lg">99.99%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Load Time P95</div>
                  <div className="font-semibold mono text-lg">1.2s</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">CDN Coverage</div>
                  <div className="font-semibold mono text-lg">Global</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Recent Incidents</h2>
          <Card className="glass-card">
            <CardContent className="py-8">
              <div className="text-center text-muted-foreground">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" weight="fill" />
                <p className="text-lg">No incidents in the last 90 days</p>
                <p className="text-sm mt-2">All systems maintained 99.95%+ uptime</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Scheduled Maintenance</h2>
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                <CardTitle>Upcoming Maintenance Window</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span className="font-semibold mono">January 28, 2024 02:00 - 04:00 UTC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Affected Services</span>
                  <span className="font-semibold">Cloud Console, API (read-only mode)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expected Impact</span>
                  <span className="font-semibold">Dashboard unavailable, queries degraded</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Purpose</span>
                  <span className="font-semibold">Database index optimization and replication upgrade</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Edge nodes will continue operating normally with local signature maps. Cloud sync will resume automatically after maintenance.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">SLA Commitments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Growth Tier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime Guarantee</span>
                  <span className="font-semibold mono">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Support Response</span>
                  <span className="font-semibold">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Retention</span>
                  <span className="font-semibold">90 days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Enterprise Tier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime Guarantee</span>
                  <span className="font-semibold mono">99.95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Support Response</span>
                  <span className="font-semibold">1 hour (critical)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Retention</span>
                  <span className="font-semibold">Custom</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Card className="glass-card">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">Subscribe to status updates and incident notifications</p>
              <div className="flex gap-4 justify-center">
                <Badge variant="outline" className="mono">status@nepa.dev</Badge>
                <Badge variant="outline" className="mono">status.nepa.dev/rss</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
