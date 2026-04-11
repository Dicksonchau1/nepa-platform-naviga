import { CinematicBackground } from '@/components/CinematicBackground'

interface PlaceholderProps {
  title: string
  description?: string
}

export function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-24">
      <CinematicBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
