import React from 'react';
import { QuoteForm } from '../components/enquiry/QuoteForm';
import { ShieldCheck, MessageSquare, Phone, Award } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { generatePhoneLink, generateWhatsAppLink } from '../utils/whatsapp';

export const Quote: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-orange-400 text-xs font-semibold">
          <Award className="h-3.5 w-3.5" />
          <span>50+ Years Legacy • Direct Supply from IDA Jeedimetla</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Request Quotation / Job Work</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Submit your requirements for <strong>Naagal</strong> (19" to 26"), <strong>Plow Material</strong>, <strong>MS Plates</strong> (all shapes), <strong>MS Sheets (HR)</strong>, or <strong>Profile Gas Cutting Works</strong>.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-8 shadow-xs">
        <QuoteForm isStandalonePage={true} />
      </div>

      {/* Quick Assistance Box */}
      <div className="bg-slate-100 rounded-lg border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-bold text-slate-800 flex items-center justify-center sm:justify-start gap-1.5">
            <ShieldCheck className="h-4 w-4 text-orange-600" />
            <span>Need Immediate Assistance or Have a Drawing?</span>
          </div>
          <p className="text-xs text-slate-600">
            For urgent tenders, custom cutting sketches, or same-day dispatch inquiries, connect directly with <strong>Tanveer Ahmed</strong>.
          </p>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={generatePhoneLink()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-orange-600" />
            <span>{BUSINESS_CONFIG.displayPhone}</span>
          </a>
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
