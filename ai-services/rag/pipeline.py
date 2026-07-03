import httpx
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq

from app.config import settings
from rag.chunking import chunk_text
from rag.embeddings import embed_query, embed_texts
from rag.parsers import parse_document
from rag.vectorstore import search, upsert_chunks

ANSWER_PROMPT = """You are an assistant answering questions about a small business's internal documents.
Use only the context below to answer. If the answer isn't in the context, say you don't know.

Context:
{context}

Question: {question}

Answer:"""


async def ingest(company_id: str, document_id: str, document_url: str, mime_type: str) -> int:
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.get(document_url)
        response.raise_for_status()
        content = response.content

    text = parse_document(content, mime_type)
    chunks = chunk_text(text)
    if not chunks:
        return 0

    vectors = embed_texts(chunks)
    return upsert_chunks(company_id=company_id, document_id=document_id, chunks=chunks, vectors=vectors)


def retrieve(company_id: str, query: str, top_k: int = 5) -> list[dict]:
    query_vector = embed_query(query)
    return search(company_id=company_id, query_vector=query_vector, top_k=top_k)


def get_llm():
    if settings.llm_provider == "groq":
        return ChatGroq(model=settings.groq_model_name, api_key=settings.groq_api_key)
    return ChatGoogleGenerativeAI(model=settings.gemini_model_name, google_api_key=settings.gemini_api_key)


def answer_query(company_id: str, question: str, top_k: int = 5) -> dict:
    chunks = retrieve(company_id, question, top_k)

    if not chunks:
        return {"answer": "I don't have any documents to answer that yet.", "sources": []}

    context = "\n\n".join(c["text"] for c in chunks)
    llm = get_llm()
    prompt = ANSWER_PROMPT.format(context=context, question=question)
    result = llm.invoke(prompt)

    return {
        "answer": result.content,
        "sources": [
            {"document_id": c["document_id"], "chunk_index": c["chunk_index"], "score": c["score"]} for c in chunks
        ],
    }
