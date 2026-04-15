import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, ArrowLeft, EnvelopeSimple, CheckCircle } from '@phosphor-icons/react'
import { CinematicBackground } from '@/components/CinematicBackground'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    setIsLoading(false)
    if (!error) {
      setEmailSent(true)
      toast.success('Password reset link sent to your email')
    } else {
      setErrorMsg(error.message)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)
    setErrorMsg('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    setIsLoading(false)
    if (error) {
      setErrorMsg(error.message)
      return
    }
    toast.success('Email resent successfully')
  }

  if (emailSent) {
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
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} weight="fill" className="text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-3">Check your email</h1>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We've sent a password reset link to
                  </p>
                  <p className="text-foreground font-medium mt-2 mono">
                    {email}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-background/50 border border-border/50 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <EnvelopeSimple size={20} weight="duotone" className="text-primary mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Click the link in the email to reset your password. The link will expire in 1 hour.
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={handleResend}
                      disabled={isLoading}
                      className="text-primary hover:text-primary/80 transition-colors font-medium disabled:opacity-50"
                    >
                      resend it
                    </button>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/auth?mode=signin')}
                  variant="outline"
                  className="w-full h-11 border-border/70 hover:border-primary/40 backdrop-blur-sm bg-background/20 rounded-xl"
                >
                  <ArrowLeft className="mr-2" size={16} weight="bold" />
                  Back to sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
                <h1 className="text-3xl font-bold mb-3">Reset your password</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-background/50 border-border/70 focus:border-primary/50 backdrop-blur-sm"
                  />
                </div>
                {errorMsg && (
                  <p className="text-sm text-destructive">{errorMsg}</p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl"
                >
                  {isLoading ? 'Sending link...' : 'Send reset link'}
                  {!isLoading && <ArrowRight className="ml-2" size={16} weight="bold" />}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate('/auth?mode=signin')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft size={14} weight="bold" />
                  Back to sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
