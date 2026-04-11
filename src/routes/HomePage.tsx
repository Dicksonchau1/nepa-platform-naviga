import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Terminal } from '@phosphor-icons/react'
import heroVideo from '@/assets/video/home-hero.mp4'

export function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      <div 
        className="absolute top-0 left-0 w-full h-full bg-black/55 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      />
      
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <div className="text-center">
          <h1 
            className="text-white font-light tracking-[0.3em] opacity-0 animate-fade-in-1"
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              animationDelay: '0s',
              animationFillMode: 'forwards'
            }}
          >
            AuraSense
          </h1>
          
          <div 
            className="h-0.5 mx-auto my-6 opacity-0 animate-expand-line"
            style={{
              width: '80px',
              backgroundColor: '#00C9A7',
              animationDelay: '0.8s',
              animationFillMode: 'forwards'
            }}
          />
          
          <h2 
            className="text-[#00C9A7] font-medium tracking-[0.4em] opacity-0 animate-fade-in-2"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              animationDelay: '1.6s',
              animationFillMode: 'forwards'
            }}
          >
            NEPA
          </h2>
          
          <p 
            className="text-[#CCCCCC] uppercase tracking-[0.2em] mt-4 opacity-0 animate-fade-in-3"
            style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              animationDelay: '2.4s',
              animationFillMode: 'forwards'
            }}
          >
            Neuromorphic Edge Perception Agent
          </p>

          <div
            className="mt-10 opacity-0 animate-fade-in-3"
            style={{
              animationDelay: '3.2s',
              animationFillMode: 'forwards'
            }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/30 shadow-lg shadow-primary/20 px-8 py-6 text-lg gap-3"
            >
              <Link to="/dashboard">
                <Terminal size={24} weight="duotone" />
                Launch NEPA Console
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
