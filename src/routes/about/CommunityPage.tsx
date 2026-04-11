import { Link } from 'react-router-dom'
import { GithubLogo, DiscordLogo, LinkedinLogo, XLogo } from '@phosphor-icons/react'

export function CommunityPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">

        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary mb-4">
            Community
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Join the edge AI community
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Connect with developers, researchers, and engineers building the next
            generation of autonomous perception systems.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">Get involved</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <GithubLogo size={24} weight="duotone" />,
                title: 'GitHub',
                desc: 'Explore our open-source SDKs, agent templates, and edge deployment tools.',
                link: '#',
              },
              {
                icon: <DiscordLogo size={24} weight="duotone" />,
                title: 'Discord',
                desc: 'Join technical discussions, get support, and share your NEPA deployments.',
                link: '#',
              },
              {
                icon: <LinkedinLogo size={24} weight="duotone" />,
                title: 'LinkedIn',
                desc: 'Follow updates on pilot deployments, research, and company news.',
                link: '#',
              },
              {
                icon: <XLogo size={24} weight="duotone" />,
                title: 'X (Twitter)',
                desc: 'Real-time updates on edge AI research, autonomous systems, and NEPA development.',
                link: '#',
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.link}
                className="border border-border/30 rounded-lg p-6 bg-card/30 hover:bg-card/50 transition-colors group"
              >
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform inline-block">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            Developer resources
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'NEPA SDK Documentation',
                desc: 'Complete API reference, integration guides, and deployment examples.',
                link: '/resources/docs',
              },
              {
                title: 'Sample Projects',
                desc: 'Pre-built agent templates for retail, robotics, facade inspection, and surveillance.',
                link: '/resources/guides',
              },
              {
                title: 'Community Forum',
                desc: 'Ask questions, share implementations, and learn from other NEPA developers.',
                link: '#',
              },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className="flex items-start gap-4 border border-border/20 rounded-lg p-5 bg-card/20 hover:bg-card/40 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-0.5">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <span className="text-xs text-primary">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16 border-l-2 border-primary/40 pl-6">
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Contribute to NEPA
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We welcome contributions from the community — whether it's bug reports,
            feature requests, documentation improvements, or code contributions.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            See our contribution guidelines on GitHub or reach out to the team
            directly at developers@aurasensehk.com
          </p>
        </section>

        <div className="border border-border/30 rounded-lg p-8 bg-card/40">
          <h3 className="text-lg font-semibold mb-2">Looking to partner?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We're interested in research collaborations, pilot deployments, and
            co-development opportunities with institutions and enterprises.
          </p>
          <Link
            to="/about/contact"
            className="inline-block text-xs font-semibold tracking-[0.16em] uppercase text-primary border border-primary/30 px-5 py-2.5 rounded hover:bg-primary/10 transition-colors"
          >
            Contact us
          </Link>
        </div>

      </div>
    </main>
  )
}
