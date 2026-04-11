import { Link } from 'react-router-dom'

export function NepaAgentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <h1 className="text-4xl font-bold mb-4">NEPA Agent</h1>
      <p className="text-muted-foreground text-lg mb-8 text-center max-w-xl">
        AI-powered autonomous agent for end-to-end NEPA compliance workflows. Coming soon.
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
      >
        Contact Us
      </Link>
    </div>
  )
}
