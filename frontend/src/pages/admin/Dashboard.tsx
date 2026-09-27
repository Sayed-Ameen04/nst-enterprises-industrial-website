import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  Inbox,
  Clock,
  ArrowRight,
  TrendingUp,
  Plus,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { productService } from '../../services/productService';
import { enquiryService } from '../../services/enquiryService';
import { Product } from '../../types/product';
import { Category } from '../../types/category';
import { Enquiry } from '../../types/enquiry';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { getStatusBadgeClass } from '../../utils/formatters';
import { Button } from '../../components/common/Button';

export const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      try {
        const [cats, prods, enqs] = await Promise.all([
          productService.getCategories(),
          productService.getProducts(),
          enquiryService.getEnquiries()
        ]);
        setCategories(cats);
        setProducts(prods);
        setEnquiries(enqs);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Calculating dashboard statistics..." fullHeight />;
  }

  const newEnquiriesCount = enquiries.filter(e => e.status.toLowerCase() === 'new').length;
  const pendingEnquiriesCount = enquiries.filter(e => e.status.toLowerCase() === 'pending').length;
  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Admin Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of NST Enterprises product catalog, quotation intake, and business operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/products/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Add Product
            </Button>
          </Link>
          <Link to="/admin/enquiries">
            <Button variant="outline" size="sm" className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
              Manage Enquiries
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Total Products */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Products</span>
            <div className="text-3xl font-black text-white">{products.length}</div>
            <Link to="/admin/products" className="text-[11px] text-orange-400 hover:underline flex items-center gap-1">
              <span>View catalog</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-3 bg-slate-900 text-orange-500 rounded-lg border border-slate-800">
            <Package className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 2: Categories */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Categories</span>
            <div className="text-3xl font-black text-white">{categories.length}</div>
            <span className="text-[11px] text-slate-500">Active classifications</span>
          </div>
          <div className="p-3 bg-slate-900 text-blue-400 rounded-lg border border-slate-800">
            <Layers className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 3: New Enquiries */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">New Enquiries</span>
            <div className="text-3xl font-black text-emerald-400">{newEnquiriesCount}</div>
            <span className="text-[11px] text-emerald-500 font-medium">Requires immediate response</span>
          </div>
          <div className="p-3 bg-slate-900 text-emerald-400 rounded-lg border border-slate-800">
            <Inbox className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 4: Pending Quotes */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Enquiries</span>
            <div className="text-3xl font-black text-amber-400">{pendingEnquiriesCount}</div>
            <span className="text-[11px] text-amber-500 font-medium">Follow-up needed</span>
          </div>
          <div className="p-3 bg-slate-900 text-amber-400 rounded-lg border border-slate-800">
            <Clock className="h-6 w-6" />
          </div>
        </div>

      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden space-y-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Customer Enquiries</h2>
            <p className="text-xs text-slate-400">Latest incoming quotation requests from the website</p>
          </div>
          <Link to="/admin/enquiries" className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1">
            <span>View All ({enquiries.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {recentEnquiries.map(enq => (
                <tr key={enq.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">
                    <div>{enq.customer_name}</div>
                    <div className="text-[11px] text-slate-400 font-mono font-normal">{enq.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white font-semibold">{enq.product_name}</div>
                    {enq.thickness && <div className="text-[11px] text-slate-400">Thk: {enq.thickness}</div>}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-orange-400">{enq.quantity}</td>
                  <td className="py-3 px-4 text-slate-400">{enq.created_at}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusBadgeClass(enq.status)}`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to="/admin/enquiries"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition-colors text-xs font-semibold"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Review</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
