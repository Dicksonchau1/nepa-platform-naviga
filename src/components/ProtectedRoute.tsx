import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Session } from '@supabase/supabase-js'

export default function ProtectedRoute() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-[#060b14] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
      </div>
    )
  }

  return session ? <Outlet /> : <Navigate to="/auth?mode=signin" replace />
}
