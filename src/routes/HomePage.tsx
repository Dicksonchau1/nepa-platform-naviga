import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, VideoCamera, Robot, Cube, ShoppingCart, Drone, Package } from '@phosphor-icons/react'
import { CinematicBackground, FloatingNodes, ScopeLines, ScrollHUD, ScanlineOverlay } from '@/components/CinematicBackground'
import { Link } from 'react-router-dom'

export function HomePage() {
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
                <Link to="/about/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker-bar relative z-10">
        <div className="ticker-track">
          <span className="ticker-item">Edge-native</span>
          <span className="ticker-item">LLM-agnostic</span>
          <span className="ticker-item">Real-time VODEC</span>
          <span className="ticker-item">Neuromorphic Processing</span>
          <span className="ticker-item">Deterministic Outputs</span>
          <span className="ticker-item">Edge-native</span>
          <span className="ticker-item">LLM-agnostic</span>
          <span className="ticker-item">Real-time VODEC</span>
          <span className="ticker-item">Neuromorphic Processing</span>
          <span className="ticker-item">Deterministic Outputs</span>
        </div>
      </div>

      <section className="relative z-10 py-32 bg-background/80">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-card">
              <span className="glyph">∞</span>
              <h3 className="text-xl font-semibold mb-3">For unmanned operations</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Reduce false alarms, missed events, and manual monitoring. NEPA turns raw video into 
                structured, timestamped events your systems can trust.
              </p>
            </div>

            <div className="glass-card">
              <span className="glyph">⚡</span>
              <h3 className="text-xl font-semibold mb-3">For AI agents</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Any LLM can connect via tools to query the environment, reason over timelines, and 
                propose safe actions without parsing pixels.
              </p>
            </div>

            <div className="glass-card">
              <span className="glyph">◇</span>
              <h3 className="text-xl font-semibold mb-3">For edge deployments</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Neuromorphic-style sparse processing keeps latency low and compute costs predictable 
                on Jetson and similar hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 bg-card/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">
              Three steps from camera feed to autonomous action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-card text-center">
              <div className="text-6xl mb-6 text-primary mono">01</div>
              <h3 className="text-xl font-semibold mb-3">Ingest</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                NEPA connects to cameras and sensors, generating a sparse event stream and world model.
              </p>
            </div>

            <div className="glass-card text-center">
              <div className="text-6xl mb-6 text-primary mono">02</div>
              <h3 className="text-xl font-semibold mb-3">Understand</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                LLMs and backends query the signature map over time slices, entities, and relations.
              </p>
            </div>

            <div className="glass-card text-center">
              <div className="text-6xl mb-6 text-primary mono">03</div>
              <h3 className="text-xl font-semibold mb-3">Act</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                NEPA validates actions, enforces safety, and drives lights, doors, devices, or alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 bg-background/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Primary use cases</h2>
            <p className="text-muted-foreground text-lg">
              Built for real-world autonomous operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="glass-card">
              <ShoppingCart size={32} className="text-primary mb-4" />
              <h3 className="font-semibold mb-2">Unmanned Retail</h3>
              <p className="text-muted-foreground text-sm">
                Convenience stores and micro-retail
              </p>
            </div>

            <div className="glass-card">
              <VideoCamera size={32} className="text-primary mb-4" />
              <h3 className="font-semibold mb-2">Smart Stalls</h3>
              <p className="text-muted-foreground text-sm">
                Pop-up stores and kiosks
              </p>
            </div>

            <div className="glass-card">
              <Drone size={32} className="text-primary mb-4" />
              <h3 className="font-semibold mb-2">Inspection Drones</h3>
              <p className="text-muted-foreground text-sm">
                Aerial and robotic inspection
              </p>
            </div>

            <div className="glass-card">
              <Package size={32} className="text-primary mb-4" />
              <h3 className="font-semibold mb-2">Indoor Robots</h3>
              <p className="text-muted-foreground text-sm">
                Delivery and service robots
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to build autonomous systems?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Start with NEPA's perception infrastructure and ship reliable autonomous agents faster.
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
                <Link to="/about/contact">Contact sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
