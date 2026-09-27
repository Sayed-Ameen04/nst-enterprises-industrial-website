import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import { ProductFiltersState } from '../../types/product';

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: ProductFiltersState['sortBy'];
  onSortChange: (value: ProductFiltersState['sortBy']) => void;
  totalResults: number;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults
}) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      
      {/* Search Bar */}
      <div className="relative w-full md:max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search products by name, grade, tag, or material..."
          className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-900 transition-colors placeholder:text-slate-400"
        />
        <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Count & Sorting */}
      <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4">
        <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
          Showing <strong className="text-slate-900">{totalResults}</strong> {totalResults === 1 ? 'product' : 'products'}
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <ArrowUpDown className="h-3 w-3" />
            <span>Sort:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={e => onSortChange(e.target.value as ProductFiltersState['sortBy'])}
            className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="relevance">Relevance</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="thickness-asc">Thickness: Low to High</option>
            <option value="thickness-desc">Thickness: High to Low</option>
          </select>
        </div>
      </div>

    </div>
  );
};
