"use client";

import { useState, useEffect } from 'react';

export default function ProductGrid() {
  const [battPct, setBattPct] = useState(8);
  const [cableSpeed, setCableSpeed] = useState('0 MB/s');
  const [voltNum, setVoltNum] = useState(65);

  useEffect(() => {
    // Battery Animation
    let battStart = Date.now();
    let battRaf: number;
    const animBatt = () => {
      const t = (Date.now() - battStart) % 2200;
      let pct;
      if (t < 1430) pct = Math.round((t / 1430) * 95);
      else pct = Math.round(95 * (1 - (t - 1430) / 770));
      
      setBattPct(pct);
      battRaf = requestAnimationFrame(animBatt);
    };
    animBatt();

    // Cable Speed
    const speeds = ['0 MB/s', '120 MB/s', '480 MB/s', '480 MB/s', '240 MB/s', '480 MB/s', '0 MB/s'];
    let si = 0;
    const cableInterval = setInterval(() => { 
      setCableSpeed(speeds[si++ % speeds.length]); 
    }, 500);

    // Voltage
    const volts = [65, 65, 63, 65, 65, 67, 65, 64, 65, 65, 60, 65];
    let vi = 0;
    const voltInterval = setInterval(() => { 
      setVoltNum(volts[vi++ % volts.length]); 
    }, 300);

    return () => {
      clearInterval(cableInterval);
      clearInterval(voltInterval);
      cancelAnimationFrame(battRaf);
    };
  }, []);

  return (
    <section className="products-section">
      <div className="section-header">
        <h2 className="section-title">What's<br />Coming</h2>
        <span className="section-num">04 PRODUCTS</span>
      </div>
      <div className="products-grid">
        
        {/* Earphones */}
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

        {/* Power Banks */}
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
              <div className="rd-batt-pct">{battPct}%</div>
            </div>
          </div>
          <div className="card-progress"><div className="card-progress-fill" style={{ width: '55%' }} data-pct="55%"></div></div>
          <div className="card-progress-label">Development Progress</div>
        </div>

        {/* Type-C Cables */}
        <div className="product-card">
          <div className="product-status"><div className="status-blink"></div>IN DEV</div>
          <span className="product-icon">⚡</span>
          <div className="product-num">// 03</div>
          <h3 className="product-name">Type-C Cables</h3>
          <span className="product-tag">FAST TRANSFER</span>
          <div className="rd-scene">
            <div className="rd-label">R&D // <span>DATA TRANSFER</span></div>
            <div className="rd-cable-speed">{cableSpeed}</div>
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

        {/* Power Adapters */}
        <div className="product-card">
          <div className="product-status"><div className="status-blink"></div>IN DEV</div>
          <span className="product-icon">🔌</span>
          <div className="product-num">// 04</div>
          <h3 className="product-name">Power Adapters</h3>
          <span className="product-tag">MULTI-PORT CHARGE</span>
          <div className="rd-scene">
            <div className="rd-label">R&D // <span>VOLTAGE TEST</span></div>
            <div className="rd-adapter">
              <div className="rd-volt-num">{voltNum}</div>
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
  );
}
