from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from auth.dependencies import CurrentUser, require_company
from clients.ai_services import ingest_document
from config import settings
from db.session import get_db
from models.document import Document
from schemas.document import DocumentCreateRequest, DocumentResponse

router = APIRouter()


def _public_storage_url(storage_path: str) -> str:
    return f"{settings.supabase_url}/storage/v1/object/public/documents/{storage_path}"


@router.post("", response_model=DocumentResponse)
async def create_document(
    payload: DocumentCreateRequest,
    user: CurrentUser = Depends(require_company),
    db: Session = Depends(get_db),
):
    document = Document(
        company_id=user.company_id,
        uploaded_by=user.id,
        filename=payload.filename,
        storage_path=payload.storage_path,
        mime_type=payload.mime_type,
        status="processing",
    )
    db.add(document)
    db.commit()
    db.refresh(document)

    try:
        await ingest_document(
            company_id=user.company_id,
            document_id=document.id,
            document_url=_public_storage_url(payload.storage_path),
            mime_type=payload.mime_type,
        )
        document.status = "ready"
    except Exception as exc:  # noqa: BLE001
        document.status = "failed"
        document.error_message = str(exc)

    db.commit()
    db.refresh(document)
    return document


@router.get("", response_model=list[DocumentResponse])
def list_documents(
    user: CurrentUser = Depends(require_company),
    db: Session = Depends(get_db),
):
    stmt = select(Document).where(Document.company_id == user.company_id).order_by(Document.created_at.desc())
    return list(db.scalars(stmt))


@router.get("/{document_id}", response_model=DocumentResponse)
def get_document(
    document_id: str,
    user: CurrentUser = Depends(require_company),
    db: Session = Depends(get_db),
):
    document = db.get(Document, document_id)
    if document is None or document.company_id != user.company_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    return document
