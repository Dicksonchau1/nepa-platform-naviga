import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CinematicBackground, ScanlineOverlay } from '@/components/CinematicBackground'
import { useNavigate } from 'react-router-dom'
import type { ComponentType } from 'react'

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
type IconComponent = ComponentType<{ size?: number; weight?: IconWeight; className?: string }>

interface FeatureCard {
  icon: IconComponent
  title: string
  description: string
}

export interface ProductPageProps {
  name: string
  fullName: string
  tagline: string
  features: FeatureCard[]
  terminalLines: string[]
  nepaLayer: 'perceive' | 'decide' | 'dispatch' | 'report' | 'pipeline'
  nepaLayerLabel: string
  pipelineSteps?: {
    step: string
    label: string
    active: boolean
  }[]
  ctaLabel?: string
  ctaHref?: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  integrationNote?: string
  deployTarget?: string
}

function NepaPositionBadge({
  nepaLayer,
  nepaLayerLabel,
}: {
  nepaLayer: string
  nepaLayerLabel: string
}) {
  const colorMap: Record<string, string> = {
    perceive: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
    decide: 'text-violet-400 border-violet-400/30 bg-violet-400/10',
    dispatch: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    report: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    pipeline: 'text-pink-400 border-pink-400/30 bg-pink-400/10',
  }
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs ${
        colorMap[nepaLayer] ?? colorMap.perceive
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {nepaLayerLabel}
    </div>
  )
}

function PipelineFlow({ steps }: { steps: NonNullable<ProductPageProps['pipelineSteps']> }) {
  return (
    <div className="flex items-center gap-1 flex-wrap mt-6 justify-center">
      {steps.map((s, i) => (
        <div key={s.step} className="flex items-center gap-1">
          <div
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
              s.active
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                : 'bg-white/5 border-white/10 text-gray-500'
            }`}
          >
            <span className="text-gray-600 mr-1">{String(i + 1).padStart(2, '0')}</span>
            {s.label}
          </div>
          {i < steps.length - 1 && (
            <span className={`font-mono text-xs mx-0.5 ${s.active ? 'text-cyan-500/60' : 'text-gray-700'}`}>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ProductPage({
  name,
  fullName,
  tagline,
  features,
  terminalLines,
  nepaLayer,
  nepaLayerLabel,
  pipelineSteps,
  ctaLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  integrationNote,
  deployTarget,
}: ProductPageProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col relative">
      <CinematicBackground />

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ScanlineOverlay />

        <div className="container mx-auto px-6 relative z-10 pt-32 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/5 text-primary border border-primary/20 mono text-xs px-4 py-2 uppercase tracking-wider">
              {name}
            </Badge>

            <h1 className="hero-h1-cinematic mb-6">
              {fullName}
            </h1>

            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              {tagline}
            </p>

            <p className="font-mono text-xs text-gray-500 mb-4">
              NEPA perceives → reasons → predicts → dispatches → reports
            </p>

            <div className="flex flex-col items-center gap-6">
              <NepaPositionBadge nepaLayer={nepaLayer} nepaLayerLabel={nepaLayerLabel} />
              {pipelineSteps && <PipelineFlow steps={pipelineSteps} />}
            </div>

            {(integrationNote || deployTarget) && (
              <div className="flex gap-4 mt-4 font-mono text-xs text-gray-500 justify-center flex-wrap">
                {integrationNote && <span>⊕ {integrationNote}</span>}
                {deployTarget && <span>⊞ Deploy: {deployTarget}</span>}
              </div>
            )}

            <div className="flex items-center justify-center gap-4 mt-10 flex-wrap">
              <Button
                size="lg"
                className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/10 px-8 h-12 rounded-lg mono text-sm border border-primary/20"
                onClick={() => navigate(ctaHref ?? '/auth?mode=signup')}
              >
                {ctaLabel ?? 'Request a demo'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/40 backdrop-blur-sm bg-background/20 h-12 px-8 rounded-lg mono text-sm"
                onClick={() => navigate(ctaSecondaryHref ?? '/docs')}
              >
                {ctaSecondaryLabel ?? 'View documentation'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="glass-card group"
                >
                  <div className="text-primary mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <Icon size={36} weight="duotone" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/20 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Live system telemetry</h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Real-time operational output from the NEPA execution loop.
              </p>
            </div>

            <div className="glass-card">
              <div className="mono text-sm space-y-3">
                {terminalLines.map((line) => (
                  <div key={line} className="text-primary font-medium">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
