import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from '@phosphor-icons/react'
import { ReactNode } from 'react'
import { CinematicBackground, ScanlineOverlay } from '@/components/CinematicBackground'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface FeatureCard {
  icon?: ReactNode
  title: string
  description: string
}

interface PricingAnchor {
  label: string
  href: string
  description?: string
}

interface ProductPageProps {
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  heroVariant?: 'default' | 'split'
  featureGrid: FeatureCard[]
  architectureTitle: string
  architectureDescription: string
  architectureDiagram?: ReactNode
  pricingAnchor?: PricingAnchor
  features: FeatureCard[]
  integrationTitle: string
  integrationDescription: string
}

export function ProductPage({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  heroVariant = 'default',
  featureGrid,
  architectureTitle,
  architectureDescription,
  architectureDiagram,
  pricingAnchor,
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
          <div
            className={
              heroVariant === 'split'
                ? 'grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center'
                : 'max-w-4xl mx-auto text-center'
            }
          >
            <div>
              <Badge className="mb-8 bg-primary/5 text-primary border border-primary/20 mono text-xs px-4 py-2 uppercase tracking-wider">
                {eyebrow}
              </Badge>

              <h1 className="hero-h1-cinematic mb-8">{title}</h1>

              <p className="text-base text-muted-foreground mb-12 leading-relaxed max-w-2xl">
                {subtitle}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/10 px-8 h-12 rounded-lg mono text-sm border border-primary/20"
                >
                  <Link to={ctaHref}>
                    {ctaLabel}
                    <ArrowRight className="ml-2" weight="bold" size={16} />
                  </Link>
                </Button>
                {secondaryCtaLabel && secondaryCtaHref && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-border hover:border-primary/40 backdrop-blur-sm bg-background/20 h-12 px-8 rounded-lg mono text-sm"
                  >
                    <Link to={secondaryCtaHref}>{secondaryCtaLabel}</Link>
                  </Button>
                )}
              </div>
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
                onClick={() => navigate('/about/contact')}
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

            {heroVariant === 'split' && architectureDiagram && (
              <div className="glass-card">{architectureDiagram}</div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featureGrid.map((feature, index) => (
              <div key={index} className="glass-card group">
                {feature.icon && (
                  <div className="text-primary mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/20 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">{architectureTitle}</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-12 text-center max-w-2xl mx-auto">
              {architectureDescription}
            </p>

            {architectureDiagram ? (
              <div className="glass-card">{architectureDiagram}</div>
            ) : (
              <div className="glass-card text-center text-sm text-muted-foreground">Architecture diagram</div>
            )}
          </div>
        </div>
      </section>

      {pricingAnchor && (
        <section className="py-24 border-t border-border/20 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.19_195_/_0.05)_0%,transparent_60%)]" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{pricingAnchor.label}</h2>
              {pricingAnchor.description && (
                <p className="text-lg text-muted-foreground mb-10">{pricingAnchor.description}</p>
              )}
              <Button
                asChild
                size="lg"
                className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/10 px-10 h-14 rounded-lg mono text-sm border border-primary/20"
              >
                <Link to={pricingAnchor.href}>
                  View pricing
                  <ArrowRight className="ml-2" weight="bold" />
                </Link>
              </Button>
            </div>
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
              onClick={() => navigate('/about/contact')}
            >
              REQUEST BRIEFING
              <ArrowRight className="ml-2" weight="bold" />
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
