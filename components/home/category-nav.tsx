"use client";
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Power Banks',
    href: '/powerbanks',
    image: '/categories/powerbanks.jpg',
  },
  {
    name: 'Power Cables',
    href: '/cables',
    image: '/categories/cables.jpg',
  },
  {
    name: 'Power Adapters',
    href: '/adapters',
    image: '/categories/adapters.jpg',
  },
  {
    name: 'View All Products',
    href: '/products',
    image: '/categories/viewall.jpg',
  },
];

export default function CategoryNav() {
  return (
    <section style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '48px 24px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px 0' }}>
            Shop by Category
          </p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: 0 }}>
            What are you looking for?
          </h2>
        </div>
        <Link href="/products" style={{ fontSize: '14px', fontWeight: 600, color: '#4b5563', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
          View all →
        </Link>
      </div>

      <div className="category-nav-grid">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            style={{
              display: 'block',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img 
              src={cat.image} 
              alt={cat.name} 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Link>
        ))}
      </div>

      <style>{`
        .category-nav-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .category-nav-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 12px;
            gap: 16px;
          }
          .category-nav-grid > a {
            flex: 0 0 75%;
            scroll-snap-align: center;
          }
          .category-nav-grid::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
