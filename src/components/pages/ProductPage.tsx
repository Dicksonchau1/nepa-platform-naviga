import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CinematicBackground, ScanlineOverlay } from '@/components/CinematicBackground'

type FeatureCard = {
  icon?: ReactNode
  title: string
  description: string
}

export interface ProductPageProps {
  eyebrow: string
  title: string
  subtitle: string
  features: FeatureCard[]
  integrationTitle: string
  integrationDescription: string
  ctaLabel?: string
  ctaHref?: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href)
}

function ActionLink({ href, children }: { href: string; children: ReactNode }) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className="inline-flex items-center">
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className="inline-flex items-center">
      {children}
    </Link>
  )
}

export function ProductPage({
  eyebrow,
  title,
  subtitle,
  features,
  integrationTitle,
  integrationDescription,
  ctaLabel = 'Request a demo',
  ctaHref = '/auth?mode=signup',
  ctaSecondaryLabel = 'View documentation',
  ctaSecondaryHref = '/docs',
}: ProductPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CinematicBackground />
      <ScanlineOverlay />

      <section className="relative z-10 min-h-screen flex items-center py-24">
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <Badge className="mono mb-8 border border-primary/20 bg-primary/5 px-4 py-2 text-xs uppercase tracking-wider text-primary">
            {eyebrow}
          </Badge>

          <h1 className="hero-h1-cinematic mb-8">{title}</h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>

          <div className="mb-20 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-lg border border-primary/20 bg-primary/90 px-8 text-sm mono text-primary-foreground shadow-lg shadow-primary/10 hover:bg-primary"
            >
              <ActionLink href={ctaHref}>
                {ctaLabel}
                <ArrowRight className="ml-2" weight="bold" size={16} />
              </ActionLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-lg border-border bg-background/20 px-8 text-sm mono backdrop-blur-sm hover:border-primary/40"
            >
              <ActionLink href={ctaSecondaryHref}>{ctaSecondaryLabel}</ActionLink>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card group">
                {feature.icon && (
                  <div className="mb-6 text-primary transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                )}
                <h3 className="mb-4 text-xl font-bold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-border/20 bg-card/10 py-24 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{integrationTitle}</h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
              {integrationDescription}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductPage