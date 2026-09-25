import React from 'react';
import BrandLoader from '@/components/BrandLoader';

export default function AdminLoading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', width: '100%' }}>
      <BrandLoader size={120} />
    </div>
  );
}
