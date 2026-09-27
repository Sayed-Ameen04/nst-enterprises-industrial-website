from fastapi import APIRouter
from typing import List
from ..schemas.category import CategoryResponse
from ..services.product_service import product_service

router = APIRouter(prefix="/api/categories", tags=["Categories"])

@router.get("", response_model=List[CategoryResponse])
def get_categories():
    return product_service.get_all_categories()
