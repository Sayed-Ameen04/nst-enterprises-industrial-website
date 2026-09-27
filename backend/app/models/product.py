"""
Product Model for NST Enterprises.
Can be mapped to SQLAlchemy/PostgreSQL tables in production.
"""
from pydantic import BaseModel, Field
from typing import List, Optional

class Product(BaseModel):
    id: str
    name: str
    category_id: str
    category_name: str
    description: str
    material: str
    grade: Optional[str] = None
    thickness: str
    length: Optional[str] = None
    width: Optional[str] = None
    finish: str
    unit: str = "kg"
    available_sizes: List[str] = Field(default_factory=list)
    image: str
    is_available: bool = True
    is_featured: bool = False
    price_type: str = "Contact for Price"
    tags: List[str] = Field(default_factory=list)
