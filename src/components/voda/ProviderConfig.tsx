import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Atom,
  Brain,
  CheckCircle,
  Cloud,
  Cube,
  LockKey,
  Plug,
  Sparkle,
} from '@phosphor-icons/react'
import { vodaApi } from '@/lib/voda-api'
import type { ProviderInfo, VodaTier } from '@/types/voda'

const PROVIDERS = [
  {
    id: 'nepa_free',
    label: 'NEPA Free',
    models: ['nepa_free'],
    icon: Sparkle,
    description: 'Always-on baseline inference with NEPA branding.',
    alwaysAvailable: true,
  },
  {
    id: 'openai',
    label: 'OpenAI',
    models: ['gpt-4.1', 'gpt-4.1-mini', 'o4-mini'],
    icon: Atom,
    description: 'Low-latency GPT vision models.',
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    models: ['claude-3.7-sonnet', 'claude-3.5-haiku'],
    icon: Brain,
    description: 'Anthropic vision analysis at scale.',
  },
  {
    id: 'google',
    label: 'Google',
    models: ['gemini-2.5-pro', 'gemini-2.0-flash'],
    icon: Cloud,
    description: 'Gemini multimodal intelligence.',
  },
  {
    id: 'replicate',
    label: 'Replicate',
    models: ['clip-interrogator', 'segment-anything'],
    icon: Cube,
    description: 'Community vision models via Replicate.',
  },
  {
    id: 'custom',
    label: 'Custom',
    models: ['bring-your-own'],
    icon: Plug,
    description: 'Route to your own hosted model endpoints.',
  },
]

interface ProviderConfigProps {
  tier: VodaTier
  onUpgrade: () => void
}

export function ProviderConfig({ tier, onUpgrade }: ProviderConfigProps) {
  const [providers, setProviders] = useState<ProviderInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProvider, setSelectedProvider] = useState<(typeof PROVIDERS)[number] | null>(null)
  const [providerKey, setProviderKey] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tested, setTested] = useState(false)

  const loadProviders = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await vodaApi.listProviders()
      setProviders(response.providers)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProviders()
  }, [loadProviders])

  const providerMap = useMemo(() => {
    return providers.reduce<Record<string, ProviderInfo>>((acc, provider) => {
      acc[provider.provider] = provider
      return acc
    }, {})
  }, [providers])

  const handleTestConnection = async () => {
    if (!selectedProvider) return
    if (!providerKey.trim()) {
      toast.error('Enter a provider key to test')
      return
    }
    setIsSubmitting(true)
    try {
      await vodaApi.addProviderKey(selectedProvider.id, providerKey.trim())
      toast.success('Connection verified')
      setTested(true)
      await loadProviders()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveKey = () => {
    setSelectedProvider(null)
    setProviderKey('')
    setTested(false)
  }

  const handleRemove = async (provider: string) => {
    await vodaApi.removeProvider(provider)
    toast.success('Provider disconnected')
    await loadProviders()
  }

  const isFreeTier = tier === 'free'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Providers (BYOK)</h2>
        <p className="text-sm text-muted-foreground">
          Bring your own model keys and route VODA workloads to preferred providers.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {PROVIDERS.map((provider) => {
            const Icon = provider.icon
            const connected = provider.alwaysAvailable || providerMap[provider.id]?.connected
            return (
              <Card key={provider.id} className="p-6 bg-card/50 border-border/50 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{provider.label}</h3>
                      <p className="text-xs text-muted-foreground">{provider.description}</p>
                    </div>
                  </div>
                  {connected ? (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle size={12} />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not connected</Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Models</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.models.map((model) => (
                      <Badge key={model} variant="secondary" className="text-[10px]">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>

                {provider.alwaysAvailable ? (
                  <div className="text-xs text-muted-foreground">
                    NEPA baseline remains available on all tiers.
                  </div>
                ) : isFreeTier ? (
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <LockKey size={14} />
                      Upgrade to unlock BYOK providers.
                    </div>
                    <Button size="sm" className="w-full" onClick={onUpgrade}>
                      Upgrade to Pro
                    </Button>
                  </div>
                ) : connected ? (
                  <div className="mt-auto">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          Remove key
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove provider key?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This provider will be disconnected and unavailable for processing.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemove(provider.id)}>
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ) : (
                  <div className="mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedProvider(provider)}
                    >
                      Add key
                    </Button>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      <Dialog
        open={!!selectedProvider}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProvider(null)
            setProviderKey('')
            setTested(false)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add provider key</DialogTitle>
            <DialogDescription>
              Securely store your BYOK credential for {selectedProvider?.label}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="provider-key">Provider API key</Label>
            <Input
              id="provider-key"
              type="password"
              placeholder="••••••••••••"
              value={providerKey}
              onChange={(event) => setProviderKey(event.target.value)}
            />
            {tested && (
              <p className="text-xs text-green-400 flex items-center gap-2">
                <CheckCircle size={12} />
                Connection verified
              </p>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="secondary"
              onClick={handleTestConnection}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Testing...' : 'Test connection'}
            </Button>
            <Button onClick={handleSaveKey} disabled={!tested}>
              Save key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
