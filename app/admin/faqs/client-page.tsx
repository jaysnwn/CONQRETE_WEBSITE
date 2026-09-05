'use client';

import React, { useState } from 'react';
import { FAQ, CATEGORIES, Category } from '#/app/(storefront)/support/faqs/faq-data';
import { saveFaqData } from './actions';
import { useRouter } from 'next/navigation';

export default function FaqAdminClient({ initialFaqs }: { initialFaqs: FAQ[] }) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<FAQ>>({});
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setEditForm({ ...faq });
  };

  const handleAddNew = () => {
    const newId = Date.now().toString();
    const newFaq: FAQ = {
      id: newId,
      category: 'GENERAL',
      question: '',
      answer: []
    };
    setFaqs([...faqs, newFaq]);
    setEditingId(newId);
    setEditForm(newFaq);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    await saveFaqData(updated);
    router.refresh();
  };

  const handleSaveItem = async () => {
    if (!editForm.question || !editForm.answer?.length) {
      alert('Question and answer are required.');
      return;
    }
    
    const updated = faqs.map(f => f.id === editingId ? editForm as FAQ : f);
    setFaqs(updated);
    setEditingId(null);
    setEditForm({});
    
    setIsSaving(true);
    await saveFaqData(updated);
    setIsSaving(false);
    router.refresh();
  };

  const cancelEdit = () => {
    // If it was a new empty FAQ, remove it
    const existing = faqs.find(f => f.id === editingId);
    if (existing && !existing.question) {
      setFaqs(faqs.filter(f => f.id !== editingId));
    }
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleAddNew} 
          disabled={editingId !== null || isSaving}
          className="admin-primary-action"
        >
          <span>+</span> Add FAQ
        </button>
      </div>

      <section className="admin-panel">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Category</th>
                <th style={{ width: '35%' }}>Question</th>
                <th style={{ width: '40%' }}>Answer Snippet</th>
                <th style={{ width: '10%' }} aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <React.Fragment key={faq.id}>
                  {editingId === faq.id ? (
                    <tr style={{ background: '#f9fafb' }}>
                      <td colSpan={4} style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          
                          <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>Category</label>
                              <select 
                                value={editForm.category || 'GENERAL'}
                                onChange={e => setEditForm({ ...editForm, category: e.target.value as Category })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                              >
                                {CATEGORIES.filter(c => c !== 'ALL').map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>Question</label>
                            <input 
                              type="text" 
                              value={editForm.question || ''}
                              onChange={e => setEditForm({ ...editForm, question: e.target.value })}
                              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                              placeholder="Enter the question..."
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>Answer (Separate paragraphs with newlines)</label>
                            <textarea 
                              rows={5}
                              value={(editForm.answer || []).join('\n')}
                              onChange={e => {
                                const val = e.target.value;
                                setEditForm({ ...editForm, answer: val.split('\n').filter(p => p.trim() !== '') });
                              }}
                              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                              placeholder="Enter the answer..."
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>Highlight (Optional Important Box)</label>
                            <input 
                              type="text" 
                              value={editForm.highlight || ''}
                              onChange={e => setEditForm({ ...editForm, highlight: e.target.value })}
                              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                              placeholder="E.g. Report transit damage within 24 hours."
                            />
                          </div>

                          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                            <button 
                              onClick={cancelEdit}
                              style={{ padding: '8px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={handleSaveItem}
                              disabled={isSaving}
                              style={{ padding: '8px 16px', background: '#111827', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              {isSaving ? 'Saving...' : 'Save'}
                            </button>
                          </div>
                          
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td><span className="admin-status-pill">{faq.category}</span></td>
                      <td style={{ fontWeight: 500 }}>{faq.question}</td>
                      <td style={{ color: '#6b7280', fontSize: '14px' }}>
                        {faq.answer[0]?.substring(0, 50)}...
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button 
                            className="admin-row-action" 
                            onClick={() => handleEdit(faq)}
                            disabled={editingId !== null || isSaving}
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            Edit
                          </button>
                          <button 
                            className="admin-row-action" 
                            onClick={() => handleDelete(faq.id)}
                            disabled={editingId !== null || isSaving}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
