import { cn } from '@/lib/utils'

type Props = {
  className?: string
  label?: string
}

export function LiveBadge({ className, label = 'LIVE' }: Props) {
  return (
    <div className={cn('flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-glow/60 uppercase', className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow flicker shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
      <span>{label}</span>
    </div>
  )
}
