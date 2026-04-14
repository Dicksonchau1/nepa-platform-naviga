import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Copy, Key, Trash } from '@phosphor-icons/react'
import { vodaApi, setStoredVodaApiKey } from '@/lib/voda-api'
import type { ApiKey } from '@/types/voda'

interface ApiKeyManagerProps {
  createOpen?: boolean
  onCreateOpenChange?: (open: boolean) => void
}

const formatDate = (value?: string | null) =>
  value ? new Date(value).toLocaleString() : '—'

export function ApiKeyManager({ createOpen, onCreateOpenChange }: ApiKeyManagerProps) {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [internalOpen, setInternalOpen] = useState(false)

  const dialogOpen = createOpen ?? internalOpen
  const setDialogOpen = onCreateOpenChange ?? setInternalOpen

  const loadKeys = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await vodaApi.listApiKeys()
      setKeys(response.keys)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadKeys()
  }, [loadKeys])

  const hasKeys = keys.length > 0

  const handleCreate = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please provide a key name')
      return
    }
    try {
      setIsCreating(true)
      const response = await vodaApi.createApiKey(newKeyName.trim())
      setCreatedKey(response.key)
      setStoredVodaApiKey(response.key)
      toast.success('API key created')
      setNewKeyName('')
      await loadKeys()
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopy = async () => {
    if (!createdKey) return
    await navigator.clipboard.writeText(createdKey)
    toast.success('Key copied to clipboard')
  }

  const handleRevoke = async (keyId: string) => {
    await vodaApi.revokeApiKey(keyId)
    toast.success('API key revoked')
    await loadKeys()
  }

  const tierLabel = useMemo(
    () => ({
      free: 'Free',
      pro: 'Pro',
      enterprise: 'Enterprise',
    }),
    []
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">API Keys</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage keys used to authenticate VODA API requests.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Key size={16} />
          Create New Key
        </Button>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) {
            setCreatedKey(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API key</DialogTitle>
            <DialogDescription>
              Keys are shown once. Store them in a secure vault before leaving this screen.
            </DialogDescription>
          </DialogHeader>

          {createdKey ? (
            <div className="space-y-4">
              <div className="rounded-md border border-border/60 bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground mb-2">Your new key</p>
                <p className="font-mono text-sm break-all">{createdKey}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  This key will not be shown again.
                </p>
                <Button variant="secondary" onClick={handleCopy} className="gap-2">
                  <Copy size={16} />
                  Copy key
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="key-name">Key name</Label>
                <Input
                  id="key-name"
                  placeholder="Production pipeline"
                  value={newKeyName}
                  onChange={(event) => setNewKeyName(event.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleCreate} disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create key'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : !hasKeys ? (
        <Card className="p-8 text-center bg-card/50 border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            Create your first API key to start using VODA.
          </p>
          <Button onClick={() => setDialogOpen(true)}>Create API key</Button>
        </Card>
      ) : (
        <Card className="bg-card/50 border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prefix</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-mono text-xs">{key.key_prefix}</TableCell>
                  <TableCell>{key.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{tierLabel[key.tier]}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(key.created_at)}</TableCell>
                  <TableCell>{formatDate(key.last_used_at)}</TableCell>
                  <TableCell>
                    <Badge variant={key.status === 'active' ? 'default' : 'secondary'}>
                      {key.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-1 text-destructive">
                          <Trash size={14} />
                          Revoke
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Revoke API key?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This key will stop working immediately. Existing integrations will fail.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRevoke(key.id)}>
                            Revoke key
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
