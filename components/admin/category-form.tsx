'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const slugify = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!name.trim()) return setError('Enter a category name.');

    const payload = {
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      description: description.trim(),
    };

    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || 'Could not save the category.');
        }

        setName('');
        setSlug('');
        setDescription('');
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
          <h2>Add new category</h2>
          <p>Create a collection to organize your products.</p>
        </div>
      </div>
      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Name</span>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (!slug) setSlug(slugify(event.target.value));
            }}
            placeholder="e.g. Earbuds"
            required
          />
        </label>
        <label className="admin-field">
          <span>URL slug</span>
          <input
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            placeholder="earbuds"
          />
        </label>
        <label className="admin-field admin-field--wide">
          <span>Description</span>
          <textarea
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Short description of this category..."
          />
        </label>
      </div>

      {error && <div className="admin-notice admin-notice--error" style={{ marginTop: '16px' }}>{error}</div>}

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" disabled={isPending} className="admin-primary-action">
          {isPending ? 'Saving...' : 'Add category'}
        </button>
      </div>
    </form>
  );
}
