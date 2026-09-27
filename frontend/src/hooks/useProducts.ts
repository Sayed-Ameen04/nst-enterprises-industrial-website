import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFiltersState } from '../types/product';
import { Category } from '../types/category';
import { productService } from '../services/productService';

export function useProducts(initialFilters?: Partial<ProductFiltersState>) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<ProductFiltersState>({
    category: initialFilters?.category || 'all',
    shape: initialFilters?.shape || 'all',
    searchQuery: initialFilters?.searchQuery || '',
    sortBy: initialFilters?.sortBy || 'relevance'
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedCategories, fetchedProducts] = await Promise.all([
        productService.getCategories(),
        productService.getProducts({
          category: filters.category,
          shape: filters.shape,
          search: filters.searchQuery
        })
      ]);

      // Apply in-memory sorting
      let sorted = [...fetchedProducts];
      if (filters.sortBy === 'name-asc') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === 'name-desc') {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
      }

      setCategories(fetchedCategories);
      setProducts(sorted);
    } catch (err) {
      setError((err as Error).message || 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateFilter = (key: keyof ProductFiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      shape: 'all',
      searchQuery: '',
      sortBy: 'relevance'
    });
  };

  return {
    products,
    categories,
    isLoading,
    error,
    filters,
    updateFilter,
    resetFilters,
    refetch: fetchData
  };
}
