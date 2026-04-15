import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { LiveBadge } from '@/components/LiveBadge'
import { TerminalLine } from '@/components/TerminalLine'
import { SensorSweep } from '@/components/SensorSweep'
import { CountUp } from '@/components/CountUp'

const pipeline = [
  {
    title: 'Sense',
    body: 'Cameras, edge sensors, POS, and robotics state.',
  },
  {
    title: 'Model',
    body: 'NEPA SignatureMaps + live world model.',
  },
  {
    title: 'Reason',
    body: 'Anomaly scoring, memory, and consultation.',
  },
  {
    title: 'Act',
    body: 'Alerts, access control, and robotic dispatch.',
  },
  {
    title: 'Report',
    body: 'CODA evidence packs, summaries, and audits.',
  },
]

const products = [
  {
    title: 'SODA',
    description: 'Autonomous unmanned store operations.',
    bullets: ['Store-level perception', 'Behavioral intelligence', 'Operator alerts'],
    href: '/products/soda',
  },
  {
    title: 'RODA',
    description: 'Robotic restocking and physical execution.',
    bullets: ['NERMN task dispatch', 'Edge-safe execution', 'Inventory sync'],
    href: '/products/roda',
  },
  {
    title: 'VODA / CODA',
    description: 'Video intelligence + evidence SaaS pipeline.',
    bullets: ['Anomaly detection', 'LLM escalation', 'Report synthesis'],
    href: '/products/voda-coda',
  },
  {
    title: 'HRI',
    description: 'HR intelligence API + interview analytics.',
    bullets: ['Scorecards', 'Transcript analytics', 'Webhooks + API'],
    href: '/products/hri',
  },
]

const worldModelChips = [
  'SignatureMap',
  'DopamineModulator',
  'Consultation Layer',
  'Dispatch Engine',
  'Replay Trace',
]

const credibility = [
  {
    title: 'Runs at the edge',
    body: 'Low-latency inference with local-first resilience.',
  },
  {
    title: 'Low-latency decision loop',
    body: 'NEPA keeps operations under millisecond-class response windows.',
  },
  {
    title: 'LLM consulted only when needed',
    body: 'Normal frames stay cheap; anomalies escalate on demand.',
  },
  {
    title: 'Operator-ready evidence',
    body: 'CODA turns every alert into a narrative evidence pack.',
  },
]

const deployments = [
  {
    title: 'On-device Edge',
    body: 'Edge-only nodes for privacy-first deployments.',
  },
  {
    title: 'Hybrid Edge + SaaS',
    body: 'Local inference with centralized SaaS control.',
  },
  {
    title: 'Fleet SaaS Control',
    body: 'Multi-site operations, reporting, and analytics.',
  },
]

export function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-white">
      <section className="relative overflow-hidden">
        <SensorSweep />
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <LiveBadge label="SYSTEM LIVE" className="mb-6" />
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
                Neuromorphic edge intelligence for autonomous operations
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl">
                NEPA builds a live world model from video, sensors, and behavior streams — then dispatches alerts,
                reports, and robotic actions in real time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                <span className="px-3 py-1 rounded-full border border-cyan-400/30">Edge-native</span>
                <span className="px-3 py-1 rounded-full border border-cyan-400/30">Real-time perception</span>
                <span className="px-3 py-1 rounded-full border border-cyan-400/30">Robotic action</span>
                <span className="px-3 py-1 rounded-full border border-cyan-400/30">Replayable evidence</span>
                <span className="px-3 py-1 rounded-full border border-cyan-400/30">SaaS + on-prem</span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild className="bg-cyan-500 text-black hover:bg-cyan-400">
                  <Link to="/contact">
                    Start pilot
                    <ArrowRight className="ml-2" weight="bold" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/platform">Watch system flow</Link>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-white/70">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Inference latency</div>
                  <div className="text-2xl text-cyan-300">&lt;<CountUp target={2} suffix="ms" /></div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Active lanes</div>
                  <div className="text-2xl text-cyan-300"><CountUp target={8} /></div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Anomaly score</div>
                  <div className="text-2xl text-cyan-300">0.87</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Dispatches</div>
                  <div className="text-2xl text-cyan-300"><CountUp target={42} /></div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-cyan-400/30 bg-black/60 p-6 backdrop-blur-xl">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/70 mb-4">System feed</div>
                <div className="space-y-3">
                  <TerminalLine label="STORE" value="HK-KLN-01" delay={200} />
                  <TerminalLine label="LANES" value="08 ACTIVE" delay={400} />
                  <TerminalLine label="LATENCY" value="1.9ms" delay={600} />
                  <TerminalLine label="ZONE_03" value="anomaly_score 0.87" delay={800} />
                  <TerminalLine label="DISPATCH" value="RODA_RESTOCK_QUEUED" delay={1000} />
                  <TerminalLine label="CODA" value="report rendering" delay={1200} />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-black/40">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm text-white/70">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Edge nodes</div>
            <div className="text-2xl text-white"><CountUp target={12} /></div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Stores monitored</div>
            <div className="text-2xl text-white"><CountUp target={24} /></div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">RODA queues</div>
            <div className="text-2xl text-white"><CountUp target={18} /></div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Reports today</div>
            <div className="text-2xl text-white"><CountUp target={148} /></div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">From perception to action</h2>
              <p className="text-white/60 mt-3 max-w-xl">
                One intelligence platform. Multiple execution domains. NEPA perceives, reasons, predicts,
                dispatches, and reports.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipeline.map((step) => (
              <div key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-200/60">{step.title}</div>
                <p className="mt-3 text-sm text-white/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/40">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">Product constellation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product.title} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold">{product.title}</h3>
                    <p className="text-white/60 mt-2">{product.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {product.bullets.map((bullet) => (
                        <li key={bullet}>• {bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild variant="outline" className="border-white/20 text-white">
                    <Link to={product.href}>Learn more</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">NEPA world model</h2>
            <p className="text-white/60 mt-4">
              NEPA is not a detector. It is a live operational world model. Every frame updates spatial memory,
              every anomaly adjusts behavioral priors, and every action closes the loop between perception and execution.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {worldModelChips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full border border-cyan-400/30 text-xs uppercase tracking-[0.2em] text-cyan-200/70"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-400/30 bg-black/50 p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/70 mb-4">World model panel</div>
            <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
              <div className="rounded-lg border border-white/10 p-4">Zones + lanes</div>
              <div className="rounded-lg border border-white/10 p-4">Agent trails</div>
              <div className="rounded-lg border border-white/10 p-4">Anomaly heat</div>
              <div className="rounded-lg border border-white/10 p-4">CODA markers</div>
            </div>
          </div>
        </div>
      </section>

          <p
            className="font-mono text-[10px] tracking-[0.28em] text-cyan-400/60 uppercase mb-4"
            style={{ opacity: heroVisible ? 1 : 0 }}
          >
            One intelligence platform. Multiple execution domains.
          </p>

          <div
            className="flex items-center gap-1 flex-wrap mt-8 mb-6"
            style={{ opacity: heroVisible ? 1 : 0 }}
          >
            {[
              { label: 'PERCEIVE', sublabel: 'NEPA engine', color: 'cyan' },
              { label: 'REASON', sublabel: 'SignatureMap', color: 'violet' },
              { label: 'PREDICT', sublabel: 'DopamineModulator', color: 'amber' },
              { label: 'DISPATCH', sublabel: 'ACT layer', color: 'orange' },
              { label: 'REPORT', sublabel: 'CODA output', color: 'emerald' },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center gap-1">
                <div className="flex flex-col items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
                  <span className="font-mono text-xs tracking-[0.2em] text-white group-hover:text-cyan-300 transition-colors">
                    {step.label}
                  </span>
                  <span className="font-mono text-[10px] text-gray-600 mt-0.5">{step.sublabel}</span>
                </div>
                {i < arr.length - 1 && (
                  <span className="text-gray-700 font-mono text-xs mx-0.5">→</span>
                )}
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-3 flex-wrap mt-4"
            style={{ opacity: heroVisible ? 1 : 0 }}
          >
            {[
              { label: 'SODA', sublabel: 'Unmanned Store', href: '/products/soda' },
              { label: 'RODA', sublabel: 'Robotic Execution', href: '/products/roda' },
              { label: 'VODA/CODA', sublabel: 'Video Intelligence', href: '/products/voda-coda' },
              { label: 'HRI', sublabel: 'HR Intelligence', href: '/products/hri' },
              { label: 'FODA', sublabel: 'Infrastructure Inspection', href: '/products/foda' },
            ].map((domain) => (
              <Link
                key={domain.label}
                to={domain.href}
                className="flex flex-col items-center px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/15 hover:border-cyan-500/40 transition-all group"
              >
                <span className="font-mono text-xs text-cyan-400 group-hover:text-cyan-300">{domain.label}</span>
                <span className="font-mono text-[10px] text-gray-600">{domain.sublabel}</span>
              </Link>
            ))}
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
      <section className="py-24 bg-black/40">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">Why AuraSense</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credibility.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-white/60 mt-2 text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">Deployment modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deployments.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-white/60 mt-2 text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/40">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Pricing preview</h2>
            <p className="text-white/60 mt-2">Choose pilot, store, fleet, or API-first plans based on deployment scope.</p>
          </div>
          <Button asChild className="bg-cyan-500 text-black hover:bg-cyan-400">
            <Link to="/pricing">View pricing</Link>
          </Button>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Bring one store, one robot, or one video pipeline online.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-cyan-500 text-black hover:bg-cyan-400">
                <Link to="/contact">Start pilot</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white">
                <Link to="/contact">Talk to engineering</Link>
              </Button>
              <Button asChild variant="ghost" className="text-white/70 hover:text-white">
                <Link to="/auth/sign-in">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
