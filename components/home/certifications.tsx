const certs = [
  {
    icon: '🇮🇳',
    name: 'BIS Certified',
    body: 'Bureau of Indian Standards',
    description: 'Mandatory safety certification for all electronic products sold in India.',
  },
  {
    icon: '♻️',
    name: 'RoHS Compliant',
    body: 'Restriction of Hazardous Substances',
    description: 'Free from lead, mercury, cadmium and other hazardous materials.',
  },
  {
    icon: '🇪🇺',
    name: 'CE Marked',
    body: 'Conformité Européenne',
    description: 'Meets all European safety, health and environmental requirements.',
  },
  {
    icon: '⚡',
    name: 'USB-IF Certified',
    body: 'USB Implementers Forum',
    description: 'Official certification for USB Type-C power delivery compliance.',
  },
];

export default function Certifications() {
  return (
    <section style={{
      backgroundColor: '#f9fafb',
      padding: '64px 24px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px 0' }}>
            Certified & Verified
          </p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 12px 0' }}>
            Built to international standards
          </h2>
          <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            Every CONQRETE product undergoes rigorous certification so you never have to worry about safety.
          </p>
        </div>

        {/* Certs Grid */}
        <div className="cert-grid">
          {certs.map((cert) => (
            <div
              key={cert.name}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ fontSize: '36px' }}>{cert.icon}</div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                  {cert.body}
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .cert-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 8px;
            gap: 16px;
          }
          .cert-grid > div {
            flex: 0 0 75%;
            scroll-snap-align: center;
          }
          .cert-grid::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
