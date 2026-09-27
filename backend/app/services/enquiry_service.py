import uuid
from datetime import datetime
from typing import List, Optional
from ..data.mock_data import MOCK_ENQUIRIES
from ..schemas.enquiry import EnquiryCreate, EnquiryUpdateStatus, EnquiryResponse

class EnquiryService:
    def __init__(self):
        self.enquiries: List[dict] = [dict(e) for e in MOCK_ENQUIRIES]

    def get_all_enquiries(
        self,
        status: Optional[str] = None,
        search: Optional[str] = None
    ) -> List[EnquiryResponse]:
        results = self.enquiries

        if status and status.lower() != "all":
            results = [e for e in results if e["status"].lower() == status.lower()]

        if search:
            query = search.strip().lower()
            results = [
                e for e in results
                if query in e["customer_name"].lower()
                or query in e["product_name"].lower()
                or query in e["phone"].lower()
                or (e.get("email") and query in e["email"].lower())
            ]

        return [EnquiryResponse(**e) for e in results]

    def get_enquiry_by_id(self, enquiry_id: str) -> Optional[EnquiryResponse]:
        for e in self.enquiries:
            if e["id"] == enquiry_id:
                return EnquiryResponse(**e)
        return None

    def create_enquiry(self, enquiry_in: EnquiryCreate) -> EnquiryResponse:
        new_id = f"enq-{uuid.uuid4().hex[:6]}"
        now_str = datetime.now().strftime("%Y-%m-%d %I:%M %p")
        data = enquiry_in.model_dump()
        data["id"] = new_id
        data["created_at"] = now_str
        data["status"] = "New"
        data["notes"] = "Received via Website Quote Request"
        self.enquiries.insert(0, data)
        return EnquiryResponse(**data)

    def update_enquiry_status(self, enquiry_id: str, update_in: EnquiryUpdateStatus) -> Optional[EnquiryResponse]:
        for idx, e in enumerate(self.enquiries):
            if e["id"] == enquiry_id:
                e["status"] = update_in.status
                if update_in.notes is not None:
                    e["notes"] = update_in.notes
                self.enquiries[idx] = e
                return EnquiryResponse(**e)
        return None

enquiry_service = EnquiryService()
