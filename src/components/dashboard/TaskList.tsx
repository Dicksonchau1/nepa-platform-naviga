import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

interface TaskListProps {
  tasks: RobotTask[]
  onUpdateStatus: (taskId: string, status: RobotTask['status']) => Promise<void>
  onCancel: (taskId: string) => Promise<void>
  onRetry: (taskId: string) => Promise<void>
  selectedTaskIds?: Set<string>
  onToggleSelect?: (taskId: string) => void
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

const statusConfig = {
  queued: {
    icon: Clock,
    label: 'Queued',
    color: 'text-primary',
    variant: 'default' as const,
  },
  running: {
    icon: PlayCircle,
    label: 'Running',
    color: 'text-blue-400',
    variant: 'default' as const,
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    color: 'text-green-400',
    variant: 'default' as const,
  },
  failed: {
    icon: XCircle,
    label: 'Failed',
    color: 'text-destructive',
    variant: 'destructive' as const,
  },
  cancelled: {
    icon: StopCircle,
    label: 'Cancelled',
    color: 'text-muted-foreground',
    variant: 'secondary' as const,
  },
}

export function TaskList({ tasks, onUpdateStatus, onCancel, onRetry, selectedTaskIds, onToggleSelect }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status !== b.status) {
      const statusOrder = ['running', 'queued', 'failed', 'completed', 'cancelled']
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/30">
            {onToggleSelect && <TableHead className="w-12"></TableHead>}
            <TableHead className="w-12">Status</TableHead>
            <TableHead>Task Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Robot ID</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={onToggleSelect ? 9 : 8} className="text-center text-muted-foreground py-12">
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            sortedTasks.map((task) => {
              const statusInfo = statusConfig[task.status]
              const StatusIcon = statusInfo.icon

              return (
                <TableRow 
                  key={task.id} 
                  className={cn(
                    'border-border/30',
                    selectedTaskIds?.has(task.id) && 'bg-primary/5'
                  )}
                >
                  {onToggleSelect && (
                    <TableCell>
                      <Checkbox
                        checked={selectedTaskIds?.has(task.id)}
                        onCheckedChange={() => onToggleSelect(task.id)}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <StatusIcon
                      size={20}
                      weight="fill"
                      className={statusInfo.color}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{task.name}</p>
                      {task.error && task.status === 'failed' && (
                        <p className="text-xs text-destructive line-clamp-1">
                          {task.error}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs mono">
                      {task.type.replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn('text-xs', priorityColors[task.priority as keyof typeof priorityColors])}
                    >
                      {priorityLabels[task.priority as keyof typeof priorityLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {task.robotId ? (
                      <span className="text-xs mono">{task.robotId}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {task.progress !== undefined && task.status === 'running' ? (
                      <div className="space-y-1 min-w-[100px]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1.5" />
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground mono">
                      {new Date(task.createdAt).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
