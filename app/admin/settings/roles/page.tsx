import { requirePermission } from '#/utils/auth/rbac';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createAdminClient } from '#/utils/supabase/admin';

export default async function RolesSettingsPage() {
  // Enforce access control
  try {
    await requirePermission('roles.view');
  } catch {
    redirect('/admin/unauthorized');
  }

  const adminSupabase = createAdminClient();

  const { data: roles } = await adminSupabase
    .from('roles')
    .select(`
      id,
      name,
      description,
      is_system_role,
      role_permissions (
        permission:permissions ( name )
      ),
      organization_members ( count )
    `)
    .eq('organization_id', '00000000-0000-0000-0000-000000000001')
    .order('name');

  return (
    <div className="admin-overview">
      <div className="admin-metric-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ margin: 0 }}>Roles & Permissions</h2>
            <p style={{ margin: 0, color: 'var(--admin-muted)' }}>Overview of all roles available in the organization.</p>
          </div>
          <Link href="/admin/settings/team" className="admin-button" style={{ textDecoration: 'none' }}>
            Manage Team
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {roles?.map(role => (
            <div key={role.id} style={{ padding: '1.5rem', border: '1px solid var(--admin-border)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {role.name}
                    {role.is_system_role && (
                      <span style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'var(--admin-border)', borderRadius: '4px' }}>System Role</span>
                    )}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--admin-muted)', fontSize: '0.9rem' }}>{role.description}</p>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--admin-muted)' }}>
                  {role.organization_members[0].count} team members
                </div>
              </div>
              
              <div>
                <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--admin-muted)' }}>Permissions</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {role.role_permissions.length > 0 ? role.role_permissions.map((rp: any) => (
                    <span key={rp.permission.name} style={{ fontSize: '0.8rem', padding: '2px 8px', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: '12px' }}>
                      {rp.permission.name}
                    </span>
                  )) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>No specific permissions assigned.</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
