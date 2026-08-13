export const dynamic = 'force-dynamic';

import { createAdminClient } from '#/utils/supabase/admin';
import DiscountForm from '#/components/admin/discount-form';

export default async function AdminDiscountsPage() {
  const supabase = createAdminClient();
  const { data: discounts, error } = await supabase
    .from('discount_codes')
    .select('*')
    .order('created_at', { ascending: false });

  const items = discounts || [];

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Marketing</span>
          <h1>Discounts</h1>
          <p>Create discount codes and automatic discounts for your store.</p>
        </div>
        <div className="admin-order-count">
          <strong>{items.length}</strong>
          <span>total codes</span>
        </div>
      </section>

      <DiscountForm />

      <section className="admin-panel admin-product-panel">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type & Value</th>
                <th>Minimum Purchase</th>
                <th>Usage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((discount) => (
                <tr key={discount.id}>
                  <td>
                    <div className="admin-customer">
                      <strong>{discount.code}</strong>
                    </div>
                  </td>
                  <td>
                    {discount.discount_type === 'percentage' && `${discount.discount_value}% off`}
                    {discount.discount_type === 'fixed_amount' && `₹${discount.discount_value} off`}
                    {discount.discount_type === 'free_shipping' && `Free Shipping`}
                  </td>
                  <td>{discount.min_purchase_amount > 0 ? `₹${discount.min_purchase_amount}` : 'None'}</td>
                  <td>
                    {discount.used_count || 0}
                    {discount.usage_limit ? ` / ${discount.usage_limit}` : ''}
                  </td>
                  <td>
                    {discount.is_active ? (
                      <span style={{ color: '#008060', fontWeight: 600 }}>Active</span>
                    ) : (
                      <span style={{ color: '#8a6116', fontWeight: 600 }}>Inactive</span>
                    )}
                  </td>
                </tr>
              ))}
              {error && (
                <tr>
                  <td colSpan={5}>
                    <div className="admin-notice admin-notice--error">Could not load discounts. Please try again.</div>
                  </td>
                </tr>
              )}
              {items.length === 0 && !error && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>
                    No discount codes created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
