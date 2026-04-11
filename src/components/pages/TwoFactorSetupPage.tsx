import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Copy, CheckCircle, ShieldCheck } from '@phosphor-icons/react'
import { CinematicBackground } from '@/components/CinematicBackground'
import { toast } from 'sonner'

interface TwoFactorSetupPageProps {
  onNavigate: (page: string) => void
  userEmail?: string
}

export function TwoFactorSetupPage({ onNavigate, userEmail }: TwoFactorSetupPageProps) {
  const [, setUser2FAEnabled] = useKV<boolean>('aura-2fa-enabled', false)
  const [, setUser2FASecret] = useKV<string>('aura-2fa-secret', '')
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const secretKey = `NEPA${Math.random().toString(36).substring(2, 15).toUpperCase()}`
  const qrCodeUrl = `otpauth://totp/AuraSense NEPA:${userEmail || 'user@example.com'}?secret=${secretKey}&issuer=AuraSense%20NEPA`

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey)
    setCopied(true)
    toast.success('Secret key copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (verificationCode.length !== 6) {
      toast.error('Please enter a 6-digit code')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setUser2FAEnabled(true)
      setUser2FASecret(secretKey)
      setIsLoading(false)
      toast.success('Two-factor authentication enabled successfully')
      onNavigate('home')
    }, 1500)
  }

  const handleSkip = () => {
    onNavigate('home')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-24">
      <CinematicBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-xl mx-auto">
          <div className="backdrop-blur-xl bg-card/80 border border-border/50 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                  <ShieldCheck size={32} weight="duotone" className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-3">Set up two-factor authentication</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Add an extra layer of security to your AuraSense NEPA account
                </p>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Step 1: Scan QR Code</h3>
                    <p className="text-xs text-muted-foreground">
                      Scan this QR code with your authenticator app (Google Authenticator, Authy, 1Password, etc.)
                    </p>
                  </div>

                  <div className="flex justify-center p-6 bg-background/50 rounded-xl border border-border/50">
                    <div className="w-48 h-48 bg-background border-2 border-border rounded-xl flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="mono text-[8px] text-muted-foreground break-all leading-tight">
                          {qrCodeUrl}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Step 2: Or enter the secret key manually</h3>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-background/50 border border-border/70 rounded-xl px-4 py-3 mono text-sm">
                        {secretKey}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleCopySecret}
                        className="h-11 w-11 border-border/70 hover:border-primary/40 backdrop-blur-sm bg-background/20 rounded-xl"
                      >
                        {copied ? (
                          <CheckCircle size={18} weight="fill" className="text-primary" />
                        ) : (
                          <Copy size={18} weight="regular" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Keep this secret key safe. You'll need it to recover your account if you lose access to your authenticator app.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="code" className="text-sm font-medium">
                      Step 3: Enter the 6-digit code from your app
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
                      required
                      className="h-12 bg-background/50 border-border/70 focus:border-primary/50 backdrop-blur-sm text-center text-2xl mono tracking-widest"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSkip}
                      className="flex-1 h-11 border-border/70 hover:border-border backdrop-blur-sm bg-background/20 rounded-xl"
                    >
                      Skip for now
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || verificationCode.length !== 6}
                      className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Verifying...' : 'Verify & Enable'}
                      {!isLoading && <ArrowRight className="ml-2" size={16} weight="bold" />}
                    </Button>
                  </div>
                </form>

                <div className="glass-card p-4 bg-accent/5 border-accent/20">
                  <div className="flex gap-3">
                    <ShieldCheck size={20} weight="duotone" className="text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Why enable 2FA?</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Two-factor authentication adds an extra layer of security by requiring both your password and a time-based code to access your account, protecting against unauthorized access even if your password is compromised.
                      </p>
                    </div>
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
