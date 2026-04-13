import { useState } from 'react'
import { useKV } from '@/hooks/useKV'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Play, 
  Copy, 
  Trash, 
  Sparkle, 
  ShoppingCart, 
  Drone, 
  Robot,
  BookmarkSimple,
  ClockCounterClockwise
} from '@phosphor-icons/react'
import { toast } from 'sonner'

type QueryContext = 'retail' | 'inspection' | 'robotics'
type SavedQuery = {
  id: string
  query: string
  context: QueryContext
  response: string
  timestamp: number
}

const EXAMPLE_QUERIES = {
  retail: [
    "Detect when a customer picks up an item from the shelf",
    "Count the number of people waiting in the checkout line",
    "Alert when someone enters a restricted area",
    "Track inventory levels on shelf B-3"
  ],
  inspection: [
    "Identify surface defects on the assembly line",
    "Measure the distance between mounting holes",
    "Detect when a component is misaligned",
    "Count the number of scratches on the painted surface"
  ],
  robotics: [
    "Is there an obstacle in the robot's path?",
    "Locate the nearest charging station",
    "Identify and grasp the red object on the table",
    "Navigate to the loading dock entrance"
  ]
}

export function PlaygroundPage() {
  const [query, setQuery] = useState('')
  const [context, setContext] = useState<QueryContext>('retail')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [savedQueries = [], setSavedQueries] = useKV<SavedQuery[]>('nepa-saved-queries', [])

  const handleSubmit = async () => {
    if (!query.trim()) {
      toast.error('Please enter a query')
      return
    }

    setIsLoading(true)
    setResponse('')

    try {
      const promptText = `You are NEPA (Neuromorphic Edge Perception Agent), an AI world model that processes camera feeds for autonomous systems.

Context: ${context}
Query: ${query}

Generate a realistic technical response that includes:
1. Understanding of the query
2. Perception data needed
3. Confidence score
4. Actionable output
5. Suggested follow-up actions

Format the response as a JSON-like structured output that looks like an API response. Make it technical but readable.`

      // Placeholder: previously used @github/spark LLM
      // TODO: Replace with Supabase edge function or direct API call
      const result = JSON.stringify({
        understanding: `Processing query: ${query}`,
        context: context,
        confidence: 0.85,
        status: 'playground_mode',
        note: 'Connect to NEPA inference backend for live results',
      }, null, 2)
      setResponse(result)
    } catch (error) {
      toast.error('Failed to process query')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveQuery = () => {
    if (!query || !response) {
      toast.error('Nothing to save')
      return
    }

    const newQuery: SavedQuery = {
      id: Date.now().toString(),
      query,
      context,
      response,
      timestamp: Date.now()
    }

    setSavedQueries((current = []) => [newQuery, ...current].slice(0, 10))
    toast.success('Query saved')
  }

  const handleLoadQuery = (saved: SavedQuery) => {
    setQuery(saved.query)
    setContext(saved.context)
    setResponse(saved.response)
    toast.success('Query loaded')
  }

  const handleDeleteQuery = (id: string) => {
    setSavedQueries((current = []) => current.filter(q => q.id !== id))
    toast.success('Query deleted')
  }

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response)
      toast.success('Response copied to clipboard')
    }
  }

  const handleUseExample = (example: string) => {
    setQuery(example)
  }

  const getContextIcon = (ctx: QueryContext) => {
    switch (ctx) {
      case 'retail': return <ShoppingCart weight="duotone" />
      case 'inspection': return <Drone weight="duotone" />
      case 'robotics': return <Robot weight="duotone" />
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="page-bg">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
            <Sparkle className="mr-1" size={14} weight="fill" />
            Interactive Demo
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            NEPA World Model <span className="text-primary">Playground</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of neuromorphic edge perception. Query the NEPA world model with natural language and see how it transforms visual data into actionable intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium mono uppercase tracking-wider text-muted-foreground">
                    Query Input
                  </label>
                  <Select value={context} onValueChange={(val) => setContext(val as QueryContext)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">
                        <div className="flex items-center gap-2">
                          <ShoppingCart size={16} weight="duotone" />
                          Retail
                        </div>
                      </SelectItem>
                      <SelectItem value="inspection">
                        <div className="flex items-center gap-2">
                          <Drone size={16} weight="duotone" />
                          Inspection
                        </div>
                      </SelectItem>
                      <SelectItem value="robotics">
                        <div className="flex items-center gap-2">
                          <Robot size={16} weight="duotone" />
                          Robotics
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder="Ask NEPA anything... e.g., 'Detect when a customer picks up an item from shelf B-3'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-32 resize-none bg-background/50 text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleSubmit()
                    }
                  }}
                />

                <div className="flex items-center gap-3">
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isLoading || !query.trim()}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Play size={18} weight="fill" />
                        Run Query
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => { setQuery(''); setResponse('') }}
                    disabled={isLoading}
                  >
                    <Trash size={18} />
                  </Button>
                  <div className="flex-1" />
                  <span className="text-xs text-muted-foreground mono">
                    ⌘↵ to run
                  </span>
                </div>
              </div>
            </Card>

            {response && (
              <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium mono uppercase tracking-wider text-muted-foreground">
                      NEPA Response
                    </label>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleSaveQuery}
                      >
                        <BookmarkSimple size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleCopyResponse}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-background/80 rounded-lg p-4 mono text-sm overflow-x-auto">
                    <pre className="text-foreground/90 whitespace-pre-wrap">{response}</pre>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="examples" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="history">
                  History
                  {savedQueries.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {savedQueries.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="examples" className="mt-4 space-y-3">
                <div className="space-y-2">
                  <h3 className="text-xs font-medium mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    {getContextIcon(context)}
                    {context} examples
                  </h3>
                  {EXAMPLE_QUERIES[context].map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUseExample(example)}
                      className="w-full text-left p-3 rounded-lg bg-card/30 hover:bg-card/60 border border-border/30 hover:border-primary/30 transition-all text-sm group"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-primary/60 group-hover:text-primary mt-0.5">→</span>
                        <span className="flex-1 text-foreground/80 group-hover:text-foreground">
                          {example}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-4 space-y-3">
                {savedQueries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    <ClockCounterClockwise size={32} className="mx-auto mb-2 opacity-40" />
                    No saved queries yet
                  </div>
                ) : (
                  savedQueries.map((saved) => (
                    <div
                      key={saved.id}
                      className="p-3 rounded-lg bg-card/30 border border-border/30 hover:border-primary/30 transition-all text-sm group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {getContextIcon(saved.context)}
                          <span className="ml-1">{saved.context}</span>
                        </Badge>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleLoadQuery(saved)}
                            className="text-primary/60 hover:text-primary"
                          >
                            <Play size={14} weight="fill" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuery(saved.id)}
                            className="text-destructive/60 hover:text-destructive"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-foreground/80 line-clamp-2">
                        {saved.query}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 mono">
                        {new Date(saved.timestamp).toLocaleDateString()} at{' '}
                        {new Date(saved.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Sparkle size={16} weight="fill" className="text-primary" />
                Tips
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li>• Use natural language for queries</li>
                <li>• Be specific about what you want to detect</li>
                <li>• Reference locations when relevant</li>
                <li>• Save interesting queries to revisit later</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
