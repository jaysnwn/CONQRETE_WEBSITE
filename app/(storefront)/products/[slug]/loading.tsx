import React from 'react';

export default function ProductDetailLoading() {
  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px)', marginBottom: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          
          {/* Breadcrumb Skeleton */}
          <div style={{ paddingBottom: '16px', display: 'flex', gap: '8px' }}>
            <div style={{ width: '250px', height: '18px', backgroundColor: '#f3f4f6', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: 'clamp(24px, 4vw, 60px)', alignItems: 'start' }}>
            
            {/* Image Gallery Skeleton */}
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'row', height: 'fit-content', alignItems: 'flex-start' }} className="skeleton-gallery">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '80px', flexShrink: 0 }} className="skeleton-thumbnails">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#f3f4f6', borderRadius: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                ))}
              </div>
              <div style={{ flex: 1, width: '100%', aspectRatio: '1/1', backgroundColor: '#f3f4f6', borderRadius: '16px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </div>

            {/* Details Skeleton */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '80%', height: '40px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '16px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div style={{ width: '120px', height: '20px', backgroundColor: '#f3f4f6', borderRadius: '4px', marginBottom: '24px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div style={{ width: '150px', height: '32px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '32px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              
              {/* Variants */}
              <div style={{ width: '60px', height: '16px', backgroundColor: '#f3f4f6', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ width: '64px', height: '40px', backgroundColor: '#f3f4f6', borderRadius: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                ))}
              </div>

              {/* Add to Cart */}
              <div style={{ width: '100%', height: '56px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '16px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div style={{ width: '100%', height: '56px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '32px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </div>
          </div>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: .5; }
            }
            @media (max-width: 768px) {
              .skeleton-gallery { flex-direction: column-reverse !important; gap: 12px !important; }
              .skeleton-thumbnails { flex-direction: row !important; width: 100% !important; overflow: hidden; }
              .skeleton-thumbnails > div { width: 70px !important; height: 70px !important; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
