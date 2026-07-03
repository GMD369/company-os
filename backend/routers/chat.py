from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from auth.dependencies import CurrentUser, require_company
from clients.ai_services import answer_question
from db.session import get_db
from models.chat_message import ChatMessage
from schemas.chat import ChatMessageResponse, ChatRequest, ChatResponse

router = APIRouter()


@router.post("", response_model=ChatResponse)
async def send_chat_message(
    payload: ChatRequest,
    user: CurrentUser = Depends(require_company),
    db: Session = Depends(get_db),
):
    user_message = ChatMessage(
        company_id=user.company_id,
        user_id=user.id,
        role="user",
        content=payload.question,
    )
    db.add(user_message)
    db.commit()

    result = await answer_question(company_id=user.company_id, question=payload.question)

    assistant_message = ChatMessage(
        company_id=user.company_id,
        user_id=user.id,
        role="assistant",
        content=result["answer"],
    )
    db.add(assistant_message)
    db.commit()

    return ChatResponse(answer=result["answer"], sources=result.get("sources", []))


@router.get("/messages", response_model=list[ChatMessageResponse])
def list_messages(
    user: CurrentUser = Depends(require_company),
    db: Session = Depends(get_db),
):
    stmt = (
        select(ChatMessage)
        .where(ChatMessage.company_id == user.company_id)
        .order_by(ChatMessage.created_at.asc())
    )
    return list(db.scalars(stmt))
