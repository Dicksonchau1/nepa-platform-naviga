import { useEffect, useState } from 'react'

export function useScrollGradient() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    let ticking = false
    const updateScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / documentHeight, 1)
      
      setScrollProgress(progress)
      
      const x = 50 + Math.sin(progress * Math.PI * 2) * 20
      const y = 50 + Math.cos(progress * Math.PI * 2) * 20
      
      setGradientPosition({ x, y })
      
      document.documentElement.style.setProperty('--gradient-x', `${x}%`)
      document.documentElement.style.setProperty('--gradient-y', `${y}%`)
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScroll()
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getGradientColor = (progress: number) => {
    const hue = 200 + progress * 85
    const chroma = 0.18 - progress * 0.08
    return `oklch(0.75 ${chroma} ${hue})`
  }

  return {
    scrollProgress,
    gradientPosition,
    gradientColor: getGradientColor(scrollProgress),
  }
}
