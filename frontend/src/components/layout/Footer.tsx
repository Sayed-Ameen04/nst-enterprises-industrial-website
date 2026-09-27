import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, ArrowRight, Shield, Award, User } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';
import { generatePhoneLink, generateWhatsAppLink, generateEmailLink } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Footer Banner */}
      <div className="border-b border-slate-900 bg-slate-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-white font-bold text-lg">Need Immediate MS Plates or Profile Gas Cutting Pricing?</h3>
            <p className="text-slate-400 text-xs">Direct support for full plate supplies (1250x2500 to 2500x6000 mm), Naagal tynes, and custom shape job works.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={generatePhoneLink()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-semibold transition-colors border border-slate-700"
            >
              <Phone className="h-4 w-4 text-orange-400" />
              <span>Call: {BUSINESS_CONFIG.displayPhone}</span>
            </a>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-xs font-semibold transition-colors shadow-sm"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp: 9505456781</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 bg-orange-600 rounded flex items-center justify-center text-white font-black text-sm">
                NST
              </div>
              <span className="text-white font-black text-base tracking-tight">
                {BUSINESS_CONFIG.businessName}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {BUSINESS_CONFIG.shortDescription}
            </p>
            <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold">
              <Award className="h-4 w-4 text-orange-500 shrink-0" />
              <span>50 - 55 Years of Industrial Excellence</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-slate-600" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-orange-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-slate-600" />
                  <span>All Products & Shapes</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-slate-600" />
                  <span>About Business & Heritage</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-slate-600" />
                  <span>Contact & Works Location</span>
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-orange-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-slate-600" />
                  <span>Request Quotation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Product Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=cat-agri" className="hover:text-orange-400 transition-colors">
                  Agriculture (Naagal & Plow Shapes)
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-ms-plates" className="hover:text-orange-400 transition-colors">
                  MS Plates (IS 2062, E250, E350, EN8, C45)
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-ms-sheets" className="hover:text-orange-400 transition-colors">
                  MS Sheets (Hot Rolled - HR)
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-industrial-shapes" className="hover:text-orange-400 transition-colors">
                  Profile Gas Cutting (Base Plates, Circles, Rings)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Business Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Contact Information</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <User className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-300 font-bold">
                  {BUSINESS_CONFIG.contactPerson}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-tight">
                  {BUSINESS_CONFIG.address.full}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-500 shrink-0" />
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors font-mono">
                  WhatsApp: {BUSINESS_CONFIG.displayWhatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-500 shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.secondaryPhone}`} className="text-slate-300 hover:text-white transition-colors font-mono">
                  Alt Phone: {BUSINESS_CONFIG.displaySecondaryPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                <a href={generateEmailLink()} className="text-slate-300 hover:text-white transition-colors font-mono">
                  {BUSINESS_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} {BUSINESS_CONFIG.businessName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">IDA Jeedimetla, Hyderabad</span>
            <Link to="/admin" className="text-slate-500 hover:text-orange-400 transition-colors">
              Owner Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
