const fs = require('fs');
let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

const parts = file.split('  return (');
if (parts.length < 2) {
    console.log("Could not find 'return ('");
    process.exit(1);
}

const beforeReturn = parts[0];

const newReturn = `  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      {/* Click outside to close */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="login-modal-content" style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        minHeight: '600px',
        border: '1px solid #e5e7eb'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            color: '#111827',
            cursor: 'pointer',
            zIndex: 10,
            padding: '4px',
            lineHeight: 1,
            fontWeight: 300
          }}
        >
          &times;
        </button>

        {/* Left Side (Banner/Info) - 65% */}
        <div className="login-modal-left" style={{
          flex: '0 0 65%',
          backgroundColor: '#ffffff',
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid #e5e7eb'
        }}>
          {/* Logo & Brand - Centered vertically using flex-grow on top/bottom spacers */}
          <div style={{ flex: 1 }} />
          
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="/rhino-logo.png" 
              alt="Conqrete Rhino Logo" 
              style={{ width: '180px', height: 'auto', objectFit: 'contain', marginBottom: '20px' }} 
            />
            <h2 style={{ 
              fontFamily: '"Black Han Sans", sans-serif', 
              fontSize: '64px', 
              margin: '0 0 16px 0',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#111827'
            }}>
              CONQRETE
            </h2>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.4em',
              color: '#374151',
              textTransform: 'uppercase'
            }}>
              BUILT FOR YOUR DAILY ABUSE
            </div>
          </div>
          
          <div style={{ flex: 1 }} />
          
          {/* Features at bottom */}
          <div style={{ 
            display: 'flex', 
            width: '100%', 
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40px'
          }}>
            {/* Feature 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, borderRight: '1px solid #e5e7eb' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '12px'}}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#111827', textAlign: 'center', letterSpacing: '0.05em' }}>
                6 MONTHS<br/>WARRANTY
              </span>
            </div>
            
            {/* Feature 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, borderRight: '1px solid #e5e7eb' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '12px'}}>
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <text x="12" y="16" fontSize="10" fontWeight="bold" textAnchor="middle" strokeWidth="1">7</text>
              </svg>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#111827', textAlign: 'center', letterSpacing: '0.05em' }}>
                7 DAYS<br/>REPLACEMENT
              </span>
            </div>
            
            {/* Feature 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '12px'}}>
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                <line x1="1" y1="10" x2="3" y2="10"></line>
                <line x1="1" y1="6" x2="5" y2="6"></line>
              </svg>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#111827', textAlign: 'center', letterSpacing: '0.05em' }}>
                FREE<br/>SHIPPING
              </span>
            </div>
          </div>
        </div>

        {/* Right Side (Form) - 35% */}
        <div style={{
          flex: '0 0 35%',
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff'
        }}>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#111827', marginBottom: '8px', textTransform: 'uppercase' }}>
              WELCOME TO CONQRETE
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 600, color: '#111827', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
              Get Started
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 32px 0' }}>
              Enter your mobile number to continue
            </p>

            {error && (
              <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '6px', fontSize: '12px', marginBottom: '24px' }}>
                {error}
              </div>
            )}

            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Custom Input Layout */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '4px',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{ 
                    padding: '12px 16px', 
                    fontWeight: 600, 
                    fontSize: '14px', 
                    color: '#111827',
                    borderRight: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    IN <span style={{ color: '#111827' }}>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter Mobile Number"
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '14px',
                      outline: 'none',
                      color: '#111827',
                    }}
                    required
                  />
                </div>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#4b5563', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: '#111827', width: '16px', height: '16px', cursor: 'pointer' }} />
                  Notify me for any updates & offers
                </label>

                <button
                  type="submit"
                  disabled={loading || phone.length !== 10}
                  style={{
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    padding: '16px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: (loading || phone.length !== 10) ? 'not-allowed' : 'pointer',
                    border: 'none',
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: (loading || phone.length !== 10) ? 0.7 : 1
                  }}
                >
                  {loading ? 'Sending...' : 'Continue'}
                  {!loading && <span>&rarr;</span>}
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
                  Enter the 6-digit code sent to <strong style={{ color: '#111827' }}>{formattedPhone}</strong>
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handlePaste}
                      style={{
                        width: '45px',
                        height: '50px',
                        textAlign: 'center',
                        fontSize: '20px',
                        fontWeight: 600,
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        color: '#111827',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#111827';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || !otp.every(d => d !== '')}
                  style={{
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    padding: '16px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: (loading || !otp.every(d => d !== '')) ? 'not-allowed' : 'pointer',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: (loading || !otp.every(d => d !== '')) ? 0.7 : 1
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                  {!loading && <span>&rarr;</span>}
                </button>
                
                <button 
                  onClick={() => setStep('phone')} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '13px', 
                    color: '#6b7280', 
                    textDecoration: 'underline', 
                    cursor: 'pointer' 
                  }}
                >
                  Change Mobile Number
                </button>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0', opacity: 0.5 }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }} />
              <span style={{ padding: '0 12px', fontSize: '11px', fontWeight: 600, color: '#4b5563' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }} />
            </div>

            <p style={{ fontSize: '11px', color: '#6b7280', textAlign: 'center', lineHeight: 1.6, margin: 0, padding: '0 20px' }}>
              I accept that I have read & understood Conqrete's <br/>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>Privacy Policy</a> & <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>T&Cs</a>.
            </p>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            /* Responsive modal */
            @media (max-width: 768px) {
              .login-modal-content {
                flex-direction: column !important;
                max-width: 100% !important;
                height: 100% !important;
                border-radius: 0 !important;
              }
              .login-modal-left {
                display: none !important;
              }
            }
          `}} />
        </div>
      </div>
    </div>
  );
}`;

fs.writeFileSync('components/auth/login-modal.tsx', beforeReturn + newReturn);
console.log("Successfully wrote the new return block to login-modal.tsx");
