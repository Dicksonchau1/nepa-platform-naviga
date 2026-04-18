/**
 * DroneInspect Portal — FODA operations.
 * Drones, buildings, flight plans, inspection findings.
 */
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDrones, useBuildings, useFlightPlans, useInspectionFindings } from '@/hooks/useDrones'
import { DeveloperMode } from '@/components/dashboard/DeveloperMode'

export function DroneInspectPortal() {
  const { data: drones, isLoading: dronesLoading, flyingCount } = useDrones()
  const { data: buildings, isLoading: buildingsLoading } = useBuildings()
  const { data: flightPlans, isLoading: flightsLoading } = useFlightPlans()
  const { data: findings, isLoading: findingsLoading } = useInspectionFindings()

  const criticalFindings = findings.filter((f) => f.severity === 'critical').length
  const openFindings = findings.filter((f) => f.status === 'open').length

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">DroneInspect Portal</h1>
        <p className="text-muted-foreground mt-1">FODA — Aerial Structural Inspection</p>
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
              {dronesLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Drones</p>
                  <p className="text-4xl font-bold text-primary">{drones.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">{flyingCount} flying</p>
                </>
              )}
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {buildingsLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Buildings</p>
                  <p className="text-4xl font-bold text-primary">{buildings.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">registered</p>
                </>
              )}
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {flightsLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Flight Plans</p>
                  <p className="text-4xl font-bold text-primary">{flightPlans.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">total</p>
                </>
              )}
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {findingsLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Findings</p>
                  <p className="text-4xl font-bold text-destructive">{openFindings}</p>
                  <p className="text-xs text-muted-foreground mt-1">{criticalFindings} critical</p>
                </>
              )}
            </Card>
          </div>

          {/* Drone Fleet */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Drone Fleet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dronesLoading ? (
                Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
              ) : drones.length === 0 ? (
                <p className="text-muted-foreground col-span-2 text-center py-8">No drones registered</p>
              ) : (
                drones.map((drone) => (
                  <Card key={drone.id} className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{drone.name}</span>
                      <Badge variant={drone.status === 'flying' ? 'default' : drone.status === 'error' ? 'destructive' : 'outline'}>
                        {drone.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Model: {drone.model ?? '—'}</p>
                      <p>Battery: {drone.battery_pct != null ? `${drone.battery_pct}%` : '—'}</p>
                      <p>Max flight: {drone.max_flight_time_min ?? '—'} min</p>
                      <p>S/N: {drone.serial_number ?? '—'}</p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Buildings */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Buildings Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {buildingsLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)
              ) : buildings.length === 0 ? (
                <p className="text-muted-foreground col-span-3 text-center py-8">No buildings registered</p>
              ) : (
                buildings.map((bldg) => (
                  <Card key={bldg.id} className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
                    <p className="font-medium">{bldg.name}</p>
                    <div className="text-xs text-muted-foreground space-y-1 mt-2">
                      <p>{bldg.address ?? '—'}</p>
                      <p>{bldg.floor_count ?? '?'} floors | {bldg.height_m ?? '?'}m | Built {bldg.year_built ?? '?'}</p>
                      {bldg.owner_name && <p>Owner: {bldg.owner_name}</p>}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Inspection Findings */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Inspection Findings</h2>
            <div className="space-y-3">
              {findingsLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
              ) : findings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No findings yet</p>
              ) : (
                findings.slice(0, 10).map((finding) => (
                  <Card key={finding.id} className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
                    <div className="flex items-start gap-3">
                      <Badge variant={finding.severity === 'critical' || finding.severity === 'high' ? 'destructive' : 'default'}>
                        {finding.severity}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{finding.category ?? 'Uncategorized'}</p>
                        <p className="text-xs text-muted-foreground mt-1">{finding.description ?? 'No description'}</p>
                        {finding.location_desc && (
                          <p className="text-xs text-muted-foreground mt-1">Location: {finding.location_desc}</p>
                        )}
                      </div>
                      <Badge variant="outline">{finding.status}</Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="developer">
          <DeveloperMode portal="drone_inspect" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
