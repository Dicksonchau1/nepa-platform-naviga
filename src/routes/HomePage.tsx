import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Terminal } from '@phosphor-icons/react'
import { LiveBadge } from '@/components/LiveBadge'
import { CountUp } from '@/components/CountUp'
import { SensorSweep } from '@/components/SensorSweep'
import heroVideo from '@/assets/video/home-hero.mp4'

export function HomePage() {
  const [feedLabel, setFeedLabel] = useState('FACADE_DEFECT: CONFIRMED')

  useEffect(() => {
    const labels = [
      'FACADE_DEFECT: CONFIRMED',
      'BRS: CLEAR',
      'OCCUPANCY: 3',
      'ANOMALY: NONE',
      'STRUCTURAL: NOMINAL',
    ]
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % labels.length
      setFeedLabel(labels[index])
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050508]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-radial from-[oklch(0.15_0.08_220)] via-[#050508]/60 to-[#050508]" />
      
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="scanlines absolute inset-0" />
      <SensorSweep />

      <div className="relative z-20 container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-between">
        <div className="font-mono text-[10px] tracking-widest text-cyan-glow/60 uppercase flex items-center gap-4 flex-wrap">
          <span>NEPA SYSTEM // ONLINE</span>
          <span className="flicker">●</span>
          <span>NODE: HK-KOWLOON-01</span>
          <span className="flicker">●</span>
          <span>UPTIME: 99.97%</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center -mt-20">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white text-center mb-4">
            <span className="text-reveal inline-block" style={{ animationDelay: '0.2s', opacity: 0 }}>
              NEUROMORPHIC
            </span>
          </h1>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white text-center mb-6">
            <span className="text-reveal inline-block" style={{ animationDelay: '0.5s', opacity: 0 }}>
              EDGE PERCEPTION
            </span>
          </h1>

          <div className="font-mono text-xs tracking-[0.3em] text-cyan-glow/70 uppercase mb-4">
            NEPA // AuraSense Platform v2.0
          </div>

          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed text-center mb-8">
            Deterministic inference at the edge. No cloud. No latency. No compromise. Built for autonomous retail, aerial inspection, and robotic delivery operations across Asia-Pacific.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="glow-pulse border border-cyan-glow/40 text-cyan-glow bg-transparent hover:bg-cyan-glow/10 font-mono text-[11px] tracking-[0.18em] uppercase px-8 py-6"
            >
              <Link to="/dashboard">
                <Terminal size={20} weight="duotone" className="mr-2" />
                Launch NEPA Console
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="border border-foreground/20 text-foreground/80 hover:bg-foreground/5 hover:text-foreground font-mono text-[11px] tracking-[0.18em] uppercase px-8 py-6"
            >
              <Link to="/about/contact">Request pilot access</Link>
            </Button>
          </div>

          <div className="font-mono text-[11px] text-foreground/50 flex items-center gap-6 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground/60">INFERENCE LATENCY</span>
              <span className="text-cyan-glow font-semibold">
                &lt;<CountUp target={42} suffix="ms" />
              </span>
            </div>
            <span className="text-muted-foreground/30">|</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground/60">EDGE NODES ACTIVE</span>
              <span className="text-cyan-glow font-semibold">
                <CountUp target={12} />
              </span>
            </div>
            <span className="text-muted-foreground/30">|</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground/60">AUDIT EVENTS TODAY</span>
              <span className="text-cyan-glow font-semibold">
                <CountUp target={3847} />
              </span>
            </div>
          </div>
        </div>

        <div className="hud-bracket bg-[#0A0D14]/80 backdrop-blur-xl border border-cyan-glow/20 rounded-lg p-6 max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <LiveBadge />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan-glow/60">
                NEPA VISION FEED — FACADE INSPECTION
              </span>
            </div>
            <div className="font-mono text-[9px] tracking-widest text-muted-foreground/50">
              STREAM-001 :: KOWLOON-EAST-14F
            </div>
          </div>

          <div className="relative aspect-video bg-black/60 rounded border border-cyan-glow/10 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-10">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-cyan-glow/20" />
              ))}
            </div>

            <div className="absolute top-1/3 left-1/4 w-32 h-24 border-2 border-cyan-glow/70 rounded">
              <div className="absolute -top-5 left-0 font-mono text-[9px] text-cyan-glow bg-black/80 px-1.5 py-0.5">
                {feedLabel}
              </div>
            </div>

            <div className="absolute bottom-1/3 right-1/4 w-24 h-20 border-2 border-purple-deep/60 rounded">
              <div className="absolute -top-5 left-0 font-mono text-[9px] text-purple-deep bg-black/80 px-1.5 py-0.5">
                BRS: NOMINAL
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-between px-4 pb-2">
              <div className="font-mono text-[9px] text-cyan-glow/60 tracking-wider">
                RT: 38ms | CONF: 94.2%
              </div>
              <div className="font-mono text-[9px] text-cyan-glow/60 tracking-wider">
                HASH: 7a4f8c...e29b
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
