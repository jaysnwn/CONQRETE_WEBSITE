import Image from 'next/image';

export default function RhinoStory() {
  return (
    <section style={{
      backgroundColor: '#f9fafb',
      padding: '80px 24px',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center',
      borderTop: '1px solid #f3f4f6',
      borderBottom: '1px solid #f3f4f6',
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <img 
            src="/logo.png?v=2" 
            alt="The CONQRETE Rhino" 
            style={{ height: '80px', objectFit: 'contain' }} 
          />
        </div>
        
        {/* Title */}
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px 0' }}>
          The Symbol
        </p>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 40px)', fontWeight: 800, color: '#111827', lineHeight: 1.15, margin: '0 0 24px 0', letterSpacing: '-0.02em' }}>
          Why the Rhino?
        </h2>
        
        {/* Story Placeholder */}
        <div style={{ 
          fontSize: '17px', 
          color: '#4b5563', 
          lineHeight: 1.7,
        }}>
          <p style={{ margin: '0 0 20px 0' }}>
            [Your story about the Rhino will go here. This is a placeholder text waiting for your awesome brand story.]
          </p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#9ca3af' }}>
            "A rhino represents strength, resilience, and an unstoppable force — exactly what our cables are designed to be."
          </p>
        </div>
      </div>
    </section>
  );
}
