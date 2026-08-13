export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { createAdminClient } from '#/utils/supabase/admin';
import ProductForm from '#/components/admin/product-form';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = createAdminClient();
  
  // Fetch categories for the dropdown
  const { data: categories } = await supabase.from('categories').select('id, name, slug').order('name');
  
  // Fetch the product and its variants
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants(*)
    `)
    .eq('id', resolvedParams.id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Awaited params in Next.js 15+ (if needed), but this assumes synchronous params for now
  // If Next.js 15 requires awaited params, we'll await params.id

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Catalog management</span>
          <h1>Edit product</h1>
          <p>Update information, availability, and inventory for {product.title}.</p>
        </div>
      </section>
      <ProductForm 
        categories={categories || []} 
        product={product} 
      />
    </div>
  );
}
