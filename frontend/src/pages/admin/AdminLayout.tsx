import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Inbox,
  Settings,
  ArrowLeft,
  ShieldAlert,
  ExternalLink,
  Plus
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';

export const AdminLayout: React.FC = () => {
  const adminNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-bold transition-colors ${
      isActive
        ? 'bg-orange-600 text-white shadow-xs'
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 bg-orange-600 rounded flex items-center justify-center font-black text-white text-sm">
                NST
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-white">Admin Control</div>
                <div className="text-[10px] text-slate-400 font-mono">NST Enterprises</div>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 py-1">
              Management
            </div>
            <NavLink to="/admin" end className={adminNavLinkClass}>
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin/products" className={adminNavLinkClass}>
              <Package className="h-4 w-4" />
              <span>Products Catalogue</span>
            </NavLink>
            <NavLink to="/admin/enquiries" className={adminNavLinkClass}>
              <Inbox className="h-4 w-4" />
              <span>Quotation Enquiries</span>
            </NavLink>

            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pt-4 pb-1">
              Configuration
            </div>
            <NavLink to="/admin/settings" className={adminNavLinkClass}>
              <Settings className="h-4 w-4" />
              <span>Business Settings</span>
            </NavLink>
          </nav>
        </div>

        {/* Bottom Sidebar: Return to Customer Storefront */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/admin/products/new"
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded-md text-xs font-bold transition-colors border border-slate-700"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add New Product</span>
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-white py-2 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Exit to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <main className="flex-1 bg-slate-900 min-h-screen overflow-y-auto">
        {/* Top Navbar */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            NST Enterprises Business Management Console
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Prototype In-Memory / API
            </span>
            <Link
              to="/"
              target="_blank"
              className="text-xs text-slate-400 hover:text-orange-400 inline-flex items-center gap-1"
            >
              <span>View Live Site</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Content Outlet */}
        <div className="p-6 sm:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
};
