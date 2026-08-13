export interface ProductCategorySummary {
  name: string | null;
  slug: string | null;
}

export interface ProductSummary {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  inventory_count: number | null;
  is_active: boolean;
  sku: string | null;
  images: string[];
  tags: string[];
  category: ProductCategorySummary | null;
  created_at: string | null;
  updated_at: string | null;
  vendor?: string;
  variants?: any[];
}

export interface ProductVariantSummary {
  id: string;
  sku: string | null;
  price: number;
  compare_at_price?: number | null;
  stock_quantity: number;
  inventory_count?: number | null;
  color?: string;
  capacity?: string;
  image_url?: string;
  specifications?: any;
}

export interface ProductDetail extends ProductSummary {
  variants: ProductVariantSummary[];
}

export interface ProductQueryResult<T> {
  data: T | null;
  error: string | null;
}

export interface ProductVisibilityInput {
  id: string;
  is_active: boolean;
}
