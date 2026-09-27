from pydantic import BaseModel, Field
from typing import Optional

class CategoryBase(BaseModel):
    id: str
    name: str
    slug: str
    description: str
    image: str
    product_count: int = Field(default=0)

class CategoryCreate(BaseModel):
    name: str
    slug: str
    description: str
    image: str

class CategoryResponse(CategoryBase):
    pass
