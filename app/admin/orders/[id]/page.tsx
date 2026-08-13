import { createAdminClient } from '#/utils/supabase/admin';
import Link from 'next/link';
import OrderStatusSelect from '#/components/admin/order-status-select';
import OrderShippingForm from '#/components/admin/order-shipping-form';
import { notFound } from 'next/navigation';

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  // Fetch the main order
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      customers ( first_name, last_name, email, phone_number ),
      discount_codes ( code, discount_value, discount_type )
    `)
    .eq('id', id)
    .single();

  if (error) {
    return (
      <div className="admin-page-stack">
        <div className="admin-notice admin-notice--error">Could not load order details. Please try again.</div>
      </div>
    );
  }
  if (!order) return notFound();

  // Fetch line items
  const { data: lineItems, error: lineItemsError } = await supabase
    .from('order_items')
    .select(`
      id, quantity, price_at_purchase,
      product_variants ( sku, color, capacity, products ( title, images ) )
    `)
    .eq('order_id', id);

  const customerName = order.customers 
    ? `${order.customers.first_name || ''} ${order.customers.last_name || ''}`.trim() || 'Guest Customer'
    : 'Guest Customer';

  const address = order.shipping_address as Record<string, string> | null;

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">
            <Link href="/admin/orders">← Back to Orders</Link>
          </span>
          <h1>Order #{order.id.slice(0, 8).toUpperCase()}</h1>
          <p>{new Date(order.created_at).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</p>
        </div>
        <div>
          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Items and Financials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <section className="admin-panel admin-product-panel">
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)' }}>
              <h2 style={{ fontSize: '15px' }}>Items ({lineItems?.length || 0})</h2>
            </div>
            <table className="admin-table">
              <tbody>
                {lineItemsError && (
                  <tr>
                    <td colSpan={4}>
                      <div className="admin-notice admin-notice--error">Could not load line items.</div>
                    </td>
                  </tr>
                )}
                {lineItems?.map(item => {
                  const variant: any = item.product_variants;
                  const productTitle = variant?.products?.title || variant?.products?.[0]?.title || 'Unknown Product';
                  const img = variant?.products?.images?.[0] || variant?.products?.[0]?.images?.[0];
                  return (
                    <tr key={item.id}>
                      <td style={{ width: '60px' }}>
                        {img ? (
                          <img src={img} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
                        ) : (
                          <div style={{ width: '48px', height: '48px', background: 'var(--admin-surface)', borderRadius: '4px' }} />
                        )}
                      </td>
                      <td>
                        <strong style={{ display: 'block' }}>{productTitle}</strong>
                        <span style={{ fontSize: '13px', color: 'var(--admin-text-secondary)' }}>
                          {variant?.color} {variant?.capacity} • SKU: {variant?.sku}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>₹{Number(item.price_at_purchase).toLocaleString('en-IN')} × {item.quantity}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{(Number(item.price_at_purchase) * item.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="admin-panel" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '15px', marginBottom: '16px' }}>Payment</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--admin-text-secondary)' }}>Subtotal</span>
                <span>₹{Number(order.subtotal || 0).toLocaleString('en-IN')}</span>
              </div>
              {order.discount_code_id && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--admin-text-secondary)' }}>Discount ({order.discount_codes?.code})</span>
                  <span>- ₹{Number(order.total_amount || 0) < Number(order.subtotal || 0) ? (Number(order.subtotal) - Number(order.total_amount) + Number(order.shipping_cost || 0) + Number(order.tax_amount || 0)).toLocaleString('en-IN') : '0'}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--admin-text-secondary)' }}>Shipping</span>
                <span>₹{Number(order.shipping_cost || 0).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--admin-text-secondary)' }}>Tax</span>
                <span>₹{Number(order.tax_amount || 0).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--admin-border)', fontWeight: 600, fontSize: '16px' }}>
                <span>Total</span>
                <span>₹{Number(order.total_amount || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
            {order.stripe_payment_intent_id && (
              <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--admin-text-secondary)' }}>
                Stripe Payment Intent: {order.stripe_payment_intent_id}
              </p>
            )}
          </section>

        </div>

        {/* Right Column: Customer & Shipping */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <section className="admin-form-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '15px', marginBottom: '16px' }}>Customer</h2>
            <p style={{ fontWeight: 600 }}>{customerName}</p>
            <p style={{ fontSize: '14px', color: 'var(--admin-text-secondary)', marginTop: '4px' }}>
              {order.customers?.email || 'No email provided'}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--admin-text-secondary)', marginTop: '4px' }}>
              {order.customers?.phone_number || 'No phone provided'}
            </p>
          </section>

          <section className="admin-form-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '15px', marginBottom: '16px' }}>Shipping Address</h2>
            {address ? (
              <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                {address.name && <p>{address.name}</p>}
                {address.line1 && <p>{address.line1}</p>}
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city} {address.state} {address.postal_code}
                </p>
                {address.country && <p>{address.country}</p>}
              </div>
            ) : (
              <p style={{ fontSize: '14px', color: 'var(--admin-text-secondary)', fontStyle: 'italic' }}>
                No shipping address provided.
              </p>
            )}
          </section>

          <OrderShippingForm 
            orderId={order.id} 
            initialTracking={order.tracking_number} 
            initialCarrier={order.carrier} 
          />

        </div>

      </div>
    </div>
  );
}
