import uuid
from datetime import datetime

from pydantic import BaseModel


class DocumentCreateRequest(BaseModel):
    filename: str
    storage_path: str
    mime_type: str


class DocumentResponse(BaseModel):
    id: uuid.UUID
    filename: str
    storage_path: str
    mime_type: str
    status: str
    error_message: str | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
