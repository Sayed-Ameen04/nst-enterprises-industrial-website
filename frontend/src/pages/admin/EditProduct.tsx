import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { productService } from '../../services/productService';
import { ProductForm } from '../../components/admin/ProductForm';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

export const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      setIsLoading(true);
      try {
        const item = await productService.getProductById(id);
        setProduct(item);
      } catch (e) {
        console.error('Failed to load product:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner message="Fetching product specifications..." fullHeight />;
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-slate-400 space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs">The requested product ID does not exist.</p>
        <Link to="/admin/products" className="text-xs text-orange-400 underline inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Edit Product: {product.name}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Update technical parameters, thickness gauges, and inventory status.
          </p>
        </div>
        <Link
          to="/admin/products"
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to List</span>
        </Link>
      </div>

      <ProductForm initialData={product} isEditing={true} />
    </div>
  );
};
