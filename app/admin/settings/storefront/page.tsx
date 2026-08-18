import { requirePermission } from '#/utils/auth/rbac';
import { redirect } from 'next/navigation';
import { createAdminClient } from '#/utils/supabase/admin';
import StorefrontClient from './StorefrontClient';

export default async function StorefrontSettingsPage() {
  // Enforce access control
  try {
    await requirePermission('marketing.manage');
  } catch {
    redirect('/admin/unauthorized');
  }

  const adminSupabase = createAdminClient();

  // Fetch all slides
  const { data: slides } = await adminSupabase
    .from('hero_slides')
    .select('*')
    .eq('organization_id', '00000000-0000-0000-0000-000000000001')
    .order('display_order', { ascending: true });

  return (
    <div className="admin-overview">
      <header className="admin-header">
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Storefront Settings</h1>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--admin-muted)' }}>
            Manage homepage banners and carousel slides.
          </p>
        </div>
      </header>
      
      <StorefrontClient initialSlides={slides || []} />
    </div>
  );
}
