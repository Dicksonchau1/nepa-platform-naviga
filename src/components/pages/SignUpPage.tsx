import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowRight, Eye, EyeSlash } from '@phosphor-icons/react'
import { CinematicBackground } from '@/components/CinematicBackground'
import { toast } from 'sonner'

interface SignUpPageProps {
  onNavigate: (page: string) => void
}

export function SignUpPage({ onNavigate }: SignUpPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agreedToTerms) {
      toast.error('Please agree to the Terms and Privacy Policy')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast.success('Account created successfully')
      onNavigate('home')
    }, 1500)
  }

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
                <h1 className="text-3xl font-bold mb-3">Get started with NEPA</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Create an account to deploy NEPA in your environment, connect cameras, and integrate agents
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                    className="h-11 bg-background/50 border-border/70 focus:border-primary/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Work email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                    className="h-11 bg-background/50 border-border/70 focus:border-primary/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    required
                    className="h-11 bg-background/50 border-border/70 focus:border-primary/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="useCase" className="text-sm font-medium">
                    Use case
                  </Label>
                  <Select
                    value={formData.useCase}
                    onValueChange={(value) => updateField('useCase', value)}
                    required
                  >
                    <SelectTrigger 
                      id="useCase"
                      className="h-11 bg-background/50 border-border/70 focus:border-primary/50 backdrop-blur-sm"
                    >
                      <SelectValue placeholder="Select your primary use case" />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-xl border-border/70">
                      <SelectItem value="retail">Unmanned Retail</SelectItem>
                      <SelectItem value="inspection">Autonomous Inspection</SelectItem>
                      <SelectItem value="robotics">Service & Delivery Robotics</SelectItem>
                      <SelectItem value="surveillance">Surveillance & Monitoring</SelectItem>
                      <SelectItem value="research">Research & Development</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
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

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    className="mt-0.5 border-border/70 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('terms')}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Terms
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('privacy')}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Privacy Policy
                    </button>
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !agreedToTerms}
                  className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                  {!isLoading && <ArrowRight className="ml-2" size={16} weight="bold" />}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <button
                  onClick={() => onNavigate('signin')}
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
