import { useScrollGradient } from '@/hooks/useScrollGradient'

/**
 * Delegates scroll-driven gradient behavior to useScrollGradient hook.
 * @see src/hooks/useScrollGradient.ts
 */
export function AnimatedBackground() {
  useScrollGradient()

  return (
    <>
      <div className="scroll-gradient-bg" />
      <div className="scroll-gradient-overlay" />
    </>
  )
}
