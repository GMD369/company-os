import uuid
from functools import lru_cache

from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels

from app.config import settings
from rag.embeddings import get_embedding_dim


@lru_cache(maxsize=1)
def get_client() -> QdrantClient:
    return QdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key or None)


def ensure_collection() -> None:
    client = get_client()
    if client.collection_exists(settings.qdrant_collection_name):
        return
    client.create_collection(
        collection_name=settings.qdrant_collection_name,
        vectors_config=qmodels.VectorParams(size=get_embedding_dim(), distance=qmodels.Distance.COSINE),
    )


def upsert_chunks(
    company_id: str,
    document_id: str,
    chunks: list[str],
    vectors: list[list[float]],
) -> int:
    ensure_collection()
    client = get_client()

    points = [
        qmodels.PointStruct(
            id=str(uuid.uuid4()),
            vector=vector,
            payload={
                "company_id": company_id,
                "document_id": document_id,
                "chunk_index": idx,
                "text": chunk,
            },
        )
        for idx, (chunk, vector) in enumerate(zip(chunks, vectors))
    ]
    client.upsert(collection_name=settings.qdrant_collection_name, points=points)
    return len(points)


def search(company_id: str, query_vector: list[float], top_k: int = 5) -> list[dict]:
    ensure_collection()
    client = get_client()

    results = client.query_points(
        collection_name=settings.qdrant_collection_name,
        query=query_vector,
        query_filter=qmodels.Filter(
            must=[qmodels.FieldCondition(key="company_id", match=qmodels.MatchValue(value=company_id))]
        ),
        limit=top_k,
    ).points

    return [
        {
            "text": point.payload.get("text", ""),
            "document_id": point.payload.get("document_id"),
            "chunk_index": point.payload.get("chunk_index"),
            "score": point.score,
        }
        for point in results
    ]
