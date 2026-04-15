import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight } from '@phosphor-icons/react'
import { CinematicBackground } from '@/components/CinematicBackground'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      await resetPassword(email)
      toast.success('Password reset email sent')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Reset request failed'
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
                <h1 className="text-3xl font-bold mb-2">Reset your password</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email and we will send a reset link.
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

                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send reset link'}
                  {!isLoading && <ArrowRight className="ml-2" size={16} />}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm">
                <span className="text-muted-foreground">Remember your password? </span>
                <Link to="/auth/sign-in" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
