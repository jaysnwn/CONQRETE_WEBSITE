'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewStatusToggle({ reviewId, initialApproved }: { reviewId: string; initialApproved: boolean }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [approved, setApproved] = useState(initialApproved);

  async function toggleStatus(newStatus: boolean) {
    if (isUpdating) return;
    setIsUpdating(true);
    
    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reviewId, is_approved: newStatus }),
      });

      if (response.ok) {
        setApproved(newStatus);
        router.refresh();
      }
    } finally {
      setIsUpdating(false);
    }
  }

  async function deleteReview() {
    if (isUpdating) return;
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/reviews?id=${reviewId}`, { method: 'DELETE' });
      if (response.ok) {
        router.refresh();
      }
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <label className="admin-toggle" style={{ margin: 0 }}>
        <input 
          type="checkbox" 
          checked={approved} 
          onChange={(e) => toggleStatus(e.target.checked)}
          disabled={isUpdating}
        />
        <span style={{ margin: 0 }} />
      </label>
      <button 
        onClick={deleteReview}
        disabled={isUpdating}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#8a8a8a', fontSize: '11px', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.02em',
          padding: '4px'
        }}
      >
        Delete
      </button>
    </div>
  );
}
