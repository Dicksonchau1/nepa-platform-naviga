import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { WorkspaceSubscription } from '@/types/features'

export function useWorkspace() {
  const [subscription, setSubscription] = useState<WorkspaceSubscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('workspace_subscriptions')
        .select('*')
        .eq('owner_id', user.id)
        .single()

      setSubscription(data)
      setLoading(false)
    }
    load()
  }, [])

  return { subscription, loading }
}
