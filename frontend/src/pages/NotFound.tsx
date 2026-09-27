import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4 border border-slate-200">
        <Layers className="h-8 w-8 text-orange-500" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">404</h1>
      <h2 className="text-lg font-bold text-slate-700 mt-2">Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6">
        The industrial metal catalog page or resource you are looking for does not exist or has moved.
      </p>
      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" size="sm" leftIcon={<Home className="h-4 w-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Browse Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
};
