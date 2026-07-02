from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class AgentQuery(BaseModel):
    company_id: str
    query: str


@router.post("/query")
def run_agent(payload: AgentQuery):
    # TODO: route into LangGraph orchestrator once agents are implemented
    return {"answer": "not implemented", "query": payload.query}
