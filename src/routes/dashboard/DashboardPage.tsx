import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { useHealthMetrics } from '@/hooks/useHealthMetrics'
import { useFacadeFindings } from '@/hooks/useFacadeFindings'
import { useRobotTasks } from '@/hooks/useRobotTasks'

export function DashboardPage() {
  const { intelligence, isLoading: healthLoading, refresh: refreshHealth } = useHealthMetrics(30000)
  const { summary, isLoading: facadeLoading, refresh: refreshFacade } = useFacadeFindings()
  const { tasks, total, isLoading: tasksLoading, refresh: refreshTasks } = useRobotTasks()

  const handleRefreshAll = () => {
    refreshHealth()
    refreshFacade()
    refreshTasks()
  }

  const runningTasks = tasks.filter(t => t.status === 'running').length
  const queuedTasks = tasks.filter(t => t.status === 'queued').length

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">NEPA Dashboard</h1>
          <p className="text-muted-foreground mt-1">Neuromorphic Edge Perception Agent Console</p>
        </div>
        <Button onClick={handleRefreshAll} variant="outline" size="sm" className="gap-2">
          <ArrowsClockwise size={16} />
          Refresh All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          {healthLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">
                System Status
              </p>
              <div className="flex items-center gap-2">
                <Badge
                  variant={intelligence?.systemStatus === 'healthy' ? 'default' : 'destructive'}
                  className="text-lg px-3 py-1"
                >
                  {intelligence?.systemStatus || 'Unknown'}
                </Badge>
              </div>
            </>
          )}
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          {facadeLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">
                Buildings
              </p>
              <p className="text-4xl font-bold text-primary">{summary.totalBuildings}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {summary.openDefects} open defects
              </p>
            </>
          )}
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          {facadeLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">
                Critical Issues
              </p>
              <p className="text-4xl font-bold text-destructive">{summary.criticalCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Require attention</p>
            </>
          )}
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          {tasksLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">
                Robot Tasks
              </p>
              <p className="text-4xl font-bold text-primary">{total}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {runningTasks} running, {queuedTasks} queued
              </p>
            </>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
          {healthLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : intelligence?.recentAlerts.length ? (
            <div className="space-y-3">
              {intelligence.recentAlerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/30"
                >
                  <Badge variant={alert.severity === 'critical' || alert.severity === 'error' ? 'destructive' : 'default'}>
                    {alert.severity}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.type}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mono mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No recent alerts</p>
          )}
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          {healthLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : intelligence?.metrics ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mono uppercase tracking-wider mb-2">
                  Latency (P95)
                </p>
                <p className="text-2xl font-bold">{intelligence.metrics.latency.p95.toFixed(2)} ms</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mono uppercase tracking-wider mb-2">
                  Throughput
                </p>
                <p className="text-2xl font-bold">{intelligence.metrics.throughput.toFixed(0)} req/s</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mono uppercase tracking-wider mb-2">
                  Error Rate
                </p>
                <p className="text-2xl font-bold">{(intelligence.metrics.errorRate * 100).toFixed(2)}%</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No metrics available</p>
          )}
        </Card>
      </div>
    </div>
  )
}
