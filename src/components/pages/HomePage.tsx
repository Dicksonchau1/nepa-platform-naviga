import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, VideoCamera, Robot, Cube, ShoppingCart, Drone, Package } from '@phosphor-icons/react'
import { CinematicBackground, FloatingNodes, ScopeLines, ScrollHUD, ScanlineOverlay } from '@/components/CinematicBackground'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col relative">
      <CinematicBackground />
      
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ScanlineOverlay />
        <FloatingNodes />
        <ScopeLines />
        <ScrollHUD />
        
        <div className="container mx-auto px-6 relative z-10 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs px-3 py-1.5">
                Edge-native
              </Badge>
              <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs px-3 py-1.5">
                LLM-agnostic
              </Badge>
              <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs px-3 py-1.5">
                Real-time VODEC agent
              </Badge>
            </div>
            
            <h1 className="hero-h1-cinematic">
              Turn any camera feed into a{' '}
              <span className="accent-word">reliable</span> autonomous agent
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
              NEPA is a neuromorphic edge perception platform that provides a live, LLM-ready world model 
              for unmanned retail, inspection, and robotics.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 h-12 rounded-full text-sm"
                onClick={() => navigate('/signup')}
              >
                Get started
                <ArrowRight className="ml-2" weight="bold" size={16} />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border hover:border-primary/40 backdrop-blur-sm bg-background/20 h-12 px-8 rounded-full text-sm"
                onClick={() => navigate('/about/contact')}
              >
                Talk to us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">For unmanned operations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Reduce false alarms, missed events, and manual monitoring. NEPA turns raw video into structured, 
                timestamped events your systems can trust.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">For AI agents</h3>
              <p className="text-muted-foreground leading-relaxed">
                Any LLM can connect via tools to query the environment, reason over timelines, and propose safe 
                actions without parsing pixels.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">For edge deployments</h3>
              <p className="text-muted-foreground leading-relaxed">
                Neuromorphic-style sparse processing keeps latency low and compute costs predictable on Jetson 
                and similar hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Three steps to turn camera feeds into actionable intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <VideoCamera size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Ingest</h3>
                <p className="text-muted-foreground leading-relaxed">
                  NEPA connects to cameras and sensors, generating a sparse event stream and world model.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Robot size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Understand</h3>
                <p className="text-muted-foreground leading-relaxed">
                  LLMs and backends query the signature map over time slices, entities, and relations.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cube size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Act</h3>
                <p className="text-muted-foreground leading-relaxed">
                  NEPA validates actions, enforces safety, and drives lights, doors, devices, or alerts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Primary use cases
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From unmanned retail to autonomous inspection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div 
              className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
              onClick={() => navigate('/business/case-studies/unmanned-retail-hk')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingCart size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3">Unmanned convenience and micro-retail</h3>
              </div>
            </div>

            <div 
              className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
              onClick={() => navigate('/business/case-studies/unmanned-retail-hk')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingCart size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart stalls and pop-up stores</h3>
              </div>
            </div>

            <div 
              className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
              onClick={() => navigate('/business/case-studies/drone-inspection-facade')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Drone size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3">Drone and robotic inspection</h3>
              </div>
            </div>

            <div 
              className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl p-8 hover:border-primary/50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
              onClick={() => navigate('/business/case-studies/robotic-delivery-logistics')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Package size={24} className="text-primary" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3">Indoor delivery and service robots</h3>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-border hover:border-primary/40 backdrop-blur-sm bg-background/20"
              onClick={() => navigate('/business/case-studies/unmanned-retail-hk')}
            >
              View use cases
              <ArrowRight className="ml-2" size={16} weight="bold" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.12_0.08_145)_0%,transparent_60%)] opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-3xl p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to get started?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                  Turn your camera feeds into reliable autonomous agents
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-10 h-14 rounded-full text-base"
                    onClick={() => navigate('/signup')}
                  >
                    Get started
                    <ArrowRight className="ml-2" weight="bold" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-border hover:border-primary/40 backdrop-blur-sm bg-background/20 h-14 px-10 rounded-full text-base"
                    onClick={() => navigate('/about/contact')}
                  >
                    Talk to us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
