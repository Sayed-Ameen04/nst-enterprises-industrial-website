from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..schemas.enquiry import EnquiryCreate, EnquiryUpdateStatus, EnquiryResponse
from ..services.enquiry_service import enquiry_service

router = APIRouter(prefix="/api/enquiries", tags=["Enquiries"])

@router.get("", response_model=List[EnquiryResponse])
def get_enquiries(
    status: Optional[str] = Query(None, description="Filter by status (New, Pending, Contacted, Completed)"),
    search: Optional[str] = Query(None, description="Search by customer name, product name, phone, or email")
):
    return enquiry_service.get_all_enquiries(status=status, search=search)

@router.get("/{enquiry_id}", response_model=EnquiryResponse)
def get_enquiry(enquiry_id: str):
    enquiry = enquiry_service.get_enquiry_by_id(enquiry_id)
    if not enquiry:
        raise HTTPException(status_code=404, detail=f"Enquiry with ID '{enquiry_id}' not found")
    return enquiry

@router.post("", response_model=EnquiryResponse, status_code=201)
def create_enquiry(enquiry_in: EnquiryCreate):
    return enquiry_service.create_enquiry(enquiry_in)

@router.put("/{enquiry_id}", response_model=EnquiryResponse)
def update_enquiry_status(enquiry_id: str, update_in: EnquiryUpdateStatus):
    updated = enquiry_service.update_enquiry_status(enquiry_id, update_in)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Enquiry with ID '{enquiry_id}' not found")
    return updated
