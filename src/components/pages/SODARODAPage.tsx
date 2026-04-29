import { Link } from 'react-router-dom'
import {
  Robot, Brain, Lightning, ChartLine, ShieldCheck,
  Path, GitBranch, Cpu,
} from '@phosphor-icons/react'
import type { ReactNode } from 'react'

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs text-cyan-400/60 tracking-[0.28em] font-mono uppercase mb-3">
      {children}
    </p>
  )
}

interface CardProps {
  eyebrow: string
  title: string
  body: string
  bullets?: string[]
  icon?: ReactNode
}

function Card({ eyebrow, title, body, bullets, icon }: CardProps) {
  return (
    <div className="bg-[#050508] border border-white/10 rounded-lg p-7 hover:border-cyan-400/30 transition-colors">
      {icon ? <div className="text-cyan-400/80 mb-4">{icon}</div> : null}
      <p className="text-[10px] font-mono tracking-widest uppercase text-cyan-300/60 mb-2">
        {eyebrow}
      </p>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-sm text-white/55 leading-relaxed mb-4">{body}</p>
      {bullets ? (
        <ul className="space-y-1.5">
          {bullets.map((b) => (
            /55">
              <span className="text-cyan-400/70 mt-1">●</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function SODARODAPage() {
  return (
    <main className="min-h-screen bg-[#080B12] text-white overflow-x-hidden">
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <section className="pt-28 pb-16 border-b border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <Eyebrow>NEPA PLATFORM · STORE + ROBOTIC OPS</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Store + Robotic Operations<br/>
            <span className="text-cyan-300">Decision Agent</span>
          </h1>
          <p className="text-lg text-white/55 max-w-2xl leading-relaxed mb-10">
            From shelf-edge perception to physical action — SODA sees, RODA acts.
            One closed loop, deterministic, edge-first.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/signup?plan=trial"
                  className="bg-cyan-400 text-black font-semibold text-sm px-7 py-3 rounded-md hover:bg-cyan-300 transition-colors">
              Deploy SODA/RODA
            </Link>
            <Link to="/about/contact"
                  className="border border-white/20 text-white/70 text-sm px-7 py-3 rounded-md hover:border-white/40 hover:text-white transition-colors">
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <Eyebrow>ROBOTIC OPERATIONS</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Robotic Operations Decision Agent
          </h2>
          <p className="text-white/55 max-w-3xl leading-relaxed mb-12">
            NERMM-powered autonomous restocking. When NEPA detects a low-stock zone or
            clears a shrinkage alert, RODA dispatches the robotic arm — closing the
            loop from perception to physical action.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <Card icon={<Robot size={32} />}
                  eyebrow="NERMM — NEUROMORPHIC ROBOTIC MODULE"
                  title="Autonomous Restocking"
                  body="NERMM receives dispatch commands from NEPA's ACT layer via NERMDispatcher. Each restock command carries store ID, zone, SKU, priority, and the triggering anomaly score."
                  bullets={['NEPA anomaly to restock trigger pipeline','Priority queuing: urgent / normal / schedule','Zero human intervention for routine restocking','Dispatches on zone_id + SKU precision targeting']} />
            <Card icon={<Cpu size={32} />}
                  eyebrow="HARDWARE INTERFACE"
                  title="Edge-First Architecture"
                  body="Runs on Jetson Orin NX. Full stack boots via docker-compose up in under 90 seconds. RODA operates independently of cloud — decisions made at the edge, actions executed locally."
                  bullets={['Jetson Orin NX target hardware','Offline-capable — no cloud dependency','HAL abstraction for multi-robot support']} />
            <Card icon={<GitBranch size={32} />}
                  eyebrow="NISSM INTEGRATION"
                  title="Full Store Ops Layer"
                  body="NISSM (unmanned shop systems system) ties RODA into the full store management loop — inventory sync, supplier reorder triggers, and operational reporting via CODA."
                  bullets={['Multi-tier store architecture','Supplier reorder API integration','Daily ops CODA video report auto-generated']} />
            <Card icon={<ShieldCheck size={32} />}
                  eyebrow="SAFETY & AUDIT"
                  title="Deterministic Action Trail"
                  body="Every dispatch is hash-chained. Every robot action is logged with NEPA frame reference, decision rule fired, and operator override availability."
                  bullets={['SHA-256 hash-chained dispatch records','Operator override available at any state','Full audit export for compliance review','Replayable decision history per arm']} />
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/5 bg-[#070A11]">
        <div className="container mx-auto px-6 max-w-6xl">
          <Eyebrow>STORE OPERATIONS</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Store Operations Decision Agent
          </h2>
          <p className="text-white/55 max-w-3xl leading-relaxed mb-12">
            A fully autonomous unmanned store intelligence system. SODA turns any
            convenience store into a 24/7 self-operating unit — no staff required,
            zero blind spots, real-time behavioral intelligence.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <Card icon={<Brain size={32} />}
                  eyebrow="NEUROMORPHIC EDGE PERCEPTION AGENT"
                  title="NEPA — The Store Brain"
                  body="Real-time multilane perception engine running on-device. YOLO detection feeds STDP-learning SignatureMaps that build a behavioral world model of every customer, product zone, and anomaly — without cloud dependency."
                  bullets={['Multilane ROI + dopamine-modulated attention','STDP weight learning across sessions','Behavioral trajectory prediction (FrameStatePredictor)','Shrinkage detection with under 0.5% false positive rate','AVX2-accelerated spike processing at 3.8 kHz']} />
            <Card icon={<Lightning size={32} />}
                  eyebrow="AUTONOMOUS DECISION LAYER"
                  title="agent_runtime.py"
                  body="Agentic dispatch layer that translates perceptions into store actions — door locks, alerts, restocking triggers, CODA report generation — all sandboxed and memory-augmented."
                  bullets={['Sandbox + memory + dispatch in one runtime','Wired to WhatsApp + email alert delivery','PDPO-compliant audit logging']} />
            <Card icon={<Path size={32} />}
                  eyebrow="ADAPTIVE WORLD MODEL API"
                  title="World Model Endpoints"
                  body="REST API giving operators real-time access to the store's learned behavioral model — zone stats, anomaly scores, spatial updates, and consultation triggers."
                  bullets={['/voda/world-model/stats — live store intelligence','/voda/world-model/configure — zone setup','/process-adaptive — multipart + JSON input']} />
            <Card icon={<ChartLine size={32} />}
                  eyebrow="BUSINESS INTELLIGENCE"
                  title="Daily Cinematic Reports"
                  body="Every 24 hours SODA + CODA produce a narrated MP4 covering footfall, shrinkage events, restock cycles, and behavioral anomalies — delivered to operator WhatsApp + email under 60 seconds."
                  bullets={['Auto-generated film/avatar/pitch modes','STDP-learned weekly trend reports','Boardroom-ready evidence packages']} />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            One closed loop. Edge-first. Deterministic.
          </h2>
          <p className="text-white/55 leading-relaxed mb-10 max-w-2xl mx-auto">
            SODA sees. RODA acts. NEPA learns. CODA reports. Deploy the full
            autonomous store stack on Jetson Orin NX — under 90 seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup?plan=trial"
                  className="bg-cyan-400 text-black font-semibold text-sm px-7 py-3 rounded-md hover:bg-cyan-300 transition-colors">
              Deploy SODA/RODA
            </Link>
            <Link to="/about/contact"
                              className="border border-white/20 text-white/70 text-sm px-7 py-3 rounded-md hover:border-white/40 hover:text-white transition-colors">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SODARODAPage
