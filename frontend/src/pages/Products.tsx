import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSearch } from '../components/products/ProductSearch';
import { ProductGrid } from '../components/products/ProductGrid';
import { Product } from '../types/product';
import { Flame, ArrowRight } from 'lucide-react';

interface ProductsProps {
  onOpenQuoteModal: (product?: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenQuoteModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const shapeParam = searchParams.get('shape') || 'all';

  const {
    products,
    categories,
    isLoading,
    filters,
    updateFilter,
    resetFilters
  } = useProducts({
    category: categoryParam,
    shape: shapeParam,
    searchQuery: searchParam
  });

  useEffect(() => {
    if (categoryParam !== filters.category) {
      updateFilter('category', categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (shapeParam !== filters.shape) {
      updateFilter('shape', shapeParam);
    }
  }, [shapeParam]);

  useEffect(() => {
    if (searchParam !== filters.searchQuery) {
      updateFilter('searchQuery', searchParam);
    }
  }, [searchParam]);

  const handleFilterChange = (key: any, value: string) => {
    updateFilter(key, value);
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      newParams.delete(key === 'searchQuery' ? 'search' : key);
    } else {
      newParams.set(key === 'searchQuery' ? 'search' : key, value);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleReset = () => {
    resetFilters();
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-5 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Product Catalogue</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Explore our two core divisions: <strong>Agriculture</strong> (Naagal & Plow Material) and <strong>Industrial</strong> (MS Plates in all shapes & MS Sheets HR). All products available in any thickness as per customer requirement.
          </p>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded-md text-xs font-bold border border-slate-700 transition-colors shrink-0 self-start md:self-center"
        >
          <Flame className="h-4 w-4" />
          <span>Looking for Profile Gas Cutting?</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
        
        {/* Left: Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <ProductFilters
              categories={categories}
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>
        </aside>

        {/* Right: Search + Product Grid */}
        <main className="lg:col-span-3">
          <ProductSearch
            searchQuery={filters.searchQuery}
            onSearchChange={val => handleFilterChange('searchQuery', val)}
            sortBy={filters.sortBy}
            onSortChange={val => updateFilter('sortBy', val)}
            totalResults={products.length}
          />

          <ProductGrid
            products={products}
            isLoading={isLoading}
            onRequestQuote={onOpenQuoteModal}
            onResetFilters={handleReset}
          />
        </main>

      </div>

    </div>
  );
};
