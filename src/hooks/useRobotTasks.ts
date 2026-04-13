/**
 * useRobotTasks — rewritten to use Supabase directly.
 * Reads from missions + robots tables.
 * Replaces old REST call to /tasks.
 */
import { useState, useCallback, useEffect } from 'react'
import { supabase, Mission } from '@/lib/supabaseClient'

// Valid statuses from the missions table enum
type MissionStatus = 'planned' | 'active' | 'paused' | 'completed' | 'aborted' | 'failed'

export function useRobotTasks(siteId?: string) {
  const [tasks, setTasks] = useState<Mission[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      let q = supabase
        .from('missions')
        .select('*, robots(name)', { count: 'exact' })
        .order('created_at', { ascending: false })

      if (siteId) q = q.eq('site_id', siteId)

      const { data, count, error: queryError } = await q

      if (queryError) throw new Error(queryError.message)

      setTasks(data ?? [])
      setTotal(count ?? 0)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch robot tasks'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [siteId])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  /** Create a new mission (compatible with old createTask API) */
  const createTask = async (task: {
    name: string
    type?: string
    priority?: number
    robotId?: string
    metadata?: Record<string, unknown>
  }) => {
    const { data, error: insertError } = await supabase
      .from('missions')
      .insert({
        name: task.name,
        mission_type: task.type ?? 'custom',
        robot_id: task.robotId || null,
        priority: task.priority ?? 2,
        metadata: (task.metadata ?? {}) as any,
        status: 'planned' as const,
      } as any)
      .select()
      .single()

    if (insertError) throw new Error(insertError.message)
    await fetchTasks()
    return data
  }

  /** Create a new mission */
  const createMission = async (mission: {
    name: string
    site_id?: string
    robot_id?: string
    mission_type?: string
    waypoints?: unknown[]
  }) => {
    const { data, error: insertError } = await supabase
      .from('missions')
      .insert(mission as any)
      .select()
      .single()

    if (insertError) throw new Error(insertError.message)
    await fetchTasks()
    return data
  }

  /** Update task/mission status — accepts both old and new call signatures */
  const updateTaskStatus = async (
    taskId: string,
    statusOrObj: MissionStatus | { status: string }
  ) => {
    const status = typeof statusOrObj === 'string' ? statusOrObj : statusOrObj.status

    // Map old statuses to valid enum values
    const statusMap: Record<string, MissionStatus> = {
      queued: 'planned',
      running: 'active',
      cancelled: 'aborted',
      // Keep valid statuses as-is
      planned: 'planned',
      active: 'active',
      paused: 'paused',
      completed: 'completed',
      aborted: 'aborted',
      failed: 'failed',
    }
    const mappedStatus = statusMap[status] ?? 'planned'

    const updates: Record<string, unknown> = {
      status: mappedStatus,
      updated_at: new Date().toISOString(),
    }
    if (mappedStatus === 'active') updates.started_at = new Date().toISOString()
    if (['completed', 'aborted', 'failed'].includes(mappedStatus)) {
      updates.completed_at = new Date().toISOString()
    }

    const { error: updateError } = await supabase
      .from('missions')
      .update(updates as any)
      .eq('id', taskId)

    if (updateError) throw new Error(updateError.message)
    await fetchTasks()
  }

  /** Alias for updateTaskStatus with direct status param */
  const updateMissionStatus = async (
    missionId: string,
    status: MissionStatus
  ) => {
    await updateTaskStatus(missionId, status)
  }

  /** Bulk update task statuses */
  const bulkUpdateTasks = async (params: {
    taskIds: string[]
    status: string
  }) => {
    const statusMap: Record<string, MissionStatus> = {
      queued: 'planned',
      running: 'active',
      cancelled: 'aborted',
      planned: 'planned',
      active: 'active',
      paused: 'paused',
      completed: 'completed',
      aborted: 'aborted',
      failed: 'failed',
    }
    const mappedStatus = statusMap[params.status] ?? 'planned'

    const { error: updateError } = await supabase
      .from('missions')
      .update({ status: mappedStatus, updated_at: new Date().toISOString() } as any)
      .in('id', params.taskIds)

    if (updateError) throw new Error(updateError.message)
    await fetchTasks()
  }

  /** Bulk delete missions */
  const bulkDeleteTasks = async (params: { taskIds: string[] }) => {
    const { error: deleteError } = await supabase
      .from('missions')
      .delete()
      .in('id', params.taskIds)

    if (deleteError) throw new Error(deleteError.message)
    await fetchTasks()
  }

  return {
    tasks,
    total,
    isLoading,
    error,
    refresh: fetchTasks,
    createTask,
    createMission,
    updateTaskStatus,
    updateMissionStatus,
    bulkUpdateTasks,
    bulkDeleteTasks,
  }
}
