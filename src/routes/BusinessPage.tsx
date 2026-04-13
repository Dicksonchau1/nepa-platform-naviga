import { ArrowRight } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

type Accent = 'cyan' | 'indigo' | 'amber'

type CaseStudy = {
  tag: string
  location: string
  headline: string
  body: string
  stats: Array<{ label: string; value: string }>
  cta: string
  to: string
  accent: Accent
}

const CASE_STUDIES: CaseStudy[] = [
  {
    tag: 'Unmanned Retail',
    location: 'Hong Kong',
    headline: 'Cashierless convenience store powered by NEPA',
    body: "NEPA's edge inference engine manages product detection, shelf monitoring, and transaction validation across a fully unmanned retail environment — without cloud dependency.",
    stats: [
      { label: 'Inference latency', value: '< 36ms' },
      { label: 'Uptime', value: '99.4%' },
      { label: 'Cloud dependency', value: 'None' },
    ],
    cta: 'Read case study',
    to: '/business/case-studies/unmanned-retail-hk',
    accent: 'cyan',
  },
  {
    tag: 'Drone Inspection',
    location: 'Building Facade · Hong Kong',
    headline: 'Automated facade inspection at inference speed',
    body: 'UAV-mounted NEPA inference detects surface anomalies, structural deviations, and maintenance flags across high-rise building facades — replacing manual inspection cycles.',
    stats: [
      { label: 'Inspection time reduction', value: '74%' },
      { label: 'Anomaly detection accuracy', value: '96.1%' },
      { label: 'On-device processing', value: 'Full' },
    ],
    cta: 'Read case study',
    to: '/business/case-studies/drone-inspection-facade',
    accent: 'indigo',
  },
  {
    tag: 'Robotic Delivery',
    location: 'Logistics Campus',
    headline: 'Autonomous last-mile delivery orchestrated by RODA',
    body: 'RODA coordinates multi-robot delivery fleets across logistics campuses — routing tasks, resolving conflicts, and escalating exceptions without human dispatch intervention.',
    stats: [
      { label: 'Dispatch automation', value: '91%' },
      { label: 'Fleet size managed', value: 'Up to 25 units' },
      { label: 'Operator interventions', value: '— 68%' },
    ],
    cta: 'Read case study',
    to: '/business/case-studies/robotic-delivery-logistics',
    accent: 'amber',
  },
]

const ENTERPRISE_FEATURES = [
  {
    icon: '◈',
    label: 'On-site deployment',
    desc: 'AuraSense engineers configure and commission NEPA hardware at your location.',
  },
  {
    icon: '◎',
    label: 'Workflow configuration',
    desc: 'Custom inference pipelines, alert routing, and escalation policies designed around your operational requirements.',
  },
  {
    icon: '◧',
    label: 'Dedicated engineer support',
    desc: 'A named AuraSense engineer assigned to your account throughout deployment and beyond.',
  },
  {
    icon: '⊕',
    label: 'SLA-backed uptime',
    desc: 'Guaranteed operational availability with defined response windows and incident escalation.',
  },
  {
    icon: '⊞',
    label: 'Compliance and audit',
    desc: 'Evidence retention, tamper-evident logs, and structured export for regulatory and insurance requirements.',
  },
  {
    icon: '⊟',
    label: 'Ongoing model tuning',
    desc: 'Regular inference optimisation and model updates as your environment and requirements evolve.',
  },
]

const accentStyles: Record<Accent, { color: string; glow: string; pill: string }> = {
  cyan: {
    color: '#00C8F0',
    glow: 'rgba(0, 200, 240, 0.18)',
    pill: 'rgba(0, 200, 240, 0.10)',
  },
  indigo: {
    color: '#6366F1',
    glow: 'rgba(99, 102, 241, 0.18)',
    pill: 'rgba(99, 102, 241, 0.10)',
  },
  amber: {
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.18)',
    pill: 'rgba(245, 158, 11, 0.10)',
  },
}

const sectionViewport = { once: true, amount: 0.2 }

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/35">
      {children}
    </p>
  )
}

function PrimaryButton({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-[#00C8F0] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#67ddf7] hover:shadow-[0_0_32px_rgba(0,200,240,0.28)] sm:w-auto"
    >
      {children}
    </Link>
  )
}

function SecondaryButton({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] sm:w-auto"
    >
      {children}
    </Link>
  )
}

export function BusinessPage() {
  const reduceMotion = useReducedMotion()

  const heroTransition = (index: number) => ({
    duration: reduceMotion ? 0.01 : 0.72,
    delay: reduceMotion ? 0 : 0.08 + index * 0.08,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  })

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050508] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'linear-gradient(to bottom, white, rgba(255,255,255,0.2))',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 18% 18%, rgba(0,200,240,0.16), transparent 34%), radial-gradient(circle at 80% 22%, rgba(99,102,241,0.12), transparent 28%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.04), transparent 40%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,200,240,0.02) 2px, rgba(0,200,240,0.02) 4px)',
          }}
        />
      </div>

      <section className="relative border-b border-white/5 pt-28 pb-18 sm:pt-32 sm:pb-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(0)}
              className="mb-6"
            >
              <SectionEyebrow>AuraSense NEPA — Business</SectionEyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(1)}
              className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
            >
              Edge AI built for operations at scale.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(2)}
              className="mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg"
            >
              From unmanned retail to drone inspection and robotic delivery — NEPA deploys at the edge, runs without cloud dependency, and gives your operations team structured intelligence from day one.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(3)}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <PrimaryButton to="/about/contact">Talk to our team</PrimaryButton>
              <SecondaryButton to="/products/enterprise">Explore NEPA Enterprise</SecondaryButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(4)}
              className="mt-14 grid gap-4 border-t border-white/5 pt-8 sm:grid-cols-3"
            >
              {[
                { label: 'Deployment model', value: 'Edge native' },
                { label: 'Cloud dependency', value: 'None required' },
                { label: 'Operational fit', value: 'Retail · UAV · Robotics' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white" style={{ color: item.label === 'Deployment model' ? '#00C8F0' : undefined }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        id="case-studies"
        className="relative py-20 sm:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <SectionEyebrow>Case Studies</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              NEPA deployed in the field.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/60">
              Real deployments across unmanned retail, aerial inspection, and autonomous logistics operations in Asia-Pacific.
            </p>
          </div>

          <motion.div
            className="mt-12 grid gap-6 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
          >
            {CASE_STUDIES.map((study) => {
              const accent = accentStyles[study.accent]

              return (
                <motion.article
                  key={study.headline}
                  variants={itemVariants}
                  className="group flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/15"
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 24px 80px ' + accent.glow,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="inline-flex rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]"
                      style={{ color: accent.color, backgroundColor: accent.pill }}
                    >
                      {study.tag}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                      {study.location}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {study.headline}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-7 text-white/60">
                    {study.body}
                  </p>

                  <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/5 pt-6">
                    {study.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={study.to}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: accent.color }}
                  >
                    {study.cta}
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="enterprise-services"
        className="relative border-y border-white/5 bg-white/[0.02] py-20 sm:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
            <div className="max-w-2xl">
              <SectionEyebrow>Enterprise Services</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Premium services for Enterprise customers.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/60">
                Our professional services are designed to get your NEPA deployment operational from day one — and keep it running at full performance as your environment scales. Services and availability are scoped to your site count, device fleet, and operational requirements.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton to="/about/contact">Contact Sales</PrimaryButton>
                <SecondaryButton to="/products/enterprise">Explore NEPA Enterprise</SecondaryButton>
              </div>
            </div>

            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
            >
              {ENTERPRISE_FEATURES.map((feature) => (
                <motion.div
                  key={feature.label}
                  variants={itemVariants}
                  className="rounded-2xl border border-white/5 bg-black/20 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-lg text-[#00C8F0]">{feature.icon}</span>
                    <div>
                      <h3 className="text-base font-semibold text-white">{feature.label}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/60">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="partners"
        className="relative border-y border-white/5 bg-[#050508] py-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <SectionEyebrow>Partners</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Work with AuraSense.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60">
            We partner with system integrators, property managers, logistics operators, and technology platforms to deploy NEPA in new environments. If you are building something that needs edge perception, let's talk.
          </p>
          <div className="mt-8">
            <Link
              to="/about/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#00C8F0]/30 bg-[#00C8F0]/10 px-6 py-3 text-sm font-semibold text-[#00C8F0] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00C8F0]/15 sm:w-auto"
            >
              Become a partner
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="next-steps"
        className="relative border-t border-white/5 bg-black/20 py-20 sm:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <SectionEyebrow>Next steps</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Ready to deploy NEPA in your operation?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60">
            Talk to our team about your environment, site count, and operational requirements. We scope every deployment before any contract is signed.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <PrimaryButton to="/about/contact">Talk to our team</PrimaryButton>
            <SecondaryButton to="/products">View all products</SecondaryButton>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
