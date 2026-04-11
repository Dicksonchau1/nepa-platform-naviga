import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Video, GitBranch, CheckCircle, ArrowRight, Check } from '@phosphor-icons/react'
import { CinematicBackground, FloatingNodes, ScopeLines, ScrollHUD, ScanlineOverlay } from '@/components/CinematicBackground'
import { Link } from 'react-router-dom'

interface VODAPageProps {
  onNavigate: (page: string) => void
}

export function VODAPage({ onNavigate }: VODAPageProps) {
  return (
    <div className="flex flex-col relative">
      <CinematicBackground />
      
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ScanlineOverlay />
        <FloatingNodes />
        <ScopeLines />
        <ScrollHUD />
        
        <div className="container mx-auto px-6 relative z-10 pt-24">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs px-4 py-1.5 mb-6">
              NEPA PLATFORM · VIDEO AGENT
            </Badge>
            
            <h1 className="hero-h1-cinematic">
              VODA — Video Operations{' '}
              <span className="accent-word">Decision</span> Agent
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              A neuromorphic edge perception agent that turns multi-camera video into a live, LLM-ready world model for unmanned retail, inspection, and robotics. Governed. Deterministic. Auditable.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 h-12 rounded-full text-sm"
                asChild
              >
                <Link to="/signup">
                  Get started
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 px-8 h-12 rounded-full text-sm"
                asChild
              >
                <Link to="/about/contact">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 bg-background/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Designed for unmanned environments</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              NEPA VODA ingests multi-camera streams, builds a structured timeline of entities and events, 
              and exposes it as a stable API that any LLM or backend can query by time slice, entity, or relation.
              Actions proposed by agents are validated at the edge, keeping execution safe, deterministic, and auditable.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 bg-card/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Key Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-card text-center">
              <Video size={48} className="text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-3">Stream Ingestion</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Multi-lane video ingestion with per-stream isolation. Frame-level timestamping ensures 
                reproducible replay of entire inference sessions.
              </p>
            </div>

            <div className="glass-card text-center">
              <GitBranch size={48} className="text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-3">Governed Inference</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every detection passes through deterministic spike-timing gates. No probabilistic drift across runs. 
                Identical frames always produce identical outputs.
              </p>
            </div>

            <div className="glass-card text-center">
              <CheckCircle size={48} className="text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-3">POE Evidence Chain</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cryptographically sealed proof-of-execution for every frame processed. Complete audit trail 
                from camera feed to final decision, immutable and verifiable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 bg-background/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Transparent pricing for teams of all sizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glass-card border-border/20">
              <CardHeader>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <CardDescription>Perfect for testing and small deployments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary mono">$199</span>
                  <span className="text-muted-foreground"> / month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Up to 4 cameras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">1 site location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Core VODA event stream</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Web dashboard access</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/signup">Get started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/50 shadow-lg shadow-primary/10 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Growth</CardTitle>
                <CardDescription>For growing teams and multi-site operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary mono">$499</span>
                  <span className="text-muted-foreground"> / month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Up to 12 cameras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">3 site locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Full API access for LLM agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Audit logging & replay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link to="/signup">Get started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/20">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription>Custom solutions for large deployments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">Custom</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Unlimited cameras & sites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Multi-site roll-out support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">SLAs & dedicated support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">On-prem or VPC deployment</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/about/contact">Talk to sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 bg-card/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">How VODA Connects to NEPA Core</h2>
            <p className="text-lg text-muted-foreground mb-8">
              VODA runs on the same neuromorphic inference engine as all other XODA agents. 
              Deploy via REST or gRPC endpoints. Real-time or batch processing modes available. 
              Fully containerized for edge or cloud deployment.
            </p>
            <p className="text-muted-foreground">
              Every XODA agent is powered by the same NEPA neuromorphic inference core — deterministic, 
              auditable, deployable at the edge.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to deploy VODA?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Start with NEPA VODA and build reliable autonomous video operations with deterministic outputs.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 h-12 rounded-full"
                asChild
              >
                <Link to="/signup">
                  Get started
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/30 hover:bg-primary/10 px-8 h-12 rounded-full"
                asChild
              >
                <Link to="/resources/docs">View documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
