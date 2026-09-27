"""
Category Model for NST Enterprises.
Can be mapped to SQLAlchemy/SQLModel/Tortoise ORM models in production.
"""
from pydantic import BaseModel
from typing import Optional

class Category(BaseModel):
    id: str
    name: str
    slug: str
    description: str
    image: str
    product_count: int = 0
