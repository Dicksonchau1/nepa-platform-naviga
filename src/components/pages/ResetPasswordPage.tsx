import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Eye, EyeSlash, CheckCircle, LockKey } from '@phosphor-icons/react'
import { CinematicBackground } from '@/components/CinematicBackground'
import { toast } from 'sonner'

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void
}

export function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const passwordsMatch = password === confirmPassword && password.length > 0
  const isPasswordValid = password.length >= 8

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwordsMatch) {
      toast.error('Passwords do not match')
      return
    }

    if (!isPasswordValid) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setResetSuccess(true)
      toast.success('Password reset successfully')
    }, 1500)
  }

  if (resetSuccess) {
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
                  <h1 className="text-3xl font-bold mb-3">Password reset complete</h1>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Your password has been successfully reset. You can now sign in with your new password.
                  </p>
                </div>

                <Button
                  onClick={() => onNavigate('signin')}
                  className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl"
                >
                  Continue to sign in
                  <ArrowRight className="ml-2" size={16} weight="bold" />
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
            <div className="absolute -bottom-32 -left-32 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <LockKey size={28} weight="duotone" className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-3">Create new password</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Please enter a new password for your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    New password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="h-11 bg-background/50 border-border/70 focus:border-primary/50 backdrop-blur-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeSlash size={18} weight="regular" />
                      ) : (
                        <Eye size={18} weight="regular" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm new password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={8}
                      className="h-11 bg-background/50 border-border/70 focus:border-primary/50 backdrop-blur-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeSlash size={18} weight="regular" />
                      ) : (
                        <Eye size={18} weight="regular" />
                      )}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="text-xs text-destructive">
                      Passwords do not match
                    </p>
                  )}
                  {confirmPassword.length > 0 && passwordsMatch && (
                    <p className="text-xs text-primary">
                      Passwords match
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !passwordsMatch || !isPasswordValid}
                  className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Resetting password...' : 'Reset password'}
                  {!isLoading && <ArrowRight className="ml-2" size={16} weight="bold" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
