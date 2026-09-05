import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://conqrete.in${item.href}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" style={{ padding: '16px 0', fontSize: '13px', color: '#6b7280' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        {items.map((item, index) => (
          <li key={item.href} style={{ display: 'flex', alignItems: 'center' }}>
            <Link href={item.href} style={{ color: index === items.length - 1 ? '#111827' : '#6b7280', textDecoration: 'none', fontWeight: index === items.length - 1 ? 600 : 400 }}>
              {item.name}
            </Link>
            {index < items.length - 1 && <span style={{ margin: '0 8px', color: '#d1d5db' }}>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
