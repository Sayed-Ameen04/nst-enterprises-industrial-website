import { Category } from '../types/category';

/**
 * NST Enterprises - Official Product Categories (2 Main Categories)
 * Note: Profile Gas Cutting & Job Works is featured separately under Services.
 */
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-agriculture",
    name: "Agriculture",
    slug: "agriculture",
    description: "Agricultural implement products including Naagal (Cultivator Tynes) with strict inch-size maintenance and specialized Plow Material in various shapes.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    product_count: 2
  },
  {
    id: "cat-industrial",
    name: "Industrial",
    slug: "industrial",
    description: "Industrial steel supply including MS Plates in all shapes & grades (IS 2062, E250, E350, EN8, C45) and Prime Hot Rolled MS Sheets (HR) in standard sizes.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    product_count: 2
  }
];
