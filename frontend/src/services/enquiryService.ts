import { Enquiry, EnquiryFormData, EnquiryStatus } from '../types/enquiry';
import { INITIAL_ENQUIRIES } from '../data/enquiries';
import { request } from './api';

const LOCAL_ENQUIRIES_KEY = 'nst_enquiries_data';

function getStoredEnquiries(): Enquiry[] {
  try {
    const data = localStorage.getItem(LOCAL_ENQUIRIES_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return INITIAL_ENQUIRIES;
}

function saveStoredEnquiries(enquiries: Enquiry[]) {
  try {
    localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(enquiries));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

export const enquiryService = {
  async getEnquiries(status?: string, search?: string): Promise<Enquiry[]> {
    try {
      const queryParams = new URLSearchParams();
      if (status && status !== 'all') queryParams.append('status', status);
      if (search) queryParams.append('search', search);

      const queryString = queryParams.toString();
      const endpoint = `/api/enquiries${queryString ? `?${queryString}` : ''}`;
      return await request<Enquiry[]>(endpoint);
    } catch {
      let enquiries = getStoredEnquiries();
      if (status && status !== 'all') {
        enquiries = enquiries.filter(e => e.status.toLowerCase() === status.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        enquiries = enquiries.filter(e =>
          e.customer_name.toLowerCase().includes(q) ||
          e.product_name.toLowerCase().includes(q) ||
          e.phone.toLowerCase().includes(q) ||
          (e.email && e.email.toLowerCase().includes(q))
        );
      }
      return enquiries;
    }
  },

  async createEnquiry(formData: EnquiryFormData): Promise<Enquiry> {
    try {
      const newEnquiry = await request<Enquiry>('/api/enquiries', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const stored = getStoredEnquiries();
      saveStoredEnquiries([newEnquiry, ...stored]);
      return newEnquiry;
    } catch {
      const stored = getStoredEnquiries();
      const newEnquiry: Enquiry = {
        ...formData,
        id: `enq-${Date.now().toString(36)}`,
        created_at: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'New',
        notes: 'Submitted via Website'
      };
      saveStoredEnquiries([newEnquiry, ...stored]);
      return newEnquiry;
    }
  },

  async updateStatus(id: string, status: EnquiryStatus, notes?: string): Promise<Enquiry> {
    try {
      const updated = await request<Enquiry>(`/api/enquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status, notes })
      });
      const stored = getStoredEnquiries();
      const idx = stored.findIndex(e => e.id === id);
      if (idx !== -1) {
        stored[idx] = updated;
        saveStoredEnquiries([...stored]);
      }
      return updated;
    } catch {
      const stored = getStoredEnquiries();
      const idx = stored.findIndex(e => e.id === id);
      if (idx === -1) throw new Error('Enquiry not found');
      const updated = {
        ...stored[idx],
        status,
        ...(notes !== undefined ? { notes } : {})
      };
      stored[idx] = updated;
      saveStoredEnquiries([...stored]);
      return updated;
    }
  }
};
