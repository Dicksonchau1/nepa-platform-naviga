/**
 * RegistryTable — Generic CRUD table + dialog form component.
 * Used by DroneRegistry, CameraRegistry, RobotRegistry, BuildingRegistry portals.
 */
import { useState, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { PencilSimple, Trash, Plus } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface ColumnDef<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => ReactNode
}

export interface FieldDef {
  key: string
  label: string
  type: 'text' | 'number' | 'select'
  required?: boolean
  options?: string[]
  placeholder?: string
}

export interface RegistryTableProps<T extends { id: string }> {
  title: string
  description: string
  tableName: string
  data: T[]
  isLoading: boolean
  columns: ColumnDef<T>[]
  fields: FieldDef[]
  defaultValues: Partial<T>
  onRefresh: () => void
}

/* ------------------------------------------------------------------ */
/* Status badge helper                                                 */
/* ------------------------------------------------------------------ */

const STATUS_VARIANT: Record<string, 'default' | 'destructive' | 'outline' | 'secondary'> = {
  online: 'default',
  flying: 'default',
  active: 'default',
  idle: 'outline',
  offline: 'secondary',
  error: 'destructive',
  maintenance: 'secondary',
  charging: 'outline',
  preflight: 'outline',
  returning: 'outline',
  landed: 'outline',
}

export function statusBadge(status: string | null | undefined) {
  if (!status) return <span className="text-muted-foreground">—</span>
  const variant = STATUS_VARIANT[status] ?? 'outline'
  return <Badge variant={variant}>{status}</Badge>
}

/* ------------------------------------------------------------------ */
/* RegistryTable                                                       */
/* ------------------------------------------------------------------ */

export function RegistryTable<T extends { id: string }>({
  title,
  description,
  tableName,
  data,
  isLoading,
  columns,
  fields,
  defaultValues,
  onRefresh,
}: RegistryTableProps<T>) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingRow, setEditingRow] = useState<T | null>(null)
  const [deletingRow, setDeletingRow] = useState<T | null>(null)
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  function openNew() {
    setEditingRow(null)
    const init: Record<string, string> = {}
    fields.forEach((f) => {
      init[f.key] = String((defaultValues as Record<string, unknown>)[f.key] ?? '')
    })
    setFormValues(init)
    setDialogOpen(true)
  }

  function openEdit(row: T) {
    setEditingRow(row)
    const init: Record<string, string> = {}
    fields.forEach((f) => {
      const v = (row as Record<string, unknown>)[f.key]
      init[f.key] = v != null ? String(v) : ''
    })
    setFormValues(init)
    setDialogOpen(true)
  }

  function openDelete(row: T) {
    setDeletingRow(row)
    setDeleteDialogOpen(true)
  }

  function handleFieldChange(key: string, value: string) {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  function buildPayload(): Record<string, unknown> {
    const payload: Record<string, unknown> = {}
    fields.forEach((f) => {
      const raw = formValues[f.key]
      if (raw === '' || raw == null) {
        payload[f.key] = null
      } else if (f.type === 'number') {
        payload[f.key] = Number(raw)
      } else {
        payload[f.key] = raw
      }
    })
    return payload
  }

  async function handleSave() {
    // Validate required fields
    for (const f of fields) {
      if (f.required && !formValues[f.key]) {
        toast.error(`${f.label} is required`)
        return
      }
    }

    setSaving(true)
    try {
      const payload = buildPayload()
      if (editingRow) {
        const { error } = await (supabase as any)
          .from(tableName)
          .update(payload)
          .eq('id', editingRow.id)
        if (error) throw error
        toast.success('Record updated')
      } else {
        const { error } = await (supabase as any)
          .from(tableName)
          .insert(payload)
        if (error) throw error
        toast.success('Record created')
      }
      setDialogOpen(false)
      onRefresh()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('row-level security') || msg.includes('policy') || msg.includes('permission')) {
        toast.error('Access denied — insufficient role permissions')
      } else {
        toast.error(`Save failed: ${msg}`)
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deletingRow) return
    setDeleting(true)
    try {
      const { error } = await (supabase as any)
        .from(tableName)
        .delete()
        .eq('id', deletingRow.id)
      if (error) throw error
      toast.success('Record deleted')
      setDeleteDialogOpen(false)
      setDeletingRow(null)
      onRefresh()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('row-level security') || msg.includes('policy') || msg.includes('permission')) {
        toast.error('Access denied — insufficient role permissions')
      } else {
        toast.error(`Delete failed: ${msg}`)
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus size={16} weight="bold" />
          New
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-sm">No records found.</p>
            <p className="text-xs mt-1">Click <span className="text-primary font-medium">New</span> to add the first entry.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead
                    key={String(col.key)}
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground mono"
                  >
                    {col.label}
                  </TableHead>
                ))}
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground mono text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} className="border-border/30 hover:bg-muted/10">
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} className="text-sm">
                      {col.render
                        ? col.render(row)
                        : ((row as Record<string, unknown>)[String(col.key)] ?? '—') as ReactNode}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => openEdit(row)}
                        title="Edit"
                      >
                        <PencilSimple size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => openDelete(row)}
                        title="Delete"
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Edit / Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle>{editingRow ? 'Edit Record' : `New ${title.replace(' Registry', '')}`}</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {editingRow ? 'Modify the fields below and save changes.' : 'Fill in the details to register a new entry.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            {fields.map((f) => (
              <div key={f.key} className="grid gap-1.5">
                <Label htmlFor={f.key} className="text-sm">
                  {f.label}{f.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                {f.type === 'select' ? (
                  <Select
                    value={formValues[f.key] ?? ''}
                    onValueChange={(v) => handleFieldChange(f.key, v)}
                  >
                    <SelectTrigger className="bg-background/50" id={f.key}>
                      <SelectValue placeholder={`Select ${f.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {(f.options ?? []).map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={f.key}
                    type={f.type === 'number' ? 'number' : 'text'}
                    placeholder={f.placeholder ?? f.label}
                    value={formValues[f.key] ?? ''}
                    onChange={(e) => handleFieldChange(f.key, e.target.value)}
                    className="bg-background/50"
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
