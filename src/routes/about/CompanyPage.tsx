import { Link } from 'react-router-dom'

export function CompanyPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">

        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary mb-4">
            About AuraSense
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Built at the edge of what's possible
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            AuraSense Limited is a Hong Kong–based deep-tech company developing
            neuromorphic edge AI systems for autonomous retail, robotic delivery,
            and aerial inspection operations.
          </p>
        </div>

        <section className="mb-16 border-l-2 border-primary/40 pl-6">
          <h2 className="text-xl font-semibold tracking-tight mb-3">Our mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            To deploy perception intelligence directly at the source — on the
            device, at the edge — so that autonomous systems can operate safely,
            privately, and reliably without depending on cloud round-trips or
            centralised infrastructure.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Our story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              AuraSense was founded in Hong Kong by a team with roots in clinical
              systems, hardware engineering, and applied AI research. The insight
              driving the company came from watching autonomous systems fail in
              the real world — not because the models were wrong, but because
              inference happened too late, too far away, or at too high a power
              cost.
            </p>
            <p>
              We set out to build NEPA — the Neuromorphic Edge Perception Agent —
              a spike-timing inference engine that runs on commodity edge hardware
              (NVIDIA Jetson, Intel NUC) with deterministic latency and minimal
              wattage. NEPA is not a wrapper around a cloud API. It is a
              ground-up rethink of how perception should work when the network is
              unreliable or absent entirely.
            </p>
            <p>
              Since filing our provisional patent in February 2026, AuraSense has
              been moving toward pilot deployments across unmanned retail,
              building facade inspection, and autonomous robotic delivery in Hong
              Kong — with broader Asia-Pacific expansion planned as we scale.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">Milestones</h2>
          <div className="space-y-6">
            {[
              {
                date: 'Feb 2026',
                title: 'Provisional patent filed',
                desc: 'Core neuromorphic STDP inference architecture filed with IP registry.',
              },
              {
                date: 'Q1 2026',
                title: 'NEPA v1 engine complete',
                desc: 'C++ inference engine with YOLOv8 + ONNX runtime validated on Jetson Nano and Intel NUC.',
              },
              {
                date: 'Q2 2026',
                title: 'NSSIM pilot deployment',
                desc: 'First live pilot of NEPA in an unmanned retail environment targeting Q2 2026.',
              },
              {
                date: '2026',
                title: 'Cyberport & HKPC engagement',
                desc: 'Active applications for Cyberport funding; HKPC co-licensing collaboration under exploration.',
              },
            ].map((m) => (
              <div key={m.date} className="flex gap-6">
                <div className="w-24 shrink-0 text-xs font-mono text-primary pt-1">
                  {m.date}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">{m.title}</p>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border border-border/30 rounded-lg p-8 bg-card/40">
          <h3 className="text-lg font-semibold mb-2">Work with us</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We are actively seeking pilot partners, strategic investors, and
            hardware collaborators across Hong Kong and Asia-Pacific.
          </p>
          <Link
            to="/about/contact"
            className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-primary border border-primary/30 px-5 py-2.5 rounded hover:bg-primary/10 transition-colors"
          >
            Get in touch
          </Link>
        </div>

      </div>
    </main>
  )
}
