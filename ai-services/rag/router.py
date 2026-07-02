from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class IngestRequest(BaseModel):
    company_id: str
    document_url: str


class SearchRequest(BaseModel):
    company_id: str
    query: str
    top_k: int = 5


@router.post("/ingest")
def ingest_document(payload: IngestRequest):
    # TODO: parse (PyMuPDF/python-docx/pandas), chunk, embed, upsert to Qdrant
    return {"status": "queued", "document_url": payload.document_url}


@router.post("/search")
def search_documents(payload: SearchRequest):
    # TODO: embed query, search Qdrant collection scoped to company_id
    return {"results": [], "query": payload.query}
