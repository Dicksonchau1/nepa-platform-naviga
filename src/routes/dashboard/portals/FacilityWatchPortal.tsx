/**
 * FacilityWatch Portal — SODA + VODA operations.
 * Cameras, shelves, retail alerts, surveillance feeds.
 */
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCameras } from '@/hooks/useCameras'
import { useRetailAlerts } from '@/hooks/useAlerts'
import { useSites } from '@/hooks/useSites'
import { supabase, Shelf } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { DeveloperMode } from '@/components/dashboard/DeveloperMode'

export function FacilityWatchPortal() {
  const { data: sites, isLoading: sitesLoading } = useSites()
  const { data: cameras, isLoading: camerasLoading } = useCameras()
  const { data: retailAlerts, isLoading: alertsLoading } = useRetailAlerts()
  const { data: shelves, isLoading: shelvesLoading } = useSupabaseQuery<Shelf>(
    () => supabase.from('shelves').select('*, cameras(name)').order('name'),
    []
  )

  const onlineCameras = cameras.filter((c) => c.status === 'online').length
  const openAlerts = retailAlerts.filter((a) => a.status === 'open').length
  const lowStockShelves = shelves.filter((s) => s.stock_level !== null && Number(s.stock_level) < 20).length

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">FacilityWatch Portal</h1>
        <p className="text-muted-foreground mt-1">SODA + VODA — Surveillance & Video Operations</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="developer">Developer Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {camerasLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Cameras</p>
                  <p className="text-4xl font-bold text-primary">{cameras.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">{onlineCameras} online</p>
                </>
              )}
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {shelvesLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Shelves</p>
                  <p className="text-4xl font-bold text-primary">{shelves.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">{lowStockShelves} low stock</p>
                </>
              )}
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {alertsLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Retail Alerts</p>
                  <p className="text-4xl font-bold text-destructive">{openAlerts}</p>
                  <p className="text-xs text-muted-foreground mt-1">open alerts</p>
                </>
              )}
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              {sitesLoading ? <Skeleton className="h-16 w-full" /> : (
                <>
                  <p className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider mb-2">Sites</p>
                  <p className="text-4xl font-bold text-primary">{sites.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">active locations</p>
                </>
              )}
            </Card>
          </div>

          {/* Camera Grid */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Cameras</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {camerasLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
              ) : cameras.length === 0 ? (
                <p className="text-muted-foreground col-span-3 text-center py-8">No cameras registered</p>
              ) : (
                cameras.map((cam) => (
                  <Card key={cam.id} className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{cam.name}</span>
                      <Badge variant={cam.status === 'online' ? 'default' : 'destructive'}>
                        {cam.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Location: {cam.location ?? '—'}</p>
                      <p>Resolution: {cam.resolution ?? '—'} @ {cam.fps ?? 25}fps</p>
                      <p className="mono">Portal: {cam.portal}</p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Recent Retail Alerts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Retail Alerts</h2>
            <div className="space-y-3">
              {alertsLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
              ) : retailAlerts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No retail alerts</p>
              ) : (
                retailAlerts.slice(0, 10).map((alert) => (
                  <Card key={alert.id} className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
                    <div className="flex items-start gap-3">
                      <Badge variant={alert.severity === 'critical' ? 'destructive' : 'default'}>
                        {alert.severity}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.event_type.replace(/_/g, ' ')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.description ?? 'No description'}</p>
                        <p className="text-xs text-muted-foreground mono mt-1">
                          {new Date(alert.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline">{alert.status}</Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="developer">
          <DeveloperMode portal="facility_watch" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
