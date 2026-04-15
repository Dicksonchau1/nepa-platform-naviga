import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CinematicBackground } from '@/components/CinematicBackground'

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-24">
      <CinematicBackground />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-8">This page could not be found.</p>
        <Button asChild variant="outline" className="border-border/60 hover:border-primary/40 bg-background/20">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
