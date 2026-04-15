import { useWorkspace } from '@/hooks/useWorkspace'
import type { ProductKey, WorkspaceFeatureFlags } from '@/types/features'

export function useFeatureFlags() {
  const { subscription } = useWorkspace()
  const flags = subscription?.features
  const featureKeyMap: Record<ProductKey, keyof WorkspaceFeatureFlags> = {
    soda: 'soda_enabled',
    roda: 'roda_enabled',
    voda: 'voda_enabled',
    coda: 'coda_enabled',
    hri: 'hri_enabled',
    foda: 'foda_enabled',
  }

  function isEnabled(product: ProductKey): boolean {
    if (!flags) return false
    return flags[featureKeyMap[product]] ?? false
  }

  function getQuota(key: keyof typeof flags): number {
    if (!flags) return 0
    return (flags[key] as number) ?? 0
  }

  return { flags, isEnabled, getQuota }
}
