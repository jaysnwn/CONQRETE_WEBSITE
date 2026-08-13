"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '#/store/cart';

export default function ProductDetailClient({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const isOutOfStock = !selectedVariant || (selectedVariant.stock_quantity ?? 0) <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      price: selectedVariant.price,
      image: selectedVariant.image_url || product.images?.[0] || null,
      color: selectedVariant.color,
      capacity: selectedVariant.capacity,
      quantity: quantity
    });
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: 'clamp(20px, 4vw, 40px) clamp(12px, 3vw, 20px)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '20px', fontSize: '14px', color: '#6b7280' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#6b7280' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <Link href="/products" style={{ textDecoration: 'none', color: '#6b7280' }}>Products</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: '#111827' }}>{product.title}</span>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: 'clamp(24px, 4vw, 40px)' }}>
        
        {/* Images Column (Shopify Dawn Style) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div 
            className="product-gallery-container"
            style={{ 
              display: 'flex', 
              gap: '16px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {product.images && product.images.length > 0 ? (
              product.images.map((img: string, idx: number) => (
                <div 
                  key={idx}
                  className="product-gallery-item"
                  style={{ 
                    width: '100%', 
                    flexShrink: 0,
                    scrollSnapAlign: 'start',
                    aspectRatio: '1/1', 
                    position: 'relative', 
                    backgroundColor: '#f3f4f6', 
                    borderRadius: '8px', 
                    overflow: 'hidden' 
                  }}
                >
                  <Image 
                    src={img} 
                    alt={`${product.title} - Image ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    priority={idx === 0}
                  />
                </div>
              ))
            ) : (
              <div style={{ width: '100%', flexShrink: 0, aspectRatio: '1/1', position: 'relative', backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                No image available
              </div>
            )}
          </div>
          <style>{`
            .product-gallery-container::-webkit-scrollbar {
              display: none;
            }
            @media (min-width: 769px) {
              .product-gallery-container {
                flex-direction: column !important;
                overflow-x: visible !important;
                scroll-snap-type: none !important;
              }
            }
          `}</style>
        </div>

        {/* Details Column */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 600, color: '#111827', margin: '0 0 16px 0', lineHeight: 1.2 }}>
            {product.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '24px', fontWeight: 500, color: '#111827' }}>
              ₹{selectedVariant?.price.toLocaleString('en-IN')}
            </span>
            {selectedVariant?.compare_at_price && (
              <span style={{ fontSize: '18px', color: '#6b7280', textDecoration: 'line-through' }}>
                ₹{selectedVariant.compare_at_price.toLocaleString('en-IN')}
              </span>
            )}
            {selectedVariant?.compare_at_price && selectedVariant.compare_at_price > selectedVariant.price && (
              <span style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                SALE
              </span>
            )}
          </div>

          <div style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.6, marginBottom: '32px' }}>
            {product.description}
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 1 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Variants
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {product.variants.map((variant: any) => {
                  const isActive = selectedVariant?.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '6px',
                        border: isActive ? '2px solid #111827' : '1px solid #d1d5db',
                        backgroundColor: isActive ? '#f9fafb' : '#ffffff',
                        color: '#111827',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                    >
                      {variant.color} {variant.capacity ? `— ${variant.capacity}` : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Quantity
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', width: '132px', overflow: 'hidden' }}>
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: '44px', height: '44px', border: 'none', backgroundColor: '#f9fafb', fontSize: '18px', cursor: 'pointer', color: '#374151' }}
              >
                −
              </button>
              <input 
                type="number" 
                value={quantity}
                readOnly
                style={{ width: '44px', height: '44px', border: 'none', borderLeft: '1px solid #d1d5db', borderRight: '1px solid #d1d5db', textAlign: 'center', fontSize: '16px', margin: 0, padding: 0 }}
              />
              <button 
                onClick={() => setQuantity(q => q + 1)}
                style={{ width: '44px', height: '44px', border: 'none', backgroundColor: '#f9fafb', fontSize: '18px', cursor: 'pointer', color: '#374151' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: isOutOfStock ? '#e5e7eb' : '#111827',
              color: isOutOfStock ? '#9ca3af' : '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              marginBottom: '12px',
              transition: 'background-color 0.2s ease'
            }}
          >
            {isOutOfStock ? 'Sold out' : 'Add to cart'}
          </button>

          {/* Buy it now dummy button */}
          <button 
            disabled={isOutOfStock}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#ffffff',
              color: '#111827',
              border: '1px solid #111827',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              marginBottom: '32px'
            }}
          >
            Buy it now
          </button>

          {/* Specifications Accordion (Simplified) */}
          {selectedVariant?.specifications && Object.keys(selectedVariant.specifications).length > 0 && (
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>Specifications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ color: '#6b7280' }}>SKU</span>
                  <span style={{ color: '#111827', fontWeight: 500 }}>{selectedVariant?.sku}</span>
                </div>
                {Object.entries(selectedVariant.specifications).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', textTransform: 'capitalize' }}>{key.replace('_', ' ')}</span>
                    <span style={{ color: '#111827', fontWeight: 500 }}>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}