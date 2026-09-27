import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  MessageSquare,
  Phone,
  ZoomIn,
  X,
  Building2,
  ExternalLink,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { BUSINESS_CONFIG, FACILITY_PHOTO_ASSET } from '../../config/business';
import { generateWhatsAppLink } from '../../utils/whatsapp';

interface FacilitySectionProps {
  /**
   * Optional custom image source.
   * Defaults to FACILITY_PHOTO_ASSET from business config.
   * To change the photo globally, update src/assets/facility.webp or business.ts.
   */
  imageSrc?: string;
  className?: string;
}

export const FacilitySection: React.FC<FacilitySectionProps> = ({
  imageSrc = FACILITY_PHOTO_ASSET,
  className = ''
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Exact facility address required
  const facilityAddress = {
    name: 'NST ENTERPRISES',
    line1: 'Plot No: 125, Phase V Doolapally Road,',
    landmark: 'near HARYANA WEIGH BRIDGE,',
    area: 'IDA Jeedimetla, Hyderabad,',
    stateZip: 'Telangana 500055'
  };

  const exactAddressQuery = `${facilityAddress.name}, ${facilityAddress.line1} ${facilityAddress.landmark} ${facilityAddress.area} ${facilityAddress.stateZip}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(exactAddressQuery)}`;
  const whatsAppUrl = generateWhatsAppLink({
    customMessage: "Hello Tanveer Ahmed, I would like to inquire about visiting your NST Enterprises facility in IDA Jeedimetla, Hyderabad."
  });

  // Handle ESC key for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <section 
      id="our-facility"
      className={`relative bg-gradient-to-b from-white via-slate-50/60 to-white py-12 sm:py-16 border-b border-slate-200/80 ${className}`}
      aria-label="Our Facility - Visit NST Enterprises"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-700 text-xs font-bold tracking-wide uppercase mb-3">
            <Building2 className="h-3.5 w-3.5 text-orange-600" />
            <span>Our Facility</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Visit NST Enterprises
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 sm:mt-3 leading-relaxed">
            Serving industrial and agricultural metal requirements from our facility in IDA Jeedimetla, Hyderabad, with over 50+ years of experience.
          </p>
        </div>

        {/* Two-Column Layout (Desktop) / Image first, Information below (Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Column 1: Prominent Facility Photograph (Mobile: Order 1) */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1">
            <div className="relative group">
              
              {/* Image Frame with Aspect Ratio preservation and subtle styling */}
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 bg-slate-950 aspect-[680/382] flex items-center justify-center"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsLightboxOpen(true);
                  }
                }}
                aria-label="Click to view full facility photograph"
              >
                <img
                  src={imageSrc}
                  alt="NST Enterprises Facility at IDA Jeedimetla, Hyderabad"
                  className="w-full h-full object-cover sm:object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out select-none"
                  loading="lazy"
                />

                {/* Subtle gradient vignette at bottom for badge contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

                {/* Top Location Pill Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold border border-slate-700/60 shadow-xs">
                    <MapPin className="h-3 w-3 text-orange-400 shrink-0" />
                    <span className="truncate">IDA Jeedimetla, Hyderabad</span>
                  </div>
                </div>

                {/* Bottom Left Experience Badge */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 hidden sm:block">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md text-slate-200 text-xs font-medium border border-slate-700/60 shadow-xs">
                    <Clock className="h-3 w-3 text-amber-400 shrink-0" />
                    <span>Serving Fabricators Since 1970s</span>
                  </div>
                </div>

                {/* Bottom Right Click to Enlarge Indicator */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md bg-orange-600/90 hover:bg-orange-600 backdrop-blur-md text-white text-xs font-bold transition-all shadow-md group-hover:scale-105">
                    <ZoomIn className="h-3.5 w-3.5 text-white" />
                    <span className="hidden xs:inline sm:inline">View Full Photo</span>
                    <span className="xs:hidden sm:hidden">Enlarge</span>
                  </div>
                </div>
              </div>

              {/* Caption helper below image */}
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Actual NST Enterprises Facility & Cutting Yard</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Click to zoom</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>

            </div>
          </div>

          {/* Column 2: Facility Information & Direct Contact (Mobile: Order 2) */}
          <div className="lg:col-span-5 flex flex-col justify-between order-2">
            <div className="h-full bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between space-y-6">
              
              {/* Facility Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                    Operational Yard
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Mon - Sat (9 AM - 8 PM)
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {facilityAddress.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Contact: <span className="font-semibold text-slate-800">{BUSINESS_CONFIG.contactPerson}</span>
                </p>
              </div>

              {/* Facility Address Block */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700 uppercase tracking-wide">
                  <MapPin className="h-4 w-4 text-orange-600 shrink-0" />
                  <span>Facility Address</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100 text-slate-700 text-xs sm:text-sm font-sans space-y-0.5 leading-relaxed">
                  <p className="font-bold text-slate-900">{facilityAddress.name}</p>
                  <p>{facilityAddress.line1}</p>
                  <p className="text-amber-700 font-semibold">{facilityAddress.landmark}</p>
                  <p>{facilityAddress.area}</p>
                  <p className="font-medium text-slate-900">{facilityAddress.stateZip}</p>
                </div>
              </div>

              {/* Direct Communication Lines */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Direct Inquiries & Yard Visit
                </div>

                {/* WhatsApp Link */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-emerald-900 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-emerald-600 text-white rounded-md group-hover:scale-105 transition-transform">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-mono font-bold text-xs sm:text-sm text-emerald-950">
                        9505456781
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium">Business WhatsApp / Call</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/90 group-hover:bg-emerald-200 px-2.5 py-1 rounded">
                    Chat Now
                  </span>
                </a>

                {/* Calling Phone Link */}
                <a
                  href="tel:+918328137740"
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-slate-800 text-white rounded-md group-hover:scale-105 transition-transform">
                      <Phone className="h-4 w-4 text-orange-400" />
                    </div>
                    <div>
                      <div className="font-mono font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
                        8328137740
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Phone Support Line</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 bg-slate-200/80 px-2.5 py-1 rounded">
                    Call
                  </span>
                </a>
              </div>

              {/* Prominent "Get Directions" Button */}
              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all group"
                >
                  <Navigation className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal for Facility Photograph */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged facility photograph"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Container */}
          <div 
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-orange-500" />
                <h3 className="font-bold text-sm sm:text-base text-white">
                  NST Enterprises — Facility Photograph
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="p-3 sm:p-5 flex items-center justify-center bg-slate-950 overflow-auto">
              <img
                src={imageSrc}
                alt="NST Enterprises Facility View"
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-lg border border-slate-800"
              />
            </div>

            {/* Modal Footer with Address and Quick Actions */}
            <div className="px-4 sm:px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-slate-300 text-center sm:text-left leading-relaxed">
                <span className="font-bold text-white">NST ENTERPRISES:</span> Plot No: 125, Phase V Doolapally Road, near HARYANA WEIGH BRIDGE, IDA Jeedimetla, Hyderabad (500055)
              </div>
              
              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-600 hover:bg-orange-500 text-white font-bold transition-colors"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
