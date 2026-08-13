'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function DiscountForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [code, setCode] = useState('');
  const [type, setType] = useState('percentage');
  const [value, setValue] = useState('');
  const [minPurchase, setMinPurchase] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!code.trim()) return setError('Enter a discount code.');

    const payload = {
      code: code.trim().toUpperCase(),
      discount_type: type,
      discount_value: Number(value) || 0,
      min_purchase_amount: minPurchase ? Number(minPurchase) : 0,
      usage_limit: usageLimit ? Number(usageLimit) : null,
      expires_at: expiresAt || null,
      is_active: true
    };

    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/discounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || 'Could not save the discount code.');
        }

        setCode('');
        setValue('');
        setMinPurchase('');
        setUsageLimit('');
        setExpiresAt('');
        router.refresh();
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : 'Could not save.');
      }
    });
  }

  return (
    <form onSubmit={submit} className="admin-form-card" style={{ padding: '24px', marginBottom: '32px' }}>
      <div className="admin-form-card-heading">
        <div>
          <h2>Create discount code</h2>
          <p>Offer special pricing to your customers.</p>
        </div>
      </div>
      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Discount Code</span>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            placeholder="SUMMER25"
            required
          />
        </label>
        <label className="admin-field">
          <span>Type</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed_amount">Fixed Amount (₹)</option>
            <option value="free_shipping">Free Shipping</option>
          </select>
        </label>
        
        {type !== 'free_shipping' && (
          <label className="admin-field">
            <span>Discount Value</span>
            <input
              type="number"
              min="0"
              step="any"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={type === 'percentage' ? "25" : "500"}
              required
            />
          </label>
        )}

        <label className="admin-field">
          <span>Minimum Purchase Amount (₹)</span>
          <input
            type="number"
            min="0"
            value={minPurchase}
            onChange={(event) => setMinPurchase(event.target.value)}
            placeholder="0"
          />
        </label>
        
        <label className="admin-field">
          <span>Usage Limit (Total uses)</span>
          <input
            type="number"
            min="1"
            value={usageLimit}
            onChange={(event) => setUsageLimit(event.target.value)}
            placeholder="Leave empty for unlimited"
          />
        </label>

        <label className="admin-field">
          <span>Expiry Date (Optional)</span>
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(event) => setExpiresAt(event.target.value)}
          />
        </label>
      </div>

      {error && <div className="admin-notice admin-notice--error" style={{ marginTop: '16px' }}>{error}</div>}

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" disabled={isPending} className="admin-primary-action">
          {isPending ? 'Saving...' : 'Create code'}
        </button>
      </div>
    </form>
  );
}
