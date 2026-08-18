import { getCurrentUser, createClient } from '#/utils/auth/rbac';
import AdminShell from './admin-shell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  let permissions: string[] = [];

  if (user) {
    const supabase = await createClient();
    const { data: member } = await supabase
      .from('organization_members')
      .select('role_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (member?.role_id) {
      const { data: rolePerms } = await supabase
        .from('role_permissions')
        .select('permission:permissions!inner(name)')
        .eq('role_id', member.role_id);
      
      if (rolePerms) {
        permissions = rolePerms.map((rp: any) => rp.permission.name);
      }
    }
  }

  return (
    <AdminShell permissions={permissions}>
      {children}
    </AdminShell>
  );
}
