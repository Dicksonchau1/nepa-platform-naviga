import { API_CONFIG } from '@/config/api'

export type AgentType = 'VODA' | 'SODA' | 'FODA' | 'RODA' | 'EODA' | 'NEPA'

export type InferenceRequest = {
  prompt: string
  agent?: AgentType
  videoUrl?: string
  videoFile?: File
  imageFile?: File
  context?: Record<string, unknown>
}

export type InferenceResponse = {
  agent: AgentType
  content: string
  taskId?: string
  status?: 'pending' | 'processing' | 'completed' | 'failed'
  detections?: unknown[]
  metadata?: Record<string, unknown>
}

export type UploadResponse = {
  fileId: string
  url: string
  filename: string
}

class NEPAService {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl
  }

  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${this.baseUrl}${API_CONFIG.endpoints.nepa.upload}`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    return response.json()
  }

  async infer(request: InferenceRequest): Promise<InferenceResponse> {
    let fileId: string | undefined

    if (request.videoFile) {
      const uploadResult = await this.uploadFile(request.videoFile)
      fileId = uploadResult.fileId
    } else if (request.imageFile) {
      const uploadResult = await this.uploadFile(request.imageFile)
      fileId = uploadResult.fileId
    }

    const response = await fetch(`${this.baseUrl}${API_CONFIG.endpoints.nepa.infer}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: request.prompt,
        agent: request.agent,
        video_url: request.videoUrl,
        file_id: fileId,
        context: request.context,
      }),
    })

    if (!response.ok) {
      throw new Error(`Inference failed: ${response.statusText}`)
    }

    return response.json()
  }

  async getStatus(taskId: string): Promise<InferenceResponse> {
    const response = await fetch(`${this.baseUrl}${API_CONFIG.endpoints.nepa.status(taskId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.statusText}`)
    }

    return response.json()
  }

  async *streamInfer(request: InferenceRequest): AsyncGenerator<InferenceResponse> {
    let fileId: string | undefined

    if (request.videoFile) {
      const uploadResult = await this.uploadFile(request.videoFile)
      fileId = uploadResult.fileId
    } else if (request.imageFile) {
      const uploadResult = await this.uploadFile(request.imageFile)
      fileId = uploadResult.fileId
    }

    const response = await fetch(`${this.baseUrl}${API_CONFIG.endpoints.nepa.infer}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({
        prompt: request.prompt,
        agent: request.agent,
        video_url: request.videoUrl,
        file_id: fileId,
        context: request.context,
        stream: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`Inference failed: ${response.statusText}`)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('Response body is not readable')
    }

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') return
          try {
            yield JSON.parse(data) as InferenceResponse
          } catch (e) {
            console.error('Failed to parse SSE data:', e)
          }
        }
      }
    }
  }
}

export const nepaService = new NEPAService()
