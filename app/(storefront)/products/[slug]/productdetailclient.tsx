"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '#/store/cart';
import ImageCarousel from '#/components/ui/image-carousel';
import ProductCard from '#/components/ui/product-card';

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <span style={{ color: '#0052FF', fontSize: '18px', letterSpacing: '2px' }}>
      {'★'.repeat(fullStars)}
      {'☆'.repeat(emptyStars)}
    </span>
  );
}

export default function ProductDetailClient({ product, relatedProducts = [], reviews = [] }: { product: any, relatedProducts?: any[], reviews?: any[] }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('tech-specs');
  const router = useRouter();
  
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

  const variantImages = (selectedVariant?.image_url || '').split(',').map((s: string) => s.trim()).filter(Boolean);
  const commonImages = product.images || [];
  const displayImages = Array.from(new Set([...variantImages, ...commonImages]));

  // Extract page content blocks
  const { faqs = [], small_banners = [], large_banner, tech_section } = product.page_content || {};

  // Review calculations
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(2) : '0.00';
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => ratingCounts[r.rating as keyof typeof ratingCounts]++);

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: 'clamp(20px, 4vw, 40px) clamp(12px, 3vw, 20px)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Main Product Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px)', marginBottom: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          
          {/* Breadcrumb */}
          <div style={{ paddingBottom: '24px', fontSize: '13px', color: '#6b7280' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#6b7280' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/products" style={{ textDecoration: 'none', color: '#6b7280' }}>Products</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#111827' }}>{product.title}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: 'clamp(24px, 4vw, 60px)' }}>
            
            {/* Image Gallery */}
            <div className="product-gallery">
              {/* Thumbnails */}
              <div className="product-thumbnails">
                {displayImages.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`product-thumbnail-btn ${activeImageIdx === idx ? 'active' : ''}`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="product-main-image">
                {displayImages.length > 0 ? (
                  <Image 
                    src={displayImages[activeImageIdx] || displayImages[0]} 
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>No image</div>
                )}
              </div>
            </div>

            <style>{`
              .product-gallery {
                display: flex;
                gap: 16px;
                flex-direction: row;
                height: fit-content;
              }
              .product-thumbnails {
                display: flex;
                flex-direction: column;
                gap: 12px;
                width: 80px;
                flex-shrink: 0;
                overflow-y: auto;
                max-height: 500px;
                scrollbar-width: none;
              }
              .product-thumbnails::-webkit-scrollbar {
                display: none;
              }
              .product-thumbnail-btn {
                width: 100%;
                aspect-ratio: 1/1;
                position: relative;
                background-color: #f8f9fa;
                border-radius: 8px;
                overflow: hidden;
                border: 2px solid transparent;
                cursor: pointer;
                padding: 0;
                flex-shrink: 0;
              }
              .product-thumbnail-btn.active {
                border-color: #111827;
              }
              .product-main-image {
                flex: 1;
                position: relative;
                aspect-ratio: 1/1;
                background-color: #f3f4f6;
                border-radius: 16px;
                overflow: hidden;
              }

              @media (max-width: 768px) {
                .product-gallery {
                  flex-direction: column-reverse;
                  gap: 12px;
                }
                .product-thumbnails {
                  flex-direction: row;
                  width: 100%;
                  max-height: none;
                  overflow-y: hidden;
                  overflow-x: auto;
                  padding-bottom: 4px;
                }
                .product-thumbnail-btn {
                  width: 70px;
                  height: 70px;
                }
                .product-main-image {
                  width: 100%;
                }
              }
            `}</style>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 600, color: '#111827', margin: '0 0 8px 0', lineHeight: 1.2 }}>
                {product.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#6b7280' }}>
                <StarRating rating={Number(avgRating)} /> 
                <a href="#reviews" style={{ color: '#0052FF', textDecoration: 'none' }}>{totalReviews} reviews</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>
                  ₹{selectedVariant?.price.toLocaleString('en-IN')}
                </span>
                {selectedVariant?.compare_at_price && (
                  <span style={{ fontSize: '16px', color: '#9ca3af', textDecoration: 'line-through' }}>
                    MRP ₹{selectedVariant.compare_at_price.toLocaleString('en-IN')}
                  </span>
                )}
                {selectedVariant?.compare_at_price && selectedVariant.compare_at_price > selectedVariant.price && (
                  <span style={{ backgroundColor: '#111827', color: '#ffffff', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>
                    Save ₹{(selectedVariant.compare_at_price - selectedVariant.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '32px' }}>Inclusive of all taxes ⓘ</div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 1 && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                    Colour
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {product.variants.map((variant: any) => {
                      const isActive = selectedVariant?.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => { setSelectedVariant(variant); setActiveImageIdx(0); }}
                          style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: isActive ? '2px solid #111827' : '1px solid #e5e7eb',
                            backgroundColor: '#ffffff',
                            color: '#111827',
                            fontSize: '14px',
                            fontWeight: isActive ? 600 : 400,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
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
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                  Quantity
                </div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', width: '120px', overflow: 'hidden' }}>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: '40px', height: '40px', border: 'none', backgroundColor: '#f9fafb', fontSize: '18px', cursor: 'pointer' }}>−</button>
                  <input type="number" value={quantity} readOnly style={{ width: '40px', height: '40px', border: 'none', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', textAlign: 'center', fontSize: '15px', padding: 0 }} />
                  <button onClick={() => setQuantity(q => q + 1)} style={{ width: '40px', height: '40px', border: 'none', backgroundColor: '#f9fafb', fontSize: '18px', cursor: 'pointer' }}>+</button>
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
                  borderRadius: '999px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                  marginBottom: '24px',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {isOutOfStock ? 'Sold out' : 'Add to cart'}
              </button>

              <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6 }}>
                {product.description}
              </div>
            </div>
          </div>
        </div>

        {/* Small Banners */}
        {small_banners && small_banners.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
             {small_banners.map((imgUrl: string, i: number) => (
               <div key={i} style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden' }}>
                 <Image src={imgUrl} alt={`Banner ${i+1}`} fill style={{ objectFit: 'cover' }} />
               </div>
             ))}
          </div>
        )}

        {/* Large Banner */}
        {large_banner && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', borderRadius: '16px', overflow: 'hidden', marginBottom: '60px' }}>
            <Image src={large_banner} alt="Large Promotional Banner" fill style={{ objectFit: 'cover' }} />
          </div>
        )}

        {/* Tech Description */}
        {tech_section && tech_section.title && (
          <div style={{ backgroundColor: '#111827', borderRadius: '16px', padding: '60px 40px', marginBottom: '60px', textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', opacity: 0.7 }}>About The Tech</div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '40px' }}>{tech_section.title}</h2>
            <div style={{ maxWidth: '600px', margin: '0 auto', fontSize: '14px', lineHeight: 1.8, color: '#d1d5db', textAlign: 'left', whiteSpace: 'pre-wrap' }}>
              {tech_section.content}
            </div>
          </div>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '32px' }}>FAQ</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px' }}>
              {faqs.map((faq: any, i: number) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', padding: '16px 0', borderBottom: i === faqs.length - 1 ? 'none' : '1px solid #e5e7eb', textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>{faq.q}</div>
                  <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.6 }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Know More About The Product Section */}
        {selectedVariant?.specifications && Object.keys(selectedVariant.specifications).length > 0 && (
          <div style={{ marginBottom: '60px', textAlign: 'center', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 500, color: '#111827', marginBottom: '40px' }}>More About The Product</h2>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0', borderBottom: '1px solid #e5e7eb', maxWidth: '600px', margin: '0 auto 32px' }}>
              <button 
                onClick={() => setActiveTab('tech-specs')}
                style={{ 
                  padding: '12px 48px', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'tech-specs' ? '2px solid #111827' : '2px solid transparent',
                  color: activeTab === 'tech-specs' ? '#111827' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Tech Specs
              </button>
              <button 
                onClick={() => setActiveTab('made-in-india')}
                style={{ 
                  padding: '12px 48px', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'made-in-india' ? '2px solid #111827' : '2px solid transparent',
                  color: activeTab === 'made-in-india' ? '#111827' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Made In India
              </button>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
              {activeTab === 'tech-specs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#374151', fontSize: '14px' }}>
                  {Object.entries(selectedVariant.specifications).map(([key, value]) => (
                    <div key={key}>
                      <strong style={{ fontWeight: 600 }}>{key.replace('_', ' ')}:</strong> {String(value)}
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'made-in-india' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#374151', fontSize: '14px' }}>
                  <p>Designed and manufactured proudly in India, bringing you the best in local innovation and quality.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        <div id="reviews" style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px)', marginBottom: '60px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111827', marginBottom: '32px' }}>Customer Reviews</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '60px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <StarRating rating={Number(avgRating)} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{avgRating} out of 5</span>
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[5, 4, 3, 2, 1].map(stars => {
                const count = ratingCounts[stars as keyof typeof ratingCounts] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                    <span style={{ color: '#0052FF', width: '50px' }}>{'★'.repeat(stars)}{'☆'.repeat(5-stars)}</span>
                    <div style={{ width: '120px', height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#0052FF' }} />
                    </div>
                    <span style={{ color: '#6b7280', width: '20px', textAlign: 'right' }}>{count}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button style={{ backgroundColor: '#0014B3', color: 'white', padding: '12px 32px', borderRadius: '4px', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                Write a review
              </button>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', textAlign: 'left' }}>
            {reviews.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', fontStyle: 'italic' }}>No reviews yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {reviews.map(review => (
                  <div key={review.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <StarRating rating={review.rating} />
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>{new Date(review.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{review.reviewer_name}</span>
                      <span style={{ backgroundColor: '#0052FF', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Verified</span>
                    </div>
                    {review.comment && <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6, margin: 0 }}>{review.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111827', marginBottom: '32px' }}>You may also like</h2>
            
            <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', scrollbarWidth: 'thin', alignItems: 'stretch' }}>
              {relatedProducts.map(relProduct => (
                <div key={relProduct.id} style={{ width: '260px', flexShrink: 0, display: 'flex' }}>
                  <ProductCard product={relProduct} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}