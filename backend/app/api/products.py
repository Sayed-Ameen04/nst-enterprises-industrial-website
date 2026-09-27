from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..schemas.product import ProductCreate, ProductUpdate, ProductResponse
from ..services.product_service import product_service

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("", response_model=List[ProductResponse])
def get_products(
    category: Optional[str] = Query(None, description="Category ID or name"),
    material: Optional[str] = Query(None, description="Filter by material"),
    thickness: Optional[str] = Query(None, description="Filter by thickness"),
    search: Optional[str] = Query(None, description="Search term in name, description, material, tags"),
    featured: Optional[bool] = Query(None, description="Filter featured products")
):
    return product_service.get_all_products(
        category=category,
        material=material,
        thickness=thickness,
        search=search,
        is_featured=featured
    )

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: str):
    product = product_service.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail=f"Product with ID '{product_id}' not found")
    return product

@router.post("", response_model=ProductResponse, status_code=201)
def create_product(product_in: ProductCreate):
    return product_service.create_product(product_in)

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: str, product_update: ProductUpdate):
    updated = product_service.update_product(product_id, product_update)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Product with ID '{product_id}' not found")
    return updated

@router.delete("/{product_id}")
def delete_product(product_id: str):
    success = product_service.delete_product(product_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Product with ID '{product_id}' not found")
    return {"message": "Product deleted successfully", "id": product_id}
