"use client";
import { useEffect, useContext, FormEvent, useState } from 'react';
import { ThemeContext } from '@/components/layout/theme-provider';

export default function Home() {
  const { isDark } = useContext(ThemeContext);

  // 💥 CAROUSEL STATE & IMAGE ARRAY 💥
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "/hero_img_01.png",
    "/hero_img_02.png",
    "/hero_img_03.png",
    "/hero_img_04.png"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // AUTOPLAY SLIDER CLOCK
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500); 
    return () => clearInterval(timer);
  }, [currentSlide]);

  // Handle all the live counters and countdown timer
  useEffect(() => {
    // 1. COUNTDOWN
    const target = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    const updateCountdown = () => {
      const d = target.getTime() - new Date().getTime();
      if (d <= 0) return;
      
      const cdDays = document.getElementById('cd-days');
      const cdHours = document.getElementById('cd-hours');
      const cdMins = document.getElementById('cd-mins');
      const cdSecs = document.getElementById('cd-secs');

      if (cdDays) cdDays.textContent = String(Math.floor(d / 864e5)).padStart(2, '0');
      if (cdHours) cdHours.textContent = String(Math.floor((d % 864e5) / 36e5)).padStart(2, '0');
      if (cdMins) cdMins.textContent = String(Math.floor((d % 36e5) / 6e4)).padStart(2, '0');
      if (cdSecs) cdSecs.textContent = String(Math.floor((d % 6e4) / 1e3)).padStart(2, '0');
    };
    updateCountdown();
    const cdInterval = setInterval(updateCountdown, 1000);

    // 2. R&D LIVE COUNTERS
    const battEl = document.getElementById('battPct');
    const voltEl = document.getElementById('voltNum');
    const cableEl = document.getElementById('cableSpeed');

    let battStart = Date.now();
    let battRaf: number;
    const animBatt = () => {
      const t = (Date.now() - battStart) % 2200;
      let pct;
      if (t < 1430) pct = Math.round((t / 1430) * 95);
      else pct = Math.round(95 * (1 - (t - 1430) / 770));
      if (battEl) battEl.textContent = pct + '%';
      battRaf = requestAnimationFrame(animBatt);
    };
    animBatt();

    const speeds = ['0 MB/s', '120 MB/s', '480 MB/s', '480 MB/s', '240 MB/s', '480 MB/s', '0 MB/s'];
    let si = 0;
    const cableInterval = setInterval(() => { if (cableEl) cableEl.textContent = speeds[si++ % speeds.length]; }, 500);

    const volts = [65, 65, 63, 65, 65, 67, 65, 64, 65, 65, 60, 65];
    let vi = 0;
    const voltInterval = setInterval(() => { if (voltEl) voltEl.textContent = String(volts[vi++ % volts.length]); }, 300);

    return () => {
      clearInterval(cdInterval);
      clearInterval(cableInterval);
      clearInterval(voltInterval);
      cancelAnimationFrame(battRaf);
    };
  }, []);

  // Handle the Lightning Canvas
  useEffect(() => {
    const flashEl = document.getElementById('lightningFlash');
    const lCanvas = document.getElementById('stormCanvas') as HTMLCanvasElement;
    if (!lCanvas || !flashEl) return;
    
    const lCtx = lCanvas.getContext('2d');
    let stormRunning = false;
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
      if (Math.random() < 0.35 && depth > 2) drawBolt(mx, my, mx + (Math.random() - 0.5) * 200, my + Math.random() * (lCanvas.height * 0.3), rough / 3, color, w * 0.4, depth - 2);
      
      lCtx.beginPath(); lCtx.moveTo(x1, y1); lCtx.lineTo(mx, my); lCtx.lineTo(x2, y2);
      lCtx.strokeStyle = color; 
      lCtx.lineWidth = w; 
      
      lCtx.shadowBlur = 6; 
      lCtx.shadowColor = 'rgba(0,0,0,0.5)'; 
      lCtx.globalAlpha = 0.9; 
      lCtx.stroke();
    }

    function flash(v: string) {
      if(!flashEl) return;
      flashEl.style.transition = 'none'; flashEl.style.opacity = v;
      setTimeout(() => { flashEl.style.transition = 'opacity .4s ease'; flashEl.style.opacity = '0'; }, 60 + Math.random() * 80);
    }

    function triggerLightning() {
      if (!stormRunning || !lCtx) return;
      const mainCol = 'rgba(200,255,0,0.6)';
      const mainCol2 = 'rgba(200,255,0,1)';
      const boltCol = '#c8ff00';
      const flashCol = 'rgba(200,255,0,0.05)';

      lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
      const sx = lCanvas.width * (0.1 + Math.random() * 0.8);
      const ex = sx + (Math.random() - 0.5) * 400;
      const ey = lCanvas.height * (0.4 + Math.random() * 0.5);
      
      [{ w: 10, a: 0.2, c: mainCol }, { w: 4, a: 0.6, c: mainCol2 }, { w: 1.5, a: 1, c: boltCol }]
        .forEach(p => { lCtx.globalAlpha = p.a; drawBolt(sx, 0, ex, ey, 180, p.c, p.w, 7); });

      if(flashEl) flashEl.style.background = flashCol;
      flash('0.15'); setTimeout(() => flash('0.28'), 60);
      setTimeout(() => lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height), 180 + Math.random() * 120);
      
      if (Math.random() < 0.4) setTimeout(() => {
        if (!stormRunning) return;
        lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
        const x1 = lCanvas.width * (0.1 + Math.random() * 0.8), x2 = x1 + (Math.random() - 0.5) * 250;
        lCtx.globalAlpha = 0.6; lCtx.shadowBlur = 10; lCtx.shadowColor = 'rgba(0,0,0,0.3)';
        drawBolt(x1, 0, x2, lCanvas.height * (0.3 + Math.random() * 0.4), 100, boltCol, 2, 5);
        flash('0.1'); setTimeout(() => lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height), 100);
      }, 250);
    }

    function scheduleLightning() {
      if (!stormRunning) return;
      stormTimer = setTimeout(() => { triggerLightning(); scheduleLightning(); }, 2000 + Math.random() * 6000);
    }

    function startStorm() {
      stormRunning = true;
      if(flashEl) flashEl.style.background = 'rgba(200,255,0,0.05)';
      lCanvas.style.opacity = '1';
      setTimeout(() => { triggerLightning(); scheduleLightning(); }, 800);
    }

    startStorm();

    return () => {
      stormRunning = false;
      clearTimeout(stormTimer);
      lCtx?.clearRect(0, 0, lCanvas.width, lCanvas.height);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  // Handle Notify Form Submission
  const handleNotifySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch(form.action, { method: 'POST', body: data, mode: 'no-cors' }).catch(() => {});
    form.style.display = 'none';
    const successEl = document.getElementById('notifySuccess');
    if (successEl) successEl.style.display = 'block';
  };

  return (
    <div style={{ backgroundColor: '#f4f4f5', color: '#000000', overflowX: 'hidden', minHeight: '100vh' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        /* Background & Typography */
        body { background-color: #f4f4f5 !important; margin: 0; padding: 0; }
        .bg-word { color: rgba(0,0,0,0.04) !important; z-index: 0; }
        .hero-title, .hero-subtitle, .hero-desc, .hero-tagline, .section-title, .assembly-title { color: #000000 !important; }
        
        .hero-desc { color: #4b5563 !important; font-weight: 500 !important; font-size: 16px !important; line-height: 1.6 !important; max-width: 90%; margin-top: 1.5rem !important; margin-bottom: 1.5rem !important; }
        .hero-tagline { color: #000000 !important; font-weight: 900 !important; font-size: 14px !important; }
        
        .corner-mark { color: #9ca3af !important; border-bottom: 1px solid #e4e4e7 !important; border-left: 1px solid #e4e4e7 !important; }
        
        .assembly-section, .products-section, .notify-section, .countdown-section { background-color: transparent !important; border-top: 1px solid #e4e4e7; }
        .section-label, .assembly-sub, .section-num { color: #6b7280 !important; font-weight: bold; }
        
        .countdown-item { background-color: #ffffff !important; border: 1px solid #e4e4e7 !important; color: #000000 !important; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .countdown-label { color: #6b7280 !important; }
        .countdown-sep { color: #d1d5db !important; }
        
        .belt-item-box { background-color: #ffffff !important; border: 1px solid #e4e4e7 !important; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .belt-item-fill { background-color: #000000 !important; }
        .belt-item-label { color: #000000 !important; }
        .status-item { color: #000000 !important; font-weight: bold; }
        .status-dot { border: 1px solid rgba(0,0,0,0.2) !important; background-color: #c8ff00 !important; }
        .status-dot.orange, .status-dot.red, .status-dot.gray { background-color: #e4e4e7 !important; }
        
        .product-card { background-color: #ffffff !important; border: 1px solid #e4e4e7 !important; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .product-name { color: #000000 !important; }
        .product-num { color: #6b7280 !important; font-weight: bold; }
        .rd-scene { background-color: #f4f4f5 !important; border: 1px solid #e4e4e7 !important; color: #000000 !important; }
        .card-progress-fill { background-color: #c8ff00 !important; border-right: 1px solid #000 !important; }
        .card-progress { background-color: #f4f4f5 !important; border: 1px solid #e4e4e7 !important; }
        
        .product-status { background-color: #c8ff00 !important; color: #000 !important; border: 1px solid #000 !important; font-weight: bold !important; }
        .status-blink { background-color: #000 !important; }
        .rd-label { color: #6b7280 !important; }
        .rd-label span { background-color: #c8ff00 !important; color: #000 !important; border: 1px solid rgba(0,0,0,0.1) !important; }
        .product-tag { color: #000 !important; background-color: #e4e4e7 !important; padding: 2px 6px; font-weight: bold; }
        
        .rd-wave { border-right-color: #000 !important; }
        .rd-batt-body { border-color: #000 !important; }
        .rd-batt-fill { background-color: #c8ff00 !important; }
        .rd-batt-tip { background-color: #000 !important; }
        .rd-batt-pct, .rd-cable-speed, .rd-volt-num, .rd-volt-unit { color: #000 !important; font-weight: bold; }
        .rd-cable-line { background-color: #e4e4e7 !important; }
        .rd-cable-pulse { background-color: #c8ff00 !important; }
        
        .notify-section { 
          background-color: #c8ff00 !important; 
          border-top: 2px solid #000 !important; 
          position: relative; 
          overflow: hidden; 
        }
        
        .notify-section::before {
          content: "CONQRETE"; 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%);
          font-size: clamp(6rem, 18vw, 24rem); 
          font-weight: 900; 
          color: rgba(0,0,0,0.05); 
          z-index: 0; 
          pointer-events: none;
        }
        
        .notify-title, .notify-form, .notify-note, .notify-success { 
          position: relative; 
          z-index: 10; 
        }
        
        .notify-input { 
          background-color: rgba(0,0,0,0.05) !important; 
          border: 1px solid rgba(0,0,0,0.2) !important; 
          color: #000000 !important; 
          box-shadow: none !important; 
        }
        .notify-input::placeholder { color: rgba(0,0,0,0.4) !important; }
        
        .notify-btn { 
          background-color: #000000 !important; 
          color: #ffffff !important; 
          border: 2px solid #000000 !important; 
          transition: all 0.3s ease; 
        }
        .notify-btn:hover { 
          background-color: #ffffff !important; 
          color: #000000 !important; 
        }
        
        .notify-title { color: #000000 !important; }
        .notify-note { color: rgba(0,0,0,0.4) !important; font-weight: bold; }

        /* 💥 RESPONSIVE SLIDER CSS (UPDATED FOR MINIMAL AESTHETIC) 💥 */
        .hero-carousel-container {
          position: relative;
          width: 100vw;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 75px; /* Clears the navbar */
          overflow: hidden;
          background-color: #f4f4f5;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          width: 100%;
        }

        .carousel-slide {
          width: 100vw;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
        }

        .carousel-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Transparent, Glassmorphic Industry-Standard Arrows */
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 300;
          font-size: 20px;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
          user-select: none;
        }
        .carousel-arrow:hover {
          background: rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.05);
        }
        .carousel-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }
        .arrow-left { left: 32px; }
        .arrow-right { right: 32px; }

        /* Minimal Floating Navigation Dots */
        .carousel-dots {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 20;
        }
        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .carousel-dot.active {
          background: #ffffff;
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        }
        .carousel-dot:hover:not(.active) {
          background: rgba(255, 255, 255, 0.8);
        }

        /* Hide arrows on very small mobile screens to keep it clean */
        @media (max-width: 768px) {
          .carousel-arrow { display: none; }
          .hero-carousel-container { margin-top: 60px; }
          .carousel-dot { width: 6px; height: 6px; }
        }
      `}} />

      {/* BACKGROUND CANVAS LAYERS */}
      <div id="stormClouds" style={{ opacity: 0.05 }}></div>
      <canvas id="stormCanvas" style={{ zIndex: 1, pointerEvents: 'none' }}></canvas>
      <div id="lightningFlash" style={{ zIndex: 2, pointerEvents: 'none' }}></div>
      <canvas id="lightCanvas" style={{ zIndex: 3, pointerEvents: 'none' }}></canvas>

      {/* 💥 MULTI-IMAGE AUTO-SLIDER 💥 */}
      <section className="hero-carousel-container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Navigation Arrows */}
        <div className="carousel-arrow arrow-left" onClick={prevSlide}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </div>
        <div className="carousel-arrow arrow-right" onClick={nextSlide}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>

        {/* Sliding Visual Track */}
        <div 
          className="carousel-track" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((url, index) => (
            <div className="carousel-slide" key={index}>
              <img 
                src={url} 
                alt={`Conqrete Campaign ${index + 1}`} 
                className="carousel-img" 
              />
            </div>
          ))}
        </div>

        {/* Floating Minimal Dots */}
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <div 
              key={index}
              className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap" style={{ backgroundColor: '#c8ff00', borderTop: '2px solid #000', borderBottom: '2px solid #000' }}>
        <div className="marquee-track" style={{ color: '#000', fontWeight: 900 }}>
          <div className="marquee-item">EARPHONES<span className="sep">·</span>POWER BANKS<span className="sep">·</span>TYPE-C CABLES<span className="sep">·</span>POWER ADAPTERS<span className="sep">·</span>EARPHONES<span className="sep">·</span>POWER BANKS<span className="sep">·</span>TYPE-C CABLES<span className="sep">·</span>POWER ADAPTERS<span className="sep">·</span></div>
          <div className="marquee-item">EARPHONES<span className="sep">·</span>POWER BANKS<span className="sep">·</span>TYPE-C CABLES<span className="sep">·</span>POWER ADAPTERS<span className="sep">·</span>EARPHONES<span className="sep">·</span>POWER BANKS<span className="sep">·</span>TYPE-C CABLES<span className="sep">·</span>POWER ADAPTERS<span className="sep">·</span></div>
        </div>
      </div>

      {/* COUNTDOWN */}
      <section className="countdown-section">
        <div className="section-label">// TARGET: LAUNCH</div>
        <div className="countdown-grid">
          <div className="countdown-item"><span className="countdown-num" id="cd-days">00</span><span className="countdown-label">Days</span></div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item"><span className="countdown-num" id="cd-hours">00</span><span className="countdown-label">Hours</span></div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item"><span className="countdown-num" id="cd-mins">00</span><span className="countdown-label">Minutes</span></div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item"><span className="countdown-num" id="cd-secs">00</span><span className="countdown-label">Seconds</span></div>
        </div>
      </section>

      {/* ASSEMBLY LINE */}
      <section className="assembly-section">
        <div className="assembly-header">
          <h2 className="assembly-title">Under Construction</h2>
          <span className="assembly-sub">// LIVE BUILD STATUS</span>
        </div>
        <div className="assembly-track">
          <div className="belt" style={{ borderBottom: '1px solid #e4e4e7' }}></div>
          <div className="belt-items">
            <div className="belt-item"><div className="belt-item-box">🎧<span className="belt-item-spark">⚡</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '35%' }}></div></div></div><span className="belt-item-label">EARPHONES</span></div>
            <div className="belt-item"><div className="belt-item-box">🔧<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '80%', animationDelay: '.5s' }}></div></div></div><span className="belt-item-label">TOOLING</span></div>
            <div className="belt-item"><div className="belt-item-box">🔋<span className="belt-item-spark" style={{ animationDelay: '1s' }}>✨</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '55%', animationDelay: '.3s' }}></div></div></div><span className="belt-item-label">POWER BANK</span></div>
            <div className="belt-item"><div className="belt-item-box">📦<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '20%', animationDelay: '.7s' }}></div></div></div><span className="belt-item-label">PACKAGING</span></div>
            <div className="belt-item"><div className="belt-item-box">⚡<span className="belt-item-spark" style={{ animationDelay: '.5s' }}>🔥</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '60%', animationDelay: '.2s' }}></div></div></div><span className="belt-item-label">C-CABLE</span></div>
            <div className="belt-item"><div className="belt-item-box">🔌<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '40%', animationDelay: '.9s' }}></div></div></div><span className="belt-item-label">ADAPTER</span></div>
            <div className="belt-item"><div className="belt-item-box">🛠️<span className="belt-item-spark" style={{ animationDelay: '1.5s' }}>⚡</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '90%', animationDelay: '.4s' }}></div></div></div><span className="belt-item-label">ASSEMBLY</span></div>
            <div className="belt-item"><div className="belt-item-box">🏭<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '70%', animationDelay: '.6s' }}></div></div></div><span className="belt-item-label">FACTORY</span></div>
            <div className="belt-item"><div className="belt-item-box">🎧<span className="belt-item-spark">⚡</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '35%' }}></div></div></div><span className="belt-item-label">EARPHONES</span></div>
            <div className="belt-item"><div className="belt-item-box">🔧<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '80%', animationDelay: '.5s' }}></div></div></div><span className="belt-item-label">TOOLING</span></div>
            <div className="belt-item"><div className="belt-item-box">🔋<span className="belt-item-spark" style={{ animationDelay: '1s' }}>✨</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '55%', animationDelay: '.3s' }}></div></div></div><span className="belt-item-label">POWER BANK</span></div>
            <div className="belt-item"><div className="belt-item-box">📦<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '20%', animationDelay: '.7s' }}></div></div></div><span className="belt-item-label">PACKAGING</span></div>
            <div className="belt-item"><div className="belt-item-box">⚡<span className="belt-item-spark" style={{ animationDelay: '.5s' }}>🔥</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '60%', animationDelay: '.2s' }}></div></div></div><span className="belt-item-label">C-CABLE</span></div>
            <div className="belt-item"><div className="belt-item-box">🔌<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '40%', animationDelay: '.9s' }}></div></div></div><span className="belt-item-label">ADAPTER</span></div>
            <div className="belt-item"><div className="belt-item-box">🛠️<span className="belt-item-spark" style={{ animationDelay: '1.5s' }}>⚡</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '90%', animationDelay: '.4s' }}></div></div></div><span className="belt-item-label">ASSEMBLY</span></div>
            <div className="belt-item"><div className="belt-item-box">🏭<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '70%', animationDelay: '.6s' }}></div></div></div><span className="belt-item-label">FACTORY</span></div>
          </div>
          <div className="sparks-container">
            <div className="spark" style={{ '--dur': '.7s', '--delay': '0s', '--tx': '14px', '--ty': '-28px' } as React.CSSProperties}></div>
            <div className="spark" style={{ '--dur': '.9s', '--delay': '.2s', '--tx': '-10px', '--ty': '-34px' } as React.CSSProperties}></div>
            <div className="spark" style={{ '--dur': '.6s', '--delay': '.4s', '--tx': '22px', '--ty': '-18px' } as React.CSSProperties}></div>
            <div className="spark" style={{ '--dur': '.8s', '--delay': '.6s', '--tx': '-18px', '--ty': '-25px' } as React.CSSProperties}></div>
            <div className="spark" style={{ '--dur': '1s', '--delay': '.1s', '--tx': '8px', '--ty': '-40px' } as React.CSSProperties}></div>
          </div>
        </div>
        <div className="assembly-status">
          <div className="status-item"><div className="status-dot"></div>PRODUCTION ACTIVE</div>
          <div className="status-item"><div className="status-dot orange"></div>DESIGN PHASE: 60%</div>
          <div className="status-item"><div className="status-dot red"></div>TOOLING: IN PROGRESS</div>
          <div className="status-item"><div className="status-dot gray"></div>LAUNCH: Q3 2026</div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW SECTION */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">What's<br />Coming</h2>
          <span className="section-num">04 PRODUCTS</span>
        </div>
        <div className="products-grid">
          
          <div className="product-card">
            <div className="product-status"><div className="status-blink"></div>IN DEV</div>
            <span className="product-icon">🎧</span>
            <div className="product-num">// 01</div>
            <h3 className="product-name">Earphones</h3>
            <span className="product-tag">WEARABLE AUDIO</span>
            <div className="rd-scene">
              <div className="rd-label">R&D // <span>AUDIO TEST</span></div>
              <span className="rd-ear-icon">🎧</span>
              <div className="rd-earphone">
                <div className="rd-wave"></div><div className="rd-wave"></div><div className="rd-wave"></div>
                <div className="rd-wave"></div><div className="rd-wave"></div><div className="rd-wave"></div>
                <div className="rd-wave"></div><div className="rd-wave"></div><div className="rd-wave"></div>
                <div className="rd-wave"></div><div className="rd-wave"></div>
              </div>
            </div>
            <div className="card-progress"><div className="card-progress-fill" style={{ width: '35%' }} data-pct="35%"></div></div>
            <div className="card-progress-label">Development Progress</div>
          </div>

          <div className="product-card">
            <div className="product-status"><div className="status-blink"></div>IN DEV</div>
            <span className="product-icon">🔋</span>
            <div className="product-num">// 02</div>
            <h3 className="product-name">Power Banks</h3>
            <span className="product-tag">PORTABLE POWER</span>
            <div className="rd-scene">
              <div className="rd-label">R&D // <span>CHARGE TEST</span></div>
              <div className="rd-battery">
                <div className="rd-batt-body"><div className="rd-batt-fill"></div></div>
                <div className="rd-batt-tip"></div>
                <div className="rd-batt-pct" id="battPct">8%</div>
              </div>
            </div>
            <div className="card-progress"><div className="card-progress-fill" style={{ width: '55%' }} data-pct="55%"></div></div>
            <div className="card-progress-label">Development Progress</div>
          </div>

          <div className="product-card">
            <div className="product-status"><div className="status-blink"></div>IN DEV</div>
            <span className="product-icon">⚡</span>
            <div className="product-num">// 03</div>
            <h3 className="product-name">Type-C Cables</h3>
            <span className="product-tag">FAST TRANSFER</span>
            <div className="rd-scene">
              <div className="rd-label">R&D // <span>DATA TRANSFER</span></div>
              <div className="rd-cable-speed" id="cableSpeed">0 MB/s</div>
              <div className="rd-cable">
                <span className="rd-cable-end">💻</span>
                <div className="rd-cable-line">
                  <div className="rd-cable-pulse"></div>
                  <div className="rd-cable-pulse p2"></div>
                </div>
                <span className="rd-cable-end">📱</span>
              </div>
            </div>
            <div className="card-progress"><div className="card-progress-fill" style={{ width: '60%' }} data-pct="60%"></div></div>
            <div className="card-progress-label">Development Progress</div>
          </div>

          <div className="product-card">
            <div className="product-status"><div className="status-blink"></div>IN DEV</div>
            <span className="product-icon">🔌</span>
            <div className="product-num">// 04</div>
            <h3 className="product-name">Power Adapters</h3>
            <span className="product-tag">MULTI-PORT CHARGE</span>
            <div className="rd-scene">
              <div className="rd-label">R&D // <span>VOLTAGE TEST</span></div>
              <div className="rd-adapter">
                <div className="rd-volt-num" id="voltNum">65</div>
                <div className="rd-volt-unit">W</div>
                <div className="rd-volt-bar"><div className="rd-volt-fill"></div></div>
                <div className="rd-port-dots">
                  <div className="rd-port-dot"></div><div className="rd-port-dot"></div>
                  <div className="rd-port-dot"></div><div className="rd-port-dot"></div>
                </div>
              </div>
            </div>
            <div className="card-progress"><div className="card-progress-fill" style={{ width: '40%' }} data-pct="40%"></div></div>
            <div className="card-progress-label">Development Progress</div>
          </div>

        </div>
      </section>

      {/* NOTIFY */}
      <section className="notify-section">
        <h2 className="notify-title">Be First.<br />Get Notified.</h2>
        <form className="notify-form" id="notifyForm" method="POST" action="https://066f7a35.sibforms.com/serve/MUIFAKrrcbThFWsj4EjZG4XxiQpNSFTEPLWbYTD_-UKw0fo-Tqo78aC_7qW1wBnhHELUhPAn6TV8i_t0QDYz5oXOC5wdevC8JWpQkFxajY8tezk39X0R_kJvPUcQQ0BxJTIhr-RiOJTBirLzVSg384HWdPGDiHZbomvXt-gSsyXUG_w-KEy1iFuKXh0zoCc2KzcZYRI-pyaGYPFJHw==" onSubmit={handleNotifySubmit}>
          <input type="email" className="notify-input" name="EMAIL" placeholder="YOUR@EMAIL.COM" required />
          <button type="submit" className="notify-btn"><span>NOTIFY ME</span></button>
          <input type="hidden" name="locale" defaultValue="en" />
          <input type="text" name="email_address_check" defaultValue="" style={{ display: 'none' }} />
        </form>
        <div className="notify-success" id="notifySuccess" style={{ display: 'none', color: '#16a34a', fontWeight: 'bold' }}>YOU'RE ON THE LIST. ✓</div>
        <p className="notify-note">// NO SPAM. JUST THE DROP.</p>
      </section>

     {/* REVERSE MARQUEE */}
      <div className="marquee-wrap" style={{ backgroundColor: '#111111', borderTop: '2px solid #000' }}>
        <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '32s', color: '#c8ff00', fontWeight: 900, letterSpacing: '0.1em' }}>
          <div className="marquee-item">
            CONQRETE<span className="sep" style={{color: '#374151'}}>·</span>NEW AGE TECH<span className="sep" style={{color: '#374151'}}>·</span>BUILT DIFFERENT<span className="sep" style={{color: '#374151'}}>·</span>ENGINEERED FOR THE RELENTLESS<span className="sep" style={{color: '#374151'}}>·</span>CONQRETE<span className="sep" style={{color: '#374151'}}>·</span>NEW AGE TECH<span className="sep" style={{color: '#374151'}}>·</span>BUILT DIFFERENT<span className="sep" style={{color: '#374151'}}>·</span>ENGINEERED FOR THE RELENTLESS<span className="sep" style={{color: '#374151'}}>·</span>
          </div>
          <div className="marquee-item">
            CONQRETE<span className="sep" style={{color: '#374151'}}>·</span>NEW AGE TECH<span className="sep" style={{color: '#374151'}}>·</span>BUILT DIFFERENT<span className="sep" style={{color: '#374151'}}>·</span>ENGINEERED FOR THE RELENTLESS<span className="sep" style={{color: '#374151'}}>·</span>CONQRETE<span className="sep" style={{color: '#374151'}}>·</span>NEW AGE TECH<span className="sep" style={{color: '#374151'}}>·</span>BUILT DIFFERENT<span className="sep" style={{color: '#374151'}}>·</span>ENGINEERED FOR THE RELENTLESS<span className="sep" style={{color: '#374151'}}>·</span>
          </div>
        </div>
      </div>
    </div>
  );
}