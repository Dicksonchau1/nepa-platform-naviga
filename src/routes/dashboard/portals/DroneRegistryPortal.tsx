/**
 * DroneRegistryPortal — CRUD registry for drones table.
 */
import { useCallback } from 'react'
import { useDrones } from '@/hooks/useDrones'
import { useSites } from '@/hooks/useSites'
import { RegistryTable, statusBadge, ColumnDef, FieldDef } from '@/components/dashboard/RegistryTable'
import type { Drone } from '@/lib/supabaseClient'

const DRONE_STATUSES = ['idle', 'preflight', 'flying', 'returning', 'landed', 'error', 'maintenance']

export function DroneRegistryPortal() {
  const { data, isLoading, refresh } = useDrones()
  const { data: sites } = useSites()

  const siteMap: Record<string, string> = {}
  sites.forEach((s) => { siteMap[s.id] = s.name })

  const columns: ColumnDef<Drone>[] = [
    { key: 'name', label: 'Name' },
    { key: 'model', label: 'Model', render: (r) => <span className="text-muted-foreground">{r.model ?? '—'}</span> },
    { key: 'serial_number', label: 'Serial No.', render: (r) => <span className="mono text-xs">{r.serial_number ?? '—'}</span> },
    { key: 'status', label: 'Status', render: (r) => statusBadge(r.status) },
    {
      key: 'battery_pct',
      label: 'Battery',
      render: (r) => r.battery_pct != null
        ? <span className={r.battery_pct < 20 ? 'text-destructive' : ''}>{r.battery_pct}%</span>
        : <span className="text-muted-foreground">—</span>,
    },
    { key: 'firmware_version', label: 'Firmware', render: (r) => <span className="mono text-xs">{r.firmware_version ?? '—'}</span> },
    {
      key: 'site_id',
      label: 'Site',
      render: (r) => <span className="text-muted-foreground">{r.site_id ? (siteMap[r.site_id] ?? r.site_id) : '—'}</span>,
    },
  ]

  const siteOptions = sites.map((s) => s.id)

  const fields: FieldDef[] = [
    { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g. Alpha-01' },
    { key: 'model', label: 'Model', type: 'text', placeholder: 'e.g. DJI Matrice 300' },
    { key: 'serial_number', label: 'Serial Number', type: 'text', placeholder: 'e.g. SN-000001' },
    { key: 'status', label: 'Status', type: 'select', options: DRONE_STATUSES },
    { key: 'battery_pct', label: 'Battery (%)', type: 'number', placeholder: '0–100' },
    { key: 'firmware_version', label: 'Firmware Version', type: 'text', placeholder: 'e.g. 1.0.4' },
    { key: 'max_flight_time_min', label: 'Max Flight Time (min)', type: 'number', placeholder: 'e.g. 45' },
    { key: 'home_lat', label: 'Home Latitude', type: 'number', placeholder: 'e.g. 22.3193' },
    { key: 'home_lng', label: 'Home Longitude', type: 'number', placeholder: 'e.g. 114.1694' },
    { key: 'site_id', label: 'Site', type: 'select', options: siteOptions },
  ]

  const handleRefresh = useCallback(() => { refresh() }, [refresh])

  return (
    <RegistryTable<Drone>
      title="Drone Registry"
      description="Manage and register all drones in the AuraSense fleet."
      tableName="drones"
      data={data}
      isLoading={isLoading}
      columns={columns}
      fields={fields}
      defaultValues={{ status: 'idle' }}
      onRefresh={handleRefresh}
    />
  )
}
