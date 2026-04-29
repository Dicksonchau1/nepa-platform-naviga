import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from '@phosphor-icons/react'
import { ReactNode, ComponentType, isValidElement } from 'react'
import { CinematicBackground, ScanlineOverlay } from '@/components/CinematicBackground'

interface FeatureCard {
  icon?: ReactNode | ComponentType<{ size?: number; weight?: string }>
  title: string
  description: string
}

interface PipelineStep {
  step: string
  label: string
  active: boolean
}

interface PricingAnchor {
  label: string
  href: string
  description: string
}

interface ProductPageProps {
  name?: string
  fullName?: string
  tagline?: string
  nepaLayer?: string
  nepaLayerLabel?: string
  pipelineSteps?: PipelineStep[]
  features?: FeatureCard[]
  terminalLines?: string[]
  ctaLabel?: string
  ctaHref?: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  integrationNote?: string
  deployTarget?: string

  eyebrow?: string
  title?: string
  subtitle?: string
  featureGrid?: FeatureCard[]
  architectureTitle?: string
  architectureDescription?: string
  architectureDiagram?: ReactNode
  pricingAnchor?: PricingAnchor

  integrationTitle?: string
  integrationDescription?: string
  onNavigate?: (page: string) => void
}

function renderIcon(icon: FeatureCard['icon']): ReactNode {
  if (!icon) return null
  if (isValidElement(icon)) return icon
  const maybeFwd = icon as any
  if (typeof icon === 'function' || (maybeFwd && (maybeFwd.$$typeof || typeof maybeFwd.render === 'function'))) {
    const Icon = icon as ComponentType<{ size?: number; weight?: string }>
    return <Icon size={28} weight="duotone" />
  }
  return icon as ReactNode
}

export function ProductPage(props: ProductPageProps) {
  const displayEyebrow         = props.eyebrow ?? props.name ?? ''
  const displayTitle           = props.title ?? props.fullName ?? props.name ?? ''
  const displaySubtitle        = props.subtitle ?? props.tagline ?? ''
  const displayFeatures        = props.features ?? props.featureGrid ?? []
  const displayCta             = props.ctaLabel ?? 'REQUEST BRIEFING'
  const displayCtaHref         = props.ctaHref
  const displayCtaSecondary    = props.ctaSecondaryLabel
  const displayCtaSecondaryHref = props.ctaSecondaryHref
  const integrationT           = props.architectureTitle ?? props.integrationTitle ?? 'Integration'
  const integrationD           = props.architectureDescription ?? props.integrationDescription ?? props.integrationNote ?? ''
  const pipeline               = props.pipelineSteps ?? []
  const terminal               = props.terminalLines ?? []

  const handleCta = () => {
    if (displayCtaHref) {
      if (displayCtaHref.startsWith('http') || displayCtaHref.startsWith('mailto:')) {
        window.location.href = displayCtaHref
      } else {
        window.location.assign(displayCtaHref)
      }
    } else if (props.onNavigate) {
      props.onNavigate('contact')
    }
  }

  const handleSecondaryCta = () => {
    if (displayCtaSecondaryHref) window.location.assign(displayCtaSecondaryHref)
  }

  return (
    <div className="flex flex-col relative">
      <CinematicBackground />

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ScanlineOverlay />
        <div className="container mx-auto px-6 relative z-10 pt-32 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {displayEyebrow && (
              <Badge className="mb-8 bg-primary/5 text-primary border border-primary/20 mono text-xs px-4 py-2 uppercase tracking-wider">
                {displayEyebrow}
              </Badge>
            )}
            {displayTitle && <h1 className="hero-h1-cinematic mb-8">{displayTitle}</h1>}
            {displaySubtitle && (
              <p className="text-base text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
                {displaySubtitle}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                size="lg"
                className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/10 px-8 h-12 rounded-lg mono text-sm border border-primary/20"
                onClick={handleCta}
              >
                {displayCta}
                <ArrowRight className="ml-2" weight="bold" size={16} />
              </Button>
              {displayCtaSecondary && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:border-primary/40 backdrop-blur-sm bg-background/20 h-12 px-8 rounded-lg mono text-sm"
                  onClick={handleSecondaryCta}
                >
                  {displayCtaSecondary}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {props.nepaLayerLabel && (
        <section className="py-12 border-y border-border/20 bg-card/10 relative z-10">
          <div className="container mx-auto px-6 text-center">
            <p className="mono text-xs uppercase tracking-widest text-primary">{props.nepaLayerLabel}</p>
          </div>
        </section>
      )}

      {pipeline.length > 0 && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto">
              {pipeline.map((s, i) => (
                <div
                  key={s.step ?? i}
                  className={`mono text-xs uppercase px-4 py-2 rounded-md border ${s.active ? 'border-primary/40 text-primary bg-primary/5' : 'border-border/30 text-muted-foreground'}`}
                >
                  {s.label}
                  {i < pipeline.length - 1 && <span className="ml-3 opacity-50">→</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {displayFeatures.length > 0 && (
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {displayFeatures.map((feature, index) => (
                <div key={index} className="glass-card group">
                  <div className="text-primary mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {renderIcon(feature.icon)}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {terminal.length > 0 && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto glass-card">
              <div className="mono text-xs space-y-2 text-primary/90">
                {terminal.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-32 bg-card/20 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">{integrationT}</h2>
            {integrationD && (
              <p className="text-base text-muted-foreground leading-relaxed mb-12 text-center max-w-2xl mx-auto">
                {integrationD}
              </p>
            )}
            {props.architectureDiagram ? (
              <div className="glass-card">{props.architectureDiagram}</div>
            ) : (
              <div className="glass-card">
                <div className="mono text-sm space-y-4">
                  <div>
                    <div className="text-muted-foreground text-xs mb-2"># REST API Endpoint</div>
                    <div className="text-primary font-medium">POST https://api.nepa.io/v1/inference</div>
                  </div>
                  <div className="border-t border-border/20 pt-4">
                    <div className="text-muted-foreground text-xs mb-2"># gRPC Service</div>
                    <div className="text-primary font-medium">nepa.inference.v1.InferenceService</div>
                  </div>                                                                                                                                                {props.deployTarget && (
                    <div className="border-t border-border/20 pt-4">
                      <div className="text-muted-foreground text-xs mb-2"># Deploy target</div>
                      <div className="text-primary font-medium">{props.deployTarget}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {props.pricingAnchor && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-6 text-center max-w-2xl">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">{props.pricingAnchor.label}</p>
            <p className="text-base text-muted-foreground mb-6">{props.pricingAnchor.description}</p>
            <Button onClick={() => window.location.assign(props.pricingAnchor!.href)} className="mono text-sm">
              View pricing <ArrowRight className="ml-2" size={14} />
            </Button>
          </div>
        </section>
      )}

      <section className="py-32 border-t border-border/20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.19_195_/_0.05)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Powered by NEPA</h2>
            <p className="text-lg text-muted-foreground mb-10">Deterministic. Traceable. Accountable.</p>
            <Button
              size="lg"
              className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/10 px-10 h-14 rounded-lg mono text-sm border border-primary/20"
              onClick={handleCta}
            >
              {displayCta}
              <ArrowRight className="ml-2" weight="bold" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductPage
