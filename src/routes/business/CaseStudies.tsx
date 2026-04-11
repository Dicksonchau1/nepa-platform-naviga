const CASES = [
  {
    title: 'Unmanned Retail — Hong Kong',
    status: 'PILOT Q2 2026',
    statusColor: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
    body: 'Deploying NEPA-powered SODA and FODA agents in an unmanned convenience store environment. Full perception-to-action loop: shelf monitoring, checkout anomaly detection, and after-hours intrusion escalation without cloud dependency.',
  },
  {
    title: 'Building Facade Inspection — Kowloon',
    status: 'PLANNING',
    statusColor: 'text-white/50 border-white/20 bg-white/5',
    body: 'EODA-driven aerial inspection of high-rise building facades using NEPA inference on UAV payload hardware. Structured defect logging with per-frame audit trail for regulatory submission.',
  },
  {
    title: 'Robotic Delivery — APAC',
    status: 'PLANNING',
    statusColor: 'text-white/50 border-white/20 bg-white/5',
    body: 'RODA-coordinated ground robot delivery with NEPA edge inference handling obstacle detection, path replanning, and handoff verification in GPS-denied environments.',
  },
]

export function CaseStudies() {
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
            Case Studies
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/70 mb-4">
            NEPA in the field.
          </p>
          <p className="text-xs text-white/35 font-mono">
            Pilot deployments in progress — Q2 2026. Case studies will be published as pilots complete.
          </p>
        </div>
      </section>

      {/* Case study cards */}
      <section className="pb-28">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-xs font-mono tracking-[0.22em] uppercase text-cyan-400/60 mb-8">
            Deployments
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {CASES.map((c) => (
              <div
                key={c.title}
                className="border border-white/10 bg-white/[0.03] p-8 flex flex-col gap-4 hover:border-white/20 hover:bg-white/[0.05] transition-colors"
              >
                <span
                  className={`self-start text-[10px] font-bold font-mono tracking-widest uppercase border px-2.5 py-1 ${c.statusColor}`}
                >
                  {c.status}
                </span>
                <h2 className="text-base font-semibold text-white leading-snug">{c.title}</h2>
                <p className="text-sm text-white/55 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
