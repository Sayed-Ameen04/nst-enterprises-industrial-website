"""
Enquiry Model for NST Enterprises.
Can be mapped to SQLAlchemy/PostgreSQL tables in production.
"""
from pydantic import BaseModel
from typing import Optional

class Enquiry(BaseModel):
    id: str
    product_id: Optional[str] = None
    product_name: str
    customer_name: str
    phone: str
    email: Optional[str] = None
    quantity: str
    required_size: Optional[str] = None
    thickness: Optional[str] = None
    message: Optional[str] = None
    created_at: str
    status: str = "New" # "New" | "Pending" | "Contacted" | "Completed"
    notes: Optional[str] = None
