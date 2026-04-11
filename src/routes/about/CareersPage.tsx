import { Link } from 'react-router-dom'

const openRoles = [
  {
    title: 'Edge AI Engineer (C++ / TensorRT)',
    type: 'Full-time · Hong Kong',
    desc: 'Own the NEPA C++ inference engine. Experience with TensorRT, ONNX, and Jetson platform required.',
  },
  {
    title: 'Computer Vision Engineer',
    type: 'Full-time · Hong Kong',
    desc: 'Fine-tune and optimise YOLOv8 models for retail, facade, and robotics domains. Python + PyTorch experience required.',
  },
  {
    title: 'Robotics Software Engineer',
    type: 'Full-time · Hong Kong',
    desc: 'Build mission planning, navigation, and task orchestration systems for RODA. ROS/ROS2 experience a plus.',
  },
  {
    title: 'Full-Stack Engineer (React / FastAPI)',
    type: 'Full-time · Hong Kong',
    desc: 'Build the NEPA dashboard and operator console. TypeScript, React, and Python FastAPI required.',
  },
  {
    title: 'Business Development Manager',
    type: 'Full-time · Hong Kong / APAC',
    desc: 'Drive pilot partnerships and commercialisation across retail, logistics, and property sectors in APAC.',
  },
]

export function CareersPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">

        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary mb-4">
            Careers
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Build systems that operate in the real world
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We are a small, technical team based in Hong Kong. We move fast,
            ship real hardware, and solve hard problems in edge AI, robotics,
            and autonomous perception.
          </p>
        </div>

        <section className="mb-16 grid md:grid-cols-3 gap-6">
          {[
            {
              label: 'Edge-first',
              desc: 'We build for constrained hardware — Jetson, NUC, embedded systems. Cloud is the fallback, not the default.',
            },
            {
              label: 'Founder mentality',
              desc: 'Small team, big scope. You own your domain end-to-end, from prototype to production deployment.',
            },
            {
              label: 'Real deployments',
              desc: 'Your work ships to live pilots — unmanned retail shops, drone inspection runs, delivery robots on the street.',
            },
          ].map((c) => (
            <div
              key={c.label}
              className="border border-border/30 rounded-lg p-6 bg-card/30"
            >
              <p className="text-sm font-semibold text-primary mb-2">{c.label}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">Open roles</h2>
          <div className="space-y-4">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="border border-border/30 rounded-lg p-6 bg-card/20 hover:bg-card/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold text-sm mb-1">{role.title}</p>
                    <p className="text-xs text-muted-foreground/70 mb-3">{role.type}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{role.desc}</p>
                  </div>
                  <Link
                    to="/about/contact"
                    className="shrink-0 text-xs font-semibold tracking-[0.14em] uppercase text-primary border border-primary/30 px-4 py-2 rounded hover:bg-primary/10 transition-colors"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border border-border/30 rounded-lg p-8 bg-card/40">
          <h3 className="text-lg font-semibold mb-2">Not seeing the right role?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We're always looking for exceptional people. Send us your CV and tell
            us what you'd like to build.
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
