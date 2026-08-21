export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { createAdminClient } from '@/utils/supabase/admin';

type RecentOrder = {
  id: string;
  customer_name: string | null;
  status: string | null;
  total_amount: number | null;
  created_at: string | null;
};

async function getDashboardData() {
  try {
    const supabase = createAdminClient();
    const [{ count: productCount }, { count: orderCount }, { data: recentOrders }] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase
        .from('orders')
        .select('id, customer_name, status, total_amount, created_at')
        .order('created_at', { ascending: false })
        .limit(4),
    ]);
    return {
      productCount: productCount ?? 0,
      orderCount: orderCount ?? 0,
      recentOrders: (recentOrders ?? []) as RecentOrder[],
      hasError: false,
    };
  } catch (error) {
    // A network/connection failure here would otherwise take down the whole
    // dashboard with Next's default error screen. Degrade gracefully instead.
    console.error('Admin dashboard: failed to load metrics', error);
    return { productCount: 0, orderCount: 0, recentOrders: [] as RecentOrder[], hasError: true };
  }
}

export default async function AdminDashboardPage() {
  const { productCount, orderCount, recentOrders, hasError } = await getDashboardData();

  const metrics = [
    { label: 'Catalog products', value: productCount, detail: 'Items in your store', href: '/admin/products', tone: 'lime' },
    { label: 'Total orders', value: orderCount, detail: 'Orders received to date', href: '/admin/orders', tone: 'orange' },
  ];

  return (
    <div className="admin-page-stack">
      {hasError && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem' }}>
          Could not load dashboard data
        </div>
      )}
      <section className="admin-hero">
        <div>
          <span className="admin-eyebrow">Store overview</span>
          <h1>Welcome back.</h1>
          <p>Here is a clear view of your store and the work that needs your attention.</p>
        </div>
      </section>

      <section className="admin-metrics">
        {metrics.map((metric) => (
          <Link key={metric.label} href={metric.href} className={`admin-metric-card admin-metric-card--${metric.tone}`}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.detail} <b>→</b></p>
          </Link>
        ))}
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span className="admin-eyebrow">Latest activity</span>
            <h3>Recent orders</h3>
          </div>
          <Link href="/admin/orders">View all <span>→</span></Link>
        </div>
        {recentOrders.length ? (
          <div className="admin-recent-list">
            {recentOrders.map((order) => (
              <div className="admin-recent-row" key={order.id}>
                <div className="admin-order-mark">{String(order.id).slice(0, 2).toUpperCase()}</div>
                <div>
                  <strong>{order.customer_name || 'Customer order'}</strong>
                  <span>
                    #{String(order.id).slice(0, 8).toUpperCase()} ·{' '}
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                      : 'New order'}
                  </span>
                </div>
                <span className="admin-status-pill">{order.status || 'pending'}</span>
                <strong className="admin-recent-total">₹{Number(order.total_amount || 0).toLocaleString('en-IN')}</strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="admin-empty-state">No orders yet. Your newest orders will appear here.</div>
        )}
      </section>
    </div>
  );
}