import { useEffect, useRef } from 'react'

export function useMouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spotlight = spotlightRef.current
    if (!spotlight) return

    let rafId: number
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!spotlight.classList.contains('active')) {
        spotlight.classList.add('active')
      }
    }

    const handleMouseLeave = () => {
      if (spotlight.classList.contains('active')) {
        spotlight.classList.remove('active')
      }
    }

    const animate = () => {
      const dx = mouseX - currentX
      const dy = mouseY - currentY

      currentX += dx * 0.1
      currentY += dy * 0.1

      spotlight.style.setProperty('--mouse-x', `${currentX}px`)
      spotlight.style.setProperty('--mouse-y', `${currentY}px`)

      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return spotlightRef
}
