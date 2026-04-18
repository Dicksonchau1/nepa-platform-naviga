import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ApiKeyManager } from '@/components/voda/ApiKeyManager'
import { ProviderConfig } from '@/components/voda/ProviderConfig'
import { QualityLab } from '@/components/voda/QualityLab'
import { BillingPanel } from '@/components/voda/BillingPanel'
import { DeveloperMode } from '@/components/dashboard/DeveloperMode'
import { vodaApi, vodaUpgradeEventName } from '@/lib/voda-api'
import type { HealthResponse, UsageResponse, VodaTier } from '@/types/voda'
import { Line, LineChart, XAxis } from 'recharts'
import { Gauge, Key, UploadSimple, BookOpen } from '@phosphor-icons/react'

const tierLabel: Record<VodaTier, string> = {
  free: 'Free',
  pro: 'Pro',
  enterprise: 'Enterprise',
}

const generateFallbackUsage = () => {
  const today = new Date()
  return Array.from({ length: 30 }).map((_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (29 - index))
    return { date: date.toISOString().slice(0, 10), frames: 0 }
  })
}

export function VodaPortal() {
  const [activeTab, setActiveTab] = useState('overview')
  const [usage, setUsage] = useState<UsageResponse | null>(null)
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [createKeyOpen, setCreateKeyOpen] = useState(false)
  const [qualityMode, setQualityMode] = useState<'diagnose' | 'reconstruct' | 'stitch'>('diagnose')
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        const [usageResponse, healthResponse] = await Promise.all([
          vodaApi.getUsage(),
          vodaApi.getHealth(),
        ])
        setUsage(usageResponse)
        setHealth(healthResponse)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    void load()
  }, [])

  useEffect(() => {
    const handler = () => setUpgradeOpen(true)
    window.addEventListener(vodaUpgradeEventName, handler)
    return () => window.removeEventListener(vodaUpgradeEventName, handler)
  }, [])

  const usageSeries = useMemo(
    () => usage?.usage_30d?.length ? usage.usage_30d : generateFallbackUsage(),
    [usage]
  )

  const dailyLimit = usage?.daily_limit ?? 100
  const usedToday = usage?.used_today ?? 0
  const usagePct = Math.min((usedToday / dailyLimit) * 100, 100)
  const tier = usage?.tier ?? 'free'

  const statusColor =
    health?.status === 'ok'
      ? 'bg-emerald-500'
      : health?.status === 'degraded'
      ? 'bg-amber-500'
      : 'bg-rose-500'

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">VODA Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Full-stack video diagnostics, reconstruction, and stitching.
          </p>
        </div>
        <Badge variant="outline" className="w-fit">
          Tier: {tierLabel[tier]}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="quality">Quality Lab</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="developer">Developer Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/50 border-border/50">
              {isLoading ? (
                <Skeleton className="h-24 w-full" />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Today&apos;s usage</p>
                    <Badge variant="secondary">
                      {usedToday.toLocaleString()} / {dailyLimit.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="h-2 rounded-full bg-muted/60">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${usagePct}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Daily limit resets at 00:00 UTC.
                  </p>
                </div>
              )}
            </Card>

            <Card className="p-6 bg-card/50 border-border/50 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">30-day usage</p>
                <Gauge size={18} className="text-primary" />
              </div>
              <ChartContainer
                className="h-32"
                config={{
                  frames: { label: 'Frames', color: 'hsl(var(--primary))' },
                }}
              >
                <LineChart data={usageSeries}>
                  <XAxis dataKey="date" hide />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Line type="monotone" dataKey="frames" stroke="var(--color-frames)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/50 border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Quick actions</h2>
                <Badge variant="outline">Launch</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setActiveTab('keys')
                    setCreateKeyOpen(true)
                  }}
                >
                  <Key size={16} />
                  Get API Key
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setActiveTab('quality')
                    setQualityMode('diagnose')
                  }}
                >
                  <UploadSimple size={16} />
                  Upload Frame
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/resources/docs">
                    <BookOpen size={16} />
                    View Docs
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Service status</h2>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                  <span className="text-sm capitalize">{health?.status ?? 'unknown'}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {health?.status === 'ok'
                  ? 'All VODA services are operational.'
                  : 'We are actively monitoring the VODA backend.'}
              </p>
              {health?.version && (
                <p className="text-xs text-muted-foreground">Version {health.version}</p>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keys">
          <ApiKeyManager createOpen={createKeyOpen} onCreateOpenChange={setCreateKeyOpen} />
        </TabsContent>

        <TabsContent value="providers">
          <ProviderConfig tier={tier} onUpgrade={() => setUpgradeOpen(true)} />
        </TabsContent>

        <TabsContent value="quality">
          <QualityLab initialMode={qualityMode} onModeChange={setQualityMode} />
        </TabsContent>

        <TabsContent value="billing">
          <BillingPanel usage={usage} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="developer">
          <DeveloperMode portal="voda" />
        </TabsContent>
      </Tabs>

      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade required</DialogTitle>
            <DialogDescription>
              Your current tier has reached its usage limit. Upgrade to Pro or Enterprise
              to keep processing frames with VODA.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setUpgradeOpen(false)}>
              Not now
            </Button>
            <Button onClick={() => setActiveTab('billing')}>View plans</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
