import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { API_CONFIG, getAuthHeaders } from '@/config/api'
import {
  RobotTask,
  RobotTasksResponse,
  CreateTaskRequest,
  UpdateTaskStatusRequest,
  BulkUpdateTasksRequest,
  BulkDeleteTasksRequest,
} from '@/types/nepa'

export function useRobotTasks(autoFetch = true) {
  const { accessToken, logout, refresh } = useAuth()
  
  const [tasks, setTasks] = useState<RobotTask[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    if (!accessToken) {
      setError('No access token available')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.list}`,
        {
          headers: getAuthHeaders(accessToken),
        }
      )

      if (response.status === 401) {
        try {
          await refresh()
          return fetchTasks()
        } catch {
          logout()
          throw new Error('Authentication failed')
        }
      }

      if (!response.ok) {
        throw new Error('Failed to fetch robot tasks')
      }

      const data: RobotTasksResponse = await response.json()
      setTasks(data.tasks)
      setTotal(data.total)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch robot tasks'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [accessToken, logout, refresh])

  const createTask = useCallback(async (request: CreateTaskRequest) => {
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.create}`,
      {
        method: 'POST',
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify(request),
      }
    )

    if (response.status === 401) {
      try {
        await refresh()
        return createTask(request)
      } catch {
        logout()
        throw new Error('Authentication failed')
      }
    }

    if (!response.ok) {
      throw new Error('Failed to create task')
    }

    const task: RobotTask = await response.json()
    await fetchTasks()
    return task
  }, [accessToken, logout, refresh, fetchTasks])

  const updateTaskStatus = useCallback(async (
    taskId: string,
    request: UpdateTaskStatusRequest
  ) => {
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.status(taskId)}`,
      {
        method: 'PATCH',
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify(request),
      }
    )

    if (response.status === 401) {
      try {
        await refresh()
        return updateTaskStatus(taskId, request)
      } catch {
        logout()
        throw new Error('Authentication failed')
      }
    }

    if (!response.ok) {
      throw new Error('Failed to update task status')
    }

    const task: RobotTask = await response.json()
    await fetchTasks()
    return task
  }, [accessToken, logout, refresh, fetchTasks])

  const bulkUpdateTasks = useCallback(async (request: BulkUpdateTasksRequest) => {
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.bulkUpdate}`,
      {
        method: 'PATCH',
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify(request),
      }
    )

    if (response.status === 401) {
      try {
        await refresh()
        return bulkUpdateTasks(request)
      } catch {
        logout()
        throw new Error('Authentication failed')
      }
    }

    if (!response.ok) {
      throw new Error('Failed to bulk update tasks')
    }

    await fetchTasks()
  }, [accessToken, logout, refresh, fetchTasks])

  const bulkDeleteTasks = useCallback(async (request: BulkDeleteTasksRequest) => {
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.bulkDelete}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify(request),
      }
    )

    if (response.status === 401) {
      try {
        await refresh()
        return bulkDeleteTasks(request)
      } catch {
        logout()
        throw new Error('Authentication failed')
      }
    }

    if (!response.ok) {
      throw new Error('Failed to bulk delete tasks')
    }

    await fetchTasks()
  }, [accessToken, logout, refresh, fetchTasks])

  useEffect(() => {
    if (autoFetch && accessToken) {
      fetchTasks()
    }
  }, [autoFetch, accessToken, fetchTasks])

  return {
    tasks,
    total,
    isLoading,
    error,
    refresh: fetchTasks,
    createTask,
    updateTaskStatus,
    bulkUpdateTasks,
    bulkDeleteTasks,
  }
}
