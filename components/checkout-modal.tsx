"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from '#/store/cart';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items } = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mobileNumber, setMobileNumber] = useState('');
  
  // Step 2 Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pincode: '',
    address: '',
    area: '',
    city: '',
    state: '',
  });
  
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState('');
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);

  // Auto-fetch PIN code details
  useEffect(() => {
    if (formData.pincode.length === 6) {
      setIsFetchingPincode(true);
      setPincodeError('');
      
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
        .then(res => res.json())
        .then(data => {
          setIsFetchingPincode(false);
          if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
            const postOffices = data[0].PostOffice;
            const areas = postOffices.map((po: any) => po.Name);
            setAvailableAreas(areas);
            setFormData(prev => ({
              ...prev,
              city: postOffices[0].District,
              state: postOffices[0].State,
              area: areas[0] // default to first area
            }));
          } else {
            setPincodeError('Invalid PIN Code');
            setAvailableAreas([]);
            setFormData(prev => ({ ...prev, city: '', state: '', area: '' }));
          }
        })
        .catch(() => {
          setIsFetchingPincode(false);
          setPincodeError('Failed to fetch details');
        });
    } else if (formData.pincode.length < 6) {
      setFormData(prev => ({ ...prev, city: '', state: '', area: '' }));
      setAvailableAreas([]);
      setPincodeError('');
    }
  }, [formData.pincode]);

  if (!isOpen) return null;

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = items.reduce((count, item) => count + item.quantity, 0);
  
  const mockSaved = Math.round(cartTotal * 0.1); 
  const displayTotal = cartTotal; 
  const displayOriginal = cartTotal + mockSaved;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.name.trim() !== '' && 
                      formData.pincode.length === 6 && 
                      formData.address.trim() !== '' && 
                      formData.city !== '' && 
                      formData.state !== '';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', 
      zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Modal Container */}
      <div style={{
        width: '100%', maxWidth: '420px', backgroundColor: '#f9fafb',
        borderRadius: '16px', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxHeight: '90vh',
        boxSizing: 'border-box', overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: '0 8px 0 0', fontWeight: 600 }}>&lt;</button>
            <div style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '0.05em' }}>CONQRETE</div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
              {mockSaved > 0 && <span style={{ color: '#16a34a', fontWeight: 600, backgroundColor: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>₹{mockSaved.toLocaleString('en-IN')} saved</span>}
              <span style={{ color: '#6b7280' }}>• {totalItems} item{totalItems > 1 ? 's' : ''}</span>
            </div>
            <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '14px' }}>₹{displayOriginal.toLocaleString('en-IN')}</span>
              <span style={{ fontWeight: 700, fontSize: '16px' }}>₹{displayTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div style={{ padding: '20px', overflowY: 'auto', overflowX: 'hidden', flex: 1, boxSizing: 'border-box' }}>
          
          {step === 1 && (
            <>
              {/* Coupon Section */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e5e7eb', marginBottom: '20px', boxSizing: 'border-box' }}>
                <input 
                  type="text" 
                  placeholder="Enter coupon code" 
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', marginBottom: '12px' }} 
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 500 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563' }}>
                    🏷️ 3 coupons available
                  </span>
                  <button style={{ background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', color: '#111827' }}>View All</button>
                </div>
              </div>

              {/* Login Section */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#fef3c7', padding: '8px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#92400e', borderBottom: '1px solid #fde68a' }}>
                  Login to Redeem Rewards & Fast Checkout
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: 500 }}>
                    👤 Login to continue
                  </div>
                  
                  <div style={{ position: 'relative', border: '1px solid #111827', borderRadius: '8px', padding: '4px 12px', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
                    <div style={{ position: 'absolute', top: '-10px', left: '12px', backgroundColor: '#ffffff', padding: '0 4px', fontSize: '12px', color: '#4b5563' }}>
                      Enter Mobile Number
                    </div>
                    <span style={{ borderRight: '1px solid #e5e7eb', paddingRight: '12px', marginRight: '12px', fontWeight: 500, color: '#4b5563' }}>+91</span>
                    <input 
                      type="tel" 
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="99999 99999"
                      style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 0', fontSize: '16px', fontWeight: 500, width: '100%' }}
                      maxLength={10}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0', gap: '12px' }}>
                    <div style={{ height: '1px', backgroundColor: '#e5e7eb', flex: 1 }}></div>
                    <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>OR</span>
                    <div style={{ height: '1px', backgroundColor: '#e5e7eb', flex: 1 }}></div>
                  </div>

                  <button style={{ width: '100%', padding: '12px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 500, fontSize: '14px', cursor: 'pointer', boxSizing: 'border-box' }}>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                    Continue with Google
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', boxSizing: 'border-box' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Delivery Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <input 
                  type="text" name="name" placeholder="Full Name" 
                  value={formData.name} onChange={handleInputChange} 
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px' }} 
                />
                <input 
                  type="email" name="email" placeholder="Email Address (Optional)" 
                  value={formData.email} onChange={handleInputChange} 
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px' }} 
                />

                <div style={{ borderTop: '1px solid #f3f4f6', margin: '4px 0' }}></div>

                <div>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" name="pincode" placeholder="6-digit PIN Code" 
                      value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                      maxLength={6}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '8px', border: formData.pincode.length === 6 && formData.city ? '1px solid #16a34a' : (pincodeError ? '1px solid #ef4444' : '1px solid #e5e7eb'), fontSize: '14px' }} 
                    />
                    {isFetchingPincode && <span style={{ position: 'absolute', right: '12px', top: '12px', fontSize: '12px', color: '#6b7280' }}>Fetching...</span>}
                  </div>
                  {pincodeError && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{pincodeError}</div>}
                  
                  {availableAreas.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <select 
                        name="area" 
                        value={formData.area} 
                        onChange={handleInputChange}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '8px', border: '1px solid #16a34a', fontSize: '14px', backgroundColor: '#f0fdf4', outline: 'none' }}
                      >
                        {availableAreas.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {formData.city && formData.state && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '13px', color: '#4b5563', backgroundColor: '#f9fafb', padding: '8px', borderRadius: '6px' }}>
                      <span style={{ fontWeight: 600 }}>{formData.city},</span>
                      <span>{formData.state}</span>
                    </div>
                  )}
                </div>

                <textarea 
                  name="address" 
                  placeholder="Flat, House no., Building, Company, Apartment" 
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} 
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', resize: 'vertical', minHeight: '80px', fontFamily: 'inherit' }} 
                />
                
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px 20px', border: '1px solid #e5e7eb', textAlign: 'center', boxSizing: 'border-box' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛠️</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Payment Integration Pending</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                Your order is ready to be placed, but the payment gateway is currently on hold while we set it up. Check back soon!
              </p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderTop: '1px solid #e5e7eb', flexShrink: 0 }}>
          
          {step === 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '13px', fontWeight: 500 }}>
              <input type="checkbox" id="updates" defaultChecked style={{ width: '16px', height: '16px', accentColor: '#111827' }} />
              <label htmlFor="updates">Send me order updates & offers - (no spam)</label>
            </div>
          )}

          <button 
            onClick={() => {
              if (step === 1) setStep(2);
              else if (step === 2) setStep(3);
              else onClose();
            }}
            disabled={(step === 1 && mobileNumber.length < 10) || (step === 2 && !isFormValid)}
            style={{ 
              width: '100%', 
              boxSizing: 'border-box',
              padding: '16px', 
              backgroundColor: ((step === 1 && mobileNumber.length < 10) || (step === 2 && !isFormValid)) ? '#e5e7eb' : '#000000', 
              color: ((step === 1 && mobileNumber.length < 10) || (step === 2 && !isFormValid)) ? '#9ca3af' : '#ffffff', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: 700, 
              cursor: ((step === 1 && mobileNumber.length < 10) || (step === 2 && !isFormValid)) ? 'not-allowed' : 'pointer',
              marginBottom: '12px',
              transition: 'all 0.2s ease'
            }}
          >
            {step === 3 ? 'Close' : 'Continue'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '11px', color: '#6b7280' }}>
            By proceeding, I agree to CONQRETE's <a href="#" style={{ color: '#111827', textDecoration: 'underline' }}>Privacy Policy</a> and <a href="#" style={{ color: '#111827', textDecoration: 'underline' }}>T&C</a>
          </div>
        </div>
      </div>
    </div>
  );
}
