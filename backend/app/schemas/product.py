from pydantic import BaseModel, Field
from typing import List, Optional

class ShapeItem(BaseModel):
    name: str
    images: List[str] = Field(default_factory=list)

class ProductBase(BaseModel):
    name: str
    category_id: str
    category_name: str
    subtitle: Optional[str] = None
    description: str
    material: Optional[str] = None
    grades: List[str] = Field(default_factory=list)
    shapes: List[str] = Field(default_factory=list)
    shape_items: List[ShapeItem] = Field(default_factory=list)
    standard_sizes: List[str] = Field(default_factory=list)
    measurements: List[str] = Field(default_factory=list)
    thickness_info: str = "Available in all thicknesses as per requirement."
    length: Optional[str] = None
    width: Optional[str] = None
    finish: Optional[str] = None
    unit: str = "kg"
    images: List[str] = Field(default_factory=list)
    image: Optional[str] = None
    is_available: bool = True
    is_featured: bool = False
    price_type: str = "Contact for Price"
    tags: List[str] = Field(default_factory=list)

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category_id: Optional[str] = None
    category_name: Optional[str] = None
    subtitle: Optional[str] = None
    description: Optional[str] = None
    material: Optional[str] = None
    grades: Optional[List[str]] = None
    shapes: Optional[List[str]] = None
    shape_items: Optional[List[ShapeItem]] = None
    standard_sizes: Optional[List[str]] = None
    measurements: Optional[List[str]] = None
    thickness_info: Optional[str] = None
    finish: Optional[str] = None
    unit: Optional[str] = None
    images: Optional[List[str]] = None
    image: Optional[str] = None
    is_available: Optional[bool] = None
    is_featured: Optional[bool] = None
    price_type: Optional[str] = None
    tags: Optional[List[str]] = None

class ProductResponse(ProductBase):
    id: str
