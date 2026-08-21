'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { uploadHeroSlide, toggleHeroSlideStatus, deleteHeroSlide, reorderHeroSlides } from './actions';
import ImageCropper from '#/components/admin/image-cropper';

export default function StorefrontClient({ initialSlides }: { initialSlides: any[] }) {
  const router = useRouter();
  const [slides, setSlides] = useState(initialSlides);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop state
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  // Cropping state
  const [cropFile, setCropFile] = useState<File | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Max size is 5MB.');
      return;
    }

    setCropFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleCropComplete(croppedBlob: Blob) {
    setCropFile(null);
    setUploading(true);
    
    const formData = new FormData();
    // Convert Blob back to File
    const file = new File([croppedBlob], 'hero_slide.jpg', { type: 'image/jpeg' });
    formData.append('file', file);
    
    const res = await uploadHeroSlide(formData);
    setUploading(false);
    
    if (res.error) {
      alert(res.error);
    } else {
      router.refresh();
    }
  }

  async function handleToggleStatus(id: string, currentStatus: boolean) {
    const res = await toggleHeroSlideStatus(id, currentStatus);
    if (res.error) alert(res.error);
    else router.refresh();
  }

  async function handleDelete(id: string, imageUrl: string) {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    const res = await deleteHeroSlide(id, imageUrl);
    if (res.error) alert(res.error);
    else router.refresh();
  }

  // --- Drag and Drop Logic ---
  function onDragStart(index: number) {
    setDraggedIdx(index);
  }

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault(); // Necessary to allow dropping
  }

  async function onDrop(index: number) {
    if (draggedIdx === null || draggedIdx === index) return;

    // Reorder locally
    const newSlides = [...slides];
    const [draggedItem] = newSlides.splice(draggedIdx, 1);
    newSlides.splice(index, 0, draggedItem);
    
    setSlides(newSlides);
    setDraggedIdx(null);

    // Save order to DB
    const orderedIds = newSlides.map(s => s.id);
    const res = await reorderHeroSlides(orderedIds);
    if (res.error) {
      alert('Failed to save order: ' + res.error);
    }
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="admin-metric-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ margin: 0 }}>Hero Banners</h2>
            <p style={{ margin: 0, color: 'var(--admin-muted)' }}>Drag and drop rows to reorder how they appear on the homepage.</p>
          </div>
          <div>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
            <button 
              className="admin-button" 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : '+ Upload Image'}
            </button>
          </div>
        </div>

        {slides.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--admin-bg)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--admin-muted)' }}>No hero slides uploaded yet.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>IMAGE</th>
                <th>STATUS</th>
                <th>ADDED</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((slide, idx) => (
                <tr 
                  key={slide.id}
                  draggable
                  onDragStart={() => onDragStart(idx)}
                  onDragOver={(e) => onDragOver(e, idx)}
                  onDrop={() => onDrop(idx)}
                  style={{ cursor: 'grab', backgroundColor: draggedIdx === idx ? 'var(--admin-bg)' : 'transparent' }}
                >
                  <td style={{ color: 'var(--admin-muted)', fontWeight: 600 }}>{idx + 1}</td>
                  <td>
                    <div style={{ width: '120px', height: '60px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#e0e0e0' }}>
                      <img 
                        src={slide.image_url} 
                        alt="Hero Slide" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleToggleStatus(slide.id, slide.is_active)}
                      style={{ 
                        border: 'none', background: 'none', cursor: 'pointer',
                        padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600,
                        backgroundColor: slide.is_active ? '#e6f4ea' : '#fce8e6',
                        color: slide.is_active ? '#137333' : '#c5221f'
                      }}
                    >
                      {slide.is_active ? 'ACTIVE' : 'HIDDEN'}
                    </button>
                  </td>
                  <td style={{ color: 'var(--admin-muted)', fontSize: '0.9rem' }}>
                    {new Date(slide.created_at).toISOString().split('T')[0]}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(slide.id, slide.image_url)}
                      style={{ border: 'none', background: 'none', color: '#c5221f', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {cropFile && (
        <ImageCropper
          imageFile={cropFile}
          aspectRatio={16 / 9}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropFile(null)}
        />
      )}
    </div>
  );
}
