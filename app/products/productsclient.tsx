"use client";
import Image from 'next/image';
import { useEffect, useContext, useState } from 'react';
import { ThemeContext } from '@/components/layout/theme-provider';
import Link from 'next/link';

export default function ProductsClient({ products }: { products: any[] }) {
  const { isDark } = useContext(ThemeContext);
  const [filter, setFilter] = useState('all');

  // 1. LIGHT MODE STORM CANVAS (Now with #c8ff00)
  useEffect(() => {
    const flashEl = document.getElementById('lightningFlash');
    const lCanvas = document.getElementById('stormCanvas') as HTMLCanvasElement;
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
      lCtx.strokeStyle = color; lCtx.lineWidth = w; 
      // Added a dark shadow so the acid green pops against the white background
      lCtx.shadowBlur = 4; lCtx.shadowColor = 'rgba(0,0,0,0.5)'; 
      lCtx.globalAlpha = 0.9; lCtx.stroke();
    }

    function flash(v: string) {
      if (!flashEl) return;
      flashEl.style.transition = 'none'; flashEl.style.opacity = v;
      setTimeout(() => { flashEl.style.transition = 'opacity .4s ease'; flashEl.style.opacity = '0'; }, 60 + Math.random() * 80);
    }

    function triggerLightning() {
      if (!stormRunning || !lCtx) return;
      const c1 = 'rgba(200, 255, 0, 0.6)'; // #c8ff00
      const c2 = 'rgba(200, 255, 0, 1)';   // #c8ff00
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

  // 2. LIVE TEST DATA ANIMATIONS
  useEffect(() => {
    const freqLine = document.getElementById('freqLine');
    const freqFill = document.getElementById('freqFill');
    const paths = [
      "M0,38 C20,35 40,10 60,20 C80,30 100,6 120,16 C140,28 160,8 180,18 C200,30 220,10 240,22 C260,34 280,14 300,26",
      "M0,32 C20,18 40,36 60,12 C80,6 100,28 120,10 C140,4 160,26 180,8 C200,16 220,34 240,10 C260,4 280,28 300,16",
      "M0,36 C20,28 40,14 60,30 C80,40 100,14 120,24 C140,36 160,12 180,28 C200,38 220,16 240,30 C260,40 280,18 300,32",
    ];
    let fi = 0;
    const freqInt = setInterval(() => {
      fi = (fi + 1) % paths.length;
      if (freqLine) freqLine.setAttribute('d', paths[fi]);
      if (freqFill) freqFill.setAttribute('d', paths[fi] + ' L300,44 L0,44 Z');
    }, 1800);

    const wattEl = document.getElementById('wattNum');
    const wattSteps = [30,30,32,35,38,42,45,45,48,52,58,62,65,65,62,58,52,48,45,42,38,35,32,30];
    let wi = 0;
    const wattInt = setInterval(() => { if (wattEl) wattEl.textContent = String(wattSteps[wi++ % wattSteps.length]); }, 350);

    let bends = 4218;
    const bendCountEl = document.getElementById('bendCount');
    const bendInt = setInterval(() => {
      bends++;
      if (bendCountEl) bendCountEl.textContent = bends.toLocaleString();
    }, 900);

    return () => {
      clearInterval(freqInt); clearInterval(wattInt); clearInterval(bendInt);
    };
  }, []);

  const renderTestPanel = (categorySlug: string) => {
    const panelStyle = { border: '1px solid #e5e7eb', backgroundColor: '#ffffff', padding: '1rem', marginTop: '1.5rem', fontSize: '10px', color: '#000' };
    const headerStyle = { display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #d1d5db', paddingBottom: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' };
    const rowStyle = { display: 'flex', justifyContent: 'space-between', padding: '4px 0' };
    
    if (categorySlug === 'audio') {
      return (
        <div style={panelStyle}>
          <div style={headerStyle}>
            <span>⚗ ACTIVE TEST SUITE</span>
            <span style={{ backgroundColor: '#c8ff00', color: '#000', padding: '2px 6px' }}>RUNNING</span>
          </div>
          <div>
            <div style={rowStyle}><span>🔇 Noise isolation</span><span style={{ fontWeight: 'bold' }}>–28dB</span></div>
            <div style={rowStyle}><span>📊 Freq calibration</span><span style={{ fontWeight: 'bold' }}>ACTIVE</span></div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ height: '44px', width: '100%', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', position: 'relative', overflow: 'hidden' }}>
              <svg viewBox="0 0 300 44" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <path id="freqFill" d="M0,38 C20,35 40,10 60,20 L300,44 L0,44 Z" fill="rgba(200, 255, 0, 0.2)"/>
                <path id="freqLine" d="M0,38 C20,35 40,10 60,20" fill="none" stroke="#000" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      );
    }
    if (categorySlug === 'power-banks') {
      return (
        <div style={panelStyle}>
          <div style={headerStyle}>
            <span>⚗ THERMAL & OUTPUT TEST</span>
            <span style={{ backgroundColor: '#c8ff00', color: '#000', padding: '2px 6px' }}>RUNNING</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginTop: '1rem' }}>
            <div id="wattNum" style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: 1 }}>30</div>
            <div style={{ fontSize: '10px', color: '#6b7280', paddingBottom: '4px' }}>W<br/>OUT</div>
          </div>
        </div>
      );
    }
    return (
      <div style={panelStyle}>
        <div style={headerStyle}>
          <span>⚗ STRESS TEST</span>
          <span style={{ backgroundColor: '#c8ff00', color: '#000', padding: '2px 6px' }}>RUNNING</span>
        </div>
        <div>
            <div style={rowStyle}><span>🔁 Bend / Stress cycles</span><span id="bendCount" style={{ fontWeight: 'bold' }}>4,218</span></div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#000000', fontFamily: 'monospace' }}>
      <canvas id="stormCanvas" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}></canvas>
      <div id="lightningFlash" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', opacity: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        
        <section style={{ marginBottom: '4rem', borderBottom: '2px solid #000', paddingBottom: '2rem' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', marginBottom: '1rem' }}>ACTIVE INVENTORY</div>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1 }}>Hardware<br />Catalog</h1>
        </section>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>FILTER:</span>
          {['all', 'audio', 'power', 'cables'].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px', fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
                backgroundColor: filter === f ? '#000' : '#f9fafb',
                color: filter === f ? '#fff' : '#4b5563',
                border: filter === f ? '1px solid #000' : '1px solid #e5e7eb'
              }}>
              {f}
            </button>
          ))}
        </div>

        <section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {products.map((product, index) => {
              const catSlug = product.category?.slug || '';
              const showCard = filter === 'all' || catSlug.includes(filter);

              if (!showCard) return null;

              return (
                <div key={product.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', marginBottom: '1rem' }}>
                    <span style={{ color: '#6b7280' }}>// 0{index + 1}</span>
                    <span style={{ backgroundColor: '#c8ff00', color: '#000', padding: '2px 6px' }}>LIVE</span>
                  </div>
                  
                  {product.images && product.images.length > 0 ? (
                    <div style={{ position: 'relative', width: '100%', height: '220px', marginBottom: '1.5rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', flexShrink: 0 }}>
                      <Image src={product.images[0]} alt={product.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'contain', padding: '1.5rem' }} />
                    </div>
                  ) : (
                    <div style={{ width: '100%', height: '220px', marginBottom: '1.5rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {catSlug.includes('audio') ? '🎧' : catSlug.includes('power') ? '🔋' : '⚡'}
                    </div>
                  )}

                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{product.title}</h2>
                  <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'bold', marginBottom: '1rem', display: 'block' }}>{product.tags?.[0] || 'HARDWARE'}</span>
                  
                  <p style={{ flexGrow: 1, fontSize: '12px', color: '#4b5563', lineHeight: 1.6 }}>{product.description}</p>
                  
                  {renderTestPanel(catSlug)}

                  <Link href={`/products/${product.slug}`} style={{ display: 'block', textAlign: 'center', backgroundColor: '#000', color: '#fff', fontWeight: 'bold', marginTop: '1.5rem', padding: '16px', width: '100%', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none' }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c8ff00'; e.currentTarget.style.color = '#000'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; }}
                  >
                    View Specs & Add to Cart
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}