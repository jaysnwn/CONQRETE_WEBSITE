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
      <div 
        className="usp-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {usps.map((usp) => (
          <div className="usp-item" key={usp.title}>
            <div className="usp-icon">
              {usp.icon}
            </div>
            <div className="usp-text-wrapper">
              <div className="usp-title">{usp.title}</div>
              <div className="usp-subtitle">{usp.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .usp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .usp-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .usp-icon {
          width: 48px;
          height: 48px;
          background-color: #f3f4f6;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .usp-title { font-weight: 700; font-size: 14px; color: #111827; }
        .usp-subtitle { font-size: 12px; color: #6b7280; margin-top: 2px; }
        
        @media (max-width: 900px) {
          .usp-grid {
            gap: 16px;
          }
          .usp-icon {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
          .usp-title { font-size: 13px; }
          .usp-subtitle { font-size: 11px; }
        }
        @media (max-width: 600px) {
          .usp-grid {
            gap: 8px;
            padding: 0 8px;
          }
          .usp-item {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }
          .usp-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            font-size: 16px;
            margin: 0 auto;
          }
          .usp-title {
            font-size: 11px;
            line-height: 1.2;
          }
          .usp-subtitle {
            font-size: 9px;
            line-height: 1.1;
          }
        }
      `}</style>
    </section>
  );
}
