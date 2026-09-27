import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Mail,
  CheckCircle,
  Clock,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '../../types/enquiry';
import { enquiryService } from '../../services/enquiryService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { getStatusBadgeClass } from '../../utils/formatters';
import { generateWhatsAppLink, generatePhoneLink, generateEmailLink } from '../../utils/whatsapp';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

export const Enquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [statusNote, setStatusNote] = useState('');

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const data = await enquiryService.getEnquiries();
      setEnquiries(data);
    } catch (e) {
      console.error('Failed to load enquiries:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const updated = await enquiryService.updateStatus(id, newStatus, statusNote || undefined);
      setEnquiries(prev => prev.map(e => e.id === id ? updated : e));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(updated);
      }
      setStatusNote('');
    } catch (e) {
      alert('Failed to update enquiry status');
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesStatus = statusFilter === 'all' || e.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      search === '' ||
      e.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      e.product_name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.toLowerCase().includes(search.toLowerCase()) ||
      (e.email && e.email.toLowerCase().includes(search.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Quotation Enquiries</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review customer inquiries, required gauges, tonnage, and update sales pipeline statuses.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search by customer name, product, or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['all', 'New', 'Pending', 'Contacted', 'Completed'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs rounded-md font-semibold transition-colors shrink-0 ${
                statusFilter.toLowerCase() === st.toLowerCase()
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st === 'all' ? 'All Enquiries' : st}
            </button>
          ))}
        </div>

      </div>

      {/* Enquiries Table */}
      {isLoading ? (
        <LoadingSpinner message="Fetching enquiry inbox..." />
      ) : (
        <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Product / Item</th>
                  <th className="py-3 px-4">Quantity / Size</th>
                  <th className="py-3 px-4">Received On</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No matching enquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map(enq => (
                    <tr key={enq.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{enq.customer_name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{enq.phone}</div>
                        {enq.email && <div className="text-[10px] text-slate-500">{enq.email}</div>}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{enq.product_name}</div>
                        {enq.thickness && (
                          <div className="text-[11px] text-slate-400">Gauge: {enq.thickness}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-orange-400">{enq.quantity}</div>
                        {enq.required_size && (
                          <div className="text-[11px] text-slate-400">{enq.required_size}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{enq.created_at}</td>
                      <td className="py-3 px-4">
                        {/* Status Select dropdown */}
                        <select
                          value={enq.status}
                          onChange={e => handleStatusUpdate(enq.id, e.target.value as EnquiryStatus)}
                          className={`text-[11px] font-bold rounded py-1 px-2 border cursor-pointer focus:outline-none ${getStatusBadgeClass(enq.status)}`}
                        >
                          <option value="New">New</option>
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedEnquiry(enq)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold transition-colors"
                          >
                            Details
                          </button>
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 rounded"
                            title="Open in WhatsApp"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                          </a>
                          <a
                            href={`tel:${enq.phone}`}
                            className="p-1 text-slate-400 hover:text-white bg-slate-800 rounded"
                            title="Call Customer"
                          >
                            <Phone className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enquiry Details Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry #${selectedEnquiry.id}`}
          subtitle={`Received on ${selectedEnquiry.created_at}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-500 font-semibold block">Customer Name</span>
                <span className="text-slate-900 font-bold text-sm">{selectedEnquiry.customer_name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Phone</span>
                <span className="text-slate-900 font-mono font-bold">{selectedEnquiry.phone}</span>
              </div>
              {selectedEnquiry.email && (
                <div className="col-span-2">
                  <span className="text-slate-500 font-semibold block">Email</span>
                  <span className="text-slate-900 font-mono">{selectedEnquiry.email}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 font-semibold block">Product Required</span>
                  <span className="text-slate-900 font-bold">{selectedEnquiry.product_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Quantity</span>
                  <span className="text-orange-600 font-mono font-bold">{selectedEnquiry.quantity}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Size</span>
                  <span className="text-slate-900">{selectedEnquiry.required_size || 'Standard'}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Thickness</span>
                  <span className="text-slate-900">{selectedEnquiry.thickness || 'Standard'}</span>
                </div>
              </div>

              {selectedEnquiry.message && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-semibold block">Customer Notes / Specs</span>
                  <p className="text-slate-800 italic mt-0.5">{selectedEnquiry.message}</p>
                </div>
              )}
            </div>

            {/* Status Change Controls */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <label className="font-bold text-slate-800 uppercase tracking-wider block">
                Update Processing Status
              </label>
              <div className="flex flex-wrap gap-2">
                {(['New', 'Pending', 'Contacted', 'Completed'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => handleStatusUpdate(selectedEnquiry.id, st)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                      selectedEnquiry.status === st
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelectedEnquiry(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
