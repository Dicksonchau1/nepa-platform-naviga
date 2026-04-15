import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { vodaApi } from '@/lib/voda-api'
import type { UsageResponse, VodaTier } from '@/types/voda'

const PRICING_TIERS = [
  {
    tier: 'free' as VodaTier,
    name: 'Free',
    price: '$0',
    description: '100 frames/day, nepa_free model only, basic diagnostics.',
    limit: 100,
  },
  {
    tier: 'pro' as VodaTier,
    name: 'Pro',
    price: '$29/mo',
    description: '5,000 frames/day, BYOK all providers, full quality lab, priority.',
    limit: 5000,
  },
  {
    tier: 'enterprise' as VodaTier,
    name: 'Enterprise',
    price: '$199/mo',
    description: '50,000 frames/day, BYOK + custom models, SLA, dedicated support.',
    limit: 50000,
  },
]

interface BillingPanelProps {
  usage: UsageResponse | null
  isLoading: boolean
}

export function BillingPanel({ usage, isLoading }: BillingPanelProps) {
  const [isUpgrading, setIsUpgrading] = useState<VodaTier | null>(null)

  const currentTier = usage?.tier ?? 'free'
  const currentPlan = PRICING_TIERS.find((tier) => tier.tier === currentTier) ?? PRICING_TIERS[0]
  const usedToday = usage?.used_today ?? 0
  const dailyLimit = usage?.daily_limit ?? currentPlan.limit

  const handleUpgrade = async (tier: VodaTier) => {
    if (tier === 'free') return
    try {
      setIsUpgrading(tier)
      const response = await vodaApi.createCheckoutSession(tier)
      window.location.assign(response.url)
    } catch (error) {
      console.error(error)
      toast.error('Unable to start checkout')
    } finally {
      setIsUpgrading(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Billing</h2>
        <p className="text-sm text-muted-foreground">
          Manage your plan, usage limits, and billing preferences.
        </p>
      </div>

      {isLoading ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <Card className="p-6 bg-card/50 border-border/50 space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Current plan</p>
              <h3 className="text-2xl font-semibold">{currentPlan.name}</h3>
              <p className="text-sm text-muted-foreground">{currentPlan.description}</p>
            </div>
            <Badge variant="outline">{currentPlan.price}</Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Usage today</p>
            <div className="h-2 rounded-full bg-muted/60">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${Math.min((usedToday / dailyLimit) * 100, 100)}%` }}
              />
            </div>
            <p className="text-sm mt-2">
              {usedToday.toLocaleString()} / {dailyLimit.toLocaleString()} frames
            </p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRICING_TIERS.map((tier) => (
          <Card
            key={tier.tier}
            className={`p-6 bg-card/50 border-border/50 flex flex-col gap-4 ${
              tier.tier === currentTier ? 'ring-1 ring-primary/40' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              {tier.tier === currentTier && <Badge>Current</Badge>}
            </div>
            <p className="text-2xl font-semibold">{tier.price}</p>
            <p className="text-sm text-muted-foreground flex-1">{tier.description}</p>
            {tier.tier !== 'free' && tier.tier !== currentTier && (
              <Button
                onClick={() => handleUpgrade(tier.tier)}
                disabled={isUpgrading === tier.tier}
              >
                {isUpgrading === tier.tier ? 'Redirecting...' : 'Upgrade'}
              </Button>
            )}
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-card/50 border-border/50">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold">Billing history</h3>
            <p className="text-sm text-muted-foreground">
              Access invoices and payment methods in the Stripe customer portal.
            </p>
          </div>
          {usage?.billing_portal_url ? (
            <Button asChild variant="outline">
              <a href={usage.billing_portal_url} target="_blank" rel="noreferrer">
                Open portal
              </a>
            </Button>
          ) : (
            <Badge variant="outline">Portal unavailable</Badge>
          )}
        </div>
      </Card>
    </div>
  )
}
