import React from 'react';
import BrandLoader from '@/components/BrandLoader';

export default function ProductsLoading() {
  return (
    <div style={{ position: 'relative', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Absolute centered BrandLoader */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <BrandLoader size={160} />
      </div>

      {/* Existing Skeleton (opacity reduced to emphasize the loader) */}
      <div style={{ opacity: 0.3 }}>
        {/* Header Skeleton */}
        <div style={{ backgroundColor: '#f9fafb', padding: '60px 20px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ width: '200px', height: '40px', backgroundColor: '#e5e7eb', margin: '0 auto 24px', borderRadius: '4px', animation: 'pulse 2s infinite' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ width: '100px', height: '36px', borderRadius: '20px', backgroundColor: '#e5e7eb', animation: 'pulse 2s infinite' }} />
            ))}
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#f3f4f6', borderRadius: '16px', animation: 'pulse 2s infinite' }} />
                  <div style={{ width: '70%', height: '24px', backgroundColor: '#e5e7eb', borderRadius: '4px', animation: 'pulse 2s infinite' }} />
                  <div style={{ width: '40%', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '4px', animation: 'pulse 2s infinite' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
}
