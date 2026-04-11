# NEPA Backend Integration

This document explains how the NEPA Agent Chat frontend connects to a FastAPI backend for real-time video intelligence inference.

## Architecture

The frontend application uses a service layer (`src/lib/nepaService.ts`) to communicate with a FastAPI backend that handles:

- Video/image file uploads
- Natural language prompt routing to specialized agents (VODA, SODA, FODA, RODA, EODA)
- Real-time inference processing
- Streaming responses for long-running tasks

## API Endpoints

### Base URL

Configure the backend URL via environment variable:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

Default: `http://localhost:8000`

### Endpoints

#### 1. File Upload
```
POST /api/nepa/upload
Content-Type: multipart/form-data

Request:
- file: <video or image file>

Response:
{
  "fileId": "string",
  "url": "string",
  "filename": "string"
}
```

#### 2. Inference
```
POST /api/nepa/infer
Content-Type: application/json

Request:
{
  "prompt": "string",
  "agent": "VODA" | "SODA" | "FODA" | "RODA" | "EODA" | null,
  "video_url": "string" | null,
  "file_id": "string" | null,
  "context": {} | null,
  "stream": boolean
}

Response (non-streaming):
{
  "agent": "VODA",
  "content": "string (markdown formatted response)",
  "taskId": "string" | null,
  "status": "pending" | "processing" | "completed" | "failed",
  "detections": [],
  "metadata": {}
}

Response (streaming with Accept: text/event-stream):
data: {"agent": "VODA", "content": "partial response...", ...}
data: {"agent": "VODA", "content": "more response...", ...}
data: [DONE]
```

#### 3. Task Status
```
GET /api/nepa/status/{taskId}
Content-Type: application/json

Response:
{
  "agent": "VODA",
  "content": "string",
  "taskId": "string",
  "status": "pending" | "processing" | "completed" | "failed",
  "detections": [],
  "metadata": {}
}
```

## Agent Routing

The backend should implement intelligent routing based on the prompt content and attachments:

- **VODA (Video Agent)**: Video analysis, object detection, person tracking
- **SODA (Surveillance Agent)**: Retail monitoring, facility surveillance, multi-camera setups
- **FODA (Facade Agent)**: Building inspection, drone footage, BRS detection
- **RODA (Robotic Agent)**: Robot navigation, mission planning, autonomous delivery
- **EODA (Edge Agent)**: Edge deployment, model optimization, on-device inference

If no specific agent is requested, the backend should analyze the prompt and route appropriately.

## Example FastAPI Implementation

See `/workspaces/spark-template/backend/main.py` for a minimal working example.

### Quick Start

```bash
# Install dependencies
pip install fastapi uvicorn python-multipart

# Run the backend
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### CORS Configuration

The backend must enable CORS for the frontend origin:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Frontend Integration

The `AgentChat` component (`src/routes/AgentChat.tsx`) uses the `nepaService` to:

1. Upload files when users attach videos/images
2. Send inference requests with prompts
3. Display streaming or complete responses
4. Handle errors gracefully with fallback messages

### Error Handling

If the backend is unreachable, users see a helpful error message with:
- Backend URL
- Network troubleshooting steps
- CORS configuration hints

### Testing Without Backend

The frontend will show connection errors if no backend is running. To test the UI without a backend, you can temporarily modify `AgentChat.tsx` to use mock responses.

## Production Deployment

For production:

1. Set `VITE_API_BASE_URL` to your production FastAPI URL
2. Ensure proper authentication (JWT tokens via `getAuthHeaders`)
3. Enable HTTPS for all requests
4. Configure rate limiting and request validation on the backend
5. Implement proper file upload size limits and virus scanning
6. Use background tasks for long-running inference jobs
7. Store results in a database for retrieval via task status endpoint

## WebSocket Alternative

For real-time streaming, consider using WebSockets instead of Server-Sent Events:

```python
from fastapi import WebSocket

@app.websocket("/ws/nepa/infer")
async def websocket_inference(websocket: WebSocket):
    await websocket.accept()
    # Stream inference results
```

Update `nepaService.ts` to use WebSocket connections for streaming responses.
