export function TechnologyPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">

        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary mb-4">
            Technology
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Perception at the edge, not the cloud
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            NEPA is a neuromorphic edge inference engine designed to deliver
            deterministic, low-latency perception on commodity hardware — without
            cloud dependency.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            Core architecture
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Spike-timing inference (STDP)',
                desc: 'NEPA uses spike-timing dependent plasticity to process temporal event streams efficiently, reducing redundant computation compared to frame-by-frame CNN approaches.',
              },
              {
                title: 'ONNX + TensorRT runtime',
                desc: 'Models are compiled via ONNX and optimised with TensorRT for Jetson hardware, achieving sub-50ms inference latency on edge devices.',
              },
              {
                title: 'YOLOv8 perception backbone',
                desc: 'Object detection, classification, and tracking are handled by a fine-tuned YOLOv8 backbone adapted for retail, facade, and robotics domains.',
              },
              {
                title: 'Multi-rate processing',
                desc: 'NEPA runs different inference tasks at independent cadences — fast perception at high frequency, heavier analysis at lower rates — for temporal consistency and power efficiency.',
              },
              {
                title: 'Hardware-agnostic design',
                desc: 'Runs on NVIDIA Jetson Nano, Intel NUC, and other edge devices. No proprietary hardware lock-in. Containerised via Docker for repeatable deployment.',
              },
              {
                title: 'Cryptographic audit ledger',
                desc: 'Every inference event is hash-chained into an immutable audit log, providing a tamper-evident compliance record for autonomous operations.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border/30 rounded-lg p-6 bg-card/30 hover:bg-card/50 transition-colors"
              >
                <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">
            Perception agents
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            NEPA ships five specialised agents, each optimised for a distinct
            operational domain.
          </p>
          <div className="space-y-4">
            {[
              { code: 'VODA', name: 'Video Agent', role: 'Real-time multi-camera video operations, anomaly detection, and event classification.' },
              { code: 'RODA', name: 'Robotic Agent', role: 'Autonomous navigation, mission planning, and robot task orchestration for delivery and patrol.' },
              { code: 'EODA', name: 'Edge Agent', role: 'Hardware-agnostic inference runtime — the base layer all other agents are built on.' },
              { code: 'FODA', name: 'Facade Agent', role: 'Aerial drone inspection of building facades — BRS detection, concealment analysis, structural defect classification.' },
              { code: 'SODA', name: 'Surveillance Agent', role: 'Multi-camera facility intelligence with behavioural pattern recognition.' },
            ].map((a) => (
              <div
                key={a.code}
                className="flex items-start gap-4 border border-border/20 rounded-lg p-5 bg-card/20"
              >
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0">
                  {a.code}
                </span>
                <div>
                  <p className="text-sm font-semibold mb-0.5">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-border/30 rounded-lg p-8 bg-card/40">
          <h3 className="text-lg font-semibold mb-2">Intellectual property</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The core NEPA neuromorphic STDP architecture is covered by a
            provisional patent filed February 2026. Technology licensing and
            co-development arrangements are available — contact us for details.
          </p>
        </section>

      </div>
    </main>
  )
}
