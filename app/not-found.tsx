import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
      <h1 style={{ fontSize: '120px', fontWeight: 900, color: '#111827', margin: 0, lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#4b5563', margin: '16px 0 24px 0' }}>Page Not Found</h2>
      <p style={{ color: '#6b7280', maxWidth: '400px', marginBottom: '32px' }}>
        The page you are looking for has been moved or no longer exists.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="/products" style={{ padding: '12px 24px', backgroundColor: '#111827', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 600 }}>Shop Products</Link>
        <Link href="/support/contact" style={{ padding: '12px 24px', backgroundColor: '#f3f4f6', color: '#111827', textDecoration: 'none', borderRadius: '4px', fontWeight: 600 }}>Contact Support</Link>
      </div>
    </div>
  );
}
