export const dynamic = 'force-dynamic';

import { createAdminClient } from '#/utils/supabase/admin';
import ReviewStatusToggle from '#/components/admin/review-status-toggle';

export default async function AdminReviewsPage() {
  const supabase = createAdminClient();
  const { data: reviews, error } = await supabase
    .from('product_reviews')
    .select(`
      *,
      products ( title ),
      customers ( first_name, last_name, id )
    `)
    .order('created_at', { ascending: false });

  const items = reviews || [];

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Moderation</span>
          <h1>Product Reviews</h1>
          <p>Read and approve customer feedback before it appears on your storefront.</p>
        </div>
        <div className="admin-order-count">
          <strong>{items.length}</strong>
          <span>total reviews</span>
        </div>
      </section>

      {error ? (
        <div className="admin-notice admin-notice--error">Could not load reviews: {error.message}</div>
      ) : items.length === 0 ? (
        <div className="admin-empty-state admin-empty-state--large">
          <strong>No reviews yet.</strong>
          <p>When customers leave a review on a product, they will show up here for moderation.</p>
        </div>
      ) : (
        <section className="admin-panel admin-product-panel">
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Approved</th>
                </tr>
              </thead>
              <tbody>
                {items.map((review) => {
                  const customerName = review.customers 
                    ? `${review.customers.first_name || ''} ${review.customers.last_name || ''}`.trim() || 'Guest'
                    : 'Guest';
                    
                  return (
                    <tr key={review.id}>
                      <td>
                        <strong className="admin-table-strong">
                          {review.products?.title || 'Unknown Product'}
                        </strong>
                        <div style={{ fontSize: '11px', color: 'var(--admin-text-secondary)', marginTop: '4px' }}>
                          {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td>{customerName}</td>
                      <td>
                        <div style={{ color: '#008060', fontSize: '16px' }}>
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                      </td>
                      <td style={{ maxWidth: '300px', whiteSpace: 'normal', lineHeight: '1.4' }}>
                        {review.comment || <span style={{ fontStyle: 'italic', color: '#8a8a8a' }}>No comment provided.</span>}
                      </td>
                      <td>
                        <ReviewStatusToggle reviewId={review.id} initialApproved={review.is_approved} />
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
