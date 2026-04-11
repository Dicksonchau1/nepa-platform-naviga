import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  value: string
  delay?: number
  className?: string
}

export function TerminalLine({ label, value, delay = 0, className }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div 
      className={cn(
        'font-mono text-sm transition-all duration-300',
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-cyan-glow/70">&gt; {label.padEnd(16, ' ')}: </span>
      <span className="text-foreground/90">{value}</span>
    </div>
  )
}
