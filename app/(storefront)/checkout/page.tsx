"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '#/store/cart';

export default function CheckoutPage() {
  const { items } = useCartStore();
  const [formData, setFormData] = useState({
    email: '',
    country: 'India',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = cartTotal > 0 ? (cartTotal > 1000 ? 0 : 50) : 0; // free shipping over 1000
  const orderTotal = cartTotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header */}
      <header style={{ padding: '24px 0', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center' }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '0.1em', textDecoration: 'none', color: '#000' }}>
            CONQRETE
          </Link>
        </div>
      </header>

      {/* Main Checkout Area */}
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1 }}>
        
        {/* Left Form Section */}
        <div style={{ flex: '1 1 60%', padding: '40px 4%', borderRight: '1px solid #e5e7eb' }}>
          
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Contact</h2>
          <div style={{ marginBottom: '32px' }}>
            <input 
              type="email" 
              name="email"
              placeholder="Email or mobile phone number" 
              value={formData.email}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px' }} 
            />
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Delivery</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <select 
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px', backgroundColor: '#fff' }}
            >
              <option value="India">India</option>
            </select>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="text" name="firstName" placeholder="First name (optional)" value={formData.firstName} onChange={handleInputChange} style={{ flex: 1, padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px' }} />
              <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} style={{ flex: 1, padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px' }} />
            </div>

            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} style={{ width: '100%', padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px' }} />
            <input type="text" name="apartment" placeholder="Apartment, suite, etc. (optional)" value={formData.apartment} onChange={handleInputChange} style={{ width: '100%', padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px' }} />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} style={{ flex: 1, padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px' }} />
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} style={{ flex: 1, padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px' }} />
              <input type="text" name="pincode" placeholder="PIN code" value={formData.pincode} onChange={handleInputChange} style={{ flex: 1, padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px' }} />
            </div>

            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '15px' }} />
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Payment</h2>
          <div style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '16px', backgroundColor: '#f9fafb', marginBottom: '32px' }}>
            <p style={{ margin: 0, color: '#4b5563', fontSize: '14px' }}>All transactions are secure and encrypted.</p>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
              <input type="radio" id="cod" name="payment" value="cod" defaultChecked style={{ width: '18px', height: '18px' }} />
              <label htmlFor="cod" style={{ fontWeight: 500 }}>Cash on Delivery (COD)</label>
            </div>
          </div>

          <button 
            style={{ 
              width: '100%', 
              backgroundColor: '#111827', 
              color: '#ffffff', 
              padding: '18px', 
              fontSize: '18px', 
              fontWeight: 600, 
              borderRadius: '4px', 
              border: 'none', 
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#000000'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111827'}
          >
            Complete order
          </button>
        </div>

        {/* Right Summary Section */}
        <div style={{ flex: '1 1 40%', padding: '40px 4%', backgroundColor: '#f9fafb' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {items.map((item) => (
              <div key={item.variantId} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative', width: '64px', height: '64px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  {item.image && <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover', borderRadius: '8px' }} />}
                  <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#6b7280', color: '#fff', fontSize: '12px', fontWeight: 600, width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    {item.quantity}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#111827' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.color} {item.capacity ? ` / ${item.capacity}` : ''}</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', fontSize: '14px' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 500 }}>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', fontSize: '14px' }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 500 }}>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toLocaleString('en-IN')}`}</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: '24px', fontWeight: 700 }}>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 400, marginRight: '8px' }}>INR</span>
              ₹{orderTotal.toLocaleString('en-IN')}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
