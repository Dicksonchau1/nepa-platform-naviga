import { useState, useRef } from 'react'
import { Globe, Lightning, Brain, SpeakerSimpleHigh, SpeakerSimpleSlash, Play } from '@phosphor-icons/react'

const STATS = [
  { label: 'Latency',  value: '8.2ms' },
  { label: 'Sparsity', value: '94%'   },
  { label: 'Energy',   value: '0.3W'  },
]

const ENDPOINTS = [
  { label: 'Visual Inference',    method: 'POST', path: '/api/nepa/inference/visual',    Icon: Globe },
  { label: 'Spatiotemporal STDP', method: 'POST', path: '/api/nepa/inference/stdp',      Icon: Lightning },
  { label: 'World Model Predict', method: 'POST', path: '/api/nepa/world-model/predict', Icon: Brain },
]

export function WorldModelSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  return (
    <section className="relative py-16 px-6 md:px-10 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Globe size={18} weight="duotone" className="text-cyan-400" />
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">
            World Model · STDP
          </p>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Latent dynamics. <span className="text-cyan-400">Sparse spikes.</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/70 max-w-2xl">
          The world model learns a latent prior over scene dynamics. STDP layers supply event-driven spikes that update the prior online — no labels, no backprop. Prediction error becomes the anomaly signal.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div className="relative rounded-2xl overflow-hidden bg-black border border-cyan-500/30"
               style={{ aspectRatio: '16/9' }}>
            <video
              ref={videoRef}
              src="/SFSVC_Herosection.mp4"
              autoPlay
              loop
              playsInline
              muted={muted}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setMuted(m => !m)}
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-black/70 backdrop-blur-md border border-cyan-500/40 text-cyan-300 transition hover:bg-black/90"
            >
              {muted ? <SpeakerSimpleSlash size={16} weight="bold" /> : <SpeakerSimpleHigh size={16} weight="bold" />}
            </button>
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-widest bg-black/70 backdrop-blur-md border border-cyan-500/40 text-cyan-300">
              World Model · Live
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {STATS.map(s => (
                <div key={s.label}
                  className="px-3 py-3 rounded-xl text-center bg-zinc-900/60 border border-cyan-500/20">
                  <p className="text-[8px] uppercase tracking-widest text-white/50">{s.label}</p>
                  <p className="mt-1 text-sm md:text-base font-mono font-bold text-cyan-400">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-1">
              {ENDPOINTS.map(({ label, method, path, Icon }) => (
                <div key={path}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-cyan-500/40 transition">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30">
                    <Icon size={14} weight="duotone" className="text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-white truncate">{label}</p>
                    <p className="text-[10px] font-mono text-white/60 truncate">
                      <span className="text-cyan-400">{method}</span> {path}
                    </p>
                  </div>
                  <Play size={12} weight="fill" className="text-cyan-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
