import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlass, X, FileText, Code, Book, Clock, ListChecks, Tag, Cube } from '@phosphor-icons/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { allSearchableContent, type SearchEntry } from '@/data/searchContent'

const categoryIcons: Record<SearchEntry['category'], typeof FileText> = {
  docs: FileText,
  api: Code,
  guides: Book,
  changelog: Clock,
  status: ListChecks,
  products: Cube,
  pricing: Tag,
}

const categoryLabels: Record<SearchEntry['category'], string> = {
  docs: 'Docs',
  api: 'API Reference',
  guides: 'Guides',
  changelog: 'Changelog',
  status: 'Status',
  products: 'Products',
  pricing: 'Pricing',
}

export interface DocsSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocsSearch({ open, onOpenChange }: DocsSearchProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return [] as SearchEntry[]

    return allSearchableContent
      .map((entry) => {
        const haystack = [entry.title, entry.content, entry.section ?? '', ...(entry.keywords ?? [])].join(' ').toLowerCase()
        let score = 0
        if (entry.title.toLowerCase().includes(search)) score += 100
        if (entry.content.toLowerCase().includes(search)) score += 40
        if ((entry.keywords ?? []).some((keyword) => keyword.toLowerCase().includes(search))) score += 30
        if (haystack.includes(search)) score += 20
        return { entry, score }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ entry }) => entry)
  }, [query])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(true)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onOpenChange])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const handleSelect = (entry: SearchEntry) => {
    navigate(entry.url)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="sr-only">Search Documentation</DialogTitle>
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search docs, products, pricing..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-12 pl-10 pr-10 text-base"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[500px]">
          <div className="px-6 pb-6">
            {!query && (
              <div className="py-12 text-center text-muted-foreground">
                <MagnifyingGlass className="mx-auto mb-4 h-12 w-12 opacity-40" />
                <p className="text-sm">Start typing to search across all documentation</p>
              </div>
            )}

            {query && results.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <p className="text-sm">No results found for &quot;{query}&quot;</p>
                <p className="mt-2 text-xs">Try a different keyword or product name</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-2">
                {results.map((result) => {
                  const Icon = categoryIcons[result.category]
                  return (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => handleSelect(result)}
                      className="w-full rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:bg-accent/50"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="text-sm font-semibold transition-colors hover:text-primary">{result.title}</h4>
                            <Badge variant="outline" className="mono text-xs">
                              {categoryLabels[result.category]}
                            </Badge>
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">{result.content}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border bg-muted/30 px-6 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="mono">Cmd/Ctrl + K</span>
              <span className="mono">Enter to open</span>
            </div>
            <span>{results.length > 0 ? `${results.length} results` : ''}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpen()
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onOpen])

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onOpen}
      className="flex w-full items-center gap-2 rounded-lg border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-accent/50 hover:text-foreground"
    >
      <MagnifyingGlass className="h-4 w-4" />
      <span>Search docs...</span>
      <kbd className="mono ml-auto rounded border border-border bg-muted px-2 py-0.5 text-xs">{isMac ? '?K' : 'Ctrl+K'}</kbd>
    </Button>
  )
}