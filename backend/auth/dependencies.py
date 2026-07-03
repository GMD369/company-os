import uuid
from dataclasses import dataclass

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from config import settings
from db.session import get_db
from models.profile import Profile

bearer_scheme = HTTPBearer()


@dataclass
class CurrentUser:
    id: uuid.UUID
    email: str
    company_id: uuid.UUID | None


def _decode_token(token: str) -> dict:
    try:
        return jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated",
        )
    except jwt.PyJWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        ) from exc


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> CurrentUser:
    payload = _decode_token(credentials.credentials)
    user_id = uuid.UUID(payload["sub"])
    email = payload.get("email", "")

    profile = db.get(Profile, user_id)
    company_id = profile.company_id if profile else None

    return CurrentUser(id=user_id, email=email, company_id=company_id)


def require_company(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    if user.company_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No company associated with this account. Call /companies/bootstrap first.",
        )
    return user
