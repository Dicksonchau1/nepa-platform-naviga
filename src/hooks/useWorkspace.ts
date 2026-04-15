import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { WorkspaceSubscription } from '@/types/features'

export function useWorkspace() {
  const [subscription, setSubscription] = useState<WorkspaceSubscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    async function load() {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || !isActive) {
        if (isActive) {
          setSubscription(null)
          setLoading(false)
        }
        return
      }

      const { data } = await supabase
        .from('workspace_subscriptions')
        .select('*')
        .eq('owner_id', user.id)
        .single()

      if (!isActive) return

      if (data) {
        setSubscription({
          workspace_id: data.workspace_id ?? '',
          plan: (data.plan as WorkspaceSubscription['plan']) ?? 'trial',
          stripe_customer_id: data.stripe_customer_id ?? null,
          stripe_subscription_id: data.stripe_subscription_id ?? null,
          billing_cycle_start: data.billing_cycle_start ?? '',
          billing_cycle_end: data.billing_cycle_end ?? '',
          status: (data.status as WorkspaceSubscription['status']) ?? 'trial',
          features: {
            soda_enabled: data.soda_enabled ?? false,
            roda_enabled: data.roda_enabled ?? false,
            voda_enabled: data.voda_enabled ?? false,
            coda_enabled: data.coda_enabled ?? false,
            hri_enabled: data.hri_enabled ?? false,
            foda_enabled: data.foda_enabled ?? false,
            camera_limit: data.camera_limit ?? 0,
            api_quota_monthly: data.api_quota_monthly ?? 0,
            video_minutes_monthly: data.video_minutes_monthly ?? 0,
            hri_calls_monthly: data.hri_calls_monthly ?? 0,
            consultation_calls_monthly: data.consultation_calls_monthly ?? 0,
            storage_retention_days: data.storage_retention_days ?? 0,
            max_stores: data.max_stores ?? 0,
            max_users: data.max_users ?? 0,
          },
        })
      } else {
        setSubscription(null)
      }
      setLoading(false)
    }
    load()

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange(() => {
      if (isActive) {
        load()
      }
    })

    return () => {
      isActive = false
      authSubscription.unsubscribe()
    }
  }, [])

  return { subscription, loading }
}
