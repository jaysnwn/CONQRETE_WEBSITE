import { createClient } from '#/utils/supabase/server';

export interface ProductRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  inventory_count: number | null;
  is_active: boolean;
  sku: string | null;
  images: string[] | null;
  tags: string[] | null;
  category?: { name?: string | null; slug?: string | null } | null;
  created_at?: string | null;
  updated_at?: string | null;
  variants?: Array<{
    id: string;
    sku: string | null;
    price: number | null;
    inventory_count: number | null;
  }>;
}

export async function listActiveProducts(): Promise<ProductRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), variants:product_variants(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ProductRow[];
}

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), variants:product_variants(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as ProductRow | null) ?? null;
}

export async function listAdminProducts(): Promise<ProductRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ProductRow[];
}

export async function updateProductVisibility(id: string, isActive: boolean): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as ProductRow | null) ?? null;
}
