import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const BOOT_LINES = [
  { text: 'INIT: NEPA v2.3 boot sequence...' },
  { text: 'CORE: Loading neuromorphic runtime...' },
  { text: 'AGENTS: Initializing VODA RODA FODA SODA EODA...' },
  { text: 'HARDWARE: Jetson Nano detected · TensorRT online' },
  { text: 'AUDIT: Hash chain verified · SHA-256 ready' },
  { text: 'SYSTEM: All agents operational · NEPA ready' },
]

const VODA_LINES = [
  { text: 'VODA AGENT — Video Operations & Detection' },
  { text: 'Initializing YOLOv8 inference engine...' },
  { text: 'Camera streams: 0/16 connected' },
  { text: 'Audit ledger: READY' },
  { text: 'VODA ready for deployment' },
]

type Phase = 'idle' | 'boot' | 'nepa' | 'voda'

interface BoundingBox {
  id: string
  label: string
  conf: string
  x: string
  y: string
  w: string
  h: string
  color: string
}

const BOUNDING_BOXES: BoundingBox[] = [
  { id: 'A', label: 'PERSON',    conf: '98%', x: '12%', y: '20%', w: '18%', h: '40%', color: '#00C8F0' },
  { id: 'B', label: 'VEHICLE',   conf: '94%', x: '55%', y: '35%', w: '25%', h: '30%', color: '#00C8F0' },
  { id: 'C', label: 'ZONE_A',    conf: '—',   x: '72%', y: '58%', w: '22%', h: '28%', color: '#FFA500' },
]

export function HeroSequence() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [bootLines, setBootLines] = useState<number[]>([])
  const [vodaLines, setVodaLines] = useState<number[]>([])
  const [showAurasense, setShowAurasense] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const [showNepa, setShowNepa] = useState(false)
  const [showVoda, setShowVoda] = useState(false)
  const [showBoxes, setShowBoxes] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('boot'), 800)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase !== 'boot') return
    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setBootLines((prev) => [...prev, i]), i * 420))
    })
    const finalTimer = setTimeout(() => {
      setPhase('nepa')
      setShowNepa(true)
    }, BOOT_LINES.length * 420 + 600)
    timers.push(finalTimer)
    return () => timers.forEach(clearTimeout)
  }, [phase])

  useEffect(() => {
    if (phase !== 'nepa' || !showNepa) return
    const t1 = setTimeout(() => {
      setShowNepa(false)
      setPhase('voda')
      setShowVoda(true)
    }, 2400)
    return () => clearTimeout(t1)
  }, [phase, showNepa])

  useEffect(() => {
    if (phase !== 'voda' || !showVoda) return
    const timers: ReturnType<typeof setTimeout>[] = []
    VODA_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVodaLines((prev) => [...prev, i]), i * 380))
    })
    const boxTimer = setTimeout(() => setShowBoxes(true), VODA_LINES.length * 380 + 400)
    const finalTimer = setTimeout(() => {
      setShowVoda(false)
      setShowBoxes(false)
      setPhase('idle')
      setShowAurasense(true)
    }, VODA_LINES.length * 380 + 2200)
    timers.push(boxTimer, finalTimer)
    return () => timers.forEach(clearTimeout)
  }, [phase, showVoda])

  useEffect(() => {
    if (!showAurasense) return
    const t = setTimeout(() => setShowCta(true), 800)
    return () => clearTimeout(t)
  }, [showAurasense])

  return (
    <section className="relative w-full min-h-screen bg-[#050508] overflow-hidden flex items-center justify-center">

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.008) 2px, rgba(0,212,255,0.008) 4px)',
      }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width:  Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              left:   Math.random() * 100 + '%',
              top:    Math.random() * 100 + '%',
              opacity: Math.random() * 0.2 + 0.05,
              animation: `float-up ${Math.random() * 16 + 12}s linear ${Math.random() * 10}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,102,255,0.06) 0%, transparent 70%)',
      }} />

      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ring-pulse-grad">
            <stop offset="0%" stopColor="#00C8F0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00C8F0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g transform="translate(50vw, 50vh)">
          <circle cx="0" cy="0" r="2" fill="#00C8F0" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="0" fill="none" stroke="url(#ring-pulse-grad)" strokeWidth="1.5">
            <animate attributeName="r" from="0" to="120" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="0" fill="none" stroke="url(#ring-pulse-grad)" strokeWidth="1.5">
            <animate attributeName="r" from="0" to="120" dur="4s" begin="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="4s" begin="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      <div className="relative z-10 w-full">

        {(phase === 'boot' || phase === 'nepa') && BOUNDING_BOXES.map((box) => (
          <div
            key={box.id}
            className="absolute pointer-events-none"
            style={{
              left: box.x,
              top: box.y,
              width: box.w,
              height: box.h,
              opacity: phase === 'nepa' ? 0 : 0.4,
              transition: 'opacity 0.8s ease-out',
            }}
          >
            <div
              className="absolute inset-0 border"
              style={{
                borderColor: box.color,
                borderWidth: '1.5px',
              }}
            />
            <div
              className="absolute -top-5 left-0 flex items-center gap-1.5"
              style={{ color: box.color }}
            >
              <span className="font-mono text-[9px] tracking-widest font-bold">
                {box.label}
              </span>
              <span className="font-mono text-[9px] opacity-60">
                {box.conf}
              </span>
            </div>
          </div>
        ))}

        {(phase === 'boot' || phase === 'nepa') && (
          <div
            className="absolute bottom-12 left-8 md:left-16 pointer-events-none"
            style={{
              opacity:    phase === 'nepa' ? 0 : 1,
              transition: 'opacity 0.8s ease-out',
            }}
          >
            <div className="space-y-1">
              {BOOT_LINES.map((line, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 font-mono text-[10px] tracking-widest"
                  style={{
                    opacity:    bootLines.includes(i) ? 1 : 0,
                    transform:  bootLines.includes(i) ? 'translateX(0)' : 'translateX(-8px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    color:      i === BOOT_LINES.length - 1 ? '#00C8F0' : 'rgba(255,255,255,0.35)',
                  }}
                >
                  <span className="text-cyan-400/40">{'>'}</span>
                  <span>{line.text}</span>
                  {i === BOOT_LINES.length - 1 && bootLines.includes(i) && (
                    <span
                      className="inline-block w-1.5 h-3 bg-cyan-400 ml-1"
                      style={{ animation: 'blink-cursor 0.8s step-end infinite' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
          style={{
            opacity:    showNepa && phase === 'nepa' ? 1 : 0,
            transform:  showNepa && phase === 'nepa' ? 'scale(1)' : 'scale(0.96)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.4em] text-cyan-400/50 uppercase mb-4">
            AuraSense presents
          </p>
          <h2
            className="font-black tracking-tight text-center leading-none"
            style={{
              fontSize:   'clamp(4rem, 12vw, 10rem)',
              color:      'white',
              textShadow: '0 0 80px rgba(0,200,240,0.3)',
            }}
          >
            NEPA
          </h2>
          <p
            className="font-light tracking-[0.3em] text-white/40 uppercase mt-3"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
          >
            Neuromorphic Edge Perception Agent
          </p>

          <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 space-y-3">
            {[
              { label: 'INFERENCE', value: '< 42ms' },
              { label: 'HARDWARE',  value: 'Jetson Nano' },
              { label: 'AUDIT',     value: 'SHA-256' },
              { label: 'CLOUD',     value: 'Zero' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="font-mono"
                style={{
                  opacity:    showNepa ? 1 : 0,
                  transform:  showNepa ? 'translateX(0)' : 'translateX(-12px)',
                  transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <p className="text-[9px] text-white/20 tracking-widest uppercase">{item.label}</p>
                <p className="text-[11px] text-cyan-400/70">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 space-y-3 text-right">
            {[
              { label: 'PATENT',  value: 'Feb 2026' },
              { label: 'PILOT',   value: 'Q2 2026' },
              { label: 'NODE',    value: 'HK-KLN-01' },
              { label: 'STATUS',  value: 'ONLINE' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="font-mono"
                style={{
                  opacity:    showNepa ? 1 : 0,
                  transform:  showNepa ? 'translateX(0)' : 'translateX(12px)',
                  transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <p className="text-[9px] text-white/20 tracking-widest uppercase">{item.label}</p>
                <p className="text-[11px] text-cyan-400/70">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
          style={{
            opacity:    showVoda ? 1 : 0,
            transform:  showVoda ? 'scale(1)' : 'scale(1.04)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <div className="text-center mb-6">
            <p className="font-mono text-[10px] tracking-[0.4em] text-cyan-400/40 uppercase mb-3">
              NEPA Agent — Video Intelligence
            </p>
            <h2
              className="font-black tracking-tight leading-none"
              style={{
                fontSize:   'clamp(3.5rem, 10vw, 8rem)',
                color:      '#00C8F0',
                textShadow: '0 0 60px rgba(0,200,240,0.5), 0 0 120px rgba(0,200,240,0.2)',
              }}
            >
              VODA
            </h2>
            <p className="font-light tracking-[0.25em] text-white/30 uppercase mt-2"
              style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' }}
            >
              Video Operations & Detection Agent
            </p>
          </div>

          <div className="space-y-1.5 mt-4">
            {VODA_LINES.map((line, i) => (
              <div
                key={i}
                className="flex items-center gap-2 font-mono text-[10px] tracking-widest justify-center"
                style={{
                  opacity:    vodaLines.includes(i) ? 1 : 0,
                  transform:  vodaLines.includes(i) ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  color:      i === 0 ? '#00C8F0' : 'rgba(255,255,255,0.30)',
                }}
              >
                <span className="text-cyan-400/30">{'>'}</span>
                <span>{line.text}</span>
              </div>
            ))}
          </div>

          {showBoxes && (
            <div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3"
              style={{ animation: 'fade-in 0.5s ease-out both' }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1"
                  style={{
                    animation: `fade-in 0.3s ease-out ${i * 0.06}s both`,
                  }}
                >
                  <div
                    className="w-10 h-7 border border-cyan-500/25 bg-cyan-500/5 rounded-sm flex items-center justify-center"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      style={{ animation: `flicker ${2 + i * 0.3}s infinite` }}
                    />
                  </div>
                  <span className="font-mono text-[8px] text-white/20">
                    CAM-{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center select-none"
          style={{
            opacity:    showAurasense ? 1 : 0,
            transform:  showAurasense ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.94)',
            transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1)',
            pointerEvents: showCta ? 'auto' : 'none',
          }}
        >
          <div
            className="mb-8"
            style={{
              opacity:    showAurasense ? 1 : 0,
              transform:  showAurasense ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
            }}
          >
            <div
              className="w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center mx-auto"
              style={{
                boxShadow:  '0 0 48px rgba(0,200,240,0.12)',
                animation:  showAurasense ? 'glow-pulse 3s ease-in-out infinite' : 'none',
              }}
            >
              <svg viewBox="0 0 28 28" fill="none" className="w-8 h-8">
                <polygon
                  points="14,2 26,8 26,20 14,26 2,20 2,8"
                  fill="none"
                  stroke="#00C8F0"
                  strokeWidth="1.5"
                />
                <polygon
                  points="14,7 21,10.5 21,17.5 14,21 7,17.5 7,10.5"
                  fill="#00C8F015"
                  stroke="#00C8F0"
                  strokeWidth="1"
                />
                <circle cx="14" cy="14" r="2.5" fill="#00C8F0"/>
              </svg>
            </div>
          </div>

          <div className="text-center mb-3">
            <h1
              className="font-bold tracking-tight leading-none"
              style={{
                fontSize:   'clamp(2.5rem, 8vw, 7rem)',
                color:      'white',
                textShadow: '0 0 60px rgba(0,200,240,0.15)',
                opacity:    showAurasense ? 1 : 0,
                transform:  showAurasense ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1.2s ease-out 0.2s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s',
              }}
            >
              AuraSense
            </h1>
            <p
              className="font-mono tracking-[0.35em] text-white/30 uppercase mt-3"
              style={{
                fontSize:   'clamp(0.65rem, 1.5vw, 0.875rem)',
                opacity:    showAurasense ? 1 : 0,
                transform:  showAurasense ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 1s ease-out 0.6s, transform 1s ease-out 0.6s',
              }}
            >
              NEPA Platform · Edge AI · Hong Kong
            </p>
          </div>

          <div
            className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent my-6"
            style={{
              opacity:    showAurasense ? 1 : 0,
              transform:  showAurasense ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s',
            }}
          />

          <p
            className="text-white/35 text-center max-w-md leading-relaxed px-6"
            style={{
              fontSize:   'clamp(0.8rem, 1.5vw, 1rem)',
              opacity:    showAurasense ? 1 : 0,
              transform:  showAurasense ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.8s ease-out 1s, transform 0.8s ease-out 1s',
            }}
          >
            Deterministic inference at the edge. No cloud. No latency. No compromise.
          </p>

          {showCta && (
            <div
              className="flex flex-wrap items-center justify-center gap-4 mt-8"
              style={{ animation: 'fade-in 0.8s ease-out both' }}
            >
              <Link
                to="/dashboard"
                className="bg-cyan-500 text-black font-semibold text-sm px-8 py-3.5 hover:bg-cyan-400 transition-colors"
              >
                Launch NEPA Console
              </Link>
              <Link
                to="/agent"
                className="border border-white/20 text-white/70 text-sm px-8 py-3.5 hover:border-white/40 hover:text-white transition-colors"
              >
                Ask NEPA
              </Link>
              <a
                href="https://playground.aurasensehk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/35 hover:text-white/60 transition-colors underline underline-offset-4"
              >
                Open playground →
              </a>
            </div>
          )}

          {!showCta && (
            <button
              onClick={() => {
                setPhase('idle')
                setShowAurasense(true)
                setShowCta(true)
                setShowVoda(false)
                setShowNepa(false)
                setShowBoxes(false)
              }}
              className="absolute bottom-8 right-8 text-xs text-white/20 hover:text-white/40 transition-colors font-mono border border-white/10 px-3 py-1.5 rounded hover:border-white/20"
            >
              Skip intro →
            </button>
          )}
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 pointer-events-none">
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/25 tracking-widest">
          <span
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{ animation: 'flicker 4s infinite' }}
          />
          NEPA // ONLINE
        </div>
        <div className="font-mono text-[10px] text-white/15 tracking-widest">
          HK-KOWLOON-01 · {new Date().toLocaleTimeString('en-HK', { hour12: false })}
        </div>
      </div>

      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0);      opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.15; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.1; r: 1.2; }
          50%       { opacity: 0.6; r: 2; }
        }
        @keyframes ring-pulse {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 12px rgba(0,200,240,0.5), 0 0 32px rgba(0,200,240,0.2); }
          50%       { box-shadow: 0 0 24px rgba(0,200,240,0.8), 0 0 64px rgba(0,200,240,0.3); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.3; }
          94% { opacity: 1; }
          96% { opacity: 0.5; }
          97% { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
