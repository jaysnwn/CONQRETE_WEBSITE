import { getProductBySlug } from '#/features/products/actions';
import { notFound } from 'next/navigation';
import ProductDetailClient from './productdetailclient';
import { createClient } from '#/utils/supabase/server';

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const { data: product, error } = await getProductBySlug(resolvedParams.slug);

  if (error || !product) {
    notFound();
  }

  const supabase = await createClient();
  
  // 1. Fetch related products (latest products excluding this one)
  const { data: relatedProductsData } = await supabase
    .from('products')
    .select('id, title, slug, images, tags, category:categories(name, slug), variants:product_variants(id, price, compare_at_price, stock_quantity, image_url, color, capacity)')
    .eq('is_active', true)
    .neq('id', product.id)
    .order('created_at', { ascending: false })
    .limit(5);

  // Normalize related products for the Storefront Card format
  const normalizedRelated = (relatedProductsData || []).map(p => ({
    ...p,
    price: p.variants?.[0]?.price || 0,
    compare_at_price: p.variants?.[0]?.compare_at_price || null,
  }));

  // 2. Fetch reviews
  const { data: reviewsData } = await supabase
    .from('product_reviews')
    .select('*, customers(first_name, last_name)')
    .eq('product_id', product.id)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });
    
  const reviews = (reviewsData || []).map(r => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    reviewer_name: r.reviewer_name || (r.customers ? `${r.customers.first_name || ''} ${r.customers.last_name || ''}`.trim() : 'Guest'),
    created_at: r.created_at,
  }));

  return <ProductDetailClient product={product} relatedProducts={normalizedRelated} reviews={reviews} />;
}
