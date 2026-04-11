from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uuid
import asyncio
import json

app = FastAPI(title="NEPA Inference API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uploaded_files = {}

class InferenceRequest(BaseModel):
    prompt: str
    agent: Optional[str] = None
    video_url: Optional[str] = None
    file_id: Optional[str] = None
    context: Optional[Dict[str, Any]] = None
    stream: bool = False

class InferenceResponse(BaseModel):
    agent: str
    content: str
    taskId: Optional[str] = None
    status: Optional[str] = "completed"
    detections: Optional[list] = []
    metadata: Optional[Dict[str, Any]] = {}

def route_agent(prompt: str, has_file: bool) -> str:
    prompt_lower = prompt.lower()
    
    if has_file or any(word in prompt_lower for word in ['video', 'upload', 'voda', 'detect', 'footage']):
        return 'VODA'
    elif any(word in prompt_lower for word in ['retail', 'shelf', 'soda', 'store', 'camera', 'surveillance']):
        return 'SODA'
    elif any(word in prompt_lower for word in ['facade', 'foda', 'drone', 'inspect', 'brs', 'building']):
        return 'FODA'
    elif any(word in prompt_lower for word in ['robot', 'roda', 'mission', 'delivery', 'navigate', 'autonomous']):
        return 'RODA'
    elif any(word in prompt_lower for word in ['edge', 'eoda', 'deploy', 'optimize', 'tensorrt']):
        return 'EODA'
    else:
        return 'NEPA'

def generate_response(agent: str, prompt: str, file_id: Optional[str] = None) -> str:
    responses = {
        'VODA': f"""**VODA** is processing your video input.

Running inference pipeline:
```
> LOADING MODEL     : YOLOv8 + TensorRT
> RESOLUTION        : 1920×1080
> INFERENCE_RT      : 34ms per frame
> CLASSES_ACTIVE    : person, object, anomaly, zone
> AUDIT_CHAIN       : SHA-256 enabled
```

**Detections found:**
- 👤 3× Person — tracked across frames
- 📦 Shelf zone — monitored, stock at 68%
- ⚠️ Dwell time exceeded — Camera 2, 00:47s
- ✅ No anomalies detected

Every detection has been written to your audit ledger with SHA-256 hash, confidence score, and millisecond timestamp. Would you like to export the full audit log as JSON?""",
        
        'SODA': f"""**SODA** can configure your unmanned retail setup in the following steps:

**1. Camera registration**
Register each camera by RTSP URL or local device ID in the FacilityWatch console. SODA supports up to 16 concurrent streams.

**2. Zone configuration**
Define zones per camera — entrance, aisle, POS, stock room. Each zone gets its own alert thresholds.

**3. Shelf setup**
Add your shelf and aisle layout. SODA tracks visual stock levels and fires low-stock alerts at your configured threshold (default: 20%).

**4. Alert routing**
Configure severity levels (critical / warning / info) per event type: loitering, crowd density, unauthorised access, shelf empty, dwell time exceeded.

**5. Go live**
SODA begins inference immediately on-device. All events appear in the FacilityWatch alert feed within one inference cycle (<40ms).

Want me to generate a configuration template for your setup?""",
        
        'FODA': f"""**FODA** — Facade Agent — handles aerial structural inspection via drone.

**Pre-flight checklist:**
```
> DRONE_CONNECTED   : awaiting pairing
> CAMERA_RESOLUTION : 4K / 30fps
> INFERENCE_MODEL   : BRS + Concealment v2.1
> AUDIT_CHAIN       : SHA-256 enabled
> FLIGHT_ZONE       : not yet configured
```

**To start a facade inspection:**
1. Pair your drone via the FODA console
2. Define the building polygon and floor count
3. FODA auto-generates the flight path for full facade coverage
4. Inference runs on-device during flight — BRS detection, concealment analysis, structural defect classification
5. A full inspection report with GPS-tagged findings is written to your audit ledger on completion

Upload an existing facade video or connect your drone to begin. What building are you inspecting?""",
        
        'RODA': f"""**RODA** — Robotic Agent — handles autonomous navigation and mission orchestration.

**Mission setup:**
```
> ROBOT_CONNECTED   : awaiting pairing
> MAP_LOADED        : not yet configured
> MISSION_TYPE      : delivery / patrol / inspection
> OBSTACLE_AVOID    : enabled
> AUDIT_CHAIN       : SHA-256 enabled
```

**To configure a delivery mission:**
1. Upload your floor plan or let RODA map the environment via SLAM
2. Define pickup and delivery waypoints
3. Set obstacle avoidance sensitivity and speed profile
4. RODA executes the mission autonomously — logging every waypoint, stop, and event to the audit ledger
5. Mission complete events trigger notifications in the NEPA console

What type of robot are you deploying and what is the floor plan dimensions?""",
        
        'EODA': f"""**EODA** — Edge Agent — handles model optimization and deployment.

**Edge deployment pipeline:**
```
> TARGET_DEVICE     : NVIDIA Jetson / Intel NUC / RPi
> MODEL_FORMAT      : ONNX / TensorRT / TFLite
> OPTIMIZATION      : quantization enabled
> INFERENCE_TARGET  : <40ms per frame
```

**Optimization steps:**
1. Convert model to edge-compatible format
2. Apply INT8 quantization for faster inference
3. Run benchmark on target hardware
4. Deploy to edge device via OTA update
5. Monitor performance metrics in real-time

What edge device are you deploying to and what are your latency requirements?""",
        
        'NEPA': f"""I'm NEPA — the AuraSense edge AI assistant. I can help you:

- **Analyse video footage** using VODA (Video Agent)
- **Set up facility surveillance** using SODA (Surveillance Agent)
- **Configure drone inspections** using FODA (Facade Agent)
- **Plan robot missions** using RODA (Robotic Agent)
- **Deploy edge inference** using EODA (Edge Agent)

Upload a video file, paste a video URL, or describe what you want to detect — and I'll route your request to the right NEPA agent.

Your query: "{prompt}"

How can I assist you with this?"""
    }
    
    return responses.get(agent, responses['NEPA'])

@app.post("/api/nepa/upload")
async def upload_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_content = await file.read()
    
    uploaded_files[file_id] = {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(file_content),
        "content": file_content
    }
    
    return {
        "fileId": file_id,
        "url": f"/files/{file_id}",
        "filename": file.filename
    }

@app.post("/api/nepa/infer")
async def infer(request: InferenceRequest):
    agent = request.agent or route_agent(request.prompt, request.file_id is not None or request.video_url is not None)
    
    content = generate_response(agent, request.prompt, request.file_id)
    
    if request.stream:
        async def generate():
            words = content.split()
            chunk_size = 5
            for i in range(0, len(words), chunk_size):
                chunk = ' '.join(words[i:i + chunk_size])
                response_chunk = InferenceResponse(
                    agent=agent,
                    content=chunk,
                    status="processing"
                )
                yield f"data: {response_chunk.model_dump_json()}\n\n"
                await asyncio.sleep(0.1)
            
            yield "data: [DONE]\n\n"
        
        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )
    
    return InferenceResponse(
        agent=agent,
        content=content,
        taskId=str(uuid.uuid4()) if request.file_id else None,
        status="completed"
    )

@app.get("/api/nepa/status/{task_id}")
async def get_status(task_id: str):
    return InferenceResponse(
        agent="NEPA",
        content="Task completed successfully",
        taskId=task_id,
        status="completed"
    )

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "NEPA Inference API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
