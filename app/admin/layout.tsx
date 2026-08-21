import { getCurrentUser, createClient } from '#/utils/auth/rbac';
import AdminShell from './admin-shell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  let permissions: string[] = [];

  if (user) {
    try {
      const supabase = await createClient();
      const { data: member, error: memberError } = await supabase
        .from('organization_members')
        .select('role_id')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (member?.role_id && !memberError) {
        const { data: rolePerms, error: permsError } = await supabase
          .from('role_permissions')
          .select('permission:permissions!inner(name)')
          .eq('role_id', member.role_id);
        
        if (rolePerms && !permsError) {
          permissions = rolePerms.map((rp: any) => rp.permission.name);
        }
      }
    } catch (e) {
      console.error('Failed to load admin permissions:', e);
    }
  }

  return (
    <AdminShell permissions={permissions}>
      {children}
    </AdminShell>
  );
}
