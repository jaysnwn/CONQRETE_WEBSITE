export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import { createAdminClient } from '#/utils/supabase/admin';

interface ProductRow { id: string; title: string; slug: string; images: string[] | null; is_active: boolean; category: { name: string } | null; variants: { price: number; stock_quantity: number | null }[] | null; }

export default async function AdminProductsPage() {
  const supabase = createAdminClient();
  const { data: products, error } = await supabase.from('products').select('id, title, slug, images, is_active, category:categories(name), variants:product_variants(price, stock_quantity)').order('title');
  const items = (products || []) as unknown as ProductRow[];
  return <div className="admin-page-stack">
    <section className="admin-page-heading"><div><span className="admin-eyebrow">Catalog management</span><h1>Your products</h1><p>Keep your product information, availability, and inventory up to date.</p></div><Link href="/admin/products/new" className="admin-primary-action"><span>+</span> Add product</Link></section>
    {error ? <div className="admin-notice admin-notice--error">Could not load products: {error.message}</div> : items.length === 0 ? <div className="admin-empty-state admin-empty-state--large"><strong>Your catalog is empty.</strong><p>Add your first product to begin selling through CONQRETE.</p><Link href="/admin/products/new" className="admin-primary-action"><span>+</span> Add product</Link></div> : <section className="admin-panel admin-product-panel"><div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{items.map((product) => {
      const variants = product.variants || []; const prices = variants.map((variant) => variant.price).filter((price) => price > 0); const stock = variants.reduce((sum, variant) => sum + (variant.stock_quantity || 0), 0);
      return <tr key={product.id}><td><div className="admin-product-cell"><div className="admin-product-image">{product.images?.[0] ? <Image src={product.images[0]} alt="" fill sizes="52px" /> : <span>◇</span>}</div><div><Link href={`/admin/products/${product.id}/edit`}>{product.title}</Link><span>{product.slug}</span></div></div></td><td>{product.category?.name || 'Uncategorized'}</td><td className="admin-table-strong">{prices.length ? `₹${Math.min(...prices).toLocaleString('en-IN')}` : '—'}</td><td>{stock} units</td><td><span className={`admin-status-pill ${product.is_active ? 'admin-status-pill--active' : 'admin-status-pill--muted'}`}>{product.is_active ? 'Live' : 'Hidden'}</span></td><td><Link className="admin-row-action" href={`/admin/products/${product.id}/edit`}>Edit <span>→</span></Link></td></tr>;
    })}</tbody></table></div></section>}
  </div>;
}
