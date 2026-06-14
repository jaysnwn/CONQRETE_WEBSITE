import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ProductDetailClient from './productdetailclient';

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const supabase = await createClient();
  // Next.js 15 requires params to be awaited
  const resolvedParams = await params; 

  // 1. Fetch the exact product AND join its specific variants
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name, slug),
      variants:product_variants(*)
    `)
    .eq('slug', resolvedParams.slug)
    .eq('is_active', true)
    .single();

  // 2. If someone types a fake URL (e.g., /products/fake-item), throw a 404
  if (error || !product) {
    notFound(); 
  }

  // 3. Pass the master product object to the client UI
  return <ProductDetailClient product={product} />;
}