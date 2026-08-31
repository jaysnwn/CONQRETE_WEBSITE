"use client";
import { useEffect, useContext } from 'react';
import { ThemeContext } from '@/components/layout/theme-provider';
import Link from 'next/link';

export default function About() {
  const { isDark } = useContext(ThemeContext);

  

  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', position: 'relative', zIndex: 1, ...{ '--acid': '#111827' } } as React.CSSProperties}>
      
      
      

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="hero-bg-text">CONQRETE</div>
        <div className="about-eyebrow">EST. 2025 — INDIA</div>
        <h1 className="about-headline">Built<br />Different<span className="accent" style={{ color: '#c8ff00' }}>.</span></h1>
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
          <p>We started in 2025 with three products. Power banks. Cables. Adapters. Simple. Focused. Uncompromising. This is just the beginning.</p>
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

      {/* FOUNDER SECTION */}
      <section className="founder-section">
        <div>
          <div className="founder-label">// FOUNDER'S NOTE</div>
          <blockquote className="founder-quote">"I was tired of choosing between expensive and bad. So we built what didn't exist."</blockquote>
          <div className="founder-name">— CONQRETE FOUNDER, 2025</div>
        </div>
        <div className="founder-body">
          <p>The idea for CONQRETE came from a simple observation: the accessories market in India was flooded with products that were either overpriced imports or cheap knockoffs that lasted three months.</p>
          <p>We started with three categories because we use all three every single day. Power banks for the long days. Cables that don't fray. Adapters that actually charge fast. Products built around real life.</p>
          <p>We're not here to be another brand. We're here to set a new standard.</p>
        </div>
      </section>

            {/* BRANDING SECTION */}
      <section style={{ padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#fafafa' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 4vw, 28px)', flexWrap: 'nowrap', justifyContent: 'center', width: '100%' }}>
          <img src="/rhino-logo.png" alt="Rhino Icon" style={{ height: 'clamp(60px, 20vw, 110px)', width: 'auto', objectFit: 'contain' }} />
          <div style={{ width: 'clamp(2px, 0.5vw, 4px)', height: 'clamp(50px, 16vw, 90px)', backgroundColor: '#111827', flexShrink: 0 }}></div>
          <img src="/conqrete-stacked-logo.png" alt="CONQRETE Logo" style={{ height: 'clamp(60px, 20vw, 110px)', width: 'auto', objectFit: 'contain' }} />
        </div>
        <h2 style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 'clamp(18px, 4vw, 32px)', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#111827', margin: 0, textAlign: 'center', fontWeight: 900 }}>
          Built for your daily abuse
        </h2>
      </section>

      {/* CTA STRIP */}
      <div className="cta-strip" style={{ backgroundColor: '#c8ff00' }}>
        <div className="cta-text">See what we have<br /><span style={{ color: '#111827', WebkitTextStroke: '0' }}>built.</span></div>
        <style>{".about-cta-btn { color: #ffffff !important; } .about-cta-btn:hover { color: #111827 !important; }"}</style><Link href="/products" className="cta-btn about-cta-btn">VIEW PRODUCTS</Link>
      </div>
    </div>
  );
}