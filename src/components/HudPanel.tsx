import { cn } from '@/lib/utils'

type Props = {
  title?: string
  children: React.ReactNode
  className?: string
  showScanlines?: boolean
}

export function HudPanel({ title, children, className, showScanlines = true }: Props) {
  return (
    <div className={cn(
      'relative hud-bracket bg-card/40 border border-cyan-glow/20 backdrop-blur-xl rounded-lg p-6',
      showScanlines && 'scanlines',
      className
    )}>
      {title && (
        <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-cyan-glow/60 mb-4">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
