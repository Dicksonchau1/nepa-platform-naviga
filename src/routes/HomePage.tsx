import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Terminal } from '@phosphor-icons/react'
import { CountUp } from '@/components/CountUp'
import heroVideo from '@/assets/video/home-hero.mp4'

export function HomePage() {
  const [videoPlaying, setVideoPlaying] = useState(true)
  const [nepaRevealed, setNepaRevealed] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const nepaTimer = setTimeout(() => setNepaRevealed(true), 2000)
    const heroTimer = setTimeout(() => {
      setHeroVisible(true)
      setVideoPlaying(false)
    }, 3500)
    
    return () => {
      clearTimeout(nepaTimer)
      clearTimeout(heroTimer)
    }
  }, [])

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1500"
        style={{ opacity: videoPlaying ? 0.15 : 0.08 }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div 
        className="absolute inset-0 transition-opacity duration-1500"
        style={{ 
          opacity: heroVisible ? 1 : 0,
          background: 'radial-gradient(ellipse 120% 80% at 20% 50%, rgba(0,212,255,0.08) 0%, transparent 50%), radial-gradient(ellipse 100% 70% at 80% 30%, rgba(0,102,255,0.06) 0%, transparent 60%)'
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent transition-opacity duration-1500"
        style={{ opacity: heroVisible ? 1 : 0 }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 transition-opacity duration-1500"
        style={{ opacity: heroVisible ? 1 : 0 }}
      />
      <div 
        className="absolute inset-0 transition-opacity duration-1500"
        style={{ 
          opacity: heroVisible ? 1 : 0,
          background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, transparent 30%, rgba(107,33,255,0.03) 70%, transparent 100%)'
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-20 transition-opacity duration-1500" 
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: heroVisible ? 0.2 : 0
        }}
      />

      <div 
        className="absolute left-0 right-0 h-px pointer-events-none transition-opacity duration-1500"
        style={{
          background: 'linear-gradient(90deg, rgba(0,212,255,0.4) 0%, transparent 60%)',
          animation: 'sweep 8s linear infinite',
          opacity: heroVisible ? 1 : 0
        }}
      />

      <div className="relative z-20 container mx-auto px-8 pt-32 pb-16 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl">
          <div 
            className="flex items-center gap-3 mb-12 transition-opacity duration-1000"
            style={{ opacity: heroVisible ? 1 : 0 }}
          >
            <div className="relative flex items-center justify-center w-3 h-3">
              <div className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-cyan-500 rounded-full" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.22em] text-cyan-400/70 uppercase">
              System Online
            </span>
          </div>

          <div
            className="mb-10 transition-all duration-1000 ease-out"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
            }}
          >
            <h1 
              className="text-7xl md:text-9xl font-bold tracking-tight leading-[0.95] mb-4"
              style={{
                color: 'white',
                textShadow: '0 4px 8px rgba(0,0,0,0.5), 0 8px 24px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.15)',
                transform: 'translateZ(0)',
              }}
            >
              AuraSense
            </h1>
            <h2
              className="text-4xl md:text-6xl font-light tracking-tight leading-tight"
              style={{
                transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
                color: '#00D4FF',
                textShadow: '0 3px 6px rgba(0,0,0,0.5), 0 6px 18px rgba(0,212,255,0.4)',
              }}
            >
              Video Agent
            </h2>
          </div>

          <div
            className="mb-12 transition-opacity duration-1000 ease-out delay-700"
            style={{ opacity: heroVisible ? 1 : 0 }}
          >
            <div className="inline-block border-l-2 border-cyan-500/40 pl-6 mb-8">
              <p 
                className="font-mono text-xs tracking-[0.28em] uppercase mb-3 transition-all duration-700"
                style={{
                  opacity: nepaRevealed ? 1 : 0,
                  transform: nepaRevealed ? 'translateX(0)' : 'translateX(-12px)',
                  color: '#00D4FF',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                NEPA
              </p>
              <p 
                className="text-xl md:text-2xl font-light leading-relaxed mb-1 transition-all duration-700 delay-200"
                style={{
                  opacity: nepaRevealed ? 1 : 0,
                  transform: nepaRevealed ? 'translateX(0)' : 'translateX(-12px)',
                  color: 'white',
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                Neuromorphic
              </p>
              <p 
                className="text-xl md:text-2xl font-light leading-relaxed transition-all duration-700 delay-300"
                style={{
                  opacity: nepaRevealed ? 1 : 0,
                  transform: nepaRevealed ? 'translateX(0)' : 'translateX(-12px)',
                  color: 'white',
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                Edge Perception Agent
              </p>
            </div>

            <p 
              className="text-base max-w-xl leading-relaxed"
              style={{
                color: 'rgba(255,255,255,0.75)',
                textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              }}
            >
              Deterministic inference at the edge. No cloud. No latency. No compromise. 
              Built for autonomous retail, aerial inspection, and robotic delivery operations 
              across Asia-Pacific.
            </p>
          </div>

          <div
            className="flex items-center gap-4 flex-wrap mb-16 transition-opacity duration-1000 ease-out delay-1000"
            style={{ opacity: heroVisible ? 1 : 0 }}
          >
            <Button
              asChild
              size="lg"
              className="border border-cyan-500/40 text-black bg-cyan-500 hover:bg-cyan-400 font-mono text-[11px] tracking-[0.18em] uppercase px-8 py-6 shadow-lg shadow-cyan-500/30"
              style={{
                textShadow: 'none',
              }}
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
              className="border border-white/20 text-white/80 hover:bg-white/10 hover:text-white font-mono text-[11px] tracking-[0.18em] uppercase px-8 py-6"
            >
              <Link to="/about/contact">Request pilot access</Link>
            </Button>
          </div>

          <div
            className="font-mono text-[11px] flex items-center gap-8 flex-wrap border-t border-white/10 pt-8 transition-opacity duration-1000 ease-out delay-1000"
            style={{ opacity: heroVisible ? 1 : 0 }}
          >
            <div className="flex flex-col gap-1">
              <span 
                className="text-[10px] tracking-wider uppercase"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                Inference Latency
              </span>
              <span 
                className="font-semibold text-base"
                style={{
                  color: '#00D4FF',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4), 0 0 12px rgba(0,212,255,0.3)',
                }}
              >
                &lt;<CountUp target={42} suffix="ms" />
              </span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span 
                className="text-[10px] tracking-wider uppercase"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                Edge Nodes Active
              </span>
              <span 
                className="font-semibold text-base"
                style={{
                  color: '#00D4FF',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4), 0 0 12px rgba(0,212,255,0.3)',
                }}
              >
                <CountUp target={12} />
              </span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span 
                className="text-[10px] tracking-wider uppercase"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                Audit Events Today
              </span>
              <span 
                className="font-semibold text-base"
                style={{
                  color: '#00D4FF',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4), 0 0 12px rgba(0,212,255,0.3)',
                }}
              >
                <CountUp target={3847} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sweep {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  )
}
