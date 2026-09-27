export interface ShapeItem {
  name: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  category_id: 'cat-agriculture' | 'cat-industrial';
  category_name: 'Agriculture' | 'Industrial';
  subtitle?: string; // e.g. "Also known as Cultivator Tynes"
  description: string;
  material?: string;
  grades?: string[]; // e.g. ["IS 2062", "E250", "E350", "EN8", "C45"]
  shapes?: string[]; // e.g. ["Square Plates", "Base Plates", "Rectangle Plates", "Circles", "Rings"]
  shape_items?: ShapeItem[]; // Shape-specific image galleries
  standard_sizes?: string[]; // e.g. ["1250 × 2500 mm", "1500 × 2500 mm", "1250 × 6300 mm", "1500 × 6300 mm", "2500 × 6000 mm"]
  measurements?: string[]; // e.g. ["19 Inch", "21 Inch", "23 Inch", "24 Inch", "26 Inch"]
  thickness_info: string; // "Available in all thicknesses as per requirement."
  finish?: string;
  unit: string;
  images: string[]; // Multiple photos support
  image?: string; // Primary image backward compatibility
  is_available: boolean;
  is_featured: boolean;
  price_type: string; // "Contact for Price"
  tags: string[];
}

export type ProductFormData = Omit<Product, 'id'> & {
  id?: string;
};

export interface ProductFiltersState {
  category: string; // "all" | "cat-agriculture" | "cat-industrial"
  shape: string; // "all" | "Square Plates" | "Base Plates" | "Rectangle Plates" | "Circles" | "Rings"
  searchQuery: string;
  sortBy: 'relevance' | 'name-asc' | 'name-desc';
}
