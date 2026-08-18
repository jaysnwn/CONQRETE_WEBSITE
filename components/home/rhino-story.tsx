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
          The Logo
        </p>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 40px)', fontWeight: 800, color: '#111827', lineHeight: 1.15, margin: '0 0 24px 0', letterSpacing: '-0.02em' }}>
          Why the Rhino?
        </h2>
        
        {/* Story */}
        <div style={{ 
          fontSize: '17px', 
          color: '#4b5563', 
          lineHeight: 1.7,
        }}>
          <p style={{ margin: '0 0 20px 0' }}>
            The CONQRETE Rhino is a symbol of engineered toughness. Inspired by the rhinoceros's natural strength and resilience, its solid geometric form represents products built to withstand the impact, friction and abuse of everyday life. The horn represents the drive to conquer challenges, while the heavy, grounded silhouette represents reliability and permanence.
          </p>
          <p style={{ margin: 0, fontWeight: 700, color: '#111827' }}>
            CONQRETE isn't about making products that look tough. It's about making products that actually are.
          </p>
        </div>
      </div>
    </section>
  );
}
