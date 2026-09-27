import React from 'react';
import { ProductForm } from '../../components/admin/ProductForm';

export const AddProduct: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Add New Product</h1>
        <p className="text-xs text-slate-400 mt-1">
          Specify industrial metal properties, standard dimensions, surface treatment, and tags.
        </p>
      </div>

      <ProductForm isEditing={false} />
    </div>
  );
};
