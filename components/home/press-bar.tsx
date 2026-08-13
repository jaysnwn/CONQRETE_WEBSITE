"use client";

const publications = [
  { name: 'Gadgets360', abbr: 'GADGETS\n360' },
  { name: 'YourStory', abbr: 'YourStory' },
  { name: 'The Hindu', abbr: 'The Hindu' },
  { name: 'Inc42', abbr: 'inc42' },
  { name: 'TechRadar', abbr: 'TechRadar' },
  { name: 'Economic Times', abbr: 'Economic\nTimes' },
];

export default function PressBar() {
  return (
    <section style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '28px 24px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            As seen in
          </span>

          <div style={{ width: '1px', height: '24px', backgroundColor: '#e5e7eb', flexShrink: 0 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
            {publications.map((pub) => (
              <div
                key={pub.name}
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#9ca3af',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'pre-line',
                  textAlign: 'center',
                  lineHeight: 1.1,
                  transition: 'color 0.2s ease',
                  cursor: 'default',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#374151')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                {pub.abbr}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
