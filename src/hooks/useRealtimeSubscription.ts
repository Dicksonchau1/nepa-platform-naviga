/**
 * Supabase Realtime subscription hook.
 * Subscribes to INSERT, UPDATE, DELETE events on any table.
 * Automatically cleans up on unmount.
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

type PostgresEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*'

interface UseRealtimeOptions<T> {
  table: string
  schema?: string
  event?: PostgresEvent
  filter?: string
  enabled?: boolean
  onInsert?: (payload: T) => void
  onUpdate?: (payload: { old: T; new: T }) => void
  onDelete?: (payload: T) => void
}

export function useRealtimeSubscription<T extends Record<string, unknown>>(
  options: UseRealtimeOptions<T>
) {
  const {
    table,
    schema = 'public',
    event = '*',
    filter,
    enabled = true,
    onInsert,
    onUpdate,
    onDelete,
  } = options

  const channelRef = useRef<RealtimeChannel | null>(null)
  const [lastEvent, setLastEvent] = useState<RealtimePostgresChangesPayload<T> | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const handleChange = useCallback(
    (payload: RealtimePostgresChangesPayload<T>) => {
      setLastEvent(payload)

      switch (payload.eventType) {
        case 'INSERT':
          onInsert?.(payload.new as T)
          break
        case 'UPDATE':
          onUpdate?.({ old: payload.old as T, new: payload.new as T })
          break
        case 'DELETE':
          onDelete?.(payload.old as T)
          break
      }
    },
    [onInsert, onUpdate, onDelete]
  )

  useEffect(() => {
    if (!enabled) return

    const channelName = `realtime:${schema}:${table}:${filter ?? 'all'}`

    const channelConfig: Record<string, unknown> = {
      event,
      schema,
      table,
    }

    if (filter) {
      channelConfig.filter = filter
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes' as any,
        channelConfig as any,
        handleChange as any
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED')
      })

    channelRef.current = channel

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
        setIsConnected(false)
      }
    }
  }, [table, schema, event, filter, enabled, handleChange])

  return {
    lastEvent,
    isConnected,
    channel: channelRef.current,
  }
}

/**
 * Convenience hook: subscribe to a table and keep a live array in state.
 * New inserts are appended, updates replace in-place, deletes remove.
 */
export function useRealtimeTable<T extends { id: string }>(
  table: string,
  initialData: T[] = [],
  filter?: string
) {
  const [rows, setRows] = useState<T[]>(initialData)

  useEffect(() => {
    setRows(initialData)
  }, [initialData])

  useRealtimeSubscription<T>({
    table,
    filter,
    onInsert: (newRow) => {
      setRows((prev) => [newRow, ...prev])
    },
    onUpdate: ({ new: updated }) => {
      setRows((prev) =>
        prev.map((row) => (row.id === updated.id ? updated : row))
      )
    },
    onDelete: (deleted) => {
      setRows((prev) => prev.filter((row) => row.id !== deleted.id))
    },
  })

  return rows
}
