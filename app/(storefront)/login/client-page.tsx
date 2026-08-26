'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sendPhoneOtp, verifyPhoneOtp, saveCustomerOnboarding, loginRazorpayReviewer } from '#/features/auth/actions';

export default function LoginClientPage({ 
  isReviewMode,
  isModal = false,
  onClose
}: { 
  isReviewMode?: boolean;
  isModal?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp' | 'onboarding'>('phone');
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Review Mode State
  const [testEmail, setTestEmail] = useState('');
  const [testPassword, setTestPassword] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const handleTestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await loginRazorpayReviewer(testEmail, testPassword);
    if (result.success) {
      router.push('/account');
      router.refresh();
    } else {
      setError(result.error || 'Test login failed.');
      setLoading(false);
    }
  };
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = 'unset'; };
    }
  }, [isModal]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 10) {
      setPhone(val);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setError(null);
    
    try {
      const result = await sendPhoneOtp(phone);
      if (result?.error) {
        if (result.error.toLowerCase().includes('sms provider not configured') || result.error.toLowerCase().includes('rate limit')) {
           setError('SMS Provider not configured or rate limited in Supabase. Please configure Twilio/MSG91 in your Supabase dashboard.');
        } else {
           setError(result.error);
        }
      } else {
        setFormattedPhone(result.phone || phone);
        setStep('otp');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter') {
      if (otp.every(d => d !== '')) {
        handleVerifyOtp();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').substring(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const nextIndex = pastedData.length < 6 ? pastedData.length : 5;
      otpRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const token = otp.join('');
    if (token.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await verifyPhoneOtp(formattedPhone, token);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        if (result.isNewCustomer) {
          setStep('onboarding');
          setLoading(false);
        } else {
          router.refresh();
          router.push('/account');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === 'otp' && otp.every(d => d !== '') && !loading && !error) {
       handleVerifyOtp();
    }
  }, [otp]);

  return (
    <div style={{
      ...(isModal ? {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        padding: '20px'
      } : {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '80px 20px 40px 20px'
      }),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <style>{`
        .login-page-content {
          flex-direction: row;
        }
        @media (max-width: 768px) {
          .login-page-content {
            flex-direction: column !important;
            height: auto !important;
            min-height: auto !important;
          }
          .login-modal-left {
            flex: 0 0 auto !important;
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb !important;
            padding: 24px 16px !important;
          }
          .login-modal-right {
            flex: 0 0 auto !important;
            padding: 24px 16px !important;
          }
        }
      `}</style>
      
      <div className="login-page-content" style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '750px',
        display: 'flex',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        minHeight: '400px',
        border: '1px solid #e5e7eb',
        position: 'relative'
      }}>
        {isModal && onClose && (
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10, padding: '4px' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
        
        {/* Left Side (Banner/Info) - 65% */}
        <div className="login-modal-left" style={{
          flex: '0 0 50%', boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          padding: '32px 24px',
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
              style={{ width: '90px', height: 'auto', objectFit: 'contain', marginBottom: '8px' }} 
            />
            <h2 style={{ 
              fontFamily: '"Black Han Sans", sans-serif', 
              fontSize: '24px', 
              margin: '0 0 16px 0',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#111827'
            }}>
              CONQRETE
            </h2>
            <div style={{
              fontSize: '9px',
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
            marginTop: '16px'
          }}>
            {/* Feature 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, borderRight: '1px solid #e5e7eb' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '8px'}}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
              <span style={{ fontSize: '9px', fontWeight: 600, color: '#111827', textAlign: 'center', letterSpacing: '0.05em' }}>
                6 MONTHS<br/>WARRANTY
              </span>
            </div>
            
            {/* Feature 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, borderRight: '1px solid #e5e7eb' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '8px'}}>
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <text x="12" y="16" fontSize="10" fontWeight="bold" textAnchor="middle" strokeWidth="1">7</text>
              </svg>
              <span style={{ fontSize: '9px', fontWeight: 600, color: '#111827', textAlign: 'center', letterSpacing: '0.05em' }}>
                7 DAYS<br/>REPLACEMENT
              </span>
            </div>
            
            {/* Feature 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '8px'}}>
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                <line x1="1" y1="10" x2="3" y2="10"></line>
                <line x1="1" y1="6" x2="5" y2="6"></line>
              </svg>
              <span style={{ fontSize: '9px', fontWeight: 600, color: '#111827', textAlign: 'center', letterSpacing: '0.05em' }}>
                FREE<br/>SHIPPING
              </span>
            </div>
          </div>
        </div>

        {/* Right Side (Form) - 35% */}
        <div className="login-modal-right" style={{ flex: '0 0 50%', boxSizing: 'border-box', padding: '32px 24px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#111827', marginBottom: '8px', textTransform: 'uppercase' }}>
              WELCOME TO CONQRETE
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
              Get Started
            </h3>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 20px 0' }}>
              Enter your mobile number to continue
            </p>

            {error && (
              <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '6px', fontSize: '9px', marginBottom: '24px' }}>
                {error}
              </div>
            )}

            {step === 'phone' && (
              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    padding: '10px 12px', 
                    fontWeight: 600, 
                    fontSize: '12px', 
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
                      padding: '10px 12px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '12px',
                      outline: 'none',
                      color: '#111827',
                    }}
                    required
                  />
                </div>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', color: '#4b5563', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: '#111827', width: '16px', height: '16px', cursor: 'pointer' }} />
                  Notify me for any updates & offers
                </label>

                <button
                  type="submit"
                  disabled={loading || phone.length !== 10}
                  style={{
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '12px',
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
            )}
            
            {step === 'otp' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>
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
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '12px',
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
                    fontSize: '11px', 
                    color: '#6b7280', 
                    textDecoration: 'underline', 
                    cursor: 'pointer' 
                  }}
                >
                  Change Mobile Number
                </button>
              </div>
            )}
            
            {step === 'onboarding' && (
              <form action={saveCustomerOnboarding} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>
                  Welcome! Please tell us a bit about yourself.
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="text" name="firstName" placeholder="First Name" required style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input type="text" name="lastName" placeholder="Last Name" required style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                </div>
                
                <input type="text" name="street" placeholder="Street Address" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="text" name="city" placeholder="City" required style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input type="text" name="state" placeholder="State" required style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input type="text" name="pincode" placeholder="Pincode" required style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '12px',
                    border: 'none',
                    marginTop: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Save & Continue
                </button>
              </form>
            )}

            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', opacity: 0.5 }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }} />
              <span style={{ padding: '0 12px', fontSize: '11px', fontWeight: 600, color: '#4b5563' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }} />
            </div>

            <p style={{ fontSize: '11px', color: '#6b7280', textAlign: 'center', lineHeight: 1.6, margin: 0, padding: '0 20px' }}>
              I accept that I have read & understood Conqrete's <br/>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>Privacy Policy</a> & <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>T&Cs</a>.
            </p>

            {isReviewMode && (
              <div style={{ marginTop: '20px', borderTop: '1px dashed #d1d5db', paddingTop: '20px' }}>
                {!showReviewForm ? (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    style={{ width: '100%', padding: '10px', fontSize: '11px', backgroundColor: 'transparent', color: '#6b7280', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Test / Review Login
                  </button>
                ) : (
                  <form onSubmit={handleTestLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Reviewer Login</div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      style={{ padding: '10px', fontSize: '14px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={testPassword}
                      onChange={(e) => setTestPassword(e.target.value)}
                      style={{ padding: '10px', fontSize: '14px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      style={{ padding: '10px', fontSize: '14px', backgroundColor: '#000', color: '#fff', borderRadius: '8px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? 'Authenticating...' : 'Sign in as Reviewer'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
