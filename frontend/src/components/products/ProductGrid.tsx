import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { EmptyState } from '../common/EmptyState';
import { SearchX } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onRequestQuote?: (product: Product) => void;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  onRequestQuote,
  onResetFilters
}) => {
  if (isLoading) {
    return <LoadingSpinner message="Fetching products catalogue..." fullHeight />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No products found"
        description="No industrial products match your selected category, thickness, or search criteria. Try modifying your filters."
        actionLabel={onResetFilters ? "Clear All Filters" : undefined}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onRequestQuote={onRequestQuote}
        />
      ))}
    </div>
  );
};
