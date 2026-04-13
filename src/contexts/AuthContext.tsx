/**
 * AuthContext — powered by Supabase Auth.
 * Replaces the old custom JWT auth that talked to FastAPI /auth/login.
 * Supabase handles JWT tokens, refresh, and session persistence automatically.
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Session, User, AuthError } from '@supabase/supabase-js'
import { supabase, UserProfile } from '@/lib/supabaseClient'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName?: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /** Fetch the user_profiles row for the current auth user */
  const fetchProfile = async (userId: string) => {
    const { data, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError) {
      console.warn('No user profile found — may need to create one:', profileError.message)
      return null
    }
    return data
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession)
      setUser(initialSession?.user ?? null)

      if (initialSession?.user) {
        const userProfile = await fetchProfile(initialSession.user.id)
        setProfile(userProfile)
      }
      setIsLoading(false)
    })

    // Listen for auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (currentSession?.user) {
          const userProfile = await fetchProfile(currentSession.user.id)
          setProfile(userProfile)
        } else {
          setProfile(null)
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) throw signInError
    } catch (err) {
      const message = err instanceof AuthError ? err.message : 'Sign in failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, displayName?: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
        },
      })
      if (signUpError) throw signUpError

      // Create user_profiles row after signup
      if (data.user) {
        await supabase.from('user_profiles').upsert({
          id: data.user.id,
          email,
          display_name: displayName ?? email.split('@')[0],
          role: 'viewer',
          portal_access: [],
          is_active: true,
        })
      }
    } catch (err) {
      const message = err instanceof AuthError ? err.message : 'Sign up failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) throw signOutError
    setUser(null)
    setSession(null)
    setProfile(null)
    setError(null)
  }

  const resetPassword = async (email: string) => {
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (resetError) throw resetError
  }

  const updatePassword = async (newPassword: string) => {
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })
    if (updateError) throw updateError
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
