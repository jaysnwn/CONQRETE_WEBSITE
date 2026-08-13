'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderShippingForm({ 
  orderId, 
  initialTracking, 
  initialCarrier 
}: { 
  orderId: string, 
  initialTracking?: string, 
  initialCarrier?: string 
}) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [tracking, setTracking] = useState(initialTracking || '');
  const [carrier, setCarrier] = useState(initialCarrier || '');
  const [error, setError] = useState<string | null>(null);

  async function updateShipping(e: React.FormEvent) {
    e.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, tracking_number: tracking, carrier }),
      });

      if (!response.ok) throw new Error('Failed to update shipping');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <form onSubmit={updateShipping} className="admin-form-card" style={{ padding: '24px', marginTop: '24px' }}>
      <div className="admin-form-card-heading">
        <div>
          <h2 style={{ fontSize: '15px' }}>Fulfillment & Tracking</h2>
        </div>
      </div>
      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Carrier Name</span>
          <input 
            value={carrier} 
            onChange={(e) => setCarrier(e.target.value)}
            placeholder="e.g. FedEx, UPS"
          />
        </label>
        <label className="admin-field">
          <span>Tracking Number</span>
          <input 
            value={tracking} 
            onChange={(e) => setTracking(e.target.value)}
            placeholder="e.g. 1Z9999999999999999"
          />
        </label>
      </div>
      {error && <p style={{color: 'red', fontSize: '13px', marginTop: '12px'}}>{error}</p>}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" disabled={isUpdating} className="admin-primary-action">
          {isUpdating ? 'Saving...' : 'Save tracking'}
        </button>
      </div>
    </form>
  );
}
