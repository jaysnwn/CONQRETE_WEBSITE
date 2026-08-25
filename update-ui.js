const fs = require('fs');

let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

// Replace the left panel
const leftPanelRegex = /\{\/\* Left Side \(Banner\/Info\) \*\/\}([\s\S]*?)\{\/\* Right Side \(Form\) \*\/\}/;

const newLeftPanel = `{/* Left Side (Banner/Info) */}
        <div className="login-modal-left" style={{
          flex: 1,
          backgroundColor: '#111827',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background element */}
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', background: 'radial-gradient(circle at 50% 30%, rgba(200, 255, 0, 0.1) 0%, rgba(17, 24, 39, 1) 70%)', pointerEvents: 'none' }} />

          {/* Logo & Brand */}
          <div style={{ marginBottom: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
            <img 
              src="/logo.png" 
              alt="Conqrete Rhino Logo" 
              style={{ width: '100px', height: '100px', objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: '24px' }} 
            />
            <h2 style={{ 
              fontFamily: '"Black Han Sans", sans-serif', 
              fontSize: '48px', 
              margin: 0,
              lineHeight: 1,
              letterSpacing: '0.05em',
              color: '#ffffff'
            }}>
              CONQRETE
            </h2>
          </div>
          
          {/* Feature Cards */}
          <div style={{ display: 'flex', gap: '16px', width: '100%', justifyContent: 'center', zIndex: 1 }}>
            {['1 Year Warranty', '7 Days Replacement', 'Free Shipping'].map((feature, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(200, 255, 0, 0.03)',
                border: '1px solid rgba(200, 255, 0, 0.2)',
                borderRadius: '12px',
                padding: '24px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                transition: 'all 0.3s'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#c8ff00', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '16px',
                  fontWeight: 900,
                  color: '#111827',
                  fontSize: '18px',
                  boxShadow: '0 0 15px rgba(200,255,0,0.4)'
                }}>
                  {i === 0 ? '✓' : i === 1 ? '7' : '🚚'}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', lineHeight: 1.3, letterSpacing: '0.05em' }}>
                  {feature.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side (Form) */}`;

file = file.replace(leftPanelRegex, newLeftPanel);

// Also let's style the Right side button slightly to match better if it needs it. The button is currently black, which is good.

fs.writeFileSync('components/auth/login-modal.tsx', file);
console.log("Updated left panel UI");
