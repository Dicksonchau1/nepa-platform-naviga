import { Link } from 'react-router-dom'

const TRACKS = [
  {
    title: 'Technology Partner',
    body: 'Integrate NEPA inference into your hardware platform or software stack. We support co-development on Jetson, NUC, and custom RISC-V edge targets. Joint IP arrangements available for qualifying partners.',
    cta: 'Enquire',
    to: '/about/contact',
  },
  {
    title: 'Pilot Partner',
    body: 'Deploy NEPA in a live operational environment — unmanned retail, aerial inspection, or robotic delivery. We provide the inference stack, integration support, and audit trail tooling. You provide the environment and operational data.',
    cta: 'Apply for pilot',
    to: '/about/contact',
  },
  {
    title: 'Distribution & Integration Partner',
    body: 'Resell or embed NEPA-powered agents (VODA, RODA, SODA, EODA, FODA) into your product or managed service. Revenue share and white-label options available at Enterprise tier.',
    cta: 'Talk to us',
    to: '/about/contact',
  },
]

export function Partnership() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden relative">

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 -z-10" />
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(0,212,255,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 70% 75%, rgba(0,102,255,0.06) 0%, transparent 50%)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest text-white/60 uppercase mb-8">
            NEPA PLATFORM · BUSINESS
          </div>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6"
            style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)' }}
          >
            Partnership
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/70 mb-4">
            Build with NEPA at the edge.
          </p>
          <p className="text-base md:text-lg text-white/50 max-w-3xl leading-relaxed">
            AuraSense works with hardware manufacturers, systems integrators, retail operators,
            logistics companies, and research institutions across Asia-Pacific. We offer structured
            partnership tracks depending on your operational context and deployment goals.
          </p>
        </div>
      </section>

      {/* Partnership tracks */}
      <section className="pb-28">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-xs font-mono tracking-[0.22em] uppercase text-cyan-400/60 mb-8">
            Partnership tracks
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {TRACKS.map((track) => (
              <div
                key={track.title}
                className="border border-white/10 bg-white/[0.03] p-8 flex flex-col gap-6 hover:border-white/20 hover:bg-white/[0.05] transition-colors"
              >
                <div>
                  <h2 className="text-lg font-semibold text-white mb-3">{track.title}</h2>
                  <p className="text-sm text-white/55 leading-relaxed">{track.body}</p>
                </div>
                <Link
                  to={track.to}
                  className="mt-auto inline-block border border-cyan-400/40 text-cyan-400 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 hover:bg-cyan-400/10 hover:border-cyan-400/70 transition-colors self-start"
                >
                  {track.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
