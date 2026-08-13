'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './image-uploader';

interface Category { id: string; name: string; slug: string; }
interface VariantInput { color: string; capacity: string; price: number; compare_at_price: number | null; sku: string; stock_quantity: number; specifications: Record<string, string>; barcode: string; weight_grams: number | null; cost_price: number | null; requires_shipping: boolean; image_url: string; }
const blankVariant = (): VariantInput => ({ color: '', capacity: '', price: 0, compare_at_price: null, sku: '', stock_quantity: 0, specifications: {}, barcode: '', weight_grams: null, cost_price: null, requires_shipping: true, image_url: '' });
const slugify = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
interface Product { id: string; title: string; slug: string; description: string; images: string[]; tags: string[]; category_id: string; is_active: boolean; vendor: string; seo_title: string; seo_description: string; variants: VariantInput[]; }
export default function ProductForm({ categories, product }: { categories: Category[], product?: Product }) {
  const router = useRouter(); const [isPending, startTransition] = useTransition(); const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(product?.title || ''); const [slug, setSlug] = useState(product?.slug || ''); const [description, setDescription] = useState(product?.description || ''); const [images, setImages] = useState<string[]>(product?.images || []); const [tags, setTags] = useState(product?.tags?.join(', ') || ''); const [categoryId, setCategoryId] = useState(product?.category_id || categories[0]?.id || ''); const [isActive, setIsActive] = useState(product ? product.is_active : true); 
  const [vendor, setVendor] = useState(product?.vendor || 'CONQRETE'); const [seoTitle, setSeoTitle] = useState(product?.seo_title || ''); const [seoDescription, setSeoDescription] = useState(product?.seo_description || '');
  const [variants, setVariants] = useState<VariantInput[]>(product?.variants?.length ? product.variants : [blankVariant()]);
  const updateVariant = (index: number, patch: Partial<VariantInput>) => setVariants((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  
  const updateSpecification = (variantIndex: number, key: string, value: string) => {
    setVariants(items => items.map((item, i) => {
      if (i !== variantIndex) return item;
      return { ...item, specifications: { ...item.specifications, [key]: value } };
    }));
  };

  const removeSpecification = (variantIndex: number, keyToRemove: string) => {
    setVariants(items => items.map((item, i) => {
      if (i !== variantIndex) return item;
      const newSpecs = { ...item.specifications };
      delete newSpecs[keyToRemove];
      return { ...item, specifications: newSpecs };
    }));
  };

  const addSpecification = (variantIndex: number) => {
    const key = window.prompt('Enter specification name (e.g. Material, Weight):');
    if (key && key.trim()) {
      updateSpecification(variantIndex, key.trim(), '');
    }
  };

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setError(null);
    if (!title.trim()) return setError('Enter a product name before saving.');
    if (!categoryId) return setError('Create or select a product category first.');
    if (!images.length) return setError('Add at least one product image.');
    const payload = { 
      id: product?.id, title: title.trim(), slug: slug.trim() || slugify(title), description: description.trim(), images, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean), category_id: categoryId, is_active: isActive, vendor, seo_title: seoTitle, seo_description: seoDescription, 
      variants: variants.map((variant) => ({ 
        ...variant, price: Number(variant.price), compare_at_price: variant.compare_at_price ? Number(variant.compare_at_price) : null, stock_quantity: Number(variant.stock_quantity) || 0,
        weight_grams: variant.weight_grams ? Number(variant.weight_grams) : null, cost_price: variant.cost_price ? Number(variant.cost_price) : null, requires_shipping: variant.requires_shipping
      })) 
    };
    startTransition(async () => { try { const response = await fetch('/api/admin/products', { method: product ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.error || 'Could not save the product.'); } router.push('/admin/products'); router.refresh(); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not save the product.'); } });
  }
  return <form onSubmit={submit} className="admin-product-form">
    <section className="admin-form-card"><div className="admin-form-card-heading"><span className="admin-form-step">01</span><div><h2>Product details</h2><p>The essential information customers see first.</p></div></div><div className="admin-form-grid"><label className="admin-field admin-field--wide"><span>Product name</span><input value={title} onChange={(event) => { setTitle(event.target.value); if (!slug) setSlug(slugify(event.target.value)); }} placeholder="e.g. Power Bank Pro" required /></label><label className="admin-field"><span>URL slug</span><input value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="power-bank-pro" /></label><label className="admin-field"><span>Category</span><select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}><option value="" disabled>Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label><label className="admin-field"><span>Vendor</span><input value={vendor} onChange={(event) => setVendor(event.target.value)} placeholder="CONQRETE" /></label><label className="admin-field admin-field--wide"><span>Description</span><textarea rows={5} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe what makes this product special..." /></label><label className="admin-field admin-field--wide"><span>Tags <i>Separate with commas</i></span><input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="Power, Fast charging, New" /></label></div><div className="admin-form-grid" style={{marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--admin-border)'}}><label className="admin-field admin-field--wide"><span>SEO Title</span><input value={seoTitle} onChange={(event) => setSeoTitle(event.target.value)} placeholder="Title for search engines" /></label><label className="admin-field admin-field--wide"><span>SEO Description</span><textarea rows={2} value={seoDescription} onChange={(event) => setSeoDescription(event.target.value)} placeholder="Meta description for search engines" /></label></div><div style={{marginTop: '24px'}}><label className="admin-toggle"><input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} /><span /><div><strong>Publish product</strong><p>{isActive ? 'Visible to customers on the storefront.' : 'Saved as hidden until you are ready.'}</p></div></label></div></section>
    <section className="admin-form-card"><div className="admin-form-card-heading"><span className="admin-form-step">02</span><div><h2>Product images</h2><p>Add one or more images. The first image becomes the cover.</p></div></div><ImageUploader images={images} onChange={setImages} /></section>
    <section className="admin-form-card"><div className="admin-form-card-heading"><span className="admin-form-step">03</span><div><h2>Pricing & inventory</h2><p>Create variants for each colour or capacity you stock.</p></div><button type="button" onClick={() => setVariants((items) => [...items, blankVariant()])} className="admin-secondary-action">+ Add variant</button></div><div className="admin-variant-list">{variants.map((variant, index) => <div className="admin-variant-card" key={index}><div className="admin-variant-title"><strong>Variant {String(index + 1).padStart(2, '0')}</strong>{variants.length > 1 && <button type="button" onClick={() => setVariants((items) => items.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>}</div><div className="admin-form-grid admin-form-grid--variant"><label className="admin-field"><span>Colour</span><input value={variant.color} onChange={(event) => updateVariant(index, { color: event.target.value })} placeholder="Black" /></label><label className="admin-field"><span>Capacity / label</span><input value={variant.capacity} onChange={(event) => updateVariant(index, { capacity: event.target.value })} placeholder="10,000 mAh" /></label><label className="admin-field"><span>Price (₹)</span><input type="number" min="0" value={variant.price || ''} onChange={(event) => updateVariant(index, { price: Number(event.target.value) })} required /></label><label className="admin-field"><span>Compare at price (₹)</span><input type="number" min="0" value={variant.compare_at_price || ''} onChange={(event) => updateVariant(index, { compare_at_price: Number(event.target.value) })} placeholder="e.g. 5000" /></label><label className="admin-field"><span>Cost Price (₹)</span><input type="number" min="0" value={variant.cost_price || ''} onChange={(event) => updateVariant(index, { cost_price: Number(event.target.value) })} placeholder="Wholesale cost" /></label><label className="admin-field"><span>Stock quantity</span><input type="number" min="0" value={variant.stock_quantity || ''} onChange={(event) => updateVariant(index, { stock_quantity: Number(event.target.value) })} /></label><label className="admin-field"><span>SKU (Stock Keeping Unit)</span><input value={variant.sku} onChange={(event) => updateVariant(index, { sku: event.target.value })} placeholder="Auto-generated if empty" /></label><label className="admin-field"><span>Barcode (UPC/EAN)</span><input value={variant.barcode || ''} onChange={(event) => updateVariant(index, { barcode: event.target.value })} placeholder="Optional" /></label><label className="admin-field"><span>Weight (grams)</span><input type="number" min="0" value={variant.weight_grams || ''} onChange={(event) => updateVariant(index, { weight_grams: Number(event.target.value) })} placeholder="e.g. 250" /></label><label className="admin-field"><span>Image URL</span><input value={variant.image_url || ''} onChange={(event) => updateVariant(index, { image_url: event.target.value })} placeholder="https://..." /></label></div><div style={{marginTop: '16px'}}><label className="admin-toggle"><input type="checkbox" checked={variant.requires_shipping} onChange={(event) => updateVariant(index, { requires_shipping: event.target.checked })} /><span /><div><strong>Requires Shipping</strong><p>Uncheck if this is a digital product.</p></div></label></div><div style={{marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--admin-border)'}}><strong>Specifications</strong><div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px'}}>{Object.entries(variant.specifications).map(([key, val]) => <div key={key} style={{display: 'flex', gap: '8px'}}><div style={{width: '120px', fontSize: '13px', fontWeight: 500, padding: '8px 0'}}>{key}</div><input value={val} onChange={(e) => updateSpecification(index, key, e.target.value)} placeholder={`Value for ${key}`} style={{flex: 1, padding: '8px', border: '1px solid var(--admin-border)', borderRadius: '6px', fontSize: '13px'}} /><button type="button" onClick={() => removeSpecification(index, key)} style={{background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', padding: '0 8px'}}>×</button></div>)}<button type="button" onClick={() => addSpecification(index)} style={{alignSelf: 'flex-start', background: 'none', border: '1px solid var(--admin-border)', borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', marginTop: '4px'}}>+ Add specification</button></div></div></div>)}</div></section>
    {error && <div className="admin-notice admin-notice--error">{error}</div>}
    <div className="admin-form-actions" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {product && (
        <button 
          type="button" 
          disabled={isPending}
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
              try {
                const res = await fetch('/api/admin/products', {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: product.id })
                });
                if (!res.ok) throw new Error('Failed to delete');
                router.push('/admin/products');
                router.refresh();
              } catch(e) {
                alert('Could not delete product.');
              }
            }
          }} 
          style={{ marginRight: 'auto', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}
        >
          Delete product
        </button>
      )}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
        <button type="button" onClick={() => router.push('/admin/products')} className="admin-cancel-action">Cancel</button>
        <button type="submit" disabled={isPending} className="admin-primary-action">{isPending ? 'Saving…' : 'Save product'} <span>→</span></button>
      </div>
    </div>
  </form>;
}
