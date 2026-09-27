import React, { useState, useEffect } from 'react';
import { CheckCircle2, MessageSquare, Send, Phone } from 'lucide-react';
import { EnquiryFormData } from '../../types/enquiry';
import { Product } from '../../types/product';
import { enquiryService } from '../../services/enquiryService';
import { generateWhatsAppLink, generatePhoneLink } from '../../utils/whatsapp';
import { Button } from '../common/Button';

interface QuoteFormProps {
  initialProduct?: Product | null;
  initialService?: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
  isStandalonePage?: boolean;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialProduct,
  initialService,
  onSuccess,
  onCancel,
  isStandalonePage = false
}) => {
  const isNaagal = initialProduct?.id === 'prod-naagal' || initialProduct?.name.toLowerCase().includes('naagal');
  const isMSPlate = initialProduct?.id === 'prod-ms-plates' || initialProduct?.name.toLowerCase().includes('ms plate');
  const isMSSheet = initialProduct?.id === 'prod-ms-sheets-hr' || initialProduct?.name.toLowerCase().includes('sheet');
  const isService = initialService || initialProduct?.name?.toLowerCase().includes('gas cutting') || initialProduct?.name?.toLowerCase().includes('job work');

  const [formData, setFormData] = useState<EnquiryFormData>({
    product_id: initialProduct?.id || '',
    product_name: initialProduct?.name || (initialService ? 'Profile Gas Cutting & Job Works' : 'MS Plates'),
    customer_name: '', // Personal name or Company/Business name
    phone: '',
    email: '',
    quantity: '500 kg',
    required_size: initialProduct?.measurements?.[0] || initialProduct?.standard_sizes?.[0] || '1250 × 2500 mm',
    thickness: 'As per requirement',
    shape: isMSPlate ? 'Base Plates' : '',
    grade: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({
        ...prev,
        product_id: initialProduct.id,
        product_name: initialProduct.name,
        required_size: initialProduct.measurements?.[0] || initialProduct.standard_sizes?.[0] || prev.required_size,
        shape: initialProduct.shapes?.[0] || prev.shape,
        grade: initialProduct.grades?.[0] || prev.grade
      }));
    } else if (initialService) {
      setFormData(prev => ({
        ...prev,
        product_id: 'service-gas-cutting',
        product_name: 'Profile Gas Cutting & Job Works',
        shape: 'Base Plates'
      }));
    }
  }, [initialProduct, initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_name.trim() || !formData.phone.trim() || !formData.product_name.trim()) {
      setError('Please fill in required fields: Your Name / Company Name, Phone Number, and Product.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await enquiryService.createEnquiry(formData);
      setIsSubmitted(true);
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2500);
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to submit quotation. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    if (!formData.customer_name.trim()) {
      setError('Please enter Your Name / Company Name before sending on WhatsApp.');
      return;
    }

    const waUrl = generateWhatsAppLink({
      productName: formData.product_name,
      customerName: formData.customer_name,
      shape: formData.shape,
      grade: formData.grade,
      thickness: formData.thickness,
      size: formData.required_size,
      quantity: formData.quantity,
      customMessage: formData.message
    });
    window.open(waUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 px-4 space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Your enquiry has been submitted successfully.</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you <strong>{formData.customer_name}</strong>. Tanveer Ahmed and the sales team at NST Enterprises will review your specifications for <strong>{formData.product_name}</strong> and contact you promptly.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                product_id: '',
                product_name: 'MS Plates',
                customer_name: '',
                phone: '',
                email: '',
                quantity: '500 kg',
                required_size: '',
                thickness: 'As per requirement',
                shape: '',
                grade: '',
                message: ''
              });
            }}
          >
            Submit Another Quote
          </Button>

          <Button
            variant="success"
            size="sm"
            leftIcon={<MessageSquare className="h-4 w-4" />}
            onClick={handleWhatsAppRedirect}
          >
            Send on WhatsApp
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
          {error}
        </div>
      )}

      {/* Product / Service Name */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
          Product / Service Requirement <span className="text-red-500">*</span>
        </label>
        <select
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900 font-semibold"
        >
          <option value="Naagal">Naagal (Agricultural Cultivator Tyne)</option>
          <option value="Plow Material">Plow Material (Plow Shapes & Share Points)</option>
          <option value="MS Plates">MS Plates (Prime Mild Steel Plates)</option>
          <option value="MS Sheets (HR)">MS Sheets (HR) Hot Rolled</option>
          <option value="Profile Gas Cutting & Job Works">Profile Gas Cutting & Job Works (All Shapes)</option>
        </select>
      </div>

      {/* YOUR NAME / COMPANY NAME (Required as per Section 15) */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
          Your Name / Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="customer_name"
          required
          value={formData.customer_name}
          onChange={handleChange}
          placeholder="e.g. Ramesh Sharma or Sri Krishna Fabricators"
          className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
        />
      </div>

      {/* Phone Number & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            inputMode="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Email Address (Optional)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="e.g. contact@company.com"
            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
          />
        </div>
      </div>

      {/* PRODUCT SPECIFIC ADAPTIVE FIELDS (Section 17) */}

      {/* 1. NAAGAL SPECIFIC FIELDS */}
      {isNaagal && (
        <div className="p-3 bg-orange-50/60 rounded-md border border-orange-200 space-y-3">
          <div className="text-xs font-bold text-orange-900 uppercase">Naagal Size Specifications</div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Available Size (Inch) <span className="text-red-500">*</span>
            </label>
            <select
              name="required_size"
              value={formData.required_size}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 font-bold"
            >
              <option value="19 Inch">19" (19 Inch Naagal)</option>
              <option value="21 Inch">21" (21 Inch Naagal)</option>
              <option value="23 Inch">23" (23 Inch Naagal)</option>
              <option value="24 Inch">24" (24 Inch Naagal)</option>
              <option value="26 Inch">26" (26 Inch Naagal)</option>
              <option value="Mixed Sizes / Batch Requirement">Mixed Sizes / Custom Batch</option>
            </select>
          </div>
        </div>
      )}

      {/* 2. MS PLATES SPECIFIC FIELDS */}
      {isMSPlate && (
        <div className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase">MS Plate Shape & Grade Options</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Required Shape
              </label>
              <select
                name="shape"
                value={formData.shape || 'Base Plates'}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
              >
                <option value="Square Plates">Square Plates</option>
                <option value="Base Plates">Base Plates</option>
                <option value="Rectangle Plates">Rectangle Plates</option>
                <option value="Circles">Circles (Round Discs)</option>
                <option value="Rings">Rings (Flange Blanks)</option>
                <option value="Full Mother Plate">Full Mother Plate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Grade (Optional)
              </label>
              <select
                name="grade"
                value={formData.grade || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
              >
                <option value="">Standard Prime Grade</option>
                <option value="IS 2062">IS 2062</option>
                <option value="E250">E250</option>
                <option value="E350">E350 (High Tensile)</option>
                <option value="EN8">EN8 (Medium Carbon)</option>
                <option value="C45">C45 (High Wear)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 3. PROFILE GAS CUTTING & JOB WORKS SPECIFIC FIELDS */}
      {isService && (
        <div className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase">Profile Gas Cutting Specifications</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Required Shape
              </label>
              <input
                type="text"
                name="shape"
                value={formData.shape || ''}
                onChange={handleChange}
                placeholder="e.g. Base Plate with 4 holes, Ring Ø500mm"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Material / Grade
              </label>
              <input
                type="text"
                name="grade"
                value={formData.grade || ''}
                onChange={handleChange}
                placeholder="e.g. Mild Steel (IS 2062) or EN8"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* General Quantity, Thickness & Size Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Required Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="quantity"
            required
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 500 kg / 50 pcs / 2 tons"
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Required Thickness
          </label>
          <input
            type="text"
            name="thickness"
            value={formData.thickness || ''}
            onChange={handleChange}
            placeholder="e.g. 12 mm / 20 mm / As required"
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Required Size / Dimensions
          </label>
          <input
            type="text"
            name="required_size"
            value={formData.required_size || ''}
            onChange={handleChange}
            placeholder="e.g. 1500 × 6300 mm / Custom"
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
          />
        </div>
      </div>

      {/* Additional Message / Notes */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
          Additional Notes / Drawings / Delivery Specs
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message || ''}
          onChange={handleChange}
          placeholder="Mention hole diameters, urgency, drawing specs, or delivery location..."
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleWhatsAppRedirect}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-md transition-colors shadow-xs"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Send Enquiry on WhatsApp</span>
        </button>

        <div className="w-full sm:w-auto flex items-center justify-end gap-2">
          {onCancel && !isStandalonePage && (
            <Button type="button" variant="outline" size="md" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            leftIcon={<Send className="h-4 w-4" />}
          >
            Submit Enquiry
          </Button>
        </div>
      </div>
    </form>
  );
};
