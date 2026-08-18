import { createClient, requirePermission } from '#/utils/auth/rbac';
import { redirect } from 'next/navigation';

import { createAdminClient } from '#/utils/supabase/admin';

export default async function AuditLogsPage() {
  // Enforce access control
  try {
    await requirePermission('audit_logs.view');
  } catch {
    redirect('/admin/unauthorized');
  }

  const adminSupabase = createAdminClient();

  // Fetch recent audit logs
  const { data: logsData } = await adminSupabase
    .from('audit_logs')
    .select(`
      id,
      user_id,
      action,
      resource_type,
      resource_id,
      result,
      created_at
    `)
    .eq('organization_id', '00000000-0000-0000-0000-000000000001')
    .order('created_at', { ascending: false })
    .limit(100);

  const { data: profiles } = await adminSupabase
    .from('profiles')
    .select('id, full_name, avatar_url');

  const logs = (logsData as any[])?.map(log => ({
    ...log,
    profile: profiles?.find(p => p.id === log.user_id) || null
  })) || [];

  return (
    <div className="admin-overview">
      <div className="admin-metric-card">
        <h2 style={{ margin: '0 0 0.5rem 0' }}>Security & Audit Logs</h2>
        <p style={{ margin: '0 0 2rem 0', color: 'var(--admin-muted)' }}>
          A secure, append-only ledger of all administrative actions taken in the dashboard.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs?.map((log) => (
                <tr key={log.id}>
                  <td style={{ color: 'var(--admin-muted)', fontSize: '0.9rem' }}>
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{log.profile?.full_name || 'System / Unknown'}</div>
                  </td>
                  <td>{log.action}</td>
                  <td>
                    <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', background: 'var(--admin-bg)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--admin-border)' }}>
                      {log.resource_type}
                    </span>
                    {log.resource_id && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)', marginTop: '4px' }}>
                        ID: {log.resource_id.substring(0, 8)}...
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{ 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.85rem',
                      backgroundColor: log.result === 'success' ? '#e6f4ea' : (log.result === 'denied' ? '#fce8e6' : '#fef7e0'),
                      color: log.result === 'success' ? '#137333' : (log.result === 'denied' ? '#c5221f' : '#b06000')
                    }}>
                      {log.result.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {(!logs || logs.length === 0) && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--admin-muted)' }}>
                    No audit logs recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
