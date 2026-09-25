import React from 'react';
import BrandLoader from '@/components/BrandLoader';

export default function StorefrontGenericLoading() {
  return (
    <div style={{ position: 'relative', backgroundColor: '#ffffff', minHeight: '80vh', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BrandLoader size={160} />
    </div>
  );
}
