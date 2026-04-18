import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Eye, EyeSlash, ArrowRight } from '@phosphor-icons/react'

type AuthMode = 'signin' | 'signup' | 'forgot'
const MIN_PASSWORD_LENGTH = 8

export default function AuthPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState<AuthMode>(
    (searchParams.get('mode') as AuthMode) ?? 'signin'
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else navigate('/dashboard')
    setLoading(false)
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) setError(error.message)
    else if (data.user) setSuccess('Check your email to confirm your account.')
    setLoading(false)
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) setError(error.message)
    else setSuccess('Password reset link sent. Check your email.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#060b14] flex items-center justify-center px-4">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)',
        }}
      />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <span className="font-mono text-cyan-400 text-sm tracking-[0.3em] uppercase">AuraSense</span>
          <div className="text-white text-2xl font-semibold mt-2">
            {mode === 'signin'
              ? 'Sign in to your workspace'
              : mode === 'signup'
              ? 'Create your workspace'
              : 'Reset your password'}
          </div>
        </div>

        <div className="bg-[#0d1421] border border-cyan-500/20 rounded-xl p-8 shadow-2xl">
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-mono">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-4 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-mono">
              {success}
            </div>
          )}

          <form
            onSubmit={
              mode === 'signin' ? handleSignIn : mode === 'signup' ? handleSignUp : handleForgotPassword
            }
            className="space-y-4"
          >
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-mono text-cyan-500/70 uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full bg-[#060b14] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-cyan-500/60 transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-mono text-cyan-500/70 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@aurasensehk.com"
                required
                className="w-full bg-[#060b14] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-cyan-500/60 transition-colors"
              />
            </div>
            {mode !== 'forgot' && (
              <div>
                <label className="block text-xs font-mono text-cyan-500/70 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="- - - - - - - - - - - - "
                    required
                    minLength={MIN_PASSWORD_LENGTH}
                    className="w-full bg-[#060b14] border border-cyan-500/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-cyan-500/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-cyan-500/60 hover:text-cyan-400 font-mono mt-2 float-right transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
            )}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all font-mono text-sm tracking-wide"
              >
                {loading
                  ? 'Processing...'
                  : mode === 'signin'
                  ? 'Sign in'
                  : mode === 'signup'
                  ? 'Create workspace'
                  : 'Send reset link'}
                {!loading && <ArrowRight size={16} weight="bold" />}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6 font-mono text-sm text-gray-500">
          {mode === 'signin' ? (
            <>
              Don't have a workspace?{' '}
              <button onClick={() => setMode('signup')} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Start pilot
              </button>
            </>
          ) : mode === 'signup' ? (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('signin')} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Sign in
              </button>
            </>
          ) : (
            <button onClick={() => setMode('signin')} className="text-cyan-400 hover:text-cyan-300 transition-colors">
              ← Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
