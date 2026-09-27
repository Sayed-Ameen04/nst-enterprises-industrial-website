import { Product, ProductFormData } from '../types/product';
import { Category } from '../types/category';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_CATEGORIES } from '../data/categories';
import { request } from './api';

const LOCAL_PRODUCTS_KEY = 'nst_products_data_v2';
const LOCAL_CATEGORIES_KEY = 'nst_categories_data_v2';

function getStoredProducts(): Product[] {
  try {
    const data = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return INITIAL_PRODUCTS;
}

function saveStoredProducts(products: Product[]) {
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function getStoredCategories(): Category[] {
  try {
    const data = localStorage.getItem(LOCAL_CATEGORIES_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return INITIAL_CATEGORIES;
}

export const productService = {
  async getCategories(): Promise<Category[]> {
    try {
      const categories = await request<Category[]>('/api/categories');
      return categories;
    } catch {
      const categories = getStoredCategories();
      const products = getStoredProducts();
      return categories.map(cat => ({
        ...cat,
        product_count: products.filter(p => p.category_id === cat.id).length
      }));
    }
  },

  async getProducts(params?: {
    category?: string;
    shape?: string;
    search?: string;
    featured?: boolean;
  }): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category && params.category !== 'all') queryParams.append('category', params.category);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.featured !== undefined) queryParams.append('featured', String(params.featured));

      const queryString = queryParams.toString();
      const endpoint = `/api/products${queryString ? `?${queryString}` : ''}`;
      const products = await request<Product[]>(endpoint);
      
      // In-memory shape filter fallback if needed
      if (params?.shape && params.shape !== 'all') {
        return products.filter(p => p.shapes && p.shapes.includes(params.shape!));
      }
      return products;
    } catch {
      let products = getStoredProducts();

      const catFilter = params?.category;
      if (catFilter && catFilter !== 'all') {
        products = products.filter(p => 
          p.category_id === catFilter || 
          p.category_name.toLowerCase() === catFilter.toLowerCase()
        );
      }

      const shapeFilter = params?.shape;
      if (shapeFilter && shapeFilter !== 'all') {
        products = products.filter(p => p.shapes && p.shapes.includes(shapeFilter));
      }

      if (params?.featured !== undefined) {
        products = products.filter(p => p.is_featured === params.featured);
      }

      if (params?.search) {
        const q = params.search.toLowerCase().trim();
        products = products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
          (p.shapes && p.shapes.some(s => s.toLowerCase().includes(q))) ||
          (p.grades && p.grades.some(g => g.toLowerCase().includes(q))) ||
          // Support searching synonyms like "cultivator" or "plough"
          (q.includes('cultivator') && p.id === 'prod-naagal') ||
          (q.includes('plow') && p.id === 'prod-plow-material') ||
          (q.includes('plough') && p.id === 'prod-plow-material')
        );
      }

      return products;
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      return await request<Product>(`/api/products/${id}`);
    } catch {
      const products = getStoredProducts();
      return products.find(p => p.id === id) || null;
    }
  },

  async createProduct(formData: ProductFormData): Promise<Product> {
    try {
      const newProduct = await request<Product>('/api/products', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const products = getStoredProducts();
      saveStoredProducts([newProduct, ...products]);
      return newProduct;
    } catch {
      const products = getStoredProducts();
      const newProduct: Product = {
        ...formData,
        id: `prod-${Date.now().toString(36)}`,
        images: formData.images && formData.images.length > 0 ? formData.images : [formData.image || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'],
        image: formData.images?.[0] || formData.image || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'
      };
      saveStoredProducts([newProduct, ...products]);
      return newProduct;
    }
  },

  async updateProduct(id: string, formData: Partial<ProductFormData>): Promise<Product> {
    try {
      const updated = await request<Product>(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      const products = getStoredProducts();
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = updated;
        saveStoredProducts([...products]);
      }
      return updated;
    } catch {
      const products = getStoredProducts();
      const index = products.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      const updatedProduct = { 
        ...products[index], 
        ...formData,
        image: formData.images?.[0] || formData.image || products[index].image
      };
      products[index] = updatedProduct;
      saveStoredProducts([...products]);
      return updatedProduct;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await request(`/api/products/${id}`, { method: 'DELETE' });
    } catch {
      // fallback
    }
    const products = getStoredProducts();
    const filtered = products.filter(p => p.id !== id);
    saveStoredProducts(filtered);
  }
};
