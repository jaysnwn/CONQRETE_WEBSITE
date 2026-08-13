export const dynamic = 'force-dynamic';

import { createAdminClient } from '#/utils/supabase/admin';
import OrderStatusSelect from '#/components/admin/order-status-select';
import Link from 'next/link';

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();
  
  // Fetch orders with customer details and line items count
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      customers ( first_name, last_name, id ),
      order_items ( count )
    `)
    .order('created_at', { ascending: false });

  const items = orders || [];

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Fulfilment desk</span>
          <h1>Orders</h1>
          <p>Review customer purchases and move each order through fulfilment.</p>
        </div>
        <div className="admin-order-count">
          <strong>{items.length}</strong>
          <span>total orders</span>
        </div>
      </section>

      {error ? (
        <div className="admin-notice admin-notice--error">Could not load orders: {error.message}</div>
      ) : items.length === 0 ? (
        <div className="admin-empty-state admin-empty-state--large">
          <strong>No orders to process.</strong>
          <p>New customer orders will show up here automatically.</p>
        </div>
      ) : (
        <section className="admin-panel admin-product-panel">
          <div className="admin-table-scroll">
            <table className="admin-table admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((order) => {
                  const customerName = order.customers 
                    ? `${order.customers.first_name || ''} ${order.customers.last_name || ''}`.trim() || 'Guest Customer'
                    : 'Guest Customer';
                    
                  return (
                    <tr key={order.id}>
                      <td>
                        <Link href={`/admin/orders/${order.id}`} className="admin-order-id" style={{ color: 'var(--admin-primary)', textDecoration: 'none' }}>
                          <strong>#{order.id.slice(0, 8).toUpperCase()}</strong>
                        </Link>
                      </td>
                      <td>
                        <div className="admin-customer">
                          <strong>{customerName}</strong>
                          {order.customers?.id && <span>{order.customers.id.slice(0, 8)}</span>}
                        </div>
                      </td>
                      <td>
                        {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td>{order.order_items?.[0]?.count || 0}</td>
                      <td className="admin-table-strong">₹{Number(order.total_amount || 0).toLocaleString('en-IN')}</td>
                      <td>
                        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
