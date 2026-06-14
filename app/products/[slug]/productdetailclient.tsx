"use client";
import { useEffect, useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeContext } from '@/components/layout/theme-provider';
import { useCartStore } from '@/store/cart';

export default function ProductDetailClient({ product }: { product: any }) {
  const { isDark } = useContext(ThemeContext);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  
  // Connect to global cart state
  const addItem = useCartStore((state) => state.addItem);

  // 1. LIGHT MODE STORM CANVAS (With #c8ff00 Acid Green + Dark Shadow)
  useEffect(() => {
    const flashEl = document.getElementById('lightningFlashDetail');
    const lCanvas = document.getElementById('stormCanvasDetail') as HTMLCanvasElement;
    if (!lCanvas || !flashEl) return;
    
    const lCtx = lCanvas.getContext('2d');
    let stormRunning = true;
    let stormTimer: NodeJS.Timeout;

    const resize = () => { lCanvas.width = window.innerWidth; lCanvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    function drawBolt(x1: number, y1: number, x2: number, y2: number, rough: number, color: string, w: number, depth: number) {
      if (depth <= 0 || !lCtx) return;
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * rough;
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * rough * 0.4;
      drawBolt(x1, y1, mx, my, rough / 2, color, w * 0.9, depth - 1);
      drawBolt(mx, my, x2, y2, rough / 2, color, w * 0.9, depth - 1);
      if (Math.random() < 0.3 && depth > 2) drawBolt(mx, my, mx + (Math.random() - 0.5) * 180, my + Math.random() * (lCanvas.height * 0.35), rough / 3, color, w * 0.4, depth - 2);
      
      lCtx.beginPath(); lCtx.moveTo(x1, y1); lCtx.lineTo(mx, my); lCtx.lineTo(x2, y2);
      lCtx.strokeStyle = color; 
      lCtx.lineWidth = w; 
      // Dark shadow ensures the acid green is visible on a pure white background
      lCtx.shadowBlur = 4; 
      lCtx.shadowColor = 'rgba(0,0,0,0.5)'; 
      lCtx.globalAlpha = 0.9; 
      lCtx.stroke();
    }

    function flash(v: string) {
      if (!flashEl) return;
      flashEl.style.transition = 'none'; flashEl.style.opacity = v;
      setTimeout(() => { flashEl.style.transition = 'opacity .4s ease'; flashEl.style.opacity = '0'; }, 60 + Math.random() * 80);
    }

    function triggerLightning() {
      if (!stormRunning || !lCtx) return;
      const c1 = 'rgba(200, 255, 0, 0.6)'; // Acid Green
      const c2 = 'rgba(200, 255, 0, 1)';   // Acid Green Solid
      const fc = 'rgba(200, 255, 0, 0.05)'; 
      
      lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
      const sx = lCanvas.width * (0.1 + Math.random() * 0.8);
      const ex = sx + (Math.random() - 0.5) * 400;
      const ey = lCanvas.height * (0.4 + Math.random() * 0.5);
      
      [{ w: 8, a: 0.2, c: c1 }, { w: 3, a: 0.6, c: c2 }, { w: 1, a: 1, c: '#c8ff00' }]
        .forEach(p => { if (lCtx) { lCtx.globalAlpha = p.a; drawBolt(sx, 0, ex, ey, 180, p.c, p.w, 7); } });
        
      if (flashEl) flashEl.style.background = fc; 
      flash('0.15'); setTimeout(() => flash('0.3'), 60);
      setTimeout(() => lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height), 180 + Math.random() * 120);
    }

    function scheduleLightning() { 
      if (!stormRunning) return; 
      stormTimer = setTimeout(() => { triggerLightning(); scheduleLightning(); }, 3500 + Math.random() * 8000); 
    }
    
    lCanvas.style.opacity = '1';
    const initialTimer = setTimeout(() => { triggerLightning(); scheduleLightning(); }, 800);

    return () => {
      stormRunning = false;
      clearTimeout(stormTimer);
      clearTimeout(initialTimer);
      window.removeEventListener('resize', resize);
      if (lCtx) lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
    };
  }, [isDark]);

  return (
    <>
      {/* Background Elements */}
      <canvas id="stormCanvasDetail" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2, pointerEvents: 'none' }}></canvas>
      <div id="lightningFlashDetail" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', opacity: 0 }}></div>

      {/* Main Light Mode Wrapper */}
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: '6rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Navigation / Diagnostics Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>
            <Link href="/products" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = '#000000'} onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}>[ RETURN TO CATALOG ]</Link> 
            <span style={{ margin: '0 0.5rem' }}>/</span> 
            <span style={{ color: '#000000', fontWeight: 'bold' }}>{product.slug}</span>
          </div>
          <div style={{ fontSize: '10px', color: '#000000', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#c8ff00', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
            SECURE DATALINK ACTIVE
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="lg:grid-cols-2">
          
          {/* LEFT SIDE: Light CAD-Style Image Renders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              
              {/* Black CAD Corner Brackets */}
              <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '20px', height: '20px', borderTop: '2px solid #000', borderLeft: '2px solid #000' }}></div>
              <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '20px', height: '20px', borderTop: '2px solid #000', borderRight: '2px solid #000' }}></div>
              <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '20px', height: '20px', borderBottom: '2px solid #000', borderLeft: '2px solid #000' }}></div>
              <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '20px', height: '20px', borderBottom: '2px solid #000', borderRight: '2px solid #000' }}></div>

              {product.images && product.images.length > 0 ? (
                <Image 
                  src={product.images[0]} 
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain', padding: '3rem' }}
                  priority
                />
              ) : (
                <div style={{ color: '#9ca3af', fontSize: '12px' }}>// AWAITING VISUAL DATA</div>
              )}
              
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', border: '1px solid #000', color: '#000', padding: '4px 12px', fontSize: '10px', backgroundColor: '#c8ff00', fontWeight: 'bold' }}>
                RENDER VIEW 01
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Hardware Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Title & Tagline */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 'bold' }}>// {product.category?.name || 'HARDWARE'}</div>
              <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '0.02em', lineHeight: 1.1 }}>{product.title}</h1>
              <p style={{ color: '#4b5563', fontSize: '13px', lineHeight: 1.6, textTransform: 'none', fontFamily: 'sans-serif' }}>
                {product.description}
              </p>
            </div>

            {/* Price Readout */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '2.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '2rem' }}>
              <span style={{ fontSize: '2.5rem', color: '#000000', fontWeight: 'bold', lineHeight: 1 }}>
                ₹{selectedVariant?.price.toLocaleString()}
              </span>
              {selectedVariant?.compare_at_price && (
                <span style={{ fontSize: '1.25rem', color: '#9ca3af', textDecoration: 'line-through', marginBottom: '4px' }}>
                  ₹{selectedVariant.compare_at_price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Variant Selector Array */}
            {product.variants && product.variants.length > 1 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', marginBottom: '1rem', display: 'block', fontWeight: 'bold' }}>// SELECT CONFIGURATION</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  {product.variants.map((variant: any) => {
                    const isActive = selectedVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        style={{
                          border: isActive ? '2px solid #000' : '1px solid #d1d5db',
                          backgroundColor: isActive ? '#f9fafb' : '#ffffff',
                          color: isActive ? '#000' : '#4b5563',
                          padding: '16px',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseOver={(e) => { if(!isActive) e.currentTarget.style.borderColor = '#9ca3af'; }}
                        onMouseOut={(e) => { if(!isActive) e.currentTarget.style.borderColor = '#d1d5db'; }}
                      >
                        <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>{variant.color}</div>
                        <div style={{ fontSize: '10px', opacity: isActive ? 1 : 0.7 }}>{variant.capacity || 'STANDARD'}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Technical Specifications Panel */}
            <div style={{ marginBottom: '3rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <span style={{ fontSize: '11px', color: '#6b7280', marginBottom: '1.5rem', display: 'block', fontWeight: 'bold' }}>// HARDWARE SPECIFICATIONS</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* SKU */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderBottom: '1px dotted #d1d5db', paddingBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>UNIT SKU</span>
                  <span style={{ color: '#000', fontWeight: 'bold' }}>{selectedVariant?.sku}</span>
                </div>

                {/* Dynamic Specs from Database JSON */}
                {selectedVariant?.specifications && Object.entries(selectedVariant.specifications).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderBottom: '1px dotted #d1d5db', paddingBottom: '8px' }}>
                    <span style={{ color: '#6b7280' }}>{key.replace('_', ' ')}</span>
                    <span style={{ color: '#000', textAlign: 'right', fontWeight: 'bold' }}>{String(value)}</span>
                  </div>
                ))}

                {/* Stock Status with Acid Green Highlight */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', paddingBottom: '4px', alignItems: 'center' }}>
                   <span style={{ color: '#6b7280' }}>INVENTORY STATUS</span>
                   <span style={{ 
                     color: selectedVariant?.stock_quantity > 0 ? '#000' : '#ef4444', 
                     backgroundColor: selectedVariant?.stock_quantity > 0 ? '#c8ff00' : 'transparent',
                     fontWeight: 'bold',
                     padding: '2px 6px'
                   }}>
                     {selectedVariant?.stock_quantity > 0 ? `${selectedVariant.stock_quantity} UNITS SECURED` : 'DEPLETED'}
                   </span>
                </div>
              </div>
            </div>

            {/* Main Call to Action - Add to Cart */}
            <button 
              disabled={!selectedVariant || selectedVariant.stock_quantity === 0}
              onClick={() => {
                addItem({
                  variantId: selectedVariant.id,
                  productId: product.id,
                  title: product.title,
                  price: selectedVariant.price,
                  image: product.images?.[0] || null,
                  color: selectedVariant.color,
                  quantity: 1
                });
              }}
              style={{
                width: '100%',
                backgroundColor: selectedVariant?.stock_quantity > 0 ? '#000000' : '#e5e7eb',
                color: selectedVariant?.stock_quantity > 0 ? '#ffffff' : '#9ca3af',
                fontWeight: 900,
                fontSize: '14px',
                padding: '24px',
                border: selectedVariant?.stock_quantity > 0 ? '1px solid #000' : 'none',
                cursor: selectedVariant?.stock_quantity > 0 ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
              onMouseOver={(e) => { 
                if(selectedVariant?.stock_quantity > 0) { 
                  e.currentTarget.style.backgroundColor = '#c8ff00'; 
                  e.currentTarget.style.color = '#000000'; 
                } 
              }}
              onMouseOut={(e) => { 
                if(selectedVariant?.stock_quantity > 0) { 
                  e.currentTarget.style.backgroundColor = '#000000'; 
                  e.currentTarget.style.color = '#ffffff'; 
                } 
              }}
            >
              {selectedVariant?.stock_quantity > 0 ? 'INITIALIZE CART SEQUENCE' : 'AWAITING RESTOCK'}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}