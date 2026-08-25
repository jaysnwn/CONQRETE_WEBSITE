"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCartStore } from '#/store/cart';
import ProductCard from '#/components/ui/product-card';

export default function ProductsClient({ 
  products, 
  title = "Products",
  hideFilters = false
}: { 
  products: any[], 
  title?: string,
  hideFilters?: boolean
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  const filter = categoryParam || 'all';

  // Extract unique categories
  const categoriesMap = new Map();
  products.forEach(p => {
    if (p.category && p.category.slug && p.category.name) {
      categoriesMap.set(p.category.slug, p.category.name);
    }
  });
  const categories = Array.from(categoriesMap.entries()).map(([slug, name]) => ({ slug, name }));

  const setCategoryFilter = (slug: string) => {
    if (slug === 'all') {
      router.push('/products');
    } else {
      router.push(`/products?category=${slug}`);
    }
  };

  const renderProductCard = (product: any) => {
    return <ProductCard key={product.id} product={product} />;
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: '#f9fafb', padding: '60px 20px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 600, color: '#111827', margin: '0 0 16px 0', textTransform: 'capitalize' }}>
          {title}
        </h1>
        {!hideFilters && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setCategoryFilter('all')}
              style={{ 
                padding: '8px 16px', 
                borderRadius: '20px', 
                backgroundColor: filter === 'all' ? '#111827' : '#ffffff', 
                color: filter === 'all' ? '#ffffff' : '#374151',
                border: filter === 'all' ? '1px solid #111827' : '1px solid #d1d5db',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button 
                key={cat.slug}
                onClick={() => setCategoryFilter(cat.slug)}
                style={{ 
                  padding: '8px 16px', 
                  borderRadius: '20px', 
                  backgroundColor: filter === cat.slug ? '#111827' : '#ffffff', 
                  color: filter === cat.slug ? '#ffffff' : '#374151',
                  border: filter === cat.slug ? '1px solid #111827' : '1px solid #d1d5db',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
            No products found.
          </div>
        ) : filter === 'all' ? (
          // Group by category rows
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {categories.map(cat => {
              const catProducts = products.filter(p => p.category?.slug === cat.slug);
              if (catProducts.length === 0) return null;
              
              return (
                <div key={cat.slug}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', margin: 0 }}>{cat.name}</h2>
                    <button onClick={() => setCategoryFilter(cat.slug)} style={{ fontSize: '14px', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                      View all {cat.name} →
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '32px 24px' }}>
                    {catProducts.map(renderProductCard)}
                  </div>
                </div>
              );
            })}
            
            {/* Render products with no category */}
            {products.filter(p => !p.category || !p.category.slug).length > 0 && (
               <div>
                  <div style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', margin: 0 }}>Other Products</h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '32px 24px' }}>
                    {products.filter(p => !p.category || !p.category.slug).map(renderProductCard)}
                  </div>
               </div>
            )}
          </div>
        ) : (
          // Single category grid
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '32px 24px' }}>
            {products.filter(p => p.category?.slug === filter).map(renderProductCard)}
            {products.filter(p => p.category?.slug === filter).length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
                No products found in this category.
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .card-carousel::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}