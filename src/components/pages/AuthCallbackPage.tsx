import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/auth?mode=signin', { replace: true })
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen bg-[#060b14] flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
    </div>
  )
}
