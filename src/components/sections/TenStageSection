import { useState } from 'react'
import {
  Eye, Lightning, Brain, GraphIcon as Network, Stack, WaveSawtooth,
  Cpu, FlowArrow, ShieldCheck, ArrowsClockwise, CaretRight, Workflow,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

interface Stage {
  n: number
  label: string
  Icon: Icon
  desc: string
}

const STAGES: Stage[] = [
  { n: 1,  label: 'Sensor Ingestion',        Icon: Eye,                desc: 'Multi-modal input: RGB, depth, audio, IMU streams arrive via WebRTC/RTSP.' },
  { n: 2,  label: 'Spike Encoding',          Icon: Lightning,          desc: 'Raw signals converted to sparse spike trains via temporal contrast coding.' },
  { n: 3,  label: 'STDP Learning',           Icon: Brain,              desc: 'Spike-Timing Dependent Plasticity adapts synaptic weights online — no backprop.' },
  { n: 4,  label: 'World Model Prior',       Icon: WaveSawtooth,       desc: 'Latent dynamics model predicts next-frame state across spatial + temporal axes.' },
  { n: 5,  label: 'Perception Fusion',       Icon: Stack,              desc: 'STDP outputs fused with world model priors into a unified perception graph.' },
  { n: 6,  label: 'Anomaly Detection',       Icon: Cpu,                desc: 'Prediction error spikes trigger anomaly flags — no face recognition.' },
  { n: 7,  label: 'Agent Reasoning',         Icon: FlowArrow,          desc: 'VODA/CODA agents plan responses using perception graph + mission context.' },
  { n: 8,  label: 'Action Orchestration',    Icon: Workflow,           desc: 'NEPA dispatches commands to drones, robots, or downstream services.' },
  { n: 9,  label: 'Audit & SHA-256 Chain',   Icon: ShieldCheck,        desc: 'Every decision hashed into immutable audit log for compliance + replay.' },
  { n: 10, label: 'Continual Learning Loop', Icon: ArrowsClockwise,    desc: 'Outcomes feed back as STDP reinforcement — closing the hybrid learning loop.' },
]

export function TenStageSection() {
  const [open, setOpen] = useState<number | null>(1)

  return (
    <section className="relative py-16 px-6 md:px-10 border-t border-neutral-a4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Workflow size={18} weight="duotone" className="text-accent-9" />
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent-11">
            10-Stage NEPA Pipeline
          </p>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-12">
          From sensor to action. <span className="text-accent-9">Every step audited.</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-neutral-11 max-w-2xl">
          NEPA decisions traverse 10 stages — each one auditable, replayable, and SHA-256 chained. Click any stage to expand.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {STAGES.map(stage => {
            const isOpen = open === stage.n
            const Icon = stage.Icon
            return (
              <button
                key={stage.n}
                onClick={() => setOpen(isOpen ? null : stage.n)}
                aria-expanded={isOpen}
                className={`w-full text-left rounded-xl p-4 transition-all border ${
                  isOpen
                    ? 'bg-accent-a3 border-accent-a7'
                    : 'bg-neutral-a2 border-neutral-a4 hover:bg-neutral-a3'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-accent-a3 border border-accent-a5">
                    <Icon size={16} weight="duotone" className="text-accent-11" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-accent-11">
                      Stage {stage.n.toString().padStart(2, '0')}
                    </p>
                    <p className="text-sm font-semibold text-neutral-12">
                      {stage.label}
                    </p>
                  </div>
                  <CaretRight
                    size={14}
                    weight="bold"
                    className={`flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-90 text-accent-9' : 'text-neutral-11'
                    }`}
                  />
                </div>
                {isOpen && (
                  <p className="mt-3 text-[12px] leading-relaxed pl-12 text-neutral-11">
                    {stage.desc}
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
