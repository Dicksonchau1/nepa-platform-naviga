import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, ShieldCheck, ArrowLeft } from '@phosphor-icons/react'
import { CinematicBackground } from '@/components/CinematicBackground'
import { toast } from 'sonner'

interface TwoFactorVerifyPageProps {
  onNavigate: (page: string) => void
  onVerified: () => void
  userEmail?: string
}

export function TwoFactorVerifyPage({ onNavigate, onVerified, userEmail }: TwoFactorVerifyPageProps) {
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (verificationCode.length !== 6) {
      toast.error('Please enter a 6-digit code')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast.success('Verification successful')
      onVerified()
    }, 1500)
  }

  const handleUseRecoveryCode = () => {
    toast.info('Recovery code support coming soon')
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
              <button
                onClick={() => onNavigate('signin')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft size={16} weight="regular" />
                Back to sign in
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                  <ShieldCheck size={32} weight="duotone" className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-3">Two-factor authentication</h1>
                <p className="text-muted-foreground text-sm">
                  Enter the 6-digit code from your authenticator app
                </p>
                {userEmail && (
                  <p className="text-muted-foreground text-xs mt-2 mono">
                    {userEmail}
                  </p>
                )}
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-sm font-medium">
                    Authentication code
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                      setVerificationCode(value)
                    }}
                    maxLength={6}
                    autoFocus
                    required
                    className="h-14 bg-background/50 border-border/70 focus:border-primary/50 backdrop-blur-sm text-center text-3xl mono tracking-widest"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Open your authenticator app to view your code
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || verificationCode.length !== 6}
                  className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                  {!isLoading && <ArrowRight className="ml-2" size={16} weight="bold" />}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleUseRecoveryCode}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Use recovery code instead
                  </button>
                </div>
              </form>

              <div className="mt-8 glass-card p-4 bg-muted/5 border-muted/20">
                <div className="flex gap-3">
                  <ShieldCheck size={18} weight="duotone" className="text-muted-foreground shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold">Lost access to your authenticator?</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Contact support or use a recovery code to regain access to your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
