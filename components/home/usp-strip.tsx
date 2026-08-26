const FastChargingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="usp-icon-svg charging-icon">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" className="charging-bolt" />
    <circle cx="18" cy="6" r="1.5" fill="#f97316" stroke="none" className="orange-accent" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="usp-icon-svg shield-icon">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="shield-outline" />
    <path d="M9 12l2 2 4-4" stroke="#f97316" className="shield-check" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="usp-icon-svg truck-icon">
    <rect x="4" y="6" width="12" height="10" rx="1" />
    <path d="M16 10h2.5a2.5 2.5 0 0 1 2.5 2.5V16h-5" />
    <circle cx="7.5" cy="17" r="1.5" />
    <circle cx="17.5" cy="17" r="1.5" />
    <g stroke="#f97316" className="speed-lines">
      <path d="M1 10h2" />
      <path d="M2 13h1" />
    </g>
  </svg>
);

const ReturnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="usp-icon-svg return-icon">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" className="return-arrow-path" />
    <path d="M3 3v5h5" stroke="#f97316" className="return-arrow-head" />
    <rect x="9.5" y="10.5" width="5" height="5" rx="0.5" className="return-box" />
  </svg>
);

const usps = [
  {
    icon: <FastChargingIcon />,
    title: 'Fast Charging',
    subtitle: '65W GaN Technology',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'BIS Certified',
    subtitle: 'Safety you can trust',
  },
  {
    icon: <TruckIcon />,
    title: 'Free Delivery',
    subtitle: 'On orders above ₹999',
  },
  {
    icon: <ReturnIcon />,
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
          flex-shrink: 0;
        }
        .usp-title { font-weight: 700; font-size: 14px; color: #111827; }
        .usp-subtitle { font-size: 12px; color: #6b7280; margin-top: 2px; }
        
        /* Icon Base Styles */
        .usp-icon-svg {
          width: 24px;
          height: 24px;
          transition: all 0.3s ease;
        }

        /* 1. Fast Charging Animation */
        .charging-bolt {
          transform-origin: center;
          transition: transform 0.2s ease, fill 0.3s ease;
        }
        .orange-accent {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .usp-item:hover .charging-bolt {
          transform: scale(1.05);
          fill: rgba(249, 115, 22, 0.1);
        }
        .usp-item:hover .orange-accent {
          transform: scale(1.2);
          opacity: 0.8;
        }

        /* 2. BIS Certified Animation */
        .shield-check {
          stroke-dasharray: 12;
          stroke-dashoffset: 0;
        }
        .shield-outline {
          transform-origin: center;
          transition: transform 0.3s ease;
        }
        .usp-item:hover .shield-check {
          animation: drawCheck 0.6s ease-in-out;
        }
        .usp-item:hover .shield-outline {
          transform: translateY(-1px);
        }
        @keyframes drawCheck {
          0% { stroke-dashoffset: 0; }
          40% { stroke-dashoffset: 12; }
          100% { stroke-dashoffset: 0; }
        }

        /* 3. Free Delivery Animation */
        .truck-icon {
          transition: transform 0.3s ease;
        }
        .speed-lines {
          transition: all 0.3s ease;
        }
        .usp-item:hover .truck-icon {
          transform: translateX(2px);
        }
        .usp-item:hover .speed-lines {
          animation: speedLinesMotion 0.8s infinite linear;
        }
        @keyframes speedLinesMotion {
          0% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-2px); opacity: 0.5; }
          100% { transform: translateX(0); opacity: 1; }
        }

        /* 4. Easy Returns Animation */
        .return-arrow-path, .return-arrow-head {
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .return-box {
          transform-origin: center;
          transition: transform 0.3s ease;
        }
        .usp-item:hover .return-arrow-path, 
        .usp-item:hover .return-arrow-head {
          transform: rotate(-30deg);
        }
        .usp-item:hover .return-box {
          transform: scale(1.1);
        }

        @media (max-width: 900px) {
          .usp-grid {
            gap: 16px;
          }
          .usp-icon {
            width: 40px;
            height: 40px;
          }
          .usp-icon-svg {
            width: 20px;
            height: 20px;
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
            margin: 0 auto;
          }
          .usp-icon-svg {
            width: 16px;
            height: 16px;
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
