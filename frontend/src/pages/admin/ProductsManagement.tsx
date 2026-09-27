import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { Product } from '../../types/product';
import { productService } from '../../services/productService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';

export const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (e) {
      console.error('Failed to fetch products:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setDeleteConfirmId(null);
    } catch (e) {
      alert('Failed to delete product');
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    try {
      const updated = await productService.updateProduct(product.id, {
        is_available: !product.is_available
      });
      setProducts(prev => prev.map(p => p.id === product.id ? updated : p));
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(search.toLowerCase())) ||
      (p.material && p.material.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = categoryFilter === 'all' || p.category_id === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Products Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage Agriculture (Naagal, Plow Material) and Industrial (MS Plates, MS Sheets HR) catalogue.
          </p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search products by name or material..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Category selector */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-900 border border-slate-700 rounded-md py-1.5 px-2.5 text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Divisions</option>
            <option value="cat-agriculture">Agriculture</option>
            <option value="cat-industrial">Industrial</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold ml-2">
            Items: <span className="text-orange-400 font-mono font-bold">{filteredProducts.length}</span>
          </span>
        </div>
      </div>

      {/* Products Table */}
      {isLoading ? (
        <LoadingSpinner message="Loading products table..." />
      ) : (
        <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Product / Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Photos</th>
                  <th className="py-3 px-4">Sizes / Shapes</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No matching products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{p.name}</span>
                          {p.is_featured && (
                            <span className="text-[10px] bg-orange-600/30 text-orange-400 border border-orange-500/50 px-1 rounded font-bold">
                              Featured
                            </span>
                          )}
                        </div>
                        {p.subtitle && <div className="text-[11px] text-slate-400">{p.subtitle}</div>}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {p.category_name}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                          <ImageIcon className="h-3 w-3 text-orange-400" />
                          <span>{p.images ? p.images.length : 1} photos</span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {p.measurements && p.measurements.length > 0 && (
                          <div className="text-orange-400 font-mono">{p.measurements.join(', ')}</div>
                        )}
                        {p.shapes && p.shapes.length > 0 && (
                          <div className="text-slate-300">{p.shapes.slice(0, 3).join(', ')}...</div>
                        )}
                        {p.standard_sizes && p.standard_sizes.length > 0 && !p.shapes && !p.measurements && (
                          <div className="text-slate-400 font-mono text-[11px]">1250×2500 mm...</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAvailability(p)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
                            p.is_available
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800 hover:bg-emerald-900'
                              : 'bg-red-950/80 text-red-400 border-red-800 hover:bg-red-900'
                          }`}
                          title="Click to toggle availability"
                        >
                          {p.is_available ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/products/${p.id}`}
                            target="_blank"
                            className="p-1 text-slate-400 hover:text-white transition-colors"
                            title="Preview on Storefront"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Link>

                          {deleteConfirmId === p.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(p.id)}
                                className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(p.id)}
                              className="p-1 text-red-400 hover:text-red-300 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
