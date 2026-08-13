"use client";

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00'
  });

  useEffect(() => {
    const target = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).getTime();
    
    const updateCountdown = () => {
      const d = target - new Date().getTime();
      if (d <= 0) return;
      
      setTimeLeft({
        days: String(Math.floor(d / 864e5)).padStart(2, '0'),
        hours: String(Math.floor((d % 864e5) / 36e5)).padStart(2, '0'),
        mins: String(Math.floor((d % 36e5) / 6e4)).padStart(2, '0'),
        secs: String(Math.floor((d % 6e4) / 1e3)).padStart(2, '0')
      });
    };
    
    updateCountdown();
    const cdInterval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(cdInterval);
  }, []);

  return (
    <section className="countdown-section">
      <div className="section-label">// TARGET: LAUNCH</div>
      <div className="countdown-grid">
        <div className="countdown-item">
          <span className="countdown-num">{timeLeft.days}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-item">
          <span className="countdown-num">{timeLeft.hours}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-item">
          <span className="countdown-num">{timeLeft.mins}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-item">
          <span className="countdown-num">{timeLeft.secs}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </section>
  );
}
