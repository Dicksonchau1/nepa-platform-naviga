import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GitCommit, CheckCircle, Warning, Shield, Clock } from '@phosphor-icons/react'
import { DocsSearch, SearchTrigger } from '@/components/DocsSearch'

export function ChangelogPage() {
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
          <Badge className="mb-4 mono" variant="outline">RESOURCES · CHANGELOG</Badge>
          <h1 className="text-5xl font-bold mb-6">Changelog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-6">
            Release history for the NEPA neuromorphic platform — what shipped, what is known, and what is coming next.
          </p>
          <div className="max-w-md">
            <SearchTrigger onOpen={() => setSearchOpen(true)} />
          </div>
        </div>

        <div className="space-y-8">

          {/* ── Version 2026.04 ── */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-2xl mb-2">Version 2026.04 — Platform GA</CardTitle>
                  <div className="flex gap-2 items-center text-sm text-muted-foreground mono">
                    <GitCommit className="w-4 h-4" />
                    <time dateTime="2026-04-18">April 18, 2026</time>
                  </div>
                </div>
                <Badge className="mono">Current Release</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">

              {/* Shipped */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold text-base">Shipped</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>
                      <strong className="text-foreground">NEPA Core GA</strong> — V-JEPA 2 video world model paired with spike-timing-dependent plasticity (STDP) weights. Cause-and-effect structure of a retail environment learned from footage and simulation, reinforced through online STDP weight updates at the edge.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>
                      <strong className="text-foreground">Online Continuous Training Loop</strong> — Inference outputs feed back into a supervised fine-tuning loop at the edge; deployed stores grow more accurate each week without a vendor update cycle.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>
                      <strong className="text-foreground">Unified Portals: SODA · RODA · FODA · VODA</strong> — One NEPA core powers all four products. No integration tax between vendors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>
                      <strong className="text-foreground">NEPA Agent Popup (Dashboard)</strong> — Embedded assistant with a 9-entry knowledge table and rotating operational tips, available across all portal dashboards.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>
                      <strong className="text-foreground">Per-Portal Developer Mode</strong> — Each portal (FODA · RODA · SODA · VODA) ships a Developer tab with live API key generation, webhook endpoint registration, and usage inspection. Backed by row-level-security policies in Supabase.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>
                      <strong className="text-foreground">Live Ops + Audit Replay Dashboard</strong> — Dual-dashboard architecture. Live Ops for real-time floor state; Audit Replay with cryptographically signed, hash-chained SignatureMaps for compliance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>
                      <strong className="text-foreground">WhatsApp Alert Channel</strong> — Operator alerts route directly to the manager's WhatsApp with a replay link to the signed inference frame. No dashboard-only hand-offs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>
                      <strong className="text-foreground">Stripe Magic-Link Provisioning</strong> — Automated portal provisioning on checkout. Stripe <span className="mono text-xs">checkout.session.completed</span> webhook → Supabase <span className="mono text-xs">pending_provisions</span> → magic link delivered via email (Resend).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>
                      <strong className="text-foreground">Pre-trained Robotic Team</strong> — Replenishment, inventory audit, floor care, and digital entry gate — orchestrated by the same NEPA core.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Known Limitations */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Warning className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold text-base">Known Limitations</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Desktop-first experience; mobile dashboard layouts ship in 2026.05.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>SDK packages (Python, TypeScript/Node, Go) available as install snippets in the Docs; publication to PyPI and npm is scheduled for 2026.05.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Self-serve SDK tarball downloads from the console are not yet enabled.</span>
                  </li>
                </ul>
              </div>

              {/* Security & Compliance */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary" weight="fill" />
                  <h3 className="font-semibold text-base">Security &amp; Compliance</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Row-level security on all customer tables.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Hash-chained SignatureMaps for every inference frame recorded to Audit Replay.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>Stripe webhooks verified via signature; unsigned requests rejected.</span>
                  </li>
                </ul>
              </div>

            </CardContent>
          </Card>

          {/* ── Upcoming ── */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming (Targeted)</h2>
            <div className="space-y-4">

              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-start justify-between mb-1">
                    <CardTitle className="text-lg">2026.05 — Dual Launch</CardTitle>
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      <span><strong>End of May:</strong> robotics field pilot live on partner edge hardware.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      <span><strong>End of May:</strong> AuraStudio public App Store launch — full NEPA agent suite, AuraMarket creator royalties at 85%.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
