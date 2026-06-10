"use client";
import { useEffect, useContext, FormEvent } from 'react';
import { ThemeContext } from '@/components/layout/theme-provider';

export default function Home() {
  const { isDark } = useContext(ThemeContext);

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

  // Handle the Lightning / Light Canvas connected to your Global ThemeToggle
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
      lCtx.strokeStyle = color; lCtx.lineWidth = w; lCtx.shadowBlur = 20; lCtx.shadowColor = color; lCtx.globalAlpha = 0.9; lCtx.stroke();
    }

    function flash(v: string) {
      if(!flashEl) return;
      flashEl.style.transition = 'none'; flashEl.style.opacity = v;
      setTimeout(() => { flashEl.style.transition = 'opacity .4s ease'; flashEl.style.opacity = '0'; }, 60 + Math.random() * 80);
    }

    function triggerLightning() {
      if (!stormRunning || !lCtx) return;
      const dark = isDark;
      const mainCol = dark ? 'rgba(200,255,0,.5)' : 'rgba(255,69,0,.5)';
      const mainCol2 = dark ? 'rgba(200,255,0,.8)' : 'rgba(255,69,0,.8)';
      const boltCol = dark ? '#c8ff00' : '#ff4500';
      const flashCol = dark ? 'rgba(200,255,0,0.12)' : 'rgba(255,69,0,0.08)';

      lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
      const sx = lCanvas.width * (0.1 + Math.random() * 0.8);
      const ex = sx + (Math.random() - 0.5) * 400;
      const ey = lCanvas.height * (0.4 + Math.random() * 0.5);
      
      [{ w: 12, a: 0.06, blur: 60, c: mainCol }, { w: 6, a: 0.18, blur: 30, c: mainCol2 }, { w: 2, a: 1, blur: 8, c: '#fff' }]
        .forEach(p => { lCtx.globalAlpha = p.a; lCtx.shadowBlur = p.blur; lCtx.shadowColor = p.c; drawBolt(sx, 0, ex, ey, 180, p.c, p.w, 7); });

      if(flashEl) flashEl.style.background = flashCol;
      flash('0.15'); setTimeout(() => flash('0.28'), 60);
      setTimeout(() => lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height), 180 + Math.random() * 120);
      
      if (Math.random() < 0.4) setTimeout(() => {
        if (!stormRunning) return;
        lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
        const x1 = lCanvas.width * (0.1 + Math.random() * 0.8), x2 = x1 + (Math.random() - 0.5) * 250;
        lCtx.globalAlpha = 0.6; lCtx.shadowBlur = 20; lCtx.shadowColor = mainCol2;
        drawBolt(x1, 0, x2, lCanvas.height * (0.3 + Math.random() * 0.4), 100, boltCol, 1.5, 5);
        flash('0.1'); setTimeout(() => lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height), 100);
      }, 250);
    }

    function scheduleLightning() {
      if (!stormRunning) return;
      stormTimer = setTimeout(() => { triggerLightning(); scheduleLightning(); }, 2000 + Math.random() * 6000);
    }

    function startStorm() {
      stormRunning = true;
      if(flashEl) flashEl.style.background = isDark ? 'rgba(200,255,0,0.12)' : 'rgba(255,69,0,0.06)';
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
    <>
      {/* BACKGROUND CANVAS LAYERS */}
      <div id="stormClouds"></div>
      <canvas id="stormCanvas"></canvas>
      <div id="lightningFlash"></div>
      <canvas id="lightCanvas"></canvas>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="bg-word">CONQRETE</div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow">WEARABLE TECH BRAND</div>
            <h1 className="hero-title">
              <span className="glitch" data-text="CONQ">CONQ</span><br />
              <span style={{ color: 'var(--acid)' }}>RETE</span>
            </h1>
            <p className="hero-subtitle">New Age Technology</p>
            <div className="accent-line"><span className="accent-line-text">SOMETHING MASSIVE IS BEING BUILT</span></div>
            <p className="hero-desc">Earphones. Power banks. Cables. Adapters. Products engineered to keep up with your pace. Uncompromising in design. Built for the relentless.</p>
            <div className="hero-tagline">BUILT FOR YOUR DAILY ABUSE<span className="tagline-dot">.</span></div>
          </div>
        </div>
        <div className="corner-mark">COMING SOON — 2025</div>
        <div className="hero-cut"></div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
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
          <div className="belt"></div>
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
          <div className="status-item"><div className="status-dot gray"></div>LAUNCH: Q3 2025</div>
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
        <div className="notify-success" id="notifySuccess" style={{ display: 'none' }}>YOU'RE ON THE LIST. ✓</div>
        <p className="notify-note">// NO SPAM. JUST THE DROP.</p>
      </section>

      {/* REVERSE MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '32s' }}>
          <div className="marquee-item" style={{ color: 'var(--acid)', opacity: 0.45 }}>CONQRETE<span className="sep">·</span>NEW AGE TECH<span className="sep">·</span>BUILT DIFFERENT<span className="sep">·</span>ENGINEERED FOR THE RELENTLESS<span className="sep">·</span>CONQRETE<span className="sep">·</span>NEW AGE TECH<span className="sep">·</span>BUILT DIFFERENT<span className="sep">·</span>ENGINEERED FOR THE RELENTLESS<span className="sep">·</span></div>
          <div className="marquee-item" style={{ color: 'var(--acid)', opacity: 0.45 }}>CONQRETE<span className="sep">·</span>NEW AGE TECH<span className="sep">·</span>BUILT DIFFERENT<span className="sep">·</span>ENGINEERED FOR THE RELENTLESS<span className="sep">·</span>CONQRETE<span className="sep">·</span>NEW AGE TECH<span className="sep">·</span>BUILT DIFFERENT<span className="sep">·</span>ENGINEERED FOR THE RELENTLESS<span className="sep">·</span></div>
        </div>
      </div>
    </>
  );
}