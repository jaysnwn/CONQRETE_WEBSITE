import Image from 'next/image';
import Link from 'next/link';
import { getPublicProducts } from '#/features/products/actions';
import ProductCard from '#/components/ui/product-card';

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
            return <ProductCard key={product.id} product={product} />;
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
