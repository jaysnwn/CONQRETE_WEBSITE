import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="admin-overview" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <div className="admin-metric-card" style={{ maxWidth: '400px', margin: '0 auto', padding: '3rem' }}>
        <h2 style={{ color: 'var(--admin-destructive)', marginBottom: '1rem' }}>Unauthorized</h2>
        <p style={{ marginBottom: '2rem' }}>You do not have the required permissions to view this page or perform this action.</p>
        <Link href="/admin" className="admin-button">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
