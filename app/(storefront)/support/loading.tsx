import React from 'react';
import BrandLoader from '@/components/BrandLoader';

export default function ContentSkeletonLoading() {
  return (
    <div style={{ position: 'relative', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Absolute centered BrandLoader */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <BrandLoader size={160} />
      </div>

      <div style={{ opacity: 0.3, maxWidth: '1000px', margin: '0 auto', padding: '80px 20px' }}>
        {/* Title */}
        <div style={{ width: 'min(400px, 80%)', height: '48px', backgroundColor: '#e5e7eb', marginBottom: '60px', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        
        {/* Content blocks */}
        {[1, 2, 3].map(i => (
          <div key={i} style={{ marginBottom: '48px' }}>
            <div style={{ width: '200px', height: '24px', backgroundColor: '#e5e7eb', marginBottom: '24px', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ width: '100%', height: '16px', backgroundColor: '#f3f4f6', marginBottom: '16px', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ width: '90%', height: '16px', backgroundColor: '#f3f4f6', marginBottom: '16px', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ width: '95%', height: '16px', backgroundColor: '#f3f4f6', marginBottom: '16px', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ width: '70%', height: '16px', backgroundColor: '#f3f4f6', marginBottom: '16px', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          </div>
        ))}
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
