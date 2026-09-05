import { Breadcrumbs } from '#/components/ui/breadcrumbs';
import { Metadata } from 'next';
import { getProductBySlug } from '#/features/products/actions';
import { notFound } from 'next/navigation';
import ProductDetailClient from './productdetailclient';
import { createClient } from '#/utils/supabase/server';


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: product } = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return { title: 'Product Not Found | CONQRETE' };
  }

  const plainTextDesc = product.description ? product.description.replace(/<[^>]*>?/gm, '').substring(0, 155) : `Buy the ${product.title} at CONQRETE.`;

  return {
    title: `${product.title} | CONQRETE`,
    description: plainTextDesc,
    openGraph: {
      title: `${product.title} | CONQRETE`,
      description: plainTextDesc,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
    alternates: {
      canonical: `https://conqrete.in/products/${product.slug}`,
    }
  };
}

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

  
  const plainTextDesc = product.description ? product.description.replace(/<[^>]*>?/gm, '').substring(0, 155) : `Buy the ${product.title} at CONQRETE.`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.images || [],
    "description": plainTextDesc,
    "sku": product.sku || product.slug,
    "brand": {
      "@type": "Brand",
      "name": "CONQRETE"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://conqrete.in/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price || 0,
      "availability": product.is_active ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs 
        items={[
          { name: 'Home', href: '/' },
          { name: 'Products', href: '/products' },
          { name: product.category?.name || 'Category', href: `/products/${product.category?.slug || 'all'}` },
          { name: product.title, href: `/products/${product.slug}` }
        ]} 
      />
      <ProductDetailClient product={product} relatedProducts={normalizedRelated} reviews={reviews} />
    </>
  );
}
