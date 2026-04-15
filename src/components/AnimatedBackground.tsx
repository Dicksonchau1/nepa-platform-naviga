import { useScrollGradient } from '@/hooks/useScrollGradient'

export function AnimatedBackground() {
  useScrollGradient()

  return (
    <div className="pointer-events-none">
      <div className="scroll-gradient-bg" />
      <div className="scroll-gradient-overlay" />
    </div>
  )
}
