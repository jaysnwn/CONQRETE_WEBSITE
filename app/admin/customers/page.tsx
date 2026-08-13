export const dynamic = 'force-dynamic';

import { createAdminClient } from '#/utils/supabase/admin';

export default async function AdminCustomersPage() {
  const supabase = createAdminClient();
  const { data: customers, error } = await supabase
    .from('customers')
    .select('*, orders(count)')
    .order('created_at', { ascending: false });

  const items = customers || [];

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">CRM</span>
          <h1>Customers</h1>
          <p>View and manage the people who buy from your store.</p>
        </div>
        <div className="admin-order-count">
          <strong>{items.length}</strong>
          <span>total</span>
        </div>
      </section>

      {error ? (
        <div className="admin-notice admin-notice--error">Could not load customers: {error.message}</div>
      ) : items.length === 0 ? (
        <div className="admin-empty-state admin-empty-state--large">
          <strong>No customers yet.</strong>
          <p>When someone makes an account or places an order, they will appear here.</p>
        </div>
      ) : (
        <section className="admin-panel admin-product-panel">
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Orders</th>
                  <th>Customer Since</th>
                </tr>
              </thead>
              <tbody>
                {items.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="admin-customer">
                        <strong>
                          {customer.first_name || customer.last_name
                            ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim()
                            : 'Guest Customer'}
                        </strong>
                        <span>{customer.id.slice(0, 8)}</span>
                      </div>
                    </td>
                    <td>{customer.phone_number || '—'}</td>
                    <td>{customer.orders?.[0]?.count || 0}</td>
                    <td>{new Date(customer.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
