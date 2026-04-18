/**
 * CODA Service — frontend client for the CODA V1 cinematic render backend.
 * Shares auth with VODA (X-API-Key header).
 */
import { API_CONFIG, getApiKeyHeaders } from '@/config/api'

export interface RenderJob {
  job_id: string
  status: 'queued' | 'rendering' | 'completed' | 'failed'
  progress?: number
  output_url?: string
  error?: string
  created_at?: string
}

export interface CodaPresets {
  color_grades: Array<{ id: string; filter: string }>
  aspect_ratios: Array<{ id: string; label: string }>
  voices: Array<{ id: string; label: string }>
}

class CodaService {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl
  }

  private url(path: string): string {
    return `${this.baseUrl}${path}`
  }

  /* ---- Presets (no auth required) ---- */
  async getPresets(): Promise<CodaPresets> {
    const res = await fetch(this.url(API_CONFIG.endpoints.coda.presets))
    if (!res.ok) throw new Error(`Get presets failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Film Mode ---- */
  async renderFilm(
    apiKey: string,
    images: File[],
    opts: {
      style?: string
      genre?: string
      aspect_ratio?: string
      color_grade?: string
      duration_seconds?: number
    } = {},
  ): Promise<RenderJob> {
    const formData = new FormData()
    images.forEach((img) => formData.append('images', img))
    if (opts.style) formData.append('style', opts.style)
    if (opts.genre) formData.append('genre', opts.genre)
    if (opts.aspect_ratio) formData.append('aspect_ratio', opts.aspect_ratio)
    if (opts.color_grade) formData.append('color_grade', opts.color_grade)
    if (opts.duration_seconds) formData.append('duration_seconds', String(opts.duration_seconds))

    const res = await fetch(this.url(API_CONFIG.endpoints.coda.film), {
      method: 'POST',
      headers: { 'X-API-Key': apiKey },
      body: formData,
    })
    if (!res.ok) throw new Error(`Render film failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Avatar Mode ---- */
  async renderAvatar(
    apiKey: string,
    productImages: File[],
    opts: {
      style?: string
      product_context?: string
      voice?: string
      aspect_ratio?: string
      script?: string
    } = {},
  ): Promise<RenderJob> {
    const formData = new FormData()
    productImages.forEach((img) => formData.append('product_images', img))
    if (opts.style) formData.append('style', opts.style)
    if (opts.product_context) formData.append('product_context', opts.product_context)
    if (opts.voice) formData.append('voice', opts.voice)
    if (opts.aspect_ratio) formData.append('aspect_ratio', opts.aspect_ratio)
    if (opts.script) formData.append('script', opts.script)

    const res = await fetch(this.url(API_CONFIG.endpoints.coda.avatar), {
      method: 'POST',
      headers: { 'X-API-Key': apiKey },
      body: formData,
    })
    if (!res.ok) throw new Error(`Render avatar failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Pitch Mode ---- */
  async renderPitch(
    apiKey: string,
    slideImages: File[],
    opts: {
      style?: string
      pitch_context?: string
      voice?: string
      aspect_ratio?: string
      color_grade?: string
    } = {},
  ): Promise<RenderJob> {
    const formData = new FormData()
    slideImages.forEach((img) => formData.append('slide_images', img))
    if (opts.style) formData.append('style', opts.style)
    if (opts.pitch_context) formData.append('pitch_context', opts.pitch_context)
    if (opts.voice) formData.append('voice', opts.voice)
    if (opts.aspect_ratio) formData.append('aspect_ratio', opts.aspect_ratio)
    if (opts.color_grade) formData.append('color_grade', opts.color_grade)

    const res = await fetch(this.url(API_CONFIG.endpoints.coda.pitch), {
      method: 'POST',
      headers: { 'X-API-Key': apiKey },
      body: formData,
    })
    if (!res.ok) throw new Error(`Render pitch failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Render Status ---- */
  async getRenderStatus(apiKey: string, jobId: string): Promise<RenderJob> {
    const res = await fetch(this.url(API_CONFIG.endpoints.coda.renderStatus(jobId)), {
      headers: getApiKeyHeaders(apiKey),
    })
    if (!res.ok) throw new Error(`Render status failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Poll until complete ---- */
  async pollRenderJob(
    apiKey: string,
    jobId: string,
    onProgress?: (job: RenderJob) => void,
    intervalMs = 2000,
    maxAttempts = 150,
  ): Promise<RenderJob> {
    for (let i = 0; i < maxAttempts; i++) {
      const job = await this.getRenderStatus(apiKey, jobId)
      onProgress?.(job)
      if (job.status === 'completed' || job.status === 'failed') return job
      await new Promise((r) => setTimeout(r, intervalMs))
    }
    throw new Error('Render polling timed out')
  }
}

export const codaService = new CodaService()
