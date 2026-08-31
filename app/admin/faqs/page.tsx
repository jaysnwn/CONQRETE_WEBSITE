import { getFaqData } from './actions';
import FaqAdminClient from './client-page';

export const dynamic = 'force-dynamic';

export default async function AdminFaqsPage() {
  const initialFaqs = await getFaqData();
  
  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Content management</span>
          <h1>FAQs</h1>
          <p>Update, remove, change, or add frequently asked questions.</p>
        </div>
      </section>
      
      <FaqAdminClient initialFaqs={initialFaqs} />
    </div>
  );
}
