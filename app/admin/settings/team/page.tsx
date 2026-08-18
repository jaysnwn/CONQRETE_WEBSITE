import { createClient, requirePermission } from '#/utils/auth/rbac';
import { redirect } from 'next/navigation';
import TeamClient, { InviteButton } from './TeamClient';

import { createAdminClient } from '#/utils/supabase/admin';

export default async function TeamSettingsPage() {
  // Enforce access control
  try {
    await requirePermission('users.view');
  } catch {
    redirect('/admin/unauthorized');
  }

  // Use the admin client to bypass RLS for this specific admin view
  const adminSupabase = createAdminClient();

  // Get all members of the default organization
  const { data: rawMembers, error: membersError } = await adminSupabase
    .from('organization_members')
    .select(`
      id,
      user_id,
      status,
      invited_at,
      joined_at,
      role:roles(id, name, is_system_role)
    `)
    .eq('organization_id', '00000000-0000-0000-0000-000000000001')
    .order('joined_at', { ascending: false });

  // Get all profiles to manually stitch them (since there is no direct FK between organization_members and profiles)
  const { data: profiles } = await adminSupabase
    .from('profiles')
    .select('id, full_name, avatar_url');

  // Stitch them together
  const members = rawMembers?.map(member => ({
    ...member,
    profile: profiles?.find(p => p.id === member.user_id) || null
  })) || [];

  // Get all roles available in the organization
  const { data: roles } = await adminSupabase
    .from('roles')
    .select('id, name')
    .eq('organization_id', '00000000-0000-0000-0000-000000000001')
    .order('name');

  if (membersError) {
    console.error('Error fetching members:', membersError);
  }

  return (
    <div className="admin-overview">
      <div className="admin-metric-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ margin: 0 }}>Team Members</h2>
            <p style={{ margin: 0, color: 'var(--admin-muted)' }}>Manage who has access to the admin dashboard.</p>
          </div>
          <InviteButton roles={roles || []} />
        </div>

        <TeamClient members={members || []} roles={roles || []} />
      </div>
    </div>
  );
}
