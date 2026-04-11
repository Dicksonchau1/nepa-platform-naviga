import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Terminal } from '@phosphor-icons/react'
import { CountUp } from '@/components/CountUp'
import heroVideo from '@/assets/video/home-hero.mp4'

export function HomePage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
      
      <div className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,150,220,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(0,150,220,0.4) 0%, transparent 60%)',
          animation: 'sweep 8s linear infinite',
        }}
      />

      <div className="relative z-20 container mx-auto px-8 pt-32 pb-16 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-12">
            <div className="relative flex items-center justify-center w-3 h-3">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-blue-600 rounded-full" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.22em] text-blue-600/70 uppercase">
              System Online
            </span>
          </div>

          <div
            className="mb-10 transition-all duration-1000 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
            }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tight leading-[0.95] mb-4">
              <span className="text-gray-900">AuraSense</span>
            </h1>
            <h2
              className="text-4xl md:text-6xl font-light tracking-tight leading-tight text-blue-600"
              style={{
                transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
              }}
            >
              Video Agent
            </h2>
          </div>

          <div
            className="mb-12 transition-opacity duration-1000 ease-out delay-700"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <div className="inline-block border-l-2 border-blue-500/40 pl-6 mb-8">
              <p className="font-mono text-xs tracking-[0.28em] text-blue-600/70 uppercase mb-3">
                NEPA
              </p>
              <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed mb-1">
                Neuromorphic
              </p>
              <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed">
                Edge Perception Agent
              </p>
            </div>

            <p className="text-base text-gray-600 max-w-xl leading-relaxed">
              Deterministic inference at the edge. No cloud. No latency. No compromise. 
              Built for autonomous retail, aerial inspection, and robotic delivery operations 
              across Asia-Pacific.
            </p>
          </div>

          <div
            className="flex items-center gap-4 flex-wrap mb-16 transition-opacity duration-1000 ease-out delay-1000"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <Button
              asChild
              size="lg"
              className="border border-blue-600/30 text-white bg-blue-600 hover:bg-blue-700 font-mono text-[11px] tracking-[0.18em] uppercase px-8 py-6 shadow-lg shadow-blue-600/20"
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
              className="border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-mono text-[11px] tracking-[0.18em] uppercase px-8 py-6"
            >
              <Link to="/about/contact">Request pilot access</Link>
            </Button>
          </div>

          <div
            className="font-mono text-[11px] flex items-center gap-8 flex-wrap border-t border-gray-200 pt-8 transition-opacity duration-1000 ease-out delay-1000"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-[10px] tracking-wider uppercase">Inference Latency</span>
              <span className="text-blue-600 font-semibold text-base">
                &lt;<CountUp target={42} suffix="ms" />
              </span>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-[10px] tracking-wider uppercase">Edge Nodes Active</span>
              <span className="text-blue-600 font-semibold text-base">
                <CountUp target={12} />
              </span>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-[10px] tracking-wider uppercase">Audit Events Today</span>
              <span className="text-blue-600 font-semibold text-base">
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
