import { useWorkspace } from '@/hooks/useWorkspace'
import type { ProductKey } from '@/types/features'

export function useFeatureFlags() {
  const { subscription } = useWorkspace()
  const flags = subscription?.features

  function isEnabled(product: ProductKey): boolean {
    if (!flags) return false
    return (flags[`${product}_enabled` as keyof typeof flags] as boolean) ?? false
  }

  function getQuota(key: keyof typeof flags): number {
    if (!flags) return 0
    return (flags[key] as number) ?? 0
  }

  return { flags, isEnabled, getQuota }
}
