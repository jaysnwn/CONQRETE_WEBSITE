"use client";
import Link from 'next/link';

const categories = [
  {
    name: 'Power Banks',
    subtitle: 'Portable charging for every journey',
    icon: '🔋',
    href: '/powerbanks',
    color: '#f0fdf4',
    border: '#bbf7d0',
  },
  {
    name: 'Power Cables',
    subtitle: 'Fast data & charge transfers',
    icon: '⚡',
    href: '/cables',
    color: '#eff6ff',
    border: '#bfdbfe',
  },
  {
    name: 'Power Adapters',
    subtitle: 'GaN multi-port wall chargers',
    icon: '🔌',
    href: '/adapters',
    color: '#fdf4ff',
    border: '#e9d5ff',
  },
  {
    name: 'View All Products',
    subtitle: 'Browse the full CONQRETE range',
    icon: '🛍️',
    href: '/products',
    color: '#f9fafb',
    border: '#e5e7eb',
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
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              backgroundColor: cat.color,
              border: `1px solid ${cat.border}`,
              borderRadius: '16px',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '36px', marginBottom: '16px' }}>{cat.icon}</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>
              {cat.name}
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0', lineHeight: 1.5, flex: 1 }}>
              {cat.subtitle}
            </p>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Shop now →
            </span>
          </Link>
        ))}
      </div>

      <style>{`
        .category-nav-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .category-nav-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 8px;
            gap: 16px;
          }
          .category-nav-grid > a {
            flex: 0 0 65%;
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
