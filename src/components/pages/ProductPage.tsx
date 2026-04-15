import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from '@phosphor-icons/react'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { CinematicBackground, ScanlineOverlay } from '@/components/CinematicBackground'

interface FeatureCard {
  icon: ReactNode
  title: string
  description: string
}

interface ProductPageProps {
  eyebrow: string
  title: string
  subtitle: string
  features: FeatureCard[]
  integrationTitle: string
  integrationDescription: string
}

export function ProductPage({
  eyebrow,
  title,
  subtitle,
  features,
  integrationTitle,
  integrationDescription,
}: ProductPageProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col relative">
      <CinematicBackground />
      
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ScanlineOverlay />
        
        <div className="container mx-auto px-6 relative z-10 pt-32 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-primary/5 text-primary border border-primary/20 mono text-xs px-4 py-2 uppercase tracking-wider">
              {eyebrow}
            </Badge>
            
            <h1 className="hero-h1-cinematic mb-8">
              {title}
            </h1>
            
            <p className="text-base text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/10 px-8 h-12 rounded-lg mono text-sm border border-primary/20"
                onClick={() => navigate('/contact')}
              >
                REQUEST BRIEFING
                <ArrowRight className="ml-2" weight="bold" size={16} />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border hover:border-primary/40 backdrop-blur-sm bg-background/20 h-12 px-8 rounded-lg mono text-sm"
              >
                API DOCS
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card group"
              >
                <div className="text-primary mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-card/20 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">{integrationTitle}</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-12 text-center max-w-2xl mx-auto">
              {integrationDescription}
            </p>
            
            <div className="glass-card">
              <div className="mono text-sm space-y-4">
                <div>
                  <div className="text-muted-foreground text-xs mb-2"># REST API Endpoint</div>
                  <div className="text-primary font-medium">POST https://api.nepa.io/v1/inference</div>
                </div>
                <div className="border-t border-border/20 pt-4">
                  <div className="text-muted-foreground text-xs mb-2"># gRPC Service</div>
                  <div className="text-primary font-medium">nepa.inference.v1.InferenceService</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 border-t border-border/20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.19_195_/_0.05)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by NEPA
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Deterministic. Traceable. Accountable.
            </p>
            <Button 
              size="lg"
              className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/10 px-10 h-14 rounded-lg mono text-sm border border-primary/20"
              onClick={() => navigate('/contact')}
            >
              REQUEST BRIEFING
              <ArrowRight className="ml-2" weight="bold" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
