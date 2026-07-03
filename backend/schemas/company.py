import uuid

from pydantic import BaseModel


class CompanyBootstrapRequest(BaseModel):
    company_name: str


class CompanyResponse(BaseModel):
    id: uuid.UUID
    name: str

    class Config:
        from_attributes = True
