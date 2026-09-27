import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  User,
  ShieldCheck,
  Award,
  Navigation
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { generatePhoneLink, generateWhatsAppLink, generateEmailLink } from '../utils/whatsapp';
import { enquiryService } from '../services/enquiryService';
import { Button } from '../components/common/Button';

export const Contact: React.FC = () => {
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_CONFIG.address.full)}`;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'MS Plates & Profile Cutting Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please provide your name, phone number, and message.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await enquiryService.createEnquiry({
        customer_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        product_name: `Contact Form: ${formData.subject}`,
        quantity: 'N/A',
        message: formData.message
      });
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please reach out directly on WhatsApp: 9505456781.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-xl p-8 border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-orange-400 text-xs font-semibold mb-3">
          <Award className="h-3.5 w-3.5" />
          <span>50+ Years Industrial Legacy • IDA Jeedimetla, Hyderabad</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight">Contact {BUSINESS_CONFIG.businessName}</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Connect directly with <strong>Tanveer Ahmed</strong> for MS Plates, HR Sheets, Profile Gas Cutting & Job Works, and Naagal (Cultivator Tynes).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Contact Info & Action Channels */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Business Contact Desk</span>
              <span className="text-xs text-orange-600 font-normal">Direct Contact</span>
            </h3>

            <div className="space-y-4 text-xs">
              
              {/* Contact Person */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-md shrink-0 mt-0.5">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Key Contact Person</div>
                  <p className="text-slate-800 font-semibold text-sm mt-0.5">{BUSINESS_CONFIG.contactPerson}</p>
                  <span className="text-[11px] text-slate-500">Managing Director / Sales Desk</span>
                </div>
              </div>

              {/* Physical Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-md shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-orange-600" />
                </div>
                <div className="space-y-2 flex-1">
                  <div>
                    <div className="font-bold text-slate-900">Office & Works Location</div>
                    <p className="text-slate-700 mt-0.5 leading-relaxed font-medium">
                      {BUSINESS_CONFIG.address.full}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded font-mono font-semibold">
                        Near Haryana Weigh Bridge
                      </span>
                      <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono">
                        IDA Jeedimetla
                      </span>
                    </div>
                  </div>

                  <div>
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      <span>Get Directions (Google Maps)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Primary Phone / WhatsApp */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Business WhatsApp & Phone</div>
                  <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-800 font-mono font-bold text-sm block">
                    {BUSINESS_CONFIG.displayWhatsapp} (Primary WhatsApp)
                  </a>
                </div>
              </div>

              {/* Secondary Phone */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-md shrink-0">
                  <Phone className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Alternative Calling Line</div>
                  <a href={`tel:${BUSINESS_CONFIG.secondaryPhone}`} className="text-slate-700 hover:text-orange-600 font-mono font-bold">
                    {BUSINESS_CONFIG.displaySecondaryPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-md shrink-0">
                  <Mail className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Email Address</div>
                  <a href={generateEmailLink()} className="text-slate-700 hover:text-orange-600 font-mono">
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-md shrink-0">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Yard & Operations Hours</div>
                  <p className="text-slate-600">{BUSINESS_CONFIG.workingHours} ({BUSINESS_CONFIG.workingDays})</p>
                </div>
              </div>

            </div>

            {/* Direct Instant Action Buttons */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <a
                href={generatePhoneLink()}
                className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-300 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-orange-600" />
                <span>Call {BUSINESS_CONFIG.displayPhone}</span>
              </a>

              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors shadow-xs"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>

          {/* Location Landmark Card */}
          <div className="bg-slate-100 rounded-lg border border-slate-200 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <MapPin className="h-4 w-4 text-orange-600" />
              <span>Location Landmark</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Located on Phase V Doolapally Road in IDA Jeedimetla, right near the <strong>Haryana Weigh Bridge</strong>. Direct access for heavy transport trucks and trailers for loading full plates and job works.
            </p>
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 rounded-md border border-slate-300 transition-colors shadow-2xs"
            >
              <Navigation className="h-3.5 w-3.5 text-orange-600" />
              <span>Open Google Maps Directions</span>
            </a>
          </div>

        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Send a Message / Requirement</h3>
            <p className="text-xs text-slate-500 mb-6">
              Specify your required plate thickness, Naagal sizes (19" to 26"), or profile gas cutting drawings.
            </p>

            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Message Delivered to Tanveer Ahmed</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for contacting NST Enterprises. We will review your specification and get back to you promptly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      subject: 'MS Plates & Profile Cutting Inquiry',
                      message: ''
                    });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Name / Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Hyderabad Fabricators / Anil Kumar"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 95054 56781"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. user@company.com"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Requirement Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
                    >
                      <option value="MS Plates & Standard Sizes">MS Plates (IS 2062, E250, E350, EN8, C45)</option>
                      <option value="MS Sheets (HR)">MS Sheets (HR) Hot Rolled</option>
                      <option value="Naagal (Cultivator Tynes 19-26 inch)">Naagal (Cultivator Tynes 19" - 26")</option>
                      <option value="Plow Material & Shapes">Plow Material & Shapes</option>
                      <option value="Profile Gas Cutting Works">Profile Gas Cutting (Base Plates, Circles, Rings)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Specific Dimensions / Required Tonnage / Shapes <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention standard dimensions (e.g. 1500x6300 mm), thickness (16mm, 20mm), Naagal inch sizes (21, 23, 24, 26), or circle/ring diameters..."
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="h-4 w-4" />}
                >
                  Send Requirement
                </Button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
