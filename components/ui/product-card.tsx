"use client";
import { useRouter } from 'next/navigation';
import ImageCarousel from '#/components/ui/image-carousel';
import { useCartStore } from '#/store/cart';

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const mainVariant = product.variants?.[0];
  const price = mainVariant?.price || 0;
  const compareAt = mainVariant?.compare_at_price;
  const discountPercent = compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;
  
  const tags = Array.isArray(product.tags) && product.tags.length > 0 ? product.tags : [];

  return (
    <div 
      onClick={() => router.push(`/products/${product.slug}`)}
      style={{ 
        cursor: 'pointer',
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        width: '100%',
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
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1/1',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        {discountPercent > 0 && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, backgroundColor: '#c8ff00', color: '#000', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>
            Save Rs. {(compareAt - price).toLocaleString('en-IN')}
          </div>
        )}
        <ImageCarousel images={product.images || []} slug={product.slug} title={product.title} />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px', flex: 1 }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', color: '#f59e0b', fontSize: '14px' }}>
            ★★★★★
          </div>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>(5)</span>
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0', lineHeight: 1.3 }}>
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

        {tags.length > 0 && (
          <div style={{ fontSize: '13px', color: '#4b5563', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {tags.slice(0, 2).map((tag: string, index: number) => (
              <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {tag}
                {index === 0 && tags.length > 1 && <span style={{ color: '#000', fontWeight: 600 }}>|</span>}
              </span>
            ))}
          </div>
        )}

        <div style={{ flex: 1, minHeight: '16px' }} />

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
          {(!mainVariant || (mainVariant.stock_quantity ?? 0) <= 0) ? 'Sold out' : 'Quick Add'}
        </button>
      </div>
    </div>
  );
}
