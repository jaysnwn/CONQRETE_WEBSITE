import { createAdminClient } from '#/utils/supabase/admin';
import Link from 'next/link';
import CreateReviewForm from '#/components/admin/create-review-form';

export const dynamic = 'force-dynamic';

export default async function NewReviewPage() {
  const supabase = createAdminClient();
  const { data: products } = await supabase.from('products').select('id, title').eq('is_active', true);

  return (
    <div className="admin-page-stack">
      <div className="admin-page-heading" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
        <Link href="/admin/reviews" className="admin-back-link">
          &larr; Back to Reviews
        </Link>
        <h1>Write a Review</h1>
        <p>Create a manual customer review for a product.</p>
      </div>

      <CreateReviewForm products={products || []} />
    </div>
  );
}
