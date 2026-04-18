/**
 * CameraRegistryPortal — CRUD registry for cameras table.
 */
import { useCallback } from 'react'
import { useCameras } from '@/hooks/useCameras'
import { useSites } from '@/hooks/useSites'
import { RegistryTable, statusBadge, ColumnDef, FieldDef } from '@/components/dashboard/RegistryTable'
import type { Camera } from '@/lib/supabaseClient'

const CAMERA_STATUSES = ['online', 'offline', 'error', 'maintenance']
const PORTAL_OPTIONS = ['facility_watch', 'robotic_ops', 'drone_inspect']

export function CameraRegistryPortal() {
  const { data, isLoading, refresh } = useCameras()
  const { data: sites } = useSites()

  const siteMap: Record<string, string> = {}
  sites.forEach((s) => { siteMap[s.id] = s.name })

  const columns: ColumnDef<Camera>[] = [
    { key: 'name', label: 'Name' },
    { key: 'location', label: 'Location', render: (r) => <span className="text-muted-foreground">{r.location ?? '—'}</span> },
    { key: 'status', label: 'Status', render: (r) => statusBadge(r.status) },
    { key: 'resolution', label: 'Resolution', render: (r) => <span className="mono text-xs">{r.resolution ?? '—'}</span> },
    { key: 'fps', label: 'FPS', render: (r) => <span>{r.fps != null ? `${r.fps}fps` : '—'}</span> },
    { key: 'portal', label: 'Portal', render: (r) => <span className="mono text-xs text-muted-foreground">{r.portal ?? '—'}</span> },
    {
      key: 'site_id',
      label: 'Site',
      render: (r) => <span className="text-muted-foreground">{r.site_id ? (siteMap[r.site_id] ?? r.site_id) : '—'}</span>,
    },
  ]

  const siteOptions = sites.map((s) => s.id)

  const fields: FieldDef[] = [
    { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g. CAM-LB01' },
    { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Lobby Level 1' },
    { key: 'stream_url', label: 'Stream URL', type: 'text', placeholder: 'https://...' },
    { key: 'rtsp_url', label: 'RTSP URL', type: 'text', placeholder: 'rtsp://...' },
    { key: 'status', label: 'Status', type: 'select', options: CAMERA_STATUSES },
    { key: 'resolution', label: 'Resolution', type: 'text', placeholder: 'e.g. 1920x1080' },
    { key: 'fps', label: 'Frame Rate (FPS)', type: 'number', placeholder: 'e.g. 30' },
    { key: 'portal', label: 'Portal', type: 'select', options: PORTAL_OPTIONS },
    { key: 'site_id', label: 'Site', type: 'select', options: siteOptions },
  ]

  const handleRefresh = useCallback(() => { refresh() }, [refresh])

  return (
    <RegistryTable<Camera>
      title="Camera Registry"
      description="Manage all camera streams and their assignments across facilities."
      tableName="cameras"
      data={data}
      isLoading={isLoading}
      columns={columns}
      fields={fields}
      defaultValues={{ status: 'offline' }}
      onRefresh={handleRefresh}
    />
  )
}
