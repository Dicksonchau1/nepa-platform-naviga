import { useScrollGradient } from '@/hooks/useScrollGradient'

export function AnimatedBackground() {
  useScrollGradient()

  return (
    <>
      <div className="scroll-gradient-bg" />
      <div className="scroll-gradient-overlay" />
    </>
  )
}
