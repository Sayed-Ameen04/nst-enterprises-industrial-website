import React, { useState } from 'react';
import { BUSINESS_CONFIG, BusinessConfig } from '../../config/business';
import { Button } from '../../components/common/Button';
import { Save, CheckCircle2, Building, Phone, Mail, MapPin, FileText } from 'lucide-react';

export const Settings: React.FC = () => {
  const [config, setConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem('nst_business_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return BUSINESS_CONFIG;
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressKey = name.split('.')[1] as keyof BusinessConfig['address'];
      setConfig(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressKey]: value,
          full: addressKey === 'full' ? value : prev.address.full
        }
      }));
    } else {
      setConfig(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      localStorage.setItem('nst_business_config', JSON.stringify(config));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      alert('Failed to save settings to local state');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Business Profile & Contact Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure business name, telephone lines, WhatsApp number, email, and facility address.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Settings saved successfully in local prototype storage.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Brand Information */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Brand Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={config.businessName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={config.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Short Description / Summary
            </label>
            <textarea
              name="shortDescription"
              rows={2}
              value={config.shortDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Contact Channels & Numbers</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Phone Number (E.164 Format)
              </label>
              <input
                type="text"
                name="phone"
                value={config.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Display Phone (UI Format)
              </label>
              <input
                type="text"
                name="displayPhone"
                value={config.displayPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                WhatsApp Number (E.164 Format)
              </label>
              <input
                type="text"
                name="whatsapp"
                value={config.whatsapp}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Business Email Address
              </label>
              <input
                type="email"
                name="email"
                value={config.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Working Hours
              </label>
              <input
                type="text"
                name="workingHours"
                value={config.workingHours}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Working Days
              </label>
              <input
                type="text"
                name="workingDays"
                value={config.workingDays}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Location & Address */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Facility Address</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Full Formatted Address
            </label>
            <input
              type="text"
              name="address.full"
              value={config.address.full}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            leftIcon={<Save className="h-4 w-4" />}
          >
            Save Settings
          </Button>
        </div>

      </form>
    </div>
  );
};
