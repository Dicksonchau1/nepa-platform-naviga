import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const pipeline = [
  { title: 'Perceive', body: 'Video and sensor ingestion builds a live world state.' },
  { title: 'Reason', body: 'NEPA evaluates anomalies, memory, and consultation.' },
  { title: 'Dispatch', body: 'RODA and operator actions execute in real time.' },
  { title: 'Report', body: 'CODA evidence packs complete the loop.' },
]

export function PlatformPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white pt-28 pb-24">
      <div className="container mx-auto px-6 max-w-5xl space-y-16">
        <section>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">AuraSense platform</h1>
          <p className="text-white/60 text-lg">
            One intelligence platform. Multiple execution domains. NEPA powers perception, reasoning,
            dispatch, and evidence across SODA, RODA, VODA/CODA, and HRI.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild className="bg-cyan-500 text-black hover:bg-cyan-400">
              <Link to="/contact">Start pilot</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white">
              <Link to="/docs">Explore docs</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pipeline.map((step) => (
            <div key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">{step.title}</div>
              <p className="mt-3 text-sm text-white/70">{step.body}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
