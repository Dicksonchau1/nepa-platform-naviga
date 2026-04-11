import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from '@phosphor-icons/react'
import { ReactNode } from 'react'

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
  onNavigate: (page: string) => void
}

export function ProductPage({
  eyebrow,
  title,
  subtitle,
  features,
  integrationTitle,
  integrationDescription,
  onNavigate,
}: ProductPageProps) {
  return (
    <div className="flex flex-col">
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.15_0.15_145),oklch(0.08_0_0))]" />
        
        <div className="container mx-auto px-6 relative z-10 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 mono text-xs">
              {eyebrow}
            </Badge>
            
            <h1 className="text-6xl font-bold mb-6 tracking-tight">
              {title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => onNavigate('contact')}
              >
                REQUEST BRIEFING
              </Button>
              <Button 
                size="lg" 
                variant="outline"
              >
                API DOCS
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 bg-card border-2 border-border">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{integrationTitle}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {integrationDescription}
            </p>
            
            <div className="bg-secondary p-6 rounded-lg border border-border mono text-sm">
              <div className="text-muted-foreground mb-2"># REST API Endpoint</div>
              <div className="text-foreground">POST https://api.nepa.io/v1/inference</div>
              <div className="text-muted-foreground mt-4 mb-2"># gRPC Service</div>
              <div className="text-foreground">nepa.inference.v1.InferenceService</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Powered by NEPA — Deterministic. Traceable. Accountable.
            </h2>
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onNavigate('contact')}
            >
              REQUEST BRIEFING
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
