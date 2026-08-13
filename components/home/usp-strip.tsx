const usps = [
  {
    icon: '⚡',
    title: 'Fast Charging',
    subtitle: '65W GaN Technology',
  },
  {
    icon: '🔒',
    title: 'BIS Certified',
    subtitle: 'Safety you can trust',
  },
  {
    icon: '🚚',
    title: 'Free Delivery',
    subtitle: 'On orders above ₹999',
  },
  {
    icon: '🔄',
    title: 'Easy Returns',
    subtitle: '7-day hassle-free returns',
  },
];

export default function UspStrip() {
  return (
    <section style={{
      borderTop: '1px solid #e5e7eb',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      padding: '32px 24px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
      }}>
        {usps.map((usp) => (
          <div
            key={usp.title}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}>
              {usp.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{usp.title}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{usp.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .usp-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
