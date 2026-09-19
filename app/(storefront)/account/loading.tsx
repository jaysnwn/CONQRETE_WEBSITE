import React from 'react';

export default function AccountLoading() {
  return (
    <div style={{ backgroundColor: '#f4f4f5', minHeight: '100vh', padding: '140px 2rem 5rem 2rem', color: '#000' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ borderBottom: '4px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '3rem' }}>
          <div style={{ width: '300px', height: '48px', backgroundColor: '#e5e7eb', marginBottom: '8px', animation: 'pulse 2s infinite' }} />
          <div style={{ width: '200px', height: '20px', backgroundColor: '#e5e7eb', animation: 'pulse 2s infinite' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* PROFILE INFO */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', padding: '2rem', boxShadow: '4px 4px 0px #e5e7eb' }}>
            <div style={{ width: '150px', height: '24px', backgroundColor: '#e5e7eb', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', animation: 'pulse 2s infinite' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ width: '50px', height: '12px', backgroundColor: '#e5e7eb', marginBottom: '4px', animation: 'pulse 2s infinite' }} />
                <div style={{ width: '120px', height: '20px', backgroundColor: '#f3f4f6', animation: 'pulse 2s infinite' }} />
              </div>
              <div>
                <div style={{ width: '50px', height: '12px', backgroundColor: '#e5e7eb', marginBottom: '4px', animation: 'pulse 2s infinite' }} />
                <div style={{ width: '120px', height: '20px', backgroundColor: '#f3f4f6', animation: 'pulse 2s infinite' }} />
              </div>
            </div>
          </div>

          {/* DEFAULT ADDRESS */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', padding: '2rem', boxShadow: '4px 4px 0px #e5e7eb' }}>
            <div style={{ width: '150px', height: '24px', backgroundColor: '#e5e7eb', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', animation: 'pulse 2s infinite' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ width: '100%', height: '20px', backgroundColor: '#f3f4f6', animation: 'pulse 2s infinite' }} />
              <div style={{ width: '80%', height: '20px', backgroundColor: '#f3f4f6', animation: 'pulse 2s infinite' }} />
              <div style={{ width: '40%', height: '20px', backgroundColor: '#f3f4f6', animation: 'pulse 2s infinite' }} />
            </div>
          </div>
        </div>
        
        {/* RECENT ORDERS */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', padding: '2rem', boxShadow: '4px 4px 0px #e5e7eb', marginTop: '2rem' }}>
          <div style={{ width: '200px', height: '24px', backgroundColor: '#e5e7eb', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', animation: 'pulse 2s infinite' }} />
          <div style={{ width: '100%', height: '100px', backgroundColor: '#f3f4f6', animation: 'pulse 2s infinite' }} />
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
