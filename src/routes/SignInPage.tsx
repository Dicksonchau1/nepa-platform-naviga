import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Eye, EyeSlash } from '@phosphor-icons/react'
import { CinematicBackground } from '@/components/CinematicBackground'
import { toast } from 'sonner'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(email, password)
      toast.success('Signed in successfully')
      navigate(from, { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-24">
      <CinematicBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="backdrop-blur-xl bg-card/80 border border-border/50 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Sign in to NEPA</h1>
                <p className="text-sm text-muted-foreground">
                  Access your deployments, dashboards, and APIs
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10 bg-background/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                  {!isLoading && <ArrowRight className="ml-2" size={16} />}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
