import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import {
  DotsThree,
  PlayCircle,
  StopCircle,
  CheckCircle,
  XCircle,
  ArrowsClockwise,
  Clock,
} from '@phosphor-icons/react'
import { RobotTask } from '@/types/nepa'
import { cn } from '@/lib/utils'

interface KanbanBoardProps {
  tasks: RobotTask[]
  onUpdateStatus: (taskId: string, status: RobotTask['status']) => Promise<void>
  onCancel: (taskId: string) => Promise<void>
  onRetry: (taskId: string) => Promise<void>
}

interface TaskCardProps {
  task: RobotTask
  onUpdateStatus: (taskId: string, status: RobotTask['status']) => Promise<void>
  onCancel: (taskId: string) => Promise<void>
  onRetry: (taskId: string) => Promise<void>
}

const priorityColors = {
  1: 'text-blue-400 border-blue-400/30',
  2: 'text-primary border-primary/30',
  3: 'text-orange-400 border-orange-400/30',
  4: 'text-destructive border-destructive/30',
}

const priorityLabels = {
  1: 'Low',
  2: 'Normal',
  3: 'High',
  4: 'Critical',
}

function TaskCard({ task, onUpdateStatus, onCancel, onRetry }: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('taskId', task.id)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const getStatusIcon = () => {
    switch (task.status) {
      case 'queued':
        return <Clock size={16} className="text-primary" />
      case 'running':
        return <PlayCircle size={16} weight="fill" className="text-blue-400" />
      case 'completed':
        return <CheckCircle size={16} weight="fill" className="text-green-400" />
      case 'failed':
        return <XCircle size={16} weight="fill" className="text-destructive" />
      case 'cancelled':
        return <StopCircle size={16} weight="fill" className="text-muted-foreground" />
    }
  }

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        'p-4 cursor-move hover:border-primary/50 transition-all',
        isDragging && 'opacity-50 scale-95'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h3 className="font-semibold text-sm line-clamp-2">{task.name}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <DotsThree size={18} weight="bold" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {task.status === 'queued' && (
              <DropdownMenuItem onClick={() => onUpdateStatus(task.id, 'running')}>
                <PlayCircle size={16} className="mr-2" />
                Start Task
              </DropdownMenuItem>
            )}
            {task.status === 'running' && (
              <>
                <DropdownMenuItem onClick={() => onUpdateStatus(task.id, 'completed')}>
                  <CheckCircle size={16} className="mr-2" />
                  Mark Complete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus(task.id, 'failed')}>
                  <XCircle size={16} className="mr-2" />
                  Mark Failed
                </DropdownMenuItem>
              </>
            )}
            {(task.status === 'failed' || task.status === 'cancelled') && (
              <DropdownMenuItem onClick={() => onRetry(task.id)}>
                <ArrowsClockwise size={16} className="mr-2" />
                Retry Task
              </DropdownMenuItem>
            )}
            {task.status !== 'completed' && task.status !== 'cancelled' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onCancel(task.id)} className="text-destructive">
                  <StopCircle size={16} className="mr-2" />
                  Cancel Task
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs mono">
            {task.type.replace(/_/g, ' ')}
          </Badge>
          <Badge
            variant="outline"
            className={cn('text-xs', priorityColors[task.priority as keyof typeof priorityColors])}
          >
            {priorityLabels[task.priority as keyof typeof priorityLabels]}
          </Badge>
        </div>

        {task.robotId && (
          <p className="text-xs text-muted-foreground mono">
            Robot: {task.robotId}
          </p>
        )}

        {task.progress !== undefined && task.status === 'running' && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-1.5" />
          </div>
        )}

        {task.error && task.status === 'failed' && (
          <p className="text-xs text-destructive line-clamp-2 bg-destructive/10 rounded px-2 py-1">
            {task.error}
          </p>
        )}

        <p className="text-xs text-muted-foreground mono">
          {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>
    </Card>
  )
}

interface ColumnProps {
  title: string
  status: RobotTask['status']
  tasks: RobotTask[]
  icon: React.ReactNode
  count: number
  onUpdateStatus: (taskId: string, status: RobotTask['status']) => Promise<void>
  onCancel: (taskId: string) => Promise<void>
  onRetry: (taskId: string) => Promise<void>
}

function Column({ title, status, tasks, icon, count, onUpdateStatus, onCancel, onRetry }: ColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const taskId = e.dataTransfer.getData('taskId')
    if (taskId) {
      await onUpdateStatus(taskId, status)
    }
  }

  return (
    <div className="flex flex-col min-h-[600px]">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
        {icon}
        <h2 className="font-semibold text-sm uppercase tracking-wider">{title}</h2>
        <Badge variant="secondary" className="ml-auto">
          {count}
        </Badge>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'flex-1 space-y-3 p-3 rounded-lg border-2 border-dashed transition-colors',
          isDragOver ? 'border-primary bg-primary/5' : 'border-transparent'
        )}
      >
        {tasks.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            No {title.toLowerCase()} tasks
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={onUpdateStatus}
              onCancel={onCancel}
              onRetry={onRetry}
            />
          ))
        )}
      </div>
    </div>
  )
}

export function KanbanBoard({ tasks, onUpdateStatus, onCancel, onRetry }: KanbanBoardProps) {
  const queuedTasks = tasks.filter(t => t.status === 'queued')
  const runningTasks = tasks.filter(t => t.status === 'running')
  const completedTasks = tasks.filter(t => t.status === 'completed')
  const failedTasks = tasks.filter(t => t.status === 'failed')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Column
        title="Queued"
        status="queued"
        tasks={queuedTasks}
        icon={<Clock size={18} className="text-primary" />}
        count={queuedTasks.length}
        onUpdateStatus={onUpdateStatus}
        onCancel={onCancel}
        onRetry={onRetry}
      />
      <Column
        title="Running"
        status="running"
        tasks={runningTasks}
        icon={<PlayCircle size={18} weight="fill" className="text-blue-400" />}
        count={runningTasks.length}
        onUpdateStatus={onUpdateStatus}
        onCancel={onCancel}
        onRetry={onRetry}
      />
      <Column
        title="Completed"
        status="completed"
        tasks={completedTasks}
        icon={<CheckCircle size={18} weight="fill" className="text-green-400" />}
        count={completedTasks.length}
        onUpdateStatus={onUpdateStatus}
        onCancel={onCancel}
        onRetry={onRetry}
      />
      <Column
        title="Failed"
        status="failed"
        tasks={failedTasks}
        icon={<XCircle size={18} weight="fill" className="text-destructive" />}
        count={failedTasks.length}
        onUpdateStatus={onUpdateStatus}
        onCancel={onCancel}
        onRetry={onRetry}
      />
    </div>
  )
}
