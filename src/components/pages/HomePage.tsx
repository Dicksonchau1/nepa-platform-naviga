import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Cpu, Eye, Robot, CloudArrowDown, Buildings, Screencast, ShieldCheck, Lightning, Atom } from '@phosphor-icons/react'
import { AnimatedBackground } from '@/components/AnimatedBackground'

interface HomePageProps {
  onNavigate: (page: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex flex-col">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        <AnimatedBackground />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="text-center relative z-10">
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 mono text-xs px-4 py-1.5">
                  NEUROMORPHIC EDGE PROCESSING
                </Badge>
                
                <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
                  Decision Intelligence
                  <br />
                  <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                    Powered by NEPA
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                  Deterministic neuromorphic inference at the edge. No cloud dependency. 
                  Sub-2ms latency. Every decision cryptographically auditable.
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-12">
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 h-12 rounded-full"
                    onClick={() => onNavigate('contact')}
                  >
                    REQUEST BRIEFING
                    <ArrowRight className="ml-2" weight="bold" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-border/50 hover:border-primary/50 backdrop-blur-sm bg-background/50 h-12 px-8 rounded-full"
                    onClick={() => onNavigate('platform')}
                  >
                    EXPLORE PLATFORM
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ShieldCheck size={18} className="text-primary" weight="duotone" />
                    <span>Auditable</span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Lightning size={18} className="text-primary" weight="duotone" />
                    <span>Sub-2ms</span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Atom size={18} className="text-primary" weight="duotone" />
                    <span>Edge-First</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              What is NEPA?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Neuromorphic Edge Processing Architecture: a deterministic spike-timing inference engine 
              built for regulated environments where every decision must be traceable, auditable, and accountable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-4">Deterministic Core</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Identical inputs always produce identical outputs. No probabilistic drift. 
                  Fully reproducible inference chains for regulatory compliance.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CloudArrowDown size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-4">Edge-First Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deploy anywhere. No cloud round-trips. Sub-2ms latency contract enforced at the node. 
                  Works offline, always.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Eye size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-4">Audit Trail Built-In</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every inference sealed with cryptographic proof-of-execution. 
                  Chain of custody from sensor to decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 mono text-xs px-4 py-1.5">
              NEPA PLATFORM
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              One Engine. Five Operating Agents.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every XODA agent is powered by the same NEPA neuromorphic inference core — 
              deterministic, auditable, deployable at the edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 max-w-7xl mx-auto">
            <div 
              className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
              onClick={() => onNavigate('voda')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/30 text-xs px-3 py-1">VIDEO</Badge>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Video Operations Decision Agent
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
                  Governed video diagnostics agent. Converts raw camera streams into structured, 
                  auditable findings through deterministic multi-lane neuromorphic inference.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold mono text-sm group-hover:gap-3 transition-all">
                  VODA <ArrowRight size={16} weight="bold" />
                </div>
              </div>
            </div>

            <div 
              className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
              onClick={() => onNavigate('roda')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/30 text-xs px-3 py-1">ROBOTIC</Badge>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Robotic Operations Decision Agent
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
                  Spike-timing-dependent path adaptation for autonomous robots in dynamic 
                  environments. Structured mission control with HRI escalation and real-time telemetry.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold mono text-sm group-hover:gap-3 transition-all">
                  RODA <ArrowRight size={16} weight="bold" />
                </div>
              </div>
            </div>

            <div 
              className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
              onClick={() => onNavigate('eoda')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/30 text-xs px-3 py-1">EDGE</Badge>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Edge Operations Decision Agent
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
                  Thin-client neuromorphic inference deployable on any edge-class hardware. 
                  No cloud round-trips. Sub-2ms latency contract enforced at the node.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold mono text-sm group-hover:gap-3 transition-all">
                  EODA <ArrowRight size={16} weight="bold" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div 
              className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
              onClick={() => onNavigate('foda')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/30 text-xs px-3 py-1">FACADE</Badge>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Facade Operations Decision Agent
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
                  Aerial structural inspection for building facades. Real-time spike processing 
                  of RGB and thermal feeds during drone flight with cryptographic audit sealing per run.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold mono text-sm group-hover:gap-3 transition-all">
                  FODA <ArrowRight size={16} weight="bold" />
                </div>
              </div>
            </div>

            <div 
              className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
              onClick={() => onNavigate('soda')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/30 text-xs px-3 py-1">SURVEILLANCE</Badge>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Surveillance Operations Decision Agent
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
                  Multi-camera live monitoring, alert escalation, and operator-authenticated 
                  access control across facility nodes. No shared mutable state across camera lanes.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold mono text-sm group-hover:gap-3 transition-all">
                  SODA <ArrowRight size={16} weight="bold" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.12_0.08_145)_0%,transparent_60%)] opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-3xl p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Powered by NEPA
                </h2>
                <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                  Deterministic. Traceable. Accountable.
                </p>
                <Button 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-10 h-14 rounded-full text-base"
                  onClick={() => onNavigate('contact')}
                >
                  REQUEST BRIEFING
                  <ArrowRight className="ml-2" weight="bold" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
