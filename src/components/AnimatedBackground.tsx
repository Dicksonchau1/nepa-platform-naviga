import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000))
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }))

    const drawMeshGradient = () => {
      const gradients = [
        { x: 0.2, y: 0.3, color: 'oklch(0.75 0.20 145)' },
        { x: 0.8, y: 0.2, color: 'oklch(0.68 0.24 85)' },
        { x: 0.5, y: 0.7, color: 'oklch(0.75 0.20 145)' },
        { x: 0.1, y: 0.8, color: 'oklch(0.68 0.24 85)' }
      ]

      gradients.forEach(({ x, y, color }) => {
        const centerX = canvas.width * x
        const centerY = canvas.height * y
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width * 0.4)
        
        gradient.addColorStop(0, color.replace(')', ' / 0.08)'))
        gradient.addColorStop(0.5, color.replace(')', ' / 0.02)'))
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
    }

    const drawParticles = () => {
      particlesRef.current.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `oklch(0.75 0.20 145 / ${particle.opacity})`
        ctx.fill()
      })
    }

    const drawConnections = () => {
      const particles = particlesRef.current
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `oklch(0.75 0.20 145 / ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      drawMeshGradient()
      drawConnections()
      drawParticles()
      updateParticles()

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.75 0.20 145 / 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.68 0.24 85 / 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  )
}
