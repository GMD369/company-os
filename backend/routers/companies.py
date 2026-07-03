from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from auth.dependencies import CurrentUser, get_current_user
from db.session import get_db
from models.company import Company
from models.profile import Profile
from schemas.company import CompanyBootstrapRequest, CompanyResponse

router = APIRouter()


@router.post("/bootstrap", response_model=CompanyResponse)
def bootstrap_company(
    payload: CompanyBootstrapRequest,
    user: CurrentUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_profile = db.get(Profile, user.id)
    if existing_profile is not None:
        company = db.get(Company, existing_profile.company_id)
        return company

    company = Company(name=payload.company_name)
    db.add(company)
    db.flush()

    profile = Profile(id=user.id, company_id=company.id, email=user.email, role="owner")
    db.add(profile)
    db.commit()
    db.refresh(company)
    return company


@router.get("/me", response_model=CompanyResponse)
def get_my_company(
    user: CurrentUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user.company_id is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No company found for this user")
    company = db.get(Company, user.company_id)
    return company
