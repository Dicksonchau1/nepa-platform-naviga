# soda/app/main.py
from fastapi import FastAPI
from app.routers import waitlist

app = FastAPI()

# Mount the waitlist router
app.include_router(waitlist.router)

# (Optional) Add root route or other routers as needed

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
