import { useState } from 'react'
import { useRobotTasks } from '@/hooks/useRobotTasks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Plus,
  ArrowsClockwise,
  DotsThree,
  PlayCircle,
  StopCircle,
  CheckCircle,
  XCircle,
  Clock,
  Robot,
  ListNumbers,
  Kanban as KanbanIcon,
  Checks,
  Trash,
  Square,
  CheckSquare,
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { KanbanBoard } from '@/components/dashboard/KanbanBoard'
import { TaskList } from '@/components/dashboard/TaskList'
import { cn } from '@/lib/utils'

type ViewMode = 'kanban' | 'list'
type MissionStatus = 'planned' | 'active' | 'paused' | 'completed' | 'aborted' | 'failed'

const taskTypes = [
  { value: 'facade_inspection', label: 'Facade Inspection' },
  { value: 'navigation', label: 'Navigation' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'surveillance', label: 'Surveillance' },
  { value: 'data_collection', label: 'Data Collection' },
  { value: 'custom', label: 'Custom' },
]

const priorities = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Normal' },
  { value: 3, label: 'High' },
  { value: 4, label: 'Critical' },
]

export function RobotTasksPage() {
  const { tasks, total, isLoading, error, refresh, createTask, updateTaskStatus, bulkUpdateTasks, bulkDeleteTasks } = useRobotTasks()
  const [viewMode, setViewMode] = useState<ViewMode>('kanban')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set())
  const [isBulkActionsDialogOpen, setIsBulkActionsDialogOpen] = useState(false)
  const [bulkActionStatus, setBulkActionStatus] = useState<MissionStatus>('planned')
  const [isBulkOperating, setIsBulkOperating] = useState(false)
  
  const [newTask, setNewTask] = useState({
    name: '',
    type: 'facade_inspection',
    priority: 2,
    robotId: '',
    metadata: {} as Record<string, unknown>,
  })

  const handleCreateTask = async () => {
    if (!newTask.name.trim()) {
      toast.error('Task name is required')
      return
    }

    setIsCreating(true)
    try {
      await createTask(newTask)
      toast.success('Task created successfully')
      setIsCreateDialogOpen(false)
      setNewTask({
        name: '',
        type: 'facade_inspection',
        priority: 2,
        robotId: '',
        metadata: {},
      })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create task')
    } finally {
      setIsCreating(false)
    }
  }

  const handleUpdateStatus = async (taskId: string, status: string) => {
    try {
      await updateTaskStatus(taskId, { status })
      toast.success(`Task ${status}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update task')
    }
  }

  const handleCancelTask = async (taskId: string) => {
    try {
      await updateTaskStatus(taskId, { status: 'aborted' })
      toast.success('Task cancelled')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to cancel task')
    }
  }

  const handleRetryTask = async (taskId: string) => {
    try {
      await updateTaskStatus(taskId, { status: 'planned' })
      toast.success('Task requeued')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to retry task')
    }
  }

  const toggleSelectTask = (taskId: string) => {
    setSelectedTaskIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(taskId)) {
        newSet.delete(taskId)
      } else {
        newSet.add(taskId)
      }
      return newSet
    })
  }

  const toggleSelectAll = () => {
    if (selectedTaskIds.size === tasks.length && tasks.length > 0) {
      setSelectedTaskIds(new Set())
    } else {
      setSelectedTaskIds(new Set(tasks.map(t => t.id)))
    }
  }

  const clearSelection = () => {
    setSelectedTaskIds(new Set())
  }

  const handleBulkUpdateStatus = async () => {
    if (selectedTaskIds.size === 0) {
      toast.error('No tasks selected')
      return
    }

    setIsBulkOperating(true)
    try {
      await bulkUpdateTasks({
        taskIds: Array.from(selectedTaskIds),
        status: bulkActionStatus,
      })
      toast.success(`${selectedTaskIds.size} tasks updated to ${bulkActionStatus}`)
      setIsBulkActionsDialogOpen(false)
      clearSelection()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to bulk update tasks')
    } finally {
      setIsBulkOperating(false)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedTaskIds.size === 0) {
      toast.error('No tasks selected')
      return
    }

    setIsBulkOperating(true)
    try {
      await bulkDeleteTasks({
        taskIds: Array.from(selectedTaskIds),
      })
      toast.success(`${selectedTaskIds.size} tasks deleted`)
      clearSelection()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to bulk delete tasks')
    } finally {
      setIsBulkOperating(false)
    }
  }

  const statusCounts = {
    queued: tasks.filter(t => t.status === 'planned').length,
    running: tasks.filter(t => t.status === 'active').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    failed: tasks.filter(t => t.status === 'failed').length,
    cancelled: tasks.filter(t => t.status === 'aborted').length,
  }

  if (error) {
    return (
      <div className="p-8">
        <Card className="p-8 bg-destructive/10 border-destructive/20">
          <p className="text-destructive text-center">{error}</p>
          <Button onClick={refresh} className="mt-4 mx-auto block">
            Retry
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Robot size={40} weight="duotone" className="text-primary" />
            Robot Tasks
          </h1>
          <p className="text-muted-foreground mt-2">Manage and monitor autonomous robot task execution</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="gap-2"
            >
              <KanbanIcon size={16} />
              Kanban
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="gap-2"
            >
              <ListNumbers size={16} />
              List
            </Button>
          </div>
          <Button onClick={refresh} variant="outline" size="sm" className="gap-2">
            <ArrowsClockwise size={16} />
            Refresh
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={18} weight="bold" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Robot Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-name">Task Name</Label>
                  <Input
                    id="task-name"
                    placeholder="e.g., Inspect Building A - North Facade"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-type">Task Type</Label>
                  <Select
                    value={newTask.type}
                    onValueChange={(value) => setNewTask({ ...newTask, type: value })}
                  >
                    <SelectTrigger id="task-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-priority">Priority</Label>
                  <Select
                    value={String(newTask.priority)}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: Number(value) })}
                  >
                    <SelectTrigger id="task-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={String(priority.value)}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="robot-id">Robot ID (Optional)</Label>
                  <Input
                    id="robot-id"
                    placeholder="e.g., ROBOT-001"
                    value={newTask.robotId}
                    onChange={(e) => setNewTask({ ...newTask, robotId: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask} disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Task'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {selectedTaskIds.size > 0 && (
        <Card className="p-4 bg-primary/10 border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedTaskIds.size === tasks.length && tasks.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <p className="text-sm font-medium">
                {selectedTaskIds.size} task{selectedTaskIds.size !== 1 ? 's' : ''} selected
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isBulkActionsDialogOpen} onOpenChange={setIsBulkActionsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Checks size={16} weight="bold" />
                    Bulk Update Status
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Bulk Update Task Status</DialogTitle>
                    <DialogDescription>
                      Update the status of {selectedTaskIds.size} selected task{selectedTaskIds.size !== 1 ? 's' : ''}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="bulk-status">New Status</Label>
                      <Select
                        value={bulkActionStatus}
                        onValueChange={(value) => setBulkActionStatus(value as MissionStatus)}
                      >
                        <SelectTrigger id="bulk-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="aborted">Aborted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsBulkActionsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleBulkUpdateStatus} disabled={isBulkOperating}>
                      {isBulkOperating ? 'Updating...' : 'Update Tasks'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={handleBulkDelete}
                disabled={isBulkOperating}
              >
                <Trash size={16} weight="bold" />
                Delete Selected
              </Button>

              <Button variant="ghost" size="sm" onClick={clearSelection}>
                Clear
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground mono uppercase tracking-wider">Queued</p>
          </div>
          <p className="text-3xl font-bold text-primary">{statusCounts.queued}</p>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <PlayCircle size={18} className="text-blue-400" weight="fill" />
            <p className="text-xs font-medium text-muted-foreground mono uppercase tracking-wider">Running</p>
          </div>
          <p className="text-3xl font-bold text-blue-400">{statusCounts.running}</p>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={18} className="text-green-400" weight="fill" />
            <p className="text-xs font-medium text-muted-foreground mono uppercase tracking-wider">Completed</p>
          </div>
          <p className="text-3xl font-bold text-green-400">{statusCounts.completed}</p>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <XCircle size={18} className="text-destructive" weight="fill" />
            <p className="text-xs font-medium text-muted-foreground mono uppercase tracking-wider">Failed</p>
          </div>
          <p className="text-3xl font-bold text-destructive">{statusCounts.failed}</p>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-xl border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <StopCircle size={18} className="text-muted-foreground" weight="fill" />
            <p className="text-xs font-medium text-muted-foreground mono uppercase tracking-wider">Cancelled</p>
          </div>
          <p className="text-3xl font-bold">{statusCounts.cancelled}</p>
        </Card>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : viewMode === 'kanban' ? (
        <KanbanBoard
          tasks={tasks as any}
          onUpdateStatus={handleUpdateStatus}
          onCancel={handleCancelTask}
          onRetry={handleRetryTask}
          selectedTaskIds={selectedTaskIds}
          onToggleSelect={toggleSelectTask}
        />
      ) : (
        <TaskList
          tasks={tasks as any}
          onUpdateStatus={handleUpdateStatus}
          onCancel={handleCancelTask}
          onRetry={handleRetryTask}
          selectedTaskIds={selectedTaskIds}
          onToggleSelect={toggleSelectTask}
        />
      )}
    </div>
  )
}
