"use client";
import { useEffect, useContext, useState } from 'react';
import { ThemeContext } from '@/components/layout/theme-provider';
import Link from 'next/link';

export default function Products() {
  const { isDark } = useContext(ThemeContext);
  const [filter, setFilter] = useState('all');

  // 1. STORM CANVAS LOGIC
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
        .forEach(p => { if (lCtx) { lCtx.globalAlpha = p.a; lCtx.shadowBlur = 40; drawBolt(sx, 0, ex, ey, 180, p.c, p.w, 7); } });
        
      if (flashEl) flashEl.style.background = fc; 
      flash('0.14'); setTimeout(() => flash('0.26'), 60);
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

  // 2. ALL LIVE TEST DATA ANIMATIONS
  useEffect(() => {
    // Freq response path animation
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
      const p = paths[fi];
      if (freqLine) freqLine.setAttribute('d', p);
      if (freqFill) freqFill.setAttribute('d', p + ' L300,44 L0,44 Z');
    }, 1800);

    // Watt cycle
    const wattEl = document.getElementById('wattNum');
    const wattSteps = [30,30,32,35,38,42,45,45,48,52,58,62,65,65,62,58,52,48,45,42,38,35,32,30];
    let wi = 0;
    const wattInt = setInterval(() => { if (wattEl) wattEl.textContent = String(wattSteps[wi++ % wattSteps.length]); }, 350);

    // Bend counter
    let bends = 4218;
    const bendCountEl = document.getElementById('bendCount'), bendDispEl = document.getElementById('bendDisplay');
    const bendInt = setInterval(() => {
      bends++;
      const f = bends.toLocaleString();
      if (bendCountEl) bendCountEl.textContent = f;
      if (bendDispEl) bendDispEl.textContent = f;
    }, 900);

    // Plug counter
    let plugs = 1840;
    const plugEl = document.getElementById('plugCount');
    const plugInt = setInterval(() => { plugs++; if (plugEl) plugEl.textContent = plugs.toLocaleString(); }, 1600);

    // Power bank temp
    const pbTemps = [36,37,38,39,40,41,40,39,38,37,38,40,42,41,39];
    let pti = 0;
    const pbTempEl = document.getElementById('pbTemp');
    const pbTempInt = setInterval(() => { if (pbTempEl) pbTempEl.textContent = pbTemps[pti++ % pbTemps.length] + '°C'; }, 750);

    // Adapter temp
    const adTemps = [40,41,42,43,44,43,42,41,42,44,45,43,41,40];
    let ati = 0;
    const adTempEl = document.getElementById('adTemp'), adTempValEl = document.getElementById('adTempVal');
    const adTempInt = setInterval(() => {
      const t = adTemps[ati++ % adTemps.length];
      const safe = t < 45;
      if (adTempEl) adTempEl.textContent = t + '°C';
      if (adTempValEl) adTempValEl.textContent = t + '°C — ' + (safe ? 'WITHIN SAFE RANGE' : 'MONITORING');
    }, 800);

    // Volt flicker
    const volts = [65,65,64,65,66,65,63,65,67,65,64,65];
    let voltI = 0;
    const voltEl = document.getElementById('voltNum');
    const voltInt = setInterval(() => { if (voltEl) voltEl.textContent = String(volts[voltI++ % volts.length]); }, 380);

    // 12hr load timer
    let loadSecs = 7 * 3600 + 23 * 60;
    const hrEl = document.getElementById('hrDisplay');
    const hrInt = setInterval(() => {
      loadSecs++;
      const h = Math.floor(loadSecs / 3600);
      const m = Math.floor((loadSecs % 3600) / 60);
      if (hrEl) hrEl.textContent = h + 'h ' + String(m).padStart(2, '0') + 'm';
    }, 1000);

    return () => {
      clearInterval(freqInt); clearInterval(wattInt); clearInterval(bendInt);
      clearInterval(plugInt); clearInterval(pbTempInt); clearInterval(adTempInt);
      clearInterval(voltInt); clearInterval(hrInt);
    };
  }, []);

  return (
    <>
      <canvas id="stormCanvas"></canvas>
      <div id="lightningFlash"></div>

      <section className="page-header">
        <div className="page-header-bg">PRODUCTS</div>
        <div className="page-eyebrow">04 PRODUCTS IN DEV</div>
        <h1 className="page-title">What's<br />Coming</h1>
        <p className="page-sub">// ALL UNITS CURRENTLY IN R&amp;D — LAUNCHING Q3 2026</p>
      </section>

      <div className="filter-bar">
        <span className="filter-label">// FILTER:</span>
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'audio' ? 'active' : ''}`} onClick={() => setFilter('audio')}>Audio</button>
        <button className={`filter-btn ${filter === 'power' ? 'active' : ''}`} onClick={() => setFilter('power')}>Power</button>
        <button className={`filter-btn ${filter === 'cables' ? 'active' : ''}`} onClick={() => setFilter('cables')}>Cables</button>
      </div>

      <section className="products-main">
        <div className="products-grid">

          {/* EARPHONES */}
          <div className="product-card" style={{ display: filter === 'all' || filter === 'audio' ? 'block' : 'none' }}>
            <div className="product-status"><div className="status-blink"></div>IN DEV</div>
            <div className="product-num">// 01</div>
            <div className="product-icon-wrap">🎧</div>
            <h2 className="product-name">Earphones</h2>
            <span className="product-tag">WEARABLE AUDIO</span>
            <p className="product-desc">Precision-tuned drivers. Engineered for clarity at every decibel. Built to survive your daily grind without compromise.</p>
            <div className="product-specs">
              <div className="spec-row"><span className="spec-key">Driver Type</span><span className="spec-val">DYNAMIC + BALANCED</span></div>
              <div className="spec-row"><span className="spec-key">Connectivity</span><span className="spec-val">WIRED + BT 5.3</span></div>
              <div className="spec-row"><span className="spec-key">Status</span><span className="spec-val">PROTO v2 IN TEST</span></div>
            </div>
            <div className="test-panel">
              <div className="test-panel-header">
                <span className="test-panel-title">⚗ ACTIVE TEST SUITE</span>
                <span className="test-panel-status"><div className="test-running-dot"></div>RUNNING</span>
              </div>
              <div className="test-list">
                <div className="test-row"><span className="test-icon">🔇</span><span className="test-name">Noise isolation efficiency</span><div className="test-bar-wrap"><div className="test-bar"></div></div><span className="test-result running">–28dB</span></div>
                <div className="test-row"><span className="test-icon">📊</span><span className="test-name">Frequency response calibration</span><div className="test-bar-wrap"><div className="test-bar d1"></div></div><span className="test-result running">ACTIVE</span></div>
                <div className="test-row"><span className="test-icon">🔊</span><span className="test-name">Bass depth measurements</span><div className="test-bar-wrap"><div className="test-bar d2"></div></div><span className="test-result running">20Hz</span></div>
              </div>
              <div className="test-visual">
                <div className="freq-labels"><span>20Hz</span><span>500Hz</span><span>1kHz</span><span>10kHz</span><span>20kHz</span></div>
                <div className="freq-graph">
                  <svg className="freq-svg" viewBox="0 0 300 44" preserveAspectRatio="none" id="freqSvg">
                    <path className="freq-fill-path" id="freqFill" d="M0,38 C20,35 40,10 60,20 C80,30 100,6 120,16 C140,28 160,8 180,18 C200,30 220,10 240,22 C260,34 280,14 300,26 L300,44 L0,44 Z"/>
                    <path className="freq-path" id="freqLine" d="M0,38 C20,35 40,10 60,20 C80,30 100,6 120,16 C140,28 160,8 180,18 C200,30 220,10 240,22 C260,34 280,14 300,26"/>
                  </svg>
                </div>
                <div className="visual-label">// FREQ RESPONSE — LIVE PLOT</div>
              </div>
            </div>
            <div className="card-progress"><div className="card-progress-fill" style={{ width: '35%' }} data-pct="35%"></div></div>
            <div className="card-progress-label">Development Progress</div>
          </div>

          {/* POWER BANKS */}
          <div className="product-card" style={{ display: filter === 'all' || filter === 'power' ? 'block' : 'none' }}>
            <div className="product-status"><div className="status-blink"></div>IN DEV</div>
            <div className="product-num">// 02</div>
            <div className="product-icon-wrap">🔋</div>
            <h2 className="product-name">Power Banks</h2>
            <span className="product-tag">PORTABLE POWER</span>
            <p className="product-desc">High-density cells. Fast charge in. Fast charge out. Compact enough to forget it's in your bag — until you need it most.</p>
            <div className="product-specs">
              <div className="spec-row"><span className="spec-key">Capacity</span><span className="spec-val">10000 — 20000 MAH</span></div>
              <div className="spec-row"><span className="spec-key">Output</span><span className="spec-val">UP TO 65W PD</span></div>
              <div className="spec-row"><span className="spec-key">Status</span><span className="spec-val">CELL SELECTION DONE</span></div>
            </div>
            <div className="test-panel">
              <div className="test-panel-header">
                <span className="test-panel-title">⚗ ACTIVE TEST SUITE</span>
                <span className="test-panel-status"><div className="test-running-dot"></div>RUNNING</span>
              </div>
              <div className="test-list">
                <div className="test-row"><span className="test-icon">⚡</span><span className="test-name">Testing 30W / 45W / 65W output</span><div className="test-bar-wrap"><div className="test-bar"></div></div><span className="test-result running">CYCLING</span></div>
                <div className="test-row"><span className="test-icon">⏱</span><span className="test-name">Charge time benchmarks</span><div className="test-bar-wrap"><div className="test-bar d1"></div></div><span className="test-result ok">✓ PASS</span></div>
                <div className="test-row"><span className="test-icon">🌡</span><span className="test-name">Heat resistance monitoring</span><div className="test-bar-wrap"><div className="test-bar d2"></div></div><span className="test-result running" id="pbTemp">38°C</span></div>
                <div className="test-row"><span className="test-icon">📉</span><span className="test-name">Power stability</span><div className="test-bar-wrap"><div className="test-bar d3"></div></div><span className="test-result running">±0.2V</span></div>
                <div className="test-row"><span className="test-icon">📱</span><span className="test-name">Multi device charging test</span><div className="test-bar-wrap"><div className="test-bar d4"></div></div><span className="test-result running">3 DEV</span></div>
              </div>
              <div className="test-visual">
                <div className="watt-meter">
                  <div className="watt-big" id="wattNum">30</div>
                  <div className="watt-unit">W<br /><span style={{ fontSize: '7px' }}>OUT</span></div>
                  <div className="watt-bar-outer" style={{ flex: 1 }}><div className="watt-bar-fill"></div></div>
                </div>
                <div className="visual-label">// LIVE OUTPUT WATTAGE — CYCLING 30→45→65W</div>
              </div>
            </div>
            <div className="card-progress"><div className="card-progress-fill" style={{ width: '55%' }} data-pct="55%"></div></div>
            <div className="card-progress-label">Development Progress</div>
          </div>

          {/* TYPE-C CABLES */}
          <div className="product-card" style={{ display: filter === 'all' || filter === 'cables' ? 'block' : 'none' }}>
            <div className="product-status"><div className="status-blink"></div>IN DEV</div>
            <div className="product-num">// 03</div>
            <div className="product-icon-wrap">⚡</div>
            <h2 className="product-name">Type-C Cables</h2>
            <span className="product-tag">FAST TRANSFER</span>
            <p className="product-desc">480 MB/s transfer. 65W charging. Kevlar-braided. These aren't cables — they're lifelines for your devices.</p>
            <div className="product-specs">
              <div className="spec-row"><span className="spec-key">Transfer Speed</span><span className="spec-val">UP TO 480 MB/S</span></div>
              <div className="spec-row"><span className="spec-key">Charging</span><span className="spec-val">65W FAST CHARGE</span></div>
              <div className="spec-row"><span className="spec-key">Build</span><span className="spec-val">KEVLAR BRAIDED</span></div>
            </div>
            <div className="test-panel">
              <div className="test-panel-header">
                <span className="test-panel-title">⚗ ACTIVE TEST SUITE</span>
                <span className="test-panel-status"><div className="test-running-dot"></div>RUNNING</span>
              </div>
              <div className="test-list">
                <div className="test-row"><span className="test-icon">🔁</span><span className="test-name">Bend test</span><div className="test-bar-wrap"><div className="test-bar"></div></div><span className="test-result running" id="bendCount">4,218</span></div>
                <div className="test-row"><span className="test-icon">🔌</span><span className="test-name">Plug / unplug stress cycles</span><div className="test-bar-wrap"><div className="test-bar d1"></div></div><span className="test-result running" id="plugCount">1,840</span></div>
                <div className="test-row"><span className="test-icon">🧶</span><span className="test-name">Tangle resistance</span><div className="test-bar-wrap"><div className="test-bar d2"></div></div><span className="test-result ok">✓ PASS</span></div>
              </div>
              <div className="test-visual">
                <div className="bend-wrap">
                  <div>
                    <div className="bend-big" id="bendDisplay">4,218</div>
                    <div className="bend-info">BEND<br />CYCLES</div>
                  </div>
                  <div className="bend-anim-wrap"><div className="bend-line"></div></div>
                </div>
                <div className="visual-label">// KEVLAR BEND STRESS — LIVE COUNT</div>
              </div>
            </div>
            <div className="card-progress"><div className="card-progress-fill" style={{ width: '60%' }} data-pct="60%"></div></div>
            <div className="card-progress-label">Development Progress</div>
          </div>

          {/* POWER ADAPTERS */}
          <div className="product-card" style={{ display: filter === 'all' || filter === 'power' ? 'block' : 'none' }}>
            <div className="product-status"><div className="status-blink"></div>IN DEV</div>
            <div className="product-num">// 04</div>
            <div className="product-icon-wrap">🔌</div>
            <h2 className="product-name">Power Adapters</h2>
            <span className="product-tag">MULTI-PORT CHARGE</span>
            <p className="product-desc">GaN technology. Multiple ports. One brick to charge everything. Intelligent power distribution that just works.</p>
            <div className="product-specs">
              <div className="spec-row"><span className="spec-key">Technology</span><span className="spec-val">GAN III</span></div>
              <div className="spec-row"><span className="spec-key">Total Output</span><span className="spec-val">65W — 100W</span></div>
              <div className="spec-row"><span className="spec-key">Ports</span><span className="spec-val">2C + 1A</span></div>
            </div>
            <div className="test-panel">
              <div className="test-panel-header">
                <span className="test-panel-title">⚗ ACTIVE TEST SUITE</span>
                <span className="test-panel-status"><div className="test-running-dot"></div>RUNNING</span>
              </div>
              <div className="test-list">
                <div className="test-row"><span className="test-icon">🌡</span><span className="test-name">Overheating prevention trials</span><div className="test-bar-wrap"><div className="test-bar"></div></div><span className="test-result running" id="adTemp">42°C</span></div>
                <div className="test-row"><span className="test-icon">⏳</span><span className="test-name">Continuous 12hr load test</span><div className="test-bar-wrap"><div className="test-bar d1"></div></div><span className="test-result running" id="hrDisplay">7h 23m</span></div>
                <div className="test-row"><span className="test-icon">🛡</span><span className="test-name">Over voltage protection</span><div className="test-bar-wrap"><div className="test-bar d2"></div></div><span className="test-result ok">✓ ACTIVE</span></div>
              </div>
              <div className="test-visual">
                <div className="adapter-visual">
                  <div className="volt-big" id="voltNum">65</div>
                  <div className="volt-unit">W</div>
                  <div className="temp-col">
                    <div className="temp-bar-outer"><div className="temp-bar-fill"></div></div>
                    <div className="temp-readout" id="adTempVal">42°C — WITHIN SAFE RANGE</div>
                  </div>
                </div>
                <div className="visual-label">// THERMAL MONITORING — CONTINUOUS LOAD</div>
              </div>
            </div>
            <div className="card-progress"><div className="card-progress-fill" style={{ width: '40%' }} data-pct="40%"></div></div>
            <div className="card-progress-label">Development Progress</div>
          </div>

        </div>
      </section>

      <div className="notify-strip">
        <div className="notify-strip-text">Get notified on<br /><span>launch day.</span></div>
        <Link href="/" className="notify-strip-btn">NOTIFY ME</Link>
      </div>
    </>
  );
}