/**
 * RobotRegistryPortal — CRUD registry for robots table.
 */
import { useCallback } from 'react'
import { useRobots } from '@/hooks/useRobots'
import { useSites } from '@/hooks/useSites'
import { RegistryTable, statusBadge, ColumnDef, FieldDef } from '@/components/dashboard/RegistryTable'
import type { Robot } from '@/lib/supabase'

const ROBOT_STATUSES = ['idle', 'active', 'charging', 'error', 'offline', 'maintenance']

export function RobotRegistryPortal() {
  const { data, isLoading, refresh } = useRobots()
  const { data: sites } = useSites()

  const siteMap: Record<string, string> = {}
  sites.forEach((s) => { siteMap[s.id] = s.name })

  const columns: ColumnDef<Robot>[] = [
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
    { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g. Robot-A1' },
    { key: 'model', label: 'Model', type: 'text', placeholder: 'e.g. Unitree B2' },
    { key: 'serial_number', label: 'Serial Number', type: 'text', placeholder: 'e.g. SN-R00001' },
    { key: 'status', label: 'Status', type: 'select', options: ROBOT_STATUSES },
    { key: 'battery_pct', label: 'Battery (%)', type: 'number', placeholder: '0–100' },
    { key: 'firmware_version', label: 'Firmware Version', type: 'text', placeholder: 'e.g. 2.1.0' },
    { key: 'location_x', label: 'Location X', type: 'number', placeholder: 'e.g. 10.5' },
    { key: 'location_y', label: 'Location Y', type: 'number', placeholder: 'e.g. 20.3' },
    { key: 'heading_deg', label: 'Heading (°)', type: 'number', placeholder: '0–360' },
    { key: 'site_id', label: 'Site', type: 'select', options: siteOptions },
  ]

  const handleRefresh = useCallback(() => { refresh() }, [refresh])

  return (
    <RegistryTable<Robot>
      title="Robot Registry"
      description="Manage all robotic units deployed across AuraSense facilities."
      tableName="robots"
      data={data}
      isLoading={isLoading}
      columns={columns}
      fields={fields}
      defaultValues={{ status: 'idle' }}
      onRefresh={handleRefresh}
    />
  )
}
