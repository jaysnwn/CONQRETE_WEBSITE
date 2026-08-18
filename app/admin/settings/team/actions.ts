'use server';

import { createClient, requirePermission, logAuditAction } from '#/utils/auth/rbac';
import { createAdminClient } from '#/utils/supabase/admin';

export async function updateUserStatus(memberId: string, newStatus: string) {
  try {
    await requirePermission('users.suspend');
    
    const supabase = await createClient();
    
    // Check if the user is an Owner
    const { data: memberData } = await supabase
      .from('organization_members')
      .select('role:roles(name)')
      .eq('id', memberId)
      .single();
      
    const member = memberData as any;
    if (member?.role?.name === 'Owner') {
      return { error: 'Cannot modify Owner status.' };
    }

    const { error } = await supabase
      .from('organization_members')
      .update({ status: newStatus })
      .eq('id', memberId);

    if (error) throw error;

    await logAuditAction({
      action: 'Updated user status',
      resourceType: 'organization_members',
      resourceId: memberId,
      newData: { status: newStatus },
      result: 'success',
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function changeUserRole(memberId: string, roleId: string) {
  try {
    await requirePermission('users.edit');
    
    const supabase = await createClient();
    
    // Check if the user is an Owner
    const { data: memberData } = await supabase
      .from('organization_members')
      .select('role:roles(name)')
      .eq('id', memberId)
      .single();
      
    const member = memberData as any;
    if (member?.role?.name === 'Owner') {
      return { error: 'Cannot modify Owner role.' };
    }

    const { error } = await supabase
      .from('organization_members')
      .update({ role_id: roleId })
      .eq('id', memberId);

    if (error) throw error;

    await logAuditAction({
      action: 'Changed user role',
      resourceType: 'organization_members',
      resourceId: memberId,
      newData: { role_id: roleId },
      result: 'success',
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function inviteUser(email: string, fullName: string, roleId: string) {
  try {
    await requirePermission('users.invite');
    
    const adminSupabase = createAdminClient();
    
    // 1. Invite the user via Supabase Auth
    const { data: authData, error: authError } = await adminSupabase.auth.admin.inviteUserByEmail(email);
    
    if (authError) {
      if (authError.message.includes('already exists') || authError.message.includes('already registered')) {
         // User already exists in Auth, we can just add them to the org
      } else {
        throw authError;
      }
    }
    
    // Find user ID (either newly invited or existing)
    const { data: users } = await adminSupabase.auth.admin.listUsers();
    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      return { error: 'Could not create or find user in Auth.' };
    }

    // 2. Insert into profiles (if not exists, or update if exists but blank)
    await adminSupabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName || email.split('@')[0]
    });

    // 3. Insert into organization_members
    const { error: orgError } = await adminSupabase
      .from('organization_members')
      .insert({
        organization_id: '00000000-0000-0000-0000-000000000001',
        user_id: user.id,
        role_id: roleId,
        status: 'invited',
      });

    if (orgError) {
      if (orgError.message.includes('duplicate key')) {
        return { error: 'User is already in the organization.' };
      }
      throw orgError;
    }

    // Fetch the role name for the audit log
    const { data: roleData } = await adminSupabase.from('roles').select('name').eq('id', roleId).single();

    await logAuditAction({
      action: 'Invited team member',
      resourceType: 'user',
      resourceId: user.id,
      newData: { email, full_name: fullName, role: roleData?.name || roleId },
      result: 'success',
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
