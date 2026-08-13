export const dynamic = 'force-dynamic';

import { createAdminClient } from '#/utils/supabase/admin';
import CategoryForm from '#/components/admin/category-form';

export default async function AdminCategoriesPage() {
  const supabase = createAdminClient();
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*, products(count)')
    .order('created_at', { ascending: false });

  const items = categories || [];

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Organization</span>
          <h1>Categories</h1>
          <p>Group your products into categories to make them easier to find.</p>
        </div>
        <div className="admin-order-count">
          <strong>{items.length}</strong>
          <span>total</span>
        </div>
      </section>

      <CategoryForm />

      <section className="admin-panel admin-product-panel">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>URL Slug</th>
                <th>Products</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {items.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div className="admin-customer">
                      <strong>{category.name}</strong>
                    </div>
                  </td>
                  <td>{category.slug}</td>
                  <td>{category.products?.[0]?.count || 0} items</td>
                  <td>{new Date(category.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                </tr>
              ))}
              {error && (
                <tr>
                  <td colSpan={4}>
                    <div className="admin-notice admin-notice--error">Could not load categories. Please try again.</div>
                  </td>
                </tr>
              )}
              {items.length === 0 && !error && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '32px' }}>
                    No categories created yet.
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
