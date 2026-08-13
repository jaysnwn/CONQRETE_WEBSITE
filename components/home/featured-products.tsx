import Image from 'next/image';
import Link from 'next/link';
import { getPublicProducts } from '#/features/products/actions';
import ImageCarousel from '#/components/ui/image-carousel';

export default async function FeaturedProducts() {
  const { data: allProducts, error } = await getPublicProducts();

  if (error || !allProducts || allProducts.length === 0) return null;

  const products = allProducts.slice(0, 4);

  return (
    <section style={{
      backgroundColor: '#f9fafb',
      padding: '64px 24px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px 0' }}>
              Handpicked for you
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: 0 }}>
              Featured Products
            </h2>
          </div>
          <Link href="/products" style={{ fontSize: '14px', fontWeight: 600, color: '#4b5563', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View all →
          </Link>
        </div>

        {/* Product Grid */}
        <div className="featured-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
        }}>
          {products.map((product) => {
            const mainVariant = product.variants?.[0];
            const price = mainVariant?.price ?? 0;
            const compareAt = mainVariant?.compare_at_price;
            const discountPct = compareAt && compareAt > price
              ? Math.round(((compareAt - price) / compareAt) * 100)
              : 0;
            const tags: string[] = Array.isArray(product.tags) ? product.tags : [];

            return (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  border: '1px solid #f3f4f6',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Images Carousel */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}>
                  <ImageCarousel images={product.images || []} slug={product.slug} title={product.title} />
                </div>

                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 4px' }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <span style={{ color: '#f59e0b', fontSize: '13px' }}>★★★★★</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>(5)</span>
                  </div>

                  <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                      {product.title}
                    </h3>
                  </Link>

                  {/* Price Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    {compareAt && compareAt > price && (
                      <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>
                        ₹{compareAt.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span style={{ fontSize: '17px', fontWeight: 700, color: '#111827' }}>
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    {discountPct > 0 && (
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#16a34a' }}>
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                      {tags.slice(0, 2).join(' | ')}
                    </div>
                  )}

                  {/* Add to Cart - Client island below */}
                  <Link
                    href={`/products/${product.slug}`}
                    style={{
                      marginTop: 'auto',
                      display: 'block',
                      width: '100%',
                      backgroundColor: '#111827',
                      color: '#ffffff',
                      padding: '11px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '14px',
                      textAlign: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .featured-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        .card-carousel::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
