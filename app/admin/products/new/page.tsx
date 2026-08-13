export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { createAdminClient } from '#/utils/supabase/admin';
import ProductForm from '#/components/admin/product-form';

export default async function NewProductPage() {
  const supabase = createAdminClient();
  const { data: categories, error } = await supabase.from('categories').select('id, name, slug').order('name');
  return <div className="admin-page-stack"><section className="admin-page-heading admin-page-heading--form"><div><Link href="/admin/products" className="admin-back-link">← Back to products</Link><span className="admin-eyebrow">New catalog entry</span><h1>Add a product</h1><p>Fill in the product details below. You can update these details any time.</p></div></section>{error && <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem' }}>Could not load categories</div>}<ProductForm categories={categories || []} /></div>;
}
