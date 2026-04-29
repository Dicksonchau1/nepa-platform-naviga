/**
 * BuildingRegistryPortal — CRUD registry for buildings table.
 */
import { useCallback } from 'react'
import { useBuildings } from '@/hooks/useDrones'
import { useSites } from '@/hooks/useSites'
import { RegistryTable, ColumnDef, FieldDef } from '@/components/dashboard/RegistryTable'
import type { Building } from '@/lib/supabase'

export function BuildingRegistryPortal() {
  const { data, isLoading, refresh } = useBuildings()
  const { data: sites } = useSites()

  const siteMap: Record<string, string> = {}
  sites.forEach((s) => { siteMap[s.id] = s.name })

  const columns: ColumnDef<Building>[] = [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address', render: (r) => <span className="text-muted-foreground">{r.address ?? '—'}</span> },
    {
      key: 'floor_count',
      label: 'Floors',
      render: (r) => <span>{r.floor_count != null ? r.floor_count : '—'}</span>,
    },
    {
      key: 'height_m',
      label: 'Height',
      render: (r) => <span>{r.height_m != null ? `${r.height_m}m` : '—'}</span>,
    },
    {
      key: 'year_built',
      label: 'Year Built',
      render: (r) => <span className="mono text-xs">{r.year_built ?? '—'}</span>,
    },
    { key: 'owner_name', label: 'Owner', render: (r) => <span className="text-muted-foreground">{r.owner_name ?? '—'}</span> },
    {
      key: 'site_id',
      label: 'Site',
      render: (r) => <span className="text-muted-foreground">{r.site_id ? (siteMap[r.site_id] ?? r.site_id) : '—'}</span>,
    },
  ]

  const siteOptions = sites.map((s) => s.id)

  const fields: FieldDef[] = [
    { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g. Tower Alpha' },
    { key: 'address', label: 'Address', type: 'text', placeholder: 'e.g. 1 Harbour Road, Wan Chai, HK' },
    { key: 'lat', label: 'Latitude', type: 'number', placeholder: 'e.g. 22.2796' },
    { key: 'lng', label: 'Longitude', type: 'number', placeholder: 'e.g. 114.1722' },
    { key: 'floor_count', label: 'Floor Count', type: 'number', placeholder: 'e.g. 42' },
    { key: 'height_m', label: 'Height (m)', type: 'number', placeholder: 'e.g. 180' },
    { key: 'year_built', label: 'Year Built', type: 'number', placeholder: 'e.g. 2005' },
    { key: 'owner_name', label: 'Owner Name', type: 'text', placeholder: 'e.g. Harbour Holdings Ltd.' },
    { key: 'site_id', label: 'Site', type: 'select', options: siteOptions },
  ]

  const handleRefresh = useCallback(() => { refresh() }, [refresh])

  return (
    <RegistryTable<Building>
      title="Building Registry"
      description="Manage all buildings in the AuraSense inspection portfolio."
      tableName="buildings"
      data={data}
      isLoading={isLoading}
      columns={columns}
      fields={fields}
      defaultValues={{}}
      onRefresh={handleRefresh}
    />
  )
}
