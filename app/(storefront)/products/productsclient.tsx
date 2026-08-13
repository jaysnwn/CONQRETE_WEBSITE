"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCartStore } from '#/store/cart';
import ImageCarousel from '#/components/ui/image-carousel';

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
    const mainVariant = product.variants?.[0];
    const price = mainVariant?.price || 0;
    const compareAt = mainVariant?.compare_at_price;
    const discountPercent = compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;
    
    const tags = Array.isArray(product.tags) && product.tags.length > 0 ? product.tags.slice(0, 2).join(' | ') : '';

    return (
      <Link 
        key={product.id} 
        href={`/products/${product.slug}`}
        style={{ 
          textDecoration: 'none', 
          color: 'inherit', 
          display: 'flex', 
          flexDirection: 'column', 
          minWidth: '280px', 
          flex: 1,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid #f3f4f6',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        }}
      >
        {/* Images Carousel */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1/1',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '16px'
        }}>
          <ImageCarousel images={product.images || []} slug={product.slug} title={product.title} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px' }}>
          
          {/* Mock Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', color: '#f59e0b', fontSize: '14px' }}>
              ★★★★★
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>(5)</span>
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0', lineHeight: 1.2 }}>
            {product.title}
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            {compareAt && compareAt > price && (
              <span style={{ fontSize: '16px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 500 }}>
                ₹{compareAt.toLocaleString('en-IN')}
              </span>
            )}
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
              ₹{price.toLocaleString('en-IN')}
            </span>
            {discountPercent > 0 && (
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#16a34a' }}>
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {tags && (
            <div style={{ fontSize: '13px', color: '#4b5563', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {product.tags.slice(0, 2).map((tag: string, index: number) => (
                <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {tag}
                  {index === 0 && product.tags.length > 1 && <span style={{ color: '#000', fontWeight: 600 }}>|</span>}
                </span>
              ))}
            </div>
          )}

          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const isOutOfStock = !mainVariant || (mainVariant.stock_quantity ?? 0) <= 0;
              if (isOutOfStock) return;
              
              useCartStore.getState().addItem({
                variantId: mainVariant.id,
                productId: product.id,
                title: product.title,
                price: mainVariant.price,
                image: mainVariant.image_url || product.images?.[0] || null,
                color: mainVariant.color,
                capacity: mainVariant.capacity,
                quantity: 1
              });
            }}
            disabled={!mainVariant || (mainVariant.stock_quantity ?? 0) <= 0}
            style={{
              marginTop: '16px',
              width: '100%',
              backgroundColor: (!mainVariant || (mainVariant.stock_quantity ?? 0) <= 0) ? '#f3f4f6' : '#111827',
              color: (!mainVariant || (mainVariant.stock_quantity ?? 0) <= 0) ? '#9ca3af' : '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: (!mainVariant || (mainVariant.stock_quantity ?? 0) <= 0) ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (mainVariant && (mainVariant.stock_quantity ?? 0) > 0) {
                e.currentTarget.style.backgroundColor = '#000000';
              }
            }}
            onMouseLeave={(e) => {
              if (mainVariant && (mainVariant.stock_quantity ?? 0) > 0) {
                e.currentTarget.style.backgroundColor = '#111827';
              }
            }}
          >
            {(!mainVariant || (mainVariant.stock_quantity ?? 0) <= 0) ? 'Sold out' : 'Add to cart'}
          </button>

        </div>
      </Link>
    );
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