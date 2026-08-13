"use client";
import Link from 'next/link';

export default function AccountPage() {
  return (
    <div style={{ backgroundColor: '#f4f4f5', minHeight: '100vh', padding: '140px 2rem 5rem 2rem', color: '#000' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ borderBottom: '4px solid #c8ff00', paddingBottom: '1rem', marginBottom: '3rem' }}>
          <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>/// DOSSIER</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: '"Black Han Sans", sans-serif', textTransform: 'uppercase', margin: 0 }}>
            ACCOUNT PARAMETERS
          </h1>
        </div>

        {/* SETTINGS FORM */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #000', padding: '3rem 2rem', boxShadow: '4px 4px 0px #000' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 900, color: '#6b7280', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>COMMUNICATION LINK (EMAIL)</label>
              <input type="email" value="operative@conqrete.in" disabled style={{ width: '100%', padding: '12px', backgroundColor: '#f4f4f5', border: '1px solid #e5e7eb', color: '#9ca3af', fontWeight: 'bold', cursor: 'not-allowed' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 900, color: '#6b7280', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>OPERATIVE ALIAS (NAME)</label>
              <input type="text" defaultValue="Guest Operative" style={{ width: '100%', padding: '12px', backgroundColor: '#fff', border: '1px solid #000', color: '#000', fontWeight: 'bold' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 900, color: '#6b7280', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>SHIPPING COORDINATES</label>
              <textarea rows={4} placeholder="Enter your delivery address..." style={{ width: '100%', padding: '12px', backgroundColor: '#fff', border: '1px solid #000', color: '#000', fontWeight: 'bold', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
            </div>

            <button style={{ padding: '16px 24px', backgroundColor: '#000', color: '#fff', fontWeight: 900, border: '2px solid #000', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', marginTop: '1rem', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c8ff00'; e.currentTarget.style.color = '#000'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; }}
            >
              UPDATE PARAMETERS
            </button>

            {/* LOGOUT BUTTON */}
            <div style={{ marginTop: '1rem', paddingTop: '2rem', borderTop: '1px dashed #e5e7eb' }}>
              <button style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '2px solid #ef4444', color: '#ef4444', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ef4444'; }}
              >
                SEVER CONNECTION (LOGOUT)
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}