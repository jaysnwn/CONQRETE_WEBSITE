'use client';

import { useState } from 'react';
import { changeUserRole, inviteUser, updateUserStatus } from './actions';
import { useRouter } from 'next/navigation';

export default function TeamClient({ members, roles }: { members: any[], roles: any[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleStatusChange(memberId: string, currentStatus: string) {
    if (confirm(`Are you sure you want to ${currentStatus === 'active' ? 'suspend' : 'activate'} this user?`)) {
      setLoadingId(memberId);
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      const res = await updateUserStatus(memberId, newStatus);
      if (res?.error) {
        alert(res.error);
      }
      setLoadingId(null);
      router.refresh();
    }
  }

  async function handleRoleChange(memberId: string, roleId: string) {
    setLoadingId(memberId);
    const res = await changeUserRole(memberId, roleId);
    if (res?.error) {
      alert(res.error);
    }
    setLoadingId(null);
    router.refresh();
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {member.profile?.full_name ? member.profile.full_name[0].toUpperCase() : '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{member.profile?.full_name || 'Unknown User'}</div>
                  </div>
                </div>
              </td>
              <td>
                <select 
                  value={member.role?.id} 
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  disabled={loadingId === member.id || member.role?.name === 'Owner'}
                  style={{
                    padding: '0.25rem',
                    borderRadius: '4px',
                    border: '1px solid var(--admin-border)',
                    background: 'var(--admin-bg)'
                  }}
                >
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </td>
              <td>
                <span style={{ 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.85rem',
                  backgroundColor: member.status === 'active' ? '#e6f4ea' : '#fce8e6',
                  color: member.status === 'active' ? '#137333' : '#c5221f'
                }}>
                  {member.status.toUpperCase()}
                </span>
              </td>
              <td>{member.joined_at ? new Date(member.joined_at).toISOString().split('T')[0] : 'Invited'}</td>
              <td>
                <button
                  className="admin-button"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  disabled={loadingId === member.id || member.role?.name === 'Owner'}
                  onClick={() => handleStatusChange(member.id, member.status)}
                >
                  {member.status === 'active' ? 'Suspend' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function InviteButton({ roles }: { roles: any[] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default role ID to Viewer if available
  if (!roleId && roles.length > 0) {
    const viewerRole = roles.find((r) => r.name === 'Viewer');
    if (viewerRole) setRoleId(viewerRole.id);
    else setRoleId(roles[0].id);
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await inviteUser(email, fullName, roleId);
    setLoading(false);
    if (res?.error) {
      alert(res.error);
    } else {
      setIsOpen(false);
      setEmail('');
      setFullName('');
      router.refresh();
      alert('Invitation sent! They will receive a password reset link to login.');
    }
  }

  return (
    <>
      <button className="admin-button" onClick={() => setIsOpen(true)}>
        + Invite Member
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="admin-metric-card" style={{ width: '400px' }}>
            <h3 style={{ marginTop: 0 }}>Invite Team Member</h3>
            <form onSubmit={handleInvite}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--admin-border)', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="colleague@conqrete.com"
                  required
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--admin-border)', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Assign Role</label>
                <select 
                  value={roleId}
                  onChange={e => setRoleId(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--admin-border)', borderRadius: '4px' }}
                >
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="admin-button" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
