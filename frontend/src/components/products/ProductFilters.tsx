import React from 'react';
import { Filter, RotateCcw, CheckSquare, Layers } from 'lucide-react';
import { Category } from '../../types/category';
import { ProductFiltersState } from '../../types/product';

interface ProductFiltersProps {
  categories: Category[];
  filters: ProductFiltersState;
  onFilterChange: (key: keyof ProductFiltersState, value: string) => void;
  onReset: () => void;
}

const AVAILABLE_SHAPES = [
  'Square Plates',
  'Base Plates',
  'Rectangle Plates',
  'Circles',
  'Rings'
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  onReset
}) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-6">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-orange-600" />
          <h3 className="font-bold text-slate-900 text-sm">Filter Catalogue</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Categories Filter (Agriculture & Industrial) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Categories
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
            <input
              type="radio"
              name="category"
              checked={filters.category === 'all'}
              onChange={() => onFilterChange('category', 'all')}
              className="text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
            />
            <span className={filters.category === 'all' ? 'font-bold text-orange-600' : ''}>
              All Products
            </span>
          </label>
          {categories.map(cat => (
            <label
              key={cat.id}
              className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.id || filters.category.toLowerCase() === cat.name.toLowerCase()}
                  onChange={() => onFilterChange('category', cat.id)}
                  className="text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                />
                <span className={filters.category === cat.id ? 'font-bold text-orange-600' : ''}>
                  {cat.name}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.2 rounded">
                {cat.product_count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Industrial Plate Shapes Filter */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Industrial Plate Shapes
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="radio"
              name="shape"
              checked={filters.shape === 'all'}
              onChange={() => onFilterChange('shape', 'all')}
              className="text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
            />
            <span className={filters.shape === 'all' ? 'font-bold text-orange-600' : ''}>
              All Shapes
            </span>
          </label>
          {AVAILABLE_SHAPES.map(shp => (
            <label key={shp} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="radio"
                name="shape"
                checked={filters.shape === shp}
                onChange={() => onFilterChange('shape', shp)}
                className="text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
              />
              <span className={filters.shape === shp ? 'font-bold text-orange-600' : ''}>
                {shp}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Thickness Notice Box (No restrictive dropdowns) */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600 space-y-1">
        <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">Thickness Flexibility</div>
        <p className="text-[11px] leading-relaxed text-slate-500">
          Available in all thicknesses as per customer requirement. Mention your required gauge in your quote request.
        </p>
      </div>

    </div>
  );
};
