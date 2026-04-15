import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function SdkPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white pt-28 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">SDKs</h1>
        <p className="text-white/60 text-lg mb-8">
          Download SDKs and integration guides for AuraSense APIs and on-device deployments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['JavaScript', 'Python', 'Edge Runtime CLI', 'Webhook SDK'].map((sdk) => (
            <div key={sdk} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-2">{sdk}</h3>
              <p className="text-sm text-white/60">Starter guides, auth setup, and example pipelines.</p>
            </div>
          ))}
        </div>
        <Button asChild className="mt-10 bg-cyan-500 text-black hover:bg-cyan-400">
          <Link to="/docs">Explore documentation</Link>
        </Button>
      </div>
    </div>
  )
}
