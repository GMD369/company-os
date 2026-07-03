import uuid

import httpx

from config import settings


async def ingest_document(company_id: uuid.UUID, document_id: uuid.UUID, document_url: str, mime_type: str) -> dict:
    async with httpx.AsyncClient(base_url=settings.ai_services_url, timeout=120.0) as client:
        response = await client.post(
            "/rag/ingest",
            json={
                "company_id": str(company_id),
                "document_id": str(document_id),
                "document_url": document_url,
                "mime_type": mime_type,
            },
        )
        response.raise_for_status()
        return response.json()


async def answer_question(company_id: uuid.UUID, question: str) -> dict:
    async with httpx.AsyncClient(base_url=settings.ai_services_url, timeout=60.0) as client:
        response = await client.post(
            "/rag/answer",
            json={"company_id": str(company_id), "question": question},
        )
        response.raise_for_status()
        return response.json()
