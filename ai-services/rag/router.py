from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from rag.pipeline import answer_query, ingest, retrieve

router = APIRouter()


class IngestRequest(BaseModel):
    company_id: str
    document_id: str
    document_url: str
    mime_type: str


class SearchRequest(BaseModel):
    company_id: str
    query: str
    top_k: int = 5


class AnswerRequest(BaseModel):
    company_id: str
    question: str
    top_k: int = 5


@router.post("/ingest")
async def ingest_document(payload: IngestRequest):
    try:
        chunk_count = await ingest(
            company_id=payload.company_id,
            document_id=payload.document_id,
            document_url=payload.document_url,
            mime_type=payload.mime_type,
        )
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    return {"status": "ready", "chunk_count": chunk_count}


@router.post("/search")
def search_documents(payload: SearchRequest):
    results = retrieve(company_id=payload.company_id, query=payload.query, top_k=payload.top_k)
    return {"results": results, "query": payload.query}


@router.post("/answer")
def answer(payload: AnswerRequest):
    return answer_query(company_id=payload.company_id, question=payload.question, top_k=payload.top_k)
