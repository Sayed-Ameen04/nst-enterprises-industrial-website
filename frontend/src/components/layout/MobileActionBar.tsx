import React from 'react';
import { Phone, MessageSquare, FileText } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';
import { generatePhoneLink, generateWhatsAppLink } from '../../utils/whatsapp';

interface MobileActionBarProps {
  onOpenQuoteModal: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Call Button */}
        <a
          href={generatePhoneLink()}
          aria-label={`Call ${BUSINESS_CONFIG.businessName} directly`}
          className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-md border border-slate-800 active:scale-95 transition-all text-center"
        >
          <Phone className="h-4 w-4 text-orange-400 mb-0.5" />
          <span className="text-[10px] font-bold">Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message ${BUSINESS_CONFIG.contactPerson} on WhatsApp`}
          className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md active:scale-95 transition-all text-center shadow-xs"
        >
          <MessageSquare className="h-4 w-4 mb-0.5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        {/* Quote Button */}
        <button
          type="button"
          onClick={onOpenQuoteModal}
          aria-label="Request a custom price quotation"
          className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md active:scale-95 transition-all text-center shadow-xs cursor-pointer"
        >
          <FileText className="h-4 w-4 mb-0.5" />
          <span className="text-[10px] font-bold">Get Quote</span>
        </button>

      </div>
    </div>
  );
};
