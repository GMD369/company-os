from fastapi import FastAPI

from agents.router import router as agents_router
from rag.router import router as rag_router

app = FastAPI(title="AI OS - AI Services")

app.include_router(agents_router, prefix="/agents", tags=["agents"])
app.include_router(rag_router, prefix="/rag", tags=["rag"])


@app.get("/health")
def health():
    return {"status": "ok"}
