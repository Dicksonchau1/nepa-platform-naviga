import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Cpu, Eye, Robot, CloudArrowDown, Buildings, Screencast } from '@phosphor-icons/react'

interface HomePageProps {
  onNavigate: (page: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex flex-col">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.15_0.15_145),oklch(0.08_0_0))]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 mono">
              NEUROMORPHIC EDGE PROCESSING
            </Badge>
            
            <h1 className="text-7xl font-bold mb-6 tracking-tight">
              Decision Intelligence
              <br />
              <span className="text-primary">Powered by NEPA</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Deterministic neuromorphic inference at the edge. No cloud dependency. 
              Sub-2ms latency. Every decision cryptographically auditable.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => onNavigate('contact')}
              >
                REQUEST BRIEFING
                <ArrowRight className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('platform')}
              >
                EXPLORE PLATFORM
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What is NEPA?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Neuromorphic Edge Processing Architecture: a deterministic spike-timing inference engine 
              built for regulated environments where every decision must be traceable, auditable, and accountable.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <Card className="p-8 bg-secondary border-border hover:border-primary/50 transition-colors">
              <Cpu size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Deterministic Core</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identical inputs always produce identical outputs. No probabilistic drift. 
                Fully reproducible inference chains for regulatory compliance.
              </p>
            </Card>

            <Card className="p-8 bg-secondary border-border hover:border-primary/50 transition-colors">
              <CloudArrowDown size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Edge-First Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deploy anywhere. No cloud round-trips. Sub-2ms latency contract enforced at the node. 
                Works offline, always.
              </p>
            </Card>

            <Card className="p-8 bg-secondary border-border hover:border-primary/50 transition-colors">
              <Eye size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Audit Trail Built-In</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every inference sealed with cryptographic proof-of-execution. 
                Chain of custody from sensor to decision.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 mono">
              NEPA PLATFORM
            </Badge>
            <h2 className="text-5xl font-bold mb-4">
              One Engine. Five Operating Agents.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every XODA agent is powered by the same NEPA neuromorphic inference core — 
              deterministic, auditable, deployable at the edge.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <Card 
              className="p-8 bg-card border-border hover:border-primary cursor-pointer transition-all group"
              onClick={() => onNavigate('voda')}
            >
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">VIDEO</Badge>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                Video Operations Decision Agent
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Governed video diagnostics agent. Converts raw camera streams into structured, 
                auditable findings through deterministic multi-lane neuromorphic inference.
              </p>
              <button className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                VODA <ArrowRight />
              </button>
            </Card>

            <Card 
              className="p-8 bg-card border-border hover:border-primary cursor-pointer transition-all group"
              onClick={() => onNavigate('roda')}
            >
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">ROBOTIC</Badge>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                Robotic Operations Decision Agent
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Spike-timing-dependent path adaptation for autonomous robots in dynamic 
                environments. Structured mission control with HRI escalation and real-time telemetry.
              </p>
              <button className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                RODA <ArrowRight />
              </button>
            </Card>

            <Card 
              className="p-8 bg-card border-border hover:border-primary cursor-pointer transition-all group"
              onClick={() => onNavigate('eoda')}
            >
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">EDGE</Badge>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                Edge Operations Decision Agent
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Thin-client neuromorphic inference deployable on any edge-class hardware. 
                No cloud round-trips. Sub-2ms latency contract enforced at the node.
              </p>
              <button className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                EODA <ArrowRight />
              </button>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card 
              className="p-8 bg-card border-border hover:border-primary cursor-pointer transition-all group"
              onClick={() => onNavigate('foda')}
            >
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">FACADE</Badge>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                Facade Operations Decision Agent
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Aerial structural inspection for building facades. Real-time spike processing 
                of RGB and thermal feeds during drone flight with cryptographic audit sealing per run.
              </p>
              <button className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                FODA <ArrowRight />
              </button>
            </Card>

            <Card 
              className="p-8 bg-card border-border hover:border-primary cursor-pointer transition-all group"
              onClick={() => onNavigate('soda')}
            >
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">SURVEILLANCE</Badge>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                Surveillance Operations Decision Agent
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Multi-camera live monitoring, alert escalation, and operator-authenticated 
                access control across facility nodes. No shared mutable state across camera lanes.
              </p>
              <button className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                SODA <ArrowRight />
              </button>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Powered by NEPA
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Deterministic. Traceable. Accountable.
            </p>
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onNavigate('contact')}
            >
              REQUEST BRIEFING
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
