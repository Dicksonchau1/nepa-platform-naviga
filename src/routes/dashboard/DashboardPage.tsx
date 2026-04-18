/**
 * Dashboard Overview — aggregated view across all portals.
 * Reads directly from Supabase via hooks.
 */
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { useHealthMetrics } from '@/hooks/useHealthMetrics'
import { useFacadeFindings } from '@/hooks/useFacadeFindings'
import { useRobotTasks } from '@/hooks/useRobotTasks'
import { useCameras } from '@/hooks/useCameras'
import { useRobots } from '@/hooks/useRobots'
import { useDrones } from '@/hooks/useDrones'
import { useProvisioningClaim } from '@/hooks/useProvisioningClaim'

export function DashboardPage() {
  const { intelligence, isLoading: healthLoading, refresh: refreshHealth } = useHealthMetrics(30000)
  const { summary, isLoading: facadeLoading, refresh: refreshFacade } = useFacadeFindings()
  const { tasks, total: taskTotal, isLoading: tasksLoading, refresh: refreshTasks } = useRobotTasks()
  const { data: cameras, isLoading: camerasLoading } = useCameras()
  const { data: robots, isLoading: robotsLoading, activeCount: activeRobots } = useRobots()
  const { data: drones, isLoading: dronesLoading, flyingCount } = useDrones()

  // Block #7: claim pending provision on first authenticated dashboard load
  useProvisioningClaim()

  const handleRefreshAll = () => {
    refreshHealth()
    refreshFacade()
    refreshTasks()
  }

  const activeMissions = tasks.filter(t => t.status === 'active').length
  const onlineCameras = cameras.filter(c => c.status === 'online').length

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

      {/* System Status */}
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
                  {intelligence?.systemStatus ?? 'Unknown'}
                </Badge>
              </div>
              {intelligence?.serviceStatuses && (
                <div className="mt-2 space-y-1">
                  {intelligence.serviceStatuses.map((s) => (
                    <p key={s.id} className="text-xs text-muted-foreground">
                      {s.portal}: <span className={s.state === 'online' ? 'text-green-400' : 'text-yellow-400'}>{s.state}</span>
                    </p>
                  ))}
                </div>
              )}
            </>
          )}
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          {camerasLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">
                Cameras
              </p>
              <p className="text-4xl font-bold text-primary">{cameras.length}</p>
              <p className="text-xs text-muted-foreground mt-1">{onlineCameras} online</p>
            </>
          )}
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          {robotsLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">
                Robots
              </p>
              <p className="text-4xl font-bold text-primary">{robots.length}</p>
              <p className="text-xs text-muted-foreground mt-1">{activeRobots} active, {activeMissions} missions</p>
            </>
          )}
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          {dronesLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">
                Drones
              </p>
              <p className="text-4xl font-bold text-primary">{drones.length}</p>
              <p className="text-xs text-muted-foreground mt-1">{flyingCount} flying</p>
            </>
          )}
        </Card>
      </div>

      {/* Facade + Alerts */}
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
                  <Badge variant={alert.severity === 'critical' ? 'destructive' : 'default'}>
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
          <h2 className="text-xl font-semibold mb-4">Facade Portfolio</h2>
          {facadeLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mono uppercase tracking-wider mb-2">Buildings</p>
                <p className="text-2xl font-bold">{summary.totalBuildings}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mono uppercase tracking-wider mb-2">Open Defects</p>
                <p className="text-2xl font-bold">{summary.openDefects}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mono uppercase tracking-wider mb-2">Critical</p>
                <p className="text-2xl font-bold text-destructive">{summary.criticalCount}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
