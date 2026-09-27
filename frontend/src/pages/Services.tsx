import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Wrench,
  Layers,
  ShieldCheck,
  CheckCircle2,
  FileText,
  MessageSquare,
  Phone,
  ArrowRight,
  Sparkles,
  Scissors
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { generatePhoneLink, generateWhatsAppLink } from '../utils/whatsapp';
import { Button } from '../components/common/Button';

interface ServicesProps {
  onOpenQuoteModal: (product?: any, service?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header Banner */}
      <section className="bg-slate-950 text-white rounded-xl p-6 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-orange-400 text-xs font-semibold">
            <Flame className="h-3.5 w-3.5" />
            <span>Industrial Service Division</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Profile Gas Cutting & Job Works
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            NST Enterprises specializes in high-precision profile gas cutting and custom metal job works directly executed from MS plates. We deliver clean edge-cut profiles in all custom shapes and dimensions.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="md"
              leftIcon={<FileText className="h-4 w-4" />}
              onClick={() => onOpenQuoteModal(null, 'Profile Gas Cutting & Job Works')}
            >
              Request Job Work Quote
            </Button>
            <a
              href={generateWhatsAppLink({
                productName: 'Profile Gas Cutting & Job Works',
                customMessage: 'Inquiring about custom profile gas cutting job work with drawing specs.'
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-bold transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Drawing</span>
            </a>
          </div>
        </div>
      </section>

      {/* Service Capabilities Grid */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">Our Capabilities</div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Precision Cutting in All Shapes & Sizes</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            From single prototype blanks to bulk fabrication production runs, we provide custom job works conforming to your drawing specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Base Plates */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Base Plates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Industrial column base plates, foundation mounting pads, and heavy machinery foot plates cut with accurate edge squareness and bolt hole cutouts.
            </p>
          </div>

          {/* Square & Rectangle Plates */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <Scissors className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Square & Rectangle Plates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Custom length and width rectangular blanks and square plates cut from full prime mother plates (1250x2500, 1500x6300, 2500x6000 mm).
            </p>
          </div>

          {/* Circles & Round Discs */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Circles & Round Discs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              True-radius round discs and circular blanks for gear machining, vessel covers, blind flanges, and heavy rotary machine components.
            </p>
          </div>

          {/* Rings & Flange Blanks */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <Wrench className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Rings & Flange Blanks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dual-profile concentric inner and outer diameter flame cut rings for pipe flanges, bearing housings, and seal gaskets.
            </p>
          </div>

          {/* Neat Finishing */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Neat Finishing of Cut Materials</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every gas-cut piece undergoes thorough slag removal and edge deburring, delivering smooth, ready-to-use edges.
            </p>
          </div>

          {/* Prime Material Commitment */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Prime Material for Job Works</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Profile cutting executed on prime certified grades (IS 2062, E250, E350, EN8, C45) ensuring mechanical soundness throughout.
            </p>
          </div>

        </div>
      </section>

      {/* How to Order Job Works Box */}
      <section className="bg-slate-900 text-white rounded-xl p-6 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold">Have a CAD Drawing, Shape Sketch or Cut List?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Send your cut list, DXF/PDF drawing, or shape dimensions. Tanveer Ahmed will provide an itemized quotation and cutting timeline.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={() => onOpenQuoteModal(null, 'Profile Gas Cutting & Job Works')}
          >
            Enquire Now
          </Button>
          <a
            href={generatePhoneLink()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-sm font-bold border border-slate-700 transition-colors"
          >
            <Phone className="h-4 w-4 text-orange-400" />
            <span>Call: {BUSINESS_CONFIG.displayPhone}</span>
          </a>
        </div>
      </section>

    </div>
  );
};
