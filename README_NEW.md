# AuraSense NEPA - Edge AI Intelligence Platform

A neuromorphic edge perception platform that turns camera feeds into reliable autonomous agents for unmanned retail, inspection, and robotics.

## 🚀 Features

- **NEPA Agent Chat**: Conversational AI interface for video intelligence
- **FastAPI Backend Integration**: Production-ready backend for real NEPA inference
- **Multi-Agent Routing**: VODA, SODA, FODA, RODA, EODA specialized agents
- **File Upload**: Video and image upload with processing
- **Real-time Streaming**: Server-Sent Events for live inference results
- **Protected Dashboard**: JWT-authenticated routes for NEPA console
- **Comprehensive Documentation**: API specs, deployment guides, examples

## 📦 Quick Start

### Frontend

```bash
# Install dependencies
npm install

# Configure backend URL (optional, defaults to localhost:8000)
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Backend (FastAPI)

```bash
# Navigate to backend example
cd backend-example

# Install Python dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at: `http://localhost:8000`  
API docs at: `http://localhost:8000/docs`

## 🎯 Key Routes

- `/` - Homepage with cinematic brand experience
- `/agent` or `/chat` - NEPA Agent Chat interface
- `/dashboard` - Protected NEPA console (requires login)
- `/playground` - Interactive demo environment

## 🧪 Testing the Backend Integration

1. Start both frontend and backend servers
2. Navigate to `/agent` in your browser
3. Enter a prompt like "Analyze this video for people" or upload a video file
4. See real backend responses with agent routing (VODA, SODA, etc.)

## 📚 Documentation

- **[NEPA_BACKEND_INTEGRATION.md](NEPA_BACKEND_INTEGRATION.md)** - Complete API specification and integration guide
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Detailed implementation overview
- **[backend-example/README.md](backend-example/README.md)** - Backend setup and customization

## 🏗️ Architecture

```
Frontend (React + TypeScript)
    ↓ HTTP/SSE
NEPAService (src/lib/nepaService.ts)
    ↓ POST /api/nepa/*
FastAPI Backend (Python)
    ↓ Intelligent routing
NEPA Agents (VODA, SODA, FODA, RODA, EODA)
    ↓ Model inference
YOLOv8 + TensorRT Models
```

## 🔧 Development

### Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:8000  # Backend URL
```

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

## 🚢 Deployment

### Frontend

Deploy to Vercel, Netlify, or any static hosting:

```bash
npm run build
# Upload ./dist to your hosting provider
```

### Backend

Deploy FastAPI to:
- AWS EC2 / Lambda
- Google Cloud Run
- DigitalOcean App Platform
- Heroku

See [NEPA_BACKEND_INTEGRATION.md](NEPA_BACKEND_INTEGRATION.md) for production deployment guides.

## 🛠️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Tailwind CSS v4
- Shadcn UI components
- React Router v7
- Framer Motion
- Sonner (toast notifications)

**Backend:**
- FastAPI (Python)
- Pydantic (validation)
- Uvicorn (ASGI server)
- Python Multipart (file uploads)

**Infrastructure:**
- Vite (build tool)
- Node.js 20+
- Python 3.11+

## 🤝 Contributing

This is a Spark template project. Contributions are welcome!

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
