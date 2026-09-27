export type EnquiryStatus = 'New' | 'Pending' | 'Contacted' | 'Completed';

export interface Enquiry {
  id: string;
  product_id?: string;
  product_name: string;
  customer_name: string; // Personal name or Company/Business name
  phone: string;
  email?: string;
  quantity: string;
  required_size?: string;
  thickness?: string;
  shape?: string;
  grade?: string;
  message?: string;
  created_at: string;
  status: EnquiryStatus;
  notes?: string;
}

export type EnquiryFormData = Omit<Enquiry, 'id' | 'created_at' | 'status' | 'notes'>;
