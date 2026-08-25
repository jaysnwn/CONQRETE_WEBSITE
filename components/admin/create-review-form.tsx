'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateReviewForm({ products }: { products: { id: string, title: string }[] }) {
  const router = useRouter();
  const [productId, setProductId] = useState(products[0]?.id || '');
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !reviewerName || !rating) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/reviews/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          reviewer_name: reviewerName,
          rating,
          comment,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create review');
      }

      router.push('/admin/reviews');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form-card" style={{ maxWidth: '600px' }}>
      {error && <div className="admin-notice admin-notice--error">{error}</div>}
      
      <div className="admin-form-grid">
        <label className="admin-field admin-field--wide">
          <span>Product</span>
          <select value={productId} onChange={e => setProductId(e.target.value)} required>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </label>
        
        <label className="admin-field admin-field--wide">
          <span>Reviewer Name</span>
          <input 
            value={reviewerName} 
            onChange={e => setReviewerName(e.target.value)} 
            placeholder="e.g. John Doe"
            required 
          />
        </label>

        <label className="admin-field admin-field--wide">
          <span>Rating (1-5)</span>
          <select value={rating} onChange={e => setRating(Number(e.target.value))} required>
            {[5, 4, 3, 2, 1].map(r => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
        </label>

        <label className="admin-field admin-field--wide">
          <span>Comment (Optional)</span>
          <textarea 
            value={comment} 
            onChange={e => setComment(e.target.value)} 
            placeholder="Write the review content here..."
            rows={4}
          />
        </label>
      </div>

      <div className="admin-form-actions" style={{ marginTop: '24px' }}>
        <button type="submit" className="admin-primary-action" disabled={loading}>
          {loading ? 'Saving...' : 'Publish Review'}
        </button>
      </div>
    </form>
  );
}
