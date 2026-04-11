import { useState, useEffect } from 'react'

type Props = {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({ target, duration = 1200, suffix = '', prefix = '', className }: Props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const easeOutQuad = (t: number) => t * (2 - t)
      const currentCount = Math.floor(easeOutQuad(progress) * target)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
