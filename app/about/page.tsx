"use client";
import { useEffect, useContext } from 'react';
import { ThemeContext } from '@/components/layout/theme-provider';
import Link from 'next/link';

export default function About() {
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    const flashEl = document.getElementById('lightningFlash');
    const lCanvas = document.getElementById('stormCanvas') as HTMLCanvasElement;
    if (!lCanvas || !flashEl) return;
    
    const lCtx = lCanvas.getContext('2d');
    let stormRunning = true;
    let stormTimer: NodeJS.Timeout;

    const resize = () => { 
      lCanvas.width = window.innerWidth; 
      lCanvas.height = window.innerHeight; 
    };
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
      lCtx.strokeStyle = color; lCtx.lineWidth = w; lCtx.shadowBlur = 20; lCtx.shadowColor = color; lCtx.globalAlpha = 0.9; lCtx.stroke();
    }

    function flash(v: string) {
      if (!flashEl) return;
      flashEl.style.transition = 'none'; flashEl.style.opacity = v;
      setTimeout(() => { flashEl.style.transition = 'opacity .4s ease'; flashEl.style.opacity = '0'; }, 60 + Math.random() * 80);
    }

    function triggerLightning() {
      if (!stormRunning || !lCtx) return;
      const c1 = isDark ? 'rgba(200,255,0,.5)' : 'rgba(232,0,13,.5)';
      const c2 = isDark ? 'rgba(200,255,0,.8)' : 'rgba(232,0,13,.8)';
      const fc = isDark ? 'rgba(200,255,0,0.1)' : 'rgba(232,0,13,0.07)';
      
      lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
      const sx = lCanvas.width * (0.1 + Math.random() * 0.8);
      const ex = sx + (Math.random() - 0.5) * 400;
      const ey = lCanvas.height * (0.4 + Math.random() * 0.5);
      
      [{ w: 12, a: 0.06, c: c1 }, { w: 6, a: 0.18, c: c2 }, { w: 2, a: 1, c: '#fff' }]
        .forEach(p => { 
          if (lCtx) { lCtx.globalAlpha = p.a; lCtx.shadowBlur = 40; drawBolt(sx, 0, ex, ey, 180, p.c, p.w, 7); } 
        });
        
      if (flashEl) flashEl.style.background = fc; 
      flash('0.14'); 
      setTimeout(() => flash('0.26'), 60);
      setTimeout(() => lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height), 180 + Math.random() * 120);
    }

    function scheduleLightning() { 
      if (!stormRunning) return; 
      stormTimer = setTimeout(() => { triggerLightning(); scheduleLightning(); }, 2500 + Math.random() * 7000); 
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
      {/* STORM CANVAS */}
      <canvas id="stormCanvas"></canvas>
      <div id="lightningFlash"></div>

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="hero-bg-text">CONQRETE</div>
        <div className="about-eyebrow">EST. 2025 — INDIA</div>
        <h1 className="about-headline">Built<br />Different<span className="accent">.</span></h1>
        <p className="about-intro">CONQRETE was born from frustration. Overpriced gear that breaks. Cheap tech that disappoints. We're building the middle ground that never existed — uncompromising quality at a real price.</p>
      </section>

      {/* MANIFESTO SECTION */}
      <section className="manifesto-section">
        <div>
          <div className="manifesto-label">// OUR MANIFESTO</div>
          <h2 className="manifesto-text">We build for <span className="hi">the relentless.</span></h2>
        </div>
        <div className="manifesto-body">
          <p>Tech accessories have been commoditised into mediocrity. Everything looks the same, breaks the same, and disappoints the same. We refuse to be part of that.</p>
          <p>CONQRETE is built around one idea: your gear should be able to keep up with you. Not the other way around. Every product we make goes through brutal real-world testing before it ever reaches your hands.</p>
          <p>We started in 2025 with four products. Earphones. Power banks. Cables. Adapters. Simple. Focused. Uncompromising. This is just the beginning.</p>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="values-section">
        <div className="section-header">
          <h2 className="section-title">What We Stand For</h2>
          <span className="section-num">03 PILLARS</span>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-num">// 01</div>
            <h3 className="value-title">No Compromise</h3>
            <p className="value-desc">Every spec is chosen for a reason. Every material tested. We don't cut corners to hit a price point — we engineer until the price point is justified.</p>
          </div>
          <div className="value-card">
            <div className="value-num">// 02</div>
            <h3 className="value-title">Built to Last</h3>
            <p className="value-desc">Fast fashion killed clothing. Cheap tech is killing accessories. We build things that survive daily abuse, because that's what daily life looks like.</p>
          </div>
          <div className="value-card">
            <div className="value-num">// 03</div>
            <h3 className="value-title">Real Design</h3>
            <p className="value-desc">Looks matter. We obsess over every curve, every finish, every detail — because great tech should also feel great to own.</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item"><span className="stat-num">04</span><span className="stat-label">Products in Dev</span></div>
          <div className="stat-item"><span className="stat-num">2025</span><span className="stat-label">Founded</span></div>
          <div className="stat-item"><span className="stat-num">Q3</span><span className="stat-label">Launch Target</span></div>
          <div className="stat-item"><span className="stat-num">∞</span><span className="stat-label">Daily Abuse Tested</span></div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="founder-section">
        <div>
          <div className="founder-label">// FOUNDER'S NOTE</div>
          <blockquote className="founder-quote">"I was tired of choosing between expensive and bad. So we built what didn't exist."</blockquote>
          <div className="founder-name">— CONQRETE FOUNDER, 2025</div>
        </div>
        <div className="founder-body">
          <p>The idea for CONQRETE came from a simple observation: the accessories market in India was flooded with products that were either overpriced imports or cheap knockoffs that lasted three months.</p>
          <p>We started with four categories because we use all four every single day. Earphones for the commute. Power banks for the long days. Cables that don't fray. Adapters that actually charge fast. Products built around real life.</p>
          <p>We're not here to be another brand. We're here to set a new standard.</p>
        </div>
      </section>

      {/* CTA STRIP */}
      <div className="cta-strip">
        <div className="cta-text">See what we're<br /><span>building.</span></div>
        <Link href="/products" className="cta-btn">VIEW PRODUCTS</Link>
      </div>
    </>
  );
}