"use client";
import { useCartStore, CartItem } from '#/store/cart';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CheckoutModal } from './checkout-modal';

export function CartDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { items, isOpen, toggleCart, removeItem } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);

  if (!isMounted) return null;
  if (!isOpen && !isCheckoutOpen) return null;

  return (
    <>
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      
      {/* Background Dimmer */}
      {isOpen && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, transition: 'opacity 0.3s ease' }} 
          onClick={toggleCart} 
        />
      )}
      
      {/* Sliding Drawer */}
      <div style={{ position: 'fixed', top: 0, right: isOpen ? 0 : '-420px', height: '100%', width: '100%', maxWidth: '400px', backgroundColor: '#ffffff', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 101, display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif', color: '#111827', transition: 'right 0.3s ease' }}>
        
        {/* Header */}
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Your cart</h2>
          <button 
            onClick={toggleCart} 
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Close Cart"
          >
            &times;
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {items.length === 0 ? (
            <div style={{ color: '#6b7280', textAlign: 'center', marginTop: '40px' }}>
              <p>Your cart is currently empty.</p>
              <button 
                onClick={toggleCart}
                style={{ marginTop: '16px', padding: '12px 24px', backgroundColor: '#111827', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            items.map((item: CartItem) => (
              <div key={item.variantId} style={{ display: 'flex', gap: '16px' }}>
                
                {/* Image */}
                <div style={{ position: 'relative', width: '80px', height: '80px', backgroundColor: '#f3f4f6', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '12px' }}>No Image</div>
                  )}
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0', lineHeight: 1.4 }}>{item.title}</h3>
                    <span style={{ fontSize: '14px', fontWeight: 600, marginLeft: '12px' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                  
                  {item.color && <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '2px' }}>{item.color}</div>}
                  {item.capacity && <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{item.capacity}</div>}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                      <span style={{ padding: '4px 12px', fontSize: '13px', color: '#4b5563' }}>Qty: {item.quantity}</span>
                    </div>
                    <button 
                      onClick={() => removeItem(item.variantId)} 
                      style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '16px', fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontSize: '18px', fontWeight: 700 }}>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px', textAlign: 'center' }}>
              Taxes and shipping calculated at checkout
            </p>
            <button 
              onClick={() => {
                toggleCart();
                setIsCheckoutOpen(true);
              }}
              style={{ 
                width: '100%', 
                backgroundColor: '#111827', 
                color: '#ffffff', 
                fontWeight: 600, 
                fontSize: '16px',
                padding: '16px', 
                border: 'none',
                borderRadius: '8px', 
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111827'}
            >
              Check out
            </button>
          </div>
        )}
      </div>
    </>
  );
}