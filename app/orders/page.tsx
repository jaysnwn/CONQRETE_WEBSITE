"use client";
import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div style={{ backgroundColor: '#f4f4f5', minHeight: '100vh', padding: '140px 2rem 5rem 2rem', color: '#000' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ borderBottom: '4px solid #c8ff00', paddingBottom: '1rem', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>/// LOGISTICS</div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: '"Black Han Sans", sans-serif', textTransform: 'uppercase', margin: 0 }}>
              HARDWARE DEPLOYMENTS
            </h1>
          </div>
          <a href="/products" style={{ padding: '10px 20px', backgroundColor: '#000', color: '#c8ff00', fontWeight: 900, textDecoration: 'none', fontSize: '12px', letterSpacing: '0.1em', border: '2px solid #000', transition: 'all 0.2s' }}
             onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c8ff00'; e.currentTarget.style.color = '#000'; }}
             onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#c8ff00'; }}
          >
            + NEW ACQUISITION
          </a>
        </div>

        {/* ORDER LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SIMULATED ORDER CARD */}
          <div style={{ backgroundColor: '#fff', border: '2px solid #000', boxShadow: '4px 4px 0px #000' }}>
            
            {/* Top Bar */}
            <div style={{ padding: '1rem 1.5rem', backgroundColor: '#f4f4f5', borderBottom: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#6b7280', letterSpacing: '0.1em' }}>ORDER ID:</span>
                <span style={{ marginLeft: '8px', fontWeight: 900, fontFamily: 'monospace' }}>#CQ-88392-A</span>
              </div>
              <div style={{ padding: '4px 12px', backgroundColor: '#c8ff00', border: '2px solid #000', fontWeight: 900, fontSize: '12px', letterSpacing: '0.1em' }}>
                IN TRANSIT
              </div>
            </div>
            
            {/* Item Details */}
            <div style={{ padding: '2rem 1.5rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#f4f4f5', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5rem' }}>
                🔌
              </div>
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ margin: 0, fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase' }}>Conqrete Power Adapter V1</h3>
                <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280', fontWeight: 'bold', fontSize: '14px' }}>QTY: 1 /// MATTE BLACK</p>
              </div>
              <div style={{ fontWeight: 900, fontSize: '1.5rem' }}>
                ₹0.00
              </div>
            </div>

            {/* Tracking Button */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end' }}>
               <button style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#000', fontWeight: 900, border: '2px solid #000', fontSize: '12px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s' }}
                 onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; }}
                 onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#000'; }}
               >
                 TRACK HARDWARE ↗
               </button>
            </div>

          </div>

          {/* You can copy and paste the block above to add more simulated orders! */}

        </div>
      </div>
    </div>
  );
}