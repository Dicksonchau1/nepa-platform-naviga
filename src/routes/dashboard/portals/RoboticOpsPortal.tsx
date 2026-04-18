/**
 * RoboticOps Portal — RODA operations.
 * Robots, missions, telemetry, task management.
 */
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRobots, useMissions } from '@/hooks/useRobots'
import { DeveloperMode } from '@/components/dashboard/DeveloperMode'

export function RoboticOpsPortal() {
  const { data: robots, isLoading: robotsLoading, activeCount } = useRobots()
  const { data: missions, isLoading: missionsLoading } = useMissions()

  const activeMissions = missions.filter((m) => m.status === 'active').length
  const completedMissions = missions.filter((m) => m.status === 'completed').length

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">RoboticOps Portal</h1>
        <p className="text-muted-foreground mt-1">RODA — Robot Navigation & Mission Control</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="developer">Developer Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {robotsLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Robots</p>
                  <p className="text-4xl font-bold text-primary">{robots.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activeCount} active</p>
                </>
              )}
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {missionsLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Active Missions</p>
                  <p className="text-4xl font-bold text-primary">{activeMissions}</p>
                  <p className="text-xs text-muted-foreground mt-1">in progress</p>
                </>
              )}
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {missionsLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Completed</p>
                  <p className="text-4xl font-bold text-green-500">{completedMissions}</p>
                  <p className="text-xs text-muted-foreground mt-1">missions done</p>
                </>
              )}
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {missionsLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Total Missions</p>
                  <p className="text-4xl font-bold text-primary">{missions.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">all time</p>
                </>
              )}
            </Card>
          </div>

          {/* Robot Fleet */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Robot Fleet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {robotsLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
              ) : robots.length === 0 ? (
                <p className="text-muted-foreground col-span-3 text-center py-8">No robots registered</p>
              ) : (
                robots.map((robot) => (
                  <Card key={robot.id} className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{robot.name}</span>
                      <Badge variant={robot.status === 'active' ? 'default' : 'outline'}>
                        {robot.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Model: {robot.model ?? '—'}</p>
                      <p>Battery: {robot.battery_pct != null ? `${robot.battery_pct}%` : '—'}</p>
                      <p>Firmware: {robot.firmware_version ?? '—'}</p>
                      {robot.last_seen_at && (
                        <p className="mono">Last seen: {new Date(robot.last_seen_at).toLocaleString()}</p>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Recent Missions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Missions</h2>
            <div className="space-y-3">
              {missionsLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
              ) : missions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No missions yet</p>
              ) : (
                missions.slice(0, 10).map((mission) => (
                  <Card key={mission.id} className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{mission.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Type: {mission.mission_type ?? 'patrol'} |
                          {mission.distance_m ? ` ${mission.distance_m}m` : ''}
                          {mission.duration_s ? ` | ${Math.round(mission.duration_s / 60)}min` : ''}
                        </p>
                      </div>
                      <Badge
                        variant={
                          mission.status === 'completed' ? 'default' :
                          mission.status === 'active' ? 'default' :
                          mission.status === 'failed' ? 'destructive' : 'outline'
                        }
                      >
                        {mission.status}
                      </Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="developer">
          <DeveloperMode portal="robotic_ops" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
