from fastapi import FastAPI

app = FastAPI(title="AI OS Backend")

@app.get("/health")
def health():
    return {"status": "ok"}