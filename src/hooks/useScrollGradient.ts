import { useEffect, useState } from 'react'

export function useScrollGradient() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frameId: number | null = null
    let latestScroll = window.scrollY

    const applyGradient = (progress: number) => {
      setScrollProgress(progress)

      const x = 50 + Math.sin(progress * Math.PI * 2) * 20
      const y = 50 + Math.cos(progress * Math.PI * 2) * 20

      setGradientPosition({ x, y })

      document.documentElement.style.setProperty('--gradient-x', `${x}%`)
      document.documentElement.style.setProperty('--gradient-y', `${y}%`)
    }

    const handleScroll = () => {
      latestScroll = window.scrollY
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(() => {
        const windowHeight = window.innerHeight
        const documentHeight = Math.max(document.documentElement.scrollHeight - windowHeight, 1)
        const progress = Math.min(latestScroll / documentHeight, 1)
        applyGradient(progress)
        frameId = null
      })
    }

    if (mediaQuery.matches) {
      applyGradient(0)
      return undefined
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
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
