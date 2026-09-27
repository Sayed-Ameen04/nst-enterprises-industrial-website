from pydantic import BaseModel
from typing import Optional

class EnquiryBase(BaseModel):
    product_id: Optional[str] = None
    product_name: str
    customer_name: str # Personal Name or Company Name
    phone: str
    email: Optional[str] = None
    quantity: str
    required_size: Optional[str] = None
    thickness: Optional[str] = None
    shape: Optional[str] = None
    grade: Optional[str] = None
    message: Optional[str] = None

class EnquiryCreate(EnquiryBase):
    pass

class EnquiryUpdateStatus(BaseModel):
    status: str # "New" | "Pending" | "Contacted" | "Completed"
    notes: Optional[str] = None

class EnquiryResponse(EnquiryBase):
    id: str
    created_at: str
    status: str = "New"
    notes: Optional[str] = None
