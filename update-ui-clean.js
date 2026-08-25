const fs = require('fs');
let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

const leftPanelRegex = /\{\/\* Left Side \(Banner\/Info\) \*\/\}([\s\S]*?)\{\/\* Right Side \(Form\) \*\/\}/;

const newLeftPanel = `{/* Left Side (Banner/Info) */}
        <div className="login-modal-left" style={{
          flex: 1,
          backgroundColor: '#f9fafb',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRight: '1px solid #e5e7eb'
        }}>
          {/* Logo & Brand */}
          <div style={{ marginBottom: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="/rhino-logo.png" 
              alt="Conqrete Rhino Logo" 
              style={{ width: '120px', height: 'auto', objectFit: 'contain', marginBottom: '16px' }} 
            />
            <h2 style={{ 
              fontFamily: '"Black Han Sans", sans-serif', 
              fontSize: '40px', 
              margin: 0,
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#111827'
            }}>
              CONQRETE
            </h2>
          </div>
          
          {/* Feature Cards */}
          <div style={{ display: 'flex', gap: '16px', width: '100%', justifyContent: 'center' }}>
            {['6 Months Warranty', '7 Days Replacement', 'Free Shipping'].map((feature, i) => (
              <div key={i} style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '24px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  backgroundColor: '#111827', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '16px',
                  fontWeight: 800,
                  color: '#ffffff',
                  fontSize: '16px'
                }}>
                  {i === 0 ? '✓' : i === 1 ? '7' : '✈'}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side (Form) */}`;

file = file.replace(leftPanelRegex, newLeftPanel);

fs.writeFileSync('components/auth/login-modal.tsx', file);
console.log("Updated left panel UI to clean shopify style");
