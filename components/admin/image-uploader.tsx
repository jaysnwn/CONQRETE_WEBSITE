'use client';
import { useMemo } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

export default function ImageUploader({ images, onChange }: { images: string[]; onChange: (value: string[] | ((prev: string[]) => string[])) => void }) {
  const previews = useMemo(() => images.filter(Boolean), [images]);
  
  return (
    <div className="admin-image-uploader">
      <div className="admin-image-help">
        <span>↗</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <strong>Image URLs</strong>
            <p>Upload a file, or paste one public image URL on each line.</p>
          </div>
          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'admin_dashboard_uploads'}
            options={{ multiple: true }}
            onSuccess={(result) => {
              if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                const url = result.info.secure_url as string;
                onChange((prev) => [...prev, url]);
              }
            }}
          >
            {({ open }) => {
              return (
                <button type="button" onClick={() => open()} className="admin-primary-action" style={{ padding: '8px 16px', fontSize: '13px' }}>
                  Upload File
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>
      <textarea 
        rows={4} 
        value={previews.join('\n')} 
        onChange={(event) => onChange(event.target.value.split(/\n+/).map((item) => item.trim()).filter(Boolean))} 
        placeholder="https://example.com/product-image.jpg" 
      />
      {previews.length > 0 ? (
        <div className="admin-image-grid">
          {previews.map((url, index) => (
            <div key={`${url}-${index}`} style={{ position: 'relative', display: 'inline-block' }}>
              <img src={url} alt={`Product preview ${index + 1}`} style={{ display: 'block' }} />
              <span style={{ display: 'block', fontSize: '12px', marginTop: '4px' }}>{index === 0 ? 'Cover image' : `Image ${index + 1}`}</span>
              <button 
                type="button" 
                onClick={() => onChange((prev: string[]) => prev.filter((_, i) => i !== index))}
                style={{
                  position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
