import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  );
}

/**
 * Gets the currently authenticated user from Supabase.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

/**
 * Gets the user's active organization membership.
 * For now, we assume they belong to the initial CONQRETE org.
 */
export async function getCurrentOrganization() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  
  // Get active membership
  const { data: member, error } = await supabase
    .from('organization_members')
    .select('*, organization:organizations(*), role:roles(*)')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  if (error || !member) return null;
  return member;
}

/**
 * Checks if the current user has a specific permission.
 */
export async function hasPermission(permissionName: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const supabase = await createClient();

  // 1. Get the user's active role ID
  const { data: member } = await supabase
    .from('organization_members')
    .select('role_id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  if (!member || !member.role_id) return false;

  // 2. Check if that role has the required permission
  const { data: rolePermission } = await supabase
    .from('role_permissions')
    .select('permission:permissions!inner(name)')
    .eq('role_id', member.role_id)
    .eq('permissions.name', permissionName)
    .single();

  return !!rolePermission;
}

/**
 * Requires a specific permission. Throws an error or redirects if unauthorized.
 * Useful for server actions and API routes.
 */
export async function requirePermission(permissionName: string) {
  const authorized = await hasPermission(permissionName);
  if (!authorized) {
    throw new Error(`Unauthorized: Missing required permission '${permissionName}'`);
  }
}

/**
 * Logs an administrative action to the audit log.
 */
export async function logAuditAction(params: {
  action: string;
  resourceType: string;
  resourceId?: string;
  oldData?: any;
  newData?: any;
  metadata?: any;
  result: 'success' | 'denied' | 'failed';
}) {
  const user = await getCurrentUser();
  if (!user) return; // Cannot log if we don't know who did it

  const supabase = await createClient();
  
  // Attempt to get current organization ID
  const { data: member } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .single();

  const organization_id = member?.organization_id;

  const ip_address = 'unknown'; // Next.js doesn't easily expose IP in server actions without passing headers manually
  const user_agent = 'unknown';

  await supabase.from('audit_logs').insert({
    organization_id,
    user_id: user.id,
    action: params.action,
    resource_type: params.resourceType,
    resource_id: params.resourceId,
    old_data: params.oldData,
    new_data: params.newData,
    metadata: params.metadata,
    ip_address,
    user_agent,
    result: params.result,
  });
}
