import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'
import { CinematicBackground } from '@/components/CinematicBackground'
import { useNavigate } from 'react-router-dom'

interface PlaceholderPageProps {
  title: string
  subtitle: string
}

export function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <CinematicBackground />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
        {subtitle && <p className="text-xl text-muted-foreground mb-12">{subtitle}</p>}
        <p className="text-muted-foreground mb-12 max-w-md mx-auto">
          This section is currently under construction. Check back soon for updates.
        </p>
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="border-border hover:border-primary/40 backdrop-blur-sm bg-background/20"
        >
          <ArrowLeft className="mr-2" size={16} weight="bold" />
          Back to home
        </Button>
      </div>
    </div>
  )
}
