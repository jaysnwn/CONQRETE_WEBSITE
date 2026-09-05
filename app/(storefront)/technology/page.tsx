import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '#/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Technology Hub | CONQRETE',
  description: 'Learn about the cutting-edge charging and audio technologies inside CONQRETE products.',
  alternates: { canonical: 'https://conqrete.in/technology' }
};

export default function TechnologyHub() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Technology', href: '/technology' }]} />
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '24px 0' }}>Technology Hub</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>Discover the engineering behind CONQRETE's durable, high-performance electronics.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{ border: '1px solid #e5e7eb', padding: '24px', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>GaN Charging</h2>
          <p style={{ color: '#4b5563', margin: '12px 0' }}>Learn how Gallium Nitride is revolutionizing fast charging.</p>
          <Link href="/technology/gan-charging" style={{ color: '#c8ff00', textDecoration: 'none', fontWeight: 600 }}>Read Guide →</Link>
        </div>
        <div style={{ border: '1px solid #e5e7eb', padding: '24px', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>USB Power Delivery (PD)</h2>
          <p style={{ color: '#4b5563', margin: '12px 0' }}>Understanding universal fast charging standards.</p>
          <Link href="/technology/power-delivery" style={{ color: '#c8ff00', textDecoration: 'none', fontWeight: 600 }}>Read Guide →</Link>
        </div>
      </div>
    </div>
  );
}
