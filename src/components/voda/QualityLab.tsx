import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  FrameCorners,
  PlayCircle,
  Stairs,
  UploadSimple,
} from '@phosphor-icons/react'
import { vodaApi } from '@/lib/voda-api'
import type { DiagnosisResponse, ReconstructResponse, StitchResponse, ProcessResponse } from '@/types/voda'
import ProcessingVisualization from '@/components/ProcessingVisualization'

type QualityMode = 'diagnose' | 'reconstruct' | 'stitch'

interface QualityLabProps {
  initialMode?: QualityMode
  onModeChange?: (mode: QualityMode) => void
}

const MODE_CONFIG = [
  { id: 'diagnose', label: 'Diagnose', icon: PlayCircle },
  { id: 'reconstruct', label: 'Reconstruct', icon: FrameCorners },
  { id: 'stitch', label: 'Stitch', icon: Stairs },
] as const

const getMetricStatus = (value: number) => {
  if (value >= 80) return { label: 'Good', color: 'bg-emerald-500', text: 'text-emerald-400' }
  if (value >= 55) return { label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-400' }
  return { label: 'Critical', color: 'bg-rose-500', text: 'text-rose-400' }
}

const getRecommendationColor = (severity: string) => {
  if (severity === 'high') return 'bg-rose-500/20 text-rose-300'
  if (severity === 'medium') return 'bg-amber-500/20 text-amber-300'
  return 'bg-emerald-500/20 text-emerald-300'
}

export function QualityLab({ initialMode = 'diagnose', onModeChange }: QualityLabProps) {
  const [mode, setMode] = useState<QualityMode>(initialMode)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [diagnosis, setDiagnosis] = useState<DiagnosisResponse | null>(null)
  const [reconstruct, setReconstruct] = useState<ReconstructResponse | null>(null)
  const [stitch, setStitch] = useState<StitchResponse | null>(null)
  const [lastFiles, setLastFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // For real-time processing visualization
  const [processingJobId, setProcessingJobId] = useState<string | null>(null)
  const [processingPrompt, setProcessingPrompt] = useState<string | null>(null)
  const [processingError, setProcessingError] = useState<string | null>(null)

  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  useEffect(() => {
    if (!reconstruct || !imageRef.current || !canvasRef.current) return
    const img = imageRef.current
    const canvas = canvasRef.current

    const draw = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#38bdf8'
      ctx.lineWidth = 2
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)'
      reconstruct.detections.forEach((det) => {
        if (!det.polygon.length) return
        ctx.beginPath()
        det.polygon.forEach((point, index) => {
          const x = point.x <= 1 ? point.x * canvas.width : point.x
          const y = point.y <= 1 ? point.y * canvas.height : point.y
          if (index === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      })
    }

    if (img.complete) {
      draw()
    } else {
      img.onload = draw
    }
  }, [reconstruct])

  const handleModeChange = (nextMode: QualityMode) => {
    setMode(nextMode)
    onModeChange?.(nextMode)
  }

  const validateFiles = (files: File[]) => {
    const tooLarge = files.find((file) => file.size > 50 * 1024 * 1024)
    if (tooLarge) {
      toast.error(`${tooLarge.name} exceeds the 50MB limit`)
      return false
    }
    if (mode === 'stitch' && files.length < 2) {
      toast.error('Upload at least two frames to stitch')
      return false
    }
    return true
  }

  const handleFiles = useCallback(
    async (files: File[], prompt?: string) => {
      if (!validateFiles(files)) return
      setLastFiles(files)
      setIsLoading(true)
      setError(null)
      setDiagnosis(null)
      setReconstruct(null)
      setStitch(null)
      setProcessingJobId(null)
      setProcessingPrompt(null)
      setProcessingError(null)
      try {
        if (mode === 'diagnose') {
          const response = await vodaApi.diagnoseFrames(files)
          setDiagnosis(response)
        } else if (mode === 'reconstruct') {
          // Instead of direct reconstruct, submit job and get jobId
          // Simulate prompt as file name or let user input prompt if available
          const fakePrompt = prompt || files[0]?.name || 'Reconstruction';
          // Here, you would call a real API to start the job and get jobId
          // For now, use processFrames to get job_id
          const processResp = await vodaApi.processFrames(files, 'voda');
          setProcessingJobId(processResp.job_id)
          setProcessingPrompt(fakePrompt)
        } else {
          const response = await vodaApi.stitchFrames(files, 'panoramic')
          setStitch(response)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Processing failed'
        setError(message)
        setProcessingError(message)
      } finally {
        setIsLoading(false)
      }
    },
    [mode]
  )

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    if (files.length === 0) return
    void handleFiles(files)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const files = Array.from(event.dataTransfer.files)
    if (files.length === 0) return
    void handleFiles(files)
  }

  const retry = () => {
    if (lastFiles.length) {
      void handleFiles(lastFiles)
    }
  }

  const metrics = useMemo(() => {
    if (!diagnosis) return []
    return [
      { label: 'Sharpness', value: diagnosis.metrics.sharpness },
      { label: 'Noise', value: diagnosis.metrics.noise },
      { label: 'Exposure', value: diagnosis.metrics.exposure },
      { label: 'Color Cast', value: diagnosis.metrics.color_cast },
      { label: 'Resolution', value: diagnosis.metrics.resolution },
    ]
  }, [diagnosis])

  // Handler for ProcessingVisualization completion/failure
  const handleProcessingComplete = (outputUrl: string) => {
    setProcessingJobId(null)
    setProcessingPrompt(null)
    // Optionally, fetch and show the result (e.g., setReconstruct with outputUrl)
    // For now, just show a toast
    toast.success('Reconstruction complete!')
  }
  const handleProcessingFailed = (source: 'user' | 'system', reason: string) => {
    setProcessingJobId(null)
    setProcessingPrompt(null)
    setProcessingError(reason)
    toast.error(`Reconstruction failed: ${reason}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Quality Lab</h2>
          <p className="text-sm text-muted-foreground">
            Diagnose, reconstruct, or stitch frames with VODA’s vision stack.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {MODE_CONFIG.map((item) => {
            const Icon = item.icon
            const active = mode === item.id
            return (
              <Button
                key={item.id}
                variant={active ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModeChange(item.id)}
                className="gap-2"
              >
                <Icon size={16} />
                {item.label}
              </Button>
            )
          })}
        </div>
      </div>


      {/* Show ProcessingVisualization if reconstruct job is running */}
      {processingJobId ? (
        <ProcessingVisualization
          jobId={processingJobId}
          prompt={processingPrompt || undefined}
          onComplete={handleProcessingComplete}
          onFailed={handleProcessingFailed}
        />
      ) : (
        <Card
          className={`border-dashed border-2 p-8 text-center bg-card/40 transition-colors ${
            isDragging ? 'border-primary/70 bg-primary/10' : 'border-border/60'
          }`}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Input
            ref={inputRef}
            type="file"
            multiple={mode === 'stitch'}
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UploadSimple size={22} className="text-primary" />
            </div>
            <div>
              <p className="font-medium">Drag & drop frames or video</p>
              <p className="text-xs text-muted-foreground">
                {mode === 'stitch'
                  ? 'Upload at least 2 frames (max 50MB each).'
                  : 'Upload a frame or clip (max 50MB).'}
              </p>
            </div>
            <Button variant="outline" onClick={() => inputRef.current?.click()}>
              Select files
            </Button>
          </div>
        </Card>
      )}

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}

      {error && (
        <Card className="p-6 bg-card/50 border-border/50 text-center space-y-3">
          <p className="text-sm text-rose-400">{error}</p>
          <Button variant="secondary" onClick={retry}>
            Retry
          </Button>
        </Card>
      )}

      {diagnosis && !isLoading && !error && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {metrics.map((metric) => {
              const status = getMetricStatus(metric.value)
              return (
                <Card key={metric.label} className="p-4 bg-card/50 border-border/50">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <span className={`text-xs font-semibold ${status.text}`}>{status.label}</span>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 rounded-full bg-muted/60">
                      <div
                        className={`h-2 rounded-full ${status.color}`}
                        style={{ width: `${Math.min(metric.value, 100)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm font-semibold">{Math.round(metric.value)}%</p>
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="font-semibold mb-4">Recommendations</h3>
            {diagnosis.recommendations.length === 0 ? (
              <p className="text-sm text-muted-foreground">No critical issues detected.</p>
            ) : (
              <div className="space-y-3">
                {diagnosis.recommendations.map((rec, index) => (
                  <div key={`rec-${index}`} className="flex items-start gap-3">
                    <Badge className={`text-[10px] ${getRecommendationColor(rec.severity)}`}>
                      {rec.severity.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{rec.message}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {diagnosis.temporal && (
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="font-semibold mb-4">Temporal metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Frame drops</p>
                  <p className="text-lg font-semibold text-foreground">
                    {diagnosis.temporal.frame_drops}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Flicker</p>
                  <p className="text-lg font-semibold text-foreground">
                    {diagnosis.temporal.flicker}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Bitrate stability</p>
                  <p className="text-lg font-semibold text-foreground">
                    {diagnosis.temporal.bitrate_stability}%
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {reconstruct && !isLoading && !error && (
        <div className="space-y-6">
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="font-semibold mb-4">Reconstruction preview</h3>
            <div className="relative overflow-hidden rounded-lg border border-border/60">
              <img
                ref={imageRef}
                src={reconstruct.image_url}
                alt="Reconstruction"
                className="w-full block"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
            </div>
          </Card>

          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="font-semibold mb-4">Detections</h3>
            <div className="space-y-3">
              {reconstruct.detections.map((det) => (
                <div key={det.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{det.label}</p>
                    <p className="text-xs text-muted-foreground">
                      Confidence: {(det.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  <Badge variant="outline">Depth {det.depth ?? '—'}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {reconstruct.scene_graph && (
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="font-semibold mb-4">Scene graph</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Nodes</p>
                  <ul className="space-y-2">
                    {reconstruct.scene_graph.nodes.map((node) => (
                      <li key={node.id} className="flex items-center justify-between">
                        <span>{node.label}</span>
                        <Badge variant="secondary">Depth {node.depth ?? '—'}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Relations</p>
                  <ul className="space-y-2">
                    {reconstruct.scene_graph.edges.map((edge, index) => (
                      <li key={`edge-${index}`} className="text-muted-foreground">
                        {edge.source} → {edge.target} ({edge.relation})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {stitch && !isLoading && !error && (
        <div className="space-y-6">
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="font-semibold mb-4">Panorama preview</h3>
            <div className="rounded-lg overflow-hidden border border-border/60">
              <img src={stitch.image_url} alt="Stitched panorama" className="w-full" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Seam quality</p>
              <div className="h-2 rounded-full bg-muted/60">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: `${Math.min(stitch.seam_score, 100)}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-semibold">{Math.round(stitch.seam_score)}%</p>
            </div>
            {stitch.download_url && (
              <div className="mt-4">
                <Button asChild>
                  <a href={stitch.download_url} download>
                    Download result
                  </a>
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
