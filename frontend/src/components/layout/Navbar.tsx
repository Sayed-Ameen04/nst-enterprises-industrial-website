import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, FileText, Search, Menu, X, ShieldCheck, Award } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';
import { generatePhoneLink, generateWhatsAppLink } from '../../utils/whatsapp';
import { Button } from '../common/Button';
import { Product } from '../../types/product';

interface NavbarProps {
  onOpenQuoteModal?: (product?: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-semibold transition-colors duration-150 rounded-md ${
      isActive
        ? 'text-orange-600 bg-orange-50 font-bold'
        : 'text-slate-700 hover:text-orange-600 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top emergency / quick contact bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Award className="h-3.5 w-3.5 text-orange-400 shrink-0" />
              <span>50+ Years Legacy • IDA Jeedimetla, Hyderabad</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-slate-400">
              Direct Contact: <strong>{BUSINESS_CONFIG.contactPerson}</strong> ({BUSINESS_CONFIG.displayPhone})
            </span>
            <Link to="/admin" className="text-slate-400 hover:text-orange-400 text-xs font-mono transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-4">
          
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <div className="h-9 w-9 sm:h-10 sm:w-10 bg-slate-900 rounded-md flex items-center justify-center text-orange-500 border border-slate-800 group-hover:border-orange-500 transition-colors shadow-sm">
              <span className="font-extrabold text-base sm:text-lg tracking-wider">NST</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                {BUSINESS_CONFIG.businessName}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-500 -mt-1">
                Metal & Agriculture
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-2">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search Naagal, MS Plates, HR Sheets..."
                value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900 transition-all placeholder:text-slate-400"
              />
              <Search className="h-4 w-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          {/* Action CTAs: Call, WhatsApp, Get Quote */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={generatePhoneLink()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-md border border-slate-200 transition-colors"
              title={`Call Tanveer Ahmed at ${BUSINESS_CONFIG.displayPhone}`}
            >
              <Phone className="h-3.5 w-3.5 text-slate-600" />
              <span>Call</span>
            </a>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Button
              size="sm"
              variant="primary"
              leftIcon={<FileText className="h-3.5 w-3.5" />}
              onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : navigate('/quote')}
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-2">
            <input
              type="text"
              placeholder="Search Naagal, MS Plates, HR Sheets..."
              value={navSearch}
              onChange={e => setNavSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900"
            />
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-1">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Products (Agriculture & Industrial)</NavLink>
            <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Services (Profile Gas Cutting)</NavLink>
            <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>About & 50+ Years Legacy</NavLink>
            <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Contact & Yard Location</NavLink>
            <NavLink to="/quote" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Request Quotation</NavLink>
            <NavLink to="/admin" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Admin Dashboard</NavLink>
          </div>

          {/* Mobile Direct Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <a
              href={generatePhoneLink()}
              className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-800 bg-slate-100 rounded-md border border-slate-300"
            >
              <Phone className="h-4 w-4 text-slate-600" />
              <span>Call Now</span>
            </a>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-md border border-emerald-300"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
