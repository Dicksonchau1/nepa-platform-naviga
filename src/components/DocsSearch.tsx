import { useState, useEffect, useMemo } from 'react'
import { MagnifyingGlass, X, FileText, Code, Book, Clock, ListChecks, Funnel, Tag, Cube } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { searchContent } from '@/data/searchContent'

export interface SearchableContent {
  id: string
  title: string
  content: string
  category: 'docs' | 'api' | 'guides' | 'changelog' | 'status' | 'products' | 'pricing'
  section?: string
  url: string
  keywords?: string[]
}

const categoryIcons = {
  docs: FileText,
  api: Code,
  guides: Book,
  changelog: Clock,
  status: ListChecks,
  products: Cube,
  pricing: Tag,
}

const categoryLabels = {
  docs: 'Documentation',
  api: 'API Reference',
  guides: 'Guides',
  changelog: 'Changelog',
  status: 'Status',
  products: 'Products',
  pricing: 'Pricing',
}

interface DocsSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocsSearch({ open, onOpenChange }: DocsSearchProps) {
  const [query, setQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<Set<SearchableContent['category']>>(new Set())
  const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()

  const availableSections = useMemo(() => {
    const sections = new Set<string>()
    searchContent.forEach(item => {
      if (item.section) sections.add(item.section)
    })
    return Array.from(sections).sort()
  }, [])

  const toggleCategory = (category: SearchableContent['category']) => {
    setSelectedCategories(prev => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const toggleSection = (section: string) => {
    setSelectedSections(prev => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  const clearFilters = () => {
    setSelectedCategories(new Set())
    setSelectedSections(new Set())
  }

  const hasActiveFilters = selectedCategories.size > 0 || selectedSections.size > 0

  const searchResults = useMemo(() => {
    if (!query.trim()) return []

    const lowerQuery = query.toLowerCase()
    const terms = lowerQuery.split(/\s+/).filter(Boolean)

    return searchContent
      .filter(item => {
        if (selectedCategories.size > 0 && !selectedCategories.has(item.category)) {
          return false
        }
        if (selectedSections.size > 0 && (!item.section || !selectedSections.has(item.section))) {
          return false
        }
        return true
      })
      .map(item => {
        let score = 0
        const lowerTitle = item.title.toLowerCase()
        const lowerContent = item.content.toLowerCase()
        const lowerSection = (item.section || '').toLowerCase()
        const keywords = item.keywords || []

        if (lowerTitle.includes(lowerQuery)) score += 100
        if (lowerContent.includes(lowerQuery)) score += 50
        if (lowerSection.includes(lowerQuery)) score += 30

        keywords.forEach(keyword => {
          if (keyword.includes(lowerQuery)) score += 40
        })

        terms.forEach(term => {
          if (lowerTitle.includes(term)) score += 20
          if (lowerContent.includes(term)) score += 10
          if (lowerSection.includes(term)) score += 5
            keywords.forEach(keyword => {
              if (keyword.includes(term)) score += 8
            })
        })

        return { ...item, score }
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15)
  }, [query, selectedCategories, selectedSections])

  const handleSelect = (result: SearchableContent) => {
    navigate(result.url)
    onOpenChange(false)
    setQuery('')
  }

  useEffect(() => {
    if (!open) {
      setQuery('')
      setShowFilters(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="sr-only">Search Documentation</DialogTitle>
          <div className="space-y-3">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search docs, products, pricing..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 h-12 text-base"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Funnel className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    {selectedCategories.size + selectedSections.size}
                  </Badge>
                )}
              </Button>
              
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear filters
                </Button>
              )}
            </div>

            {showFilters && (
              <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(categoryLabels) as Array<SearchableContent['category']>).map(category => {
                      const Icon = categoryIcons[category]
                      const isSelected = selectedCategories.has(category)
                      return (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border hover:border-primary/50 hover:bg-accent"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {categoryLabels[category]}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Section</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableSections.map(section => {
                      const isSelected = selectedSections.has(section)
                      return (
                        <button
                          key={section}
                          onClick={() => toggleSection(section)}
                          className={cn(
                            "px-3 py-1.5 rounded-md text-xs font-medium border transition-all",
                            isSelected
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-background border-border hover:border-accent/50 hover:bg-accent/30"
                          )}
                        >
                          {section}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[500px]">
          <div className="px-6 pb-6">
            {!query && (
              <div className="text-center py-12 text-muted-foreground">
                <MagnifyingGlass className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-sm">Start typing to search across all documentation</p>
                {hasActiveFilters && (
                  <p className="text-xs mt-2">
                    {selectedCategories.size + selectedSections.size} filter(s) active
                  </p>
                )}
              </div>
            )}

            {query && searchResults.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">No results found for "{query}"</p>
                {hasActiveFilters ? (
                  <p className="text-xs mt-2">Try removing some filters or using different keywords</p>
                ) : (
                  <p className="text-xs mt-2">Try different keywords or check the spelling</p>
                )}
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-2">
                {hasActiveFilters && (
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                    <p className="text-xs text-muted-foreground">
                      Filtered by:
                    </p>
                    {Array.from(selectedCategories).map(cat => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {categoryLabels[cat]}
                      </Badge>
                    ))}
                    {Array.from(selectedSections).map(sec => (
                      <Badge key={sec} variant="outline" className="text-xs">
                        {sec}
                      </Badge>
                    ))}
                  </div>
                )}
                {searchResults.map((result) => {
                  const Icon = categoryIcons[result.category]
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className="w-full text-left p-4 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                              {result.title}
                            </h4>
                            <Badge variant="outline" className="mono text-xs">
                              {categoryLabels[result.category]}
                            </Badge>
                          </div>
                          {result.section && (
                            <p className="text-xs text-muted-foreground mb-2 mono">
                              {result.section}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.content}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border px-6 py-3 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="mono">↑↓ Navigate</span>
              <span className="mono">↵ Select</span>
              <span className="mono">ESC Close</span>
            </div>
            <span>{searchResults.length > 0 && `${searchResults.length} results`}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface SearchTriggerProps {
  onOpen: () => void
}

export function SearchTrigger({ onOpen }: SearchTriggerProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpen()
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onOpen])

  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all text-sm text-muted-foreground hover:text-foreground group"
    >
      <MagnifyingGlass className="w-4 h-4" />
      <span>Search docs...</span>
       <kbd className="ml-auto mono text-xs px-2 py-0.5 rounded bg-muted border border-border group-hover:border-primary/30">
         ⌘K / Ctrl+K
       </kbd>
    </button>
  )
}
