import { Link } from 'react-router-dom'

export function CompanyPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">

        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary mb-4">
            About AuraSense
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
            About AuraSense
          </h1>
          <p className="text-2xl font-semibold text-foreground/80 mb-6 tracking-tight">
            Built at the edge of what's possible.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            AuraSense Limited is a Hong Kong–based deep-tech company building neuromorphic
            edge AI infrastructure for autonomous operations. We design and deploy perception
            intelligence that runs directly on the device — in unmanned retail environments,
            aerial inspection platforms, and robotic delivery systems — across Hong Kong and
            Asia-Pacific.
          </p>
        </div>

        <section className="mb-16 border-l-2 border-primary/40 pl-6">
          <h2 className="text-xl font-semibold tracking-tight mb-3">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            To put inference at the source. Autonomous systems should not need a cloud
            round-trip to make a decision. NEPA — our Neuromorphic Edge Perception Agent —
            runs deterministic spike-timing inference on commodity edge hardware with sub-42 ms
            latency, zero cloud dependency, and an immutable audit trail from sensor to action.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              AuraSense was founded in Hong Kong by a team with roots in clinical systems,
              hardware engineering, and applied AI research. The founding insight was direct:
              autonomous systems were failing in production not because the models were wrong,
              but because inference arrived too late, too far from the sensor, or at an energy
              cost that made real deployment impractical.
            </p>
            <p>
              We built NEPA from the ground up — a C++ inference engine running YOLOv8 and
              ONNX runtime on NVIDIA Jetson and Intel NUC hardware — designed specifically for
              environments where the network is unreliable, absent, or where data cannot leave
              the premises. NEPA is not a wrapper around a cloud API. It is a rethink of where
              perception should live and how it should behave when the stakes are real.
            </p>
            <p>
              In 2026 we filed our patent covering the core neuromorphic STDP inference
              architecture. Since then we have been moving toward live pilot deployments in
              unmanned retail, building facade inspection, and autonomous robotic delivery across
              Hong Kong, with structured Asia-Pacific expansion planned as we scale.
            </p>
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
