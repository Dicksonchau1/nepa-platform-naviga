# NEPA FastAPI Backend Example

This is a minimal working example of a FastAPI backend for the NEPA Agent Chat frontend.

## Features

- ✅ File upload endpoint for videos and images
- ✅ Intelligent agent routing (VODA, SODA, FODA, RODA, EODA)
- ✅ Synchronous and streaming inference responses
- ✅ CORS configuration for frontend integration
- ✅ Task status tracking
- ✅ Health check endpoint

## Installation

```bash
# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Running the Server

```bash
# Development mode with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive docs**: http://localhost:8000/docs
- **Health check**: http://localhost:8000/health

## Integration with Frontend

The frontend application will automatically connect to the backend when configured properly.

### Configure Frontend

Create a `.env` file in the frontend root:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

Or set the environment variable before starting the frontend:

```bash
VITE_API_BASE_URL=http://localhost:8000 npm run dev
```

### Test the Integration

1. Start the backend server (this directory)
2. Start the frontend application (root directory: `npm run dev`)
3. Navigate to `/agent` or `/chat` in the frontend
4. Upload a video or enter a prompt
5. Verify responses are coming from the backend

## API Endpoints

### 1. Upload File
```bash
curl -X POST "http://localhost:8000/api/nepa/upload" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@video.mp4"
```

### 2. Run Inference
```bash
curl -X POST "http://localhost:8000/api/nepa/infer" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Analyze this video for people and objects",
    "agent": "VODA",
    "stream": false
  }'
```

### 3. Get Task Status
```bash
curl "http://localhost:8000/api/nepa/status/task-id-here"
```

## Customization

### Add Real Inference

Replace the mock `generate_response` function with actual NEPA model inference:

```python
def generate_response(agent: str, prompt: str, file_id: Optional[str] = None) -> str:
    # Load your NEPA model
    # Run inference
    # Return formatted results
    pass
```

### Add Authentication

Install additional dependencies:
```bash
pip install python-jose[cryptography] passlib[bcrypt]
```

Add JWT authentication to protected endpoints:

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    # Verify JWT token
    if not is_valid_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")
    return token

@app.post("/api/nepa/infer")
async def infer(request: InferenceRequest, token: str = Depends(verify_token)):
    # Protected endpoint
    pass
```

### Add Database

Store inference results and task status in a database:

```bash
pip install sqlalchemy asyncpg
```

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/nepa"
engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
```

### Enable Real-time Streaming

The current implementation supports Server-Sent Events (SSE) streaming. Set `stream: true` in the inference request.

For WebSocket support:

```python
from fastapi import WebSocket

@app.websocket("/ws/nepa/infer")
async def websocket_inference(websocket: WebSocket):
    await websocket.accept()
    # Real-time bidirectional communication
    while True:
        data = await websocket.receive_json()
        # Process and stream results
        await websocket.send_json({"result": "..."})
```

## Deployment

### Docker

Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:

```bash
docker build -t nepa-backend .
docker run -p 8000:8000 nepa-backend
```

### Production Considerations

1. **Use HTTPS** - Deploy behind nginx or use Traefik for SSL termination
2. **Set CORS properly** - Restrict origins to your production domain
3. **Add rate limiting** - Use slowapi or similar middleware
4. **Configure logging** - Structured logging with correlation IDs
5. **Monitor performance** - Add Prometheus metrics and health checks
6. **Handle large files** - Stream file uploads, implement chunking
7. **Add caching** - Redis for inference results and file metadata
8. **Queue long tasks** - Use Celery or RQ for background processing

## Troubleshooting

### CORS errors
- Ensure the frontend origin is in `allow_origins`
- Check browser console for specific CORS error messages

### Connection refused
- Verify the backend is running on port 8000
- Check firewall settings
- Ensure `VITE_API_BASE_URL` is set correctly in frontend

### File upload fails
- Check file size limits in uvicorn/nginx configuration
- Verify `python-multipart` is installed

### Slow inference
- Implement background tasks for long-running operations
- Use GPU acceleration for model inference
- Cache results for identical requests

## License

Same as the main AuraSense NEPA project.
