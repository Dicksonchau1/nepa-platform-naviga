import { Link } from 'react-router-dom'
import { Check } from '@phosphor-icons/react'
import { HudPanel } from '@/components/HudPanel'
import { LiveBadge } from '@/components/LiveBadge'

const FEATURES = [
const FEED_LABELS = [
  { id: 'A', label: 'PERSON',     status: 'TRACKED',   x: '15%', y: '25%' },
  { id: 'B', label: 'SHELF_ZONE', status: 'MONITORED', x: '58%', y: '38%' },
  { id: 'C', label: 'OCCUPANCY',  status: '3',         x: '72%', y: '62%' },
  { id: 'D', label: 'ANOMALY',    status: 'NONE',      x: '32%', y: '68%' },
  { id: 'E', label: 'DWELL',      status: '00:47s',    x: '80%', y: '20%' },
]

const TICKER = [
  'MOTION_EVENT: AISLE_2 — CLEAR',
  'SHOPFRONT: NOMINAL',
  'CROWD_DENSITY: LOW',
  'LOITERING_ALERT: NONE',
  'CAMERA_HEALTH: ALL_NOMINAL',
  'INFERENCE_FPS: 27.8',
  'AUDIT_WRITE: OK — HASH CONFIRMED',
]

const SPEC = [
  { k: 'AGENT_ID',      v: 'VODA-v2.3' },
  { k: 'DOMAIN',        v: 'Video operations & real-time detection' },
  { k: 'INFERENCE_RT',  v: '< 36ms on Jetson Nano' },
  { k: 'MODEL_BACKEND', v: 'YOLOv8 + ONNX + TensorRT' },
  { k: 'CAMERA_INPUTS', v: 'Up to 16 concurrent streams' },
  { k: 'AUDIT_CHAIN',   v: 'SHA-256 hash-linked event log' },
  { k: 'DEPLOYMENT',    v: 'Edge-only — no cloud egress' },
  { k: 'COMPLIANCE',    v: 'PDPO · GDPR by default' },
  { k: 'STATUS',        v: 'Operational' },
]

const CAPABILITIES = [
  {
    n: '01',
    title: 'Real-time object detection',
    desc: 'YOLOv8-powered multi-class detection at up to 30 FPS on edge hardware. People, objects, zones, and events — classified on-device without any cloud round-trip.',
  },
  {
    title: 'Quality Diagnosis',
    desc: 'Instantly score sharpness, exposure, noise, and color cast before you commit to long renders.',
  },
  {
    title: 'Polygon Reconstruction',
    desc: 'Detect objects with polygon overlays and depth-aware scene graphs for consistent edits.',
  },
  {
    title: 'Frame Stitching',
    desc: 'Blend multi-angle frames into panoramic or temporal composites with seam scoring.',
  },
  {
    title: 'BYOK Freedom',
    desc: 'Route workloads to OpenAI, Anthropic, Google, Replicate, or your own hosted models.',
  },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    desc: '100 frames/day · nepa_free only · basic diagnostics',
    cta: 'Try free',
    to: '/signup?redirect=/dashboard/voda',
  },
  {
    name: 'Pro',
    price: '$29/mo',
    desc: '5,000 frames/day · BYOK providers · full quality lab',
    cta: 'Upgrade to Pro',
    to: '/signup?redirect=/dashboard/voda',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$199/mo',
    desc: '50,000 frames/day · custom models · SLA + support',
    cta: 'Contact sales',
    to: '/about/contact',
  },
]

const CODE_SNIPPET = `curl -X POST "$VITE_VODA_API_URL/voda/diagnose" \\
  -H "X-API-Key: $VODA_API_KEY" \\
  -F "files=@/path/to/frame.png"`
export function VODAPage() {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [visible, setVisible]         = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setInterval(() => setTickerIndex((i) => (i + 1) % TICKER.length), 2600)
    return () => { clearTimeout(t1); clearInterval(t2) }
  }, [])

export function VODAPageNew() {
  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%,rgba(14,116,144,0.18),transparent_55%)]" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <LiveBadge />
              <span className="text-xs text-white/40 tracking-[0.2em] font-mono uppercase">
                VODA V1 Dashboard
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              AI Video Analysis — Powered by Neuromorphic Perception
            </h1>
            <p className="text-base text-white/60 max-w-xl leading-relaxed mb-10">
              Diagnose quality issues, reconstruct scenes, and stitch frames in minutes. VODA
              brings production-grade video intelligence to your NEPA dashboard with BYOK flexibility.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/signup?redirect=/dashboard/voda"
                to="/auth/sign-up?plan=trial"
                className="bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors"
              >
                Try Free
              </Link>
              <Link
                to="/dashboard/voda"
                className="border border-white/20 text-white/80 text-sm px-7 py-3 hover:border-white/40 hover:text-white transition-colors"
              >
                Open Dashboard
              </Link>
              <Link
                to="/resources/docs"
                className="text-sm text-cyan-300/80 hover:text-cyan-300 transition-colors underline underline-offset-4"
              >
                View Docs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/60 tracking-[0.28em] font-mono uppercase mb-4">
            Feature grid
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Built for video operations teams</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature) => (
              <HudPanel key={feature.title} className="bg-[#080B12] p-6">
                <h3 className="text-sm font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{feature.desc}</p>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-[#080B12]">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs text-cyan-400/60 tracking-[0.28em] font-mono uppercase mb-4">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Choose your VODA tier</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((tier) => (
              <HudPanel
                key={tier.name}
                className={`bg-[#050508] p-6 flex flex-col ${
                  tier.highlight ? 'border-cyan-400/40' : 'border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                  {tier.highlight && (
                    <span className="text-xs text-cyan-300 font-mono tracking-widest">POPULAR</span>
                  )}
                </div>
                <p className="text-2xl font-bold mb-2">{tier.price}</p>
                <p className="text-xs text-white/50 mb-6">{tier.desc}</p>
                <Link
                  to={tier.to}
                  className="mt-auto bg-cyan-500 text-black font-semibold text-xs px-5 py-2 text-center hover:bg-cyan-400 transition-colors"
                >
                  {tier.cta}
                </Link>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs text-cyan-400/60 tracking-[0.28em] font-mono uppercase mb-4">
              API ready
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ship to production with one call</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Use the VODA API to automate diagnostics inside your pipeline. API keys are managed
              directly in the dashboard with usage limits tied to your tier.
            </p>
          </div>
          <HudPanel className="bg-[#050508] p-6">
            <p className="text-xs text-cyan-300/60 font-mono mb-3">curl example</p>
            <pre className="text-xs text-cyan-100/80 font-mono whitespace-pre-wrap">
              {CODE_SNIPPET}
            </pre>
          </HudPanel>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-[#080B12]">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <p className="text-xs text-cyan-400/60 tracking-[0.28em] font-mono uppercase mb-4">
            Social proof
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Trusted by teams scaling video AI</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Autonomous retail', 'Media ops', 'Inspection labs', 'Smart facilities'].map((name) => (
              <HudPanel key={name} className="bg-[#050508] p-4 flex items-center justify-center">
                <span className="text-xs text-white/40 uppercase tracking-widest">{name}</span>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Launch the VODA dashboard today</h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Sign up, generate your API key, and start diagnosing frames in minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup?redirect=/dashboard/voda"
              to="/auth/sign-up?plan=trial"
              className="bg-cyan-500 text-black font-semibold text-sm px-7 py-3 hover:bg-cyan-400 transition-colors"
            >
              Try Free
            </Link>
            <Link
              to="/dashboard/voda"
              className="border border-white/20 text-white/80 text-sm px-7 py-3 hover:border-white/40 hover:text-white transition-colors"
            >
              Open Dashboard
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/40">
            <Check size={14} />
            No credit card required for Free tier.
          </div>
        </div>
      </section>
    </main>
  )
}
