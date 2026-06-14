"use client";
import { useCartStore, CartItem } from '@/store/cart';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function CartDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, isOpen, toggleCart, removeItem } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);

  if (!isMounted) return null;
  if (!isOpen) return null;

  return (
    <>
      {/* Background Dimmer */}
      <div 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', zIndex: 100 }} 
        onClick={toggleCart} 
      />
      
      {/* Sliding Drawer */}
      <div style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: '100%', maxWidth: '450px', backgroundColor: '#ffffff', borderLeft: '1px solid #e5e7eb', zIndex: 101, display: 'flex', flexDirection: 'column', fontFamily: 'monospace', textTransform: 'uppercase', color: '#000' }}>
        
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#c8ff00', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.2)' }}></div>
            ACTIVE PAYLOAD ({items.length})
          </div>
          
          {/* UX FIX: Giant explicit Close button so users don't click the wrong X */}
          <button onClick={toggleCart} style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '6px 12px', fontSize: '10px', fontWeight: 900, cursor: 'pointer', letterSpacing: '0.1em', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c8ff00'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#000'}>
            [ CLOSE ]
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.length === 0 ? (
            <div style={{ color: '#9ca3af', textAlign: 'center', marginTop: '2rem', fontWeight: 'bold' }}>// CART IS EMPTY</div>
          ) : (
            items.map((item: CartItem) => (
              <div key={item.variantId} style={{ display: 'flex', gap: '1rem', border: '1px solid #e5e7eb', padding: '1rem', position: 'relative' }}>
                
                {/* UX FIX: Red text REMOVE button instead of a confusing [X] */}
                <button onClick={() => removeItem(item.variantId)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 900, fontSize: '10px' }}>
                  REMOVE
                </button>
                
                {/* Strict 80x80px bounding box */}
                <div style={{ position: 'relative', width: '80px', height: '80px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', flexShrink: 0 }}>
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'contain', padding: '0.5rem' }} />
                  )}
                </div>

                {/* Item Details */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '3rem' }}>
                  <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'bold', marginBottom: '4px' }}>{item.color}</div>
                  <div style={{ fontWeight: 900, fontSize: '12px', marginBottom: '8px', lineHeight: 1.2 }}>{item.title}</div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '12px', fontWeight: 'bold' }}>
                    <span>QTY: {item.quantity}</span>
                    <span style={{ backgroundColor: '#c8ff00', padding: '0 4px', color: '#000' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'bold' }}>TOTAL CALCULATION:</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>₹{cartTotal.toLocaleString()}</span>
          </div>
          <button 
            disabled={items.length === 0} 
            style={{ 
              width: '100%', 
              backgroundColor: items.length > 0 ? '#000' : '#e5e7eb', 
              color: items.length > 0 ? '#fff' : '#9ca3af', 
              fontWeight: 900, 
              padding: '1.5rem', 
              border: 'none', 
              cursor: items.length > 0 ? 'pointer' : 'not-allowed', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => { if(items.length > 0) { e.currentTarget.style.backgroundColor = '#c8ff00'; e.currentTarget.style.color = '#000'; } }}
            onMouseOut={(e) => { if(items.length > 0) { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; } }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}