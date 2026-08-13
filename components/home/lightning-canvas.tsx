"use client";

import { useEffect, useContext } from 'react';
import { ThemeContext } from '#/components/layout/theme-provider';

export default function LightningCanvas() {
  const { isDark } = useContext(ThemeContext);

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
      // Throttled lightning generation for better mobile performance
      stormTimer = setTimeout(() => { triggerLightning(); scheduleLightning(); }, 4000 + Math.random() * 8000);
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

  return (
    <>
      <div id="stormClouds" style={{ opacity: 0.05 }}></div>
      <canvas id="stormCanvas" style={{ zIndex: 1, pointerEvents: 'none' }}></canvas>
      <div id="lightningFlash" style={{ zIndex: 2, pointerEvents: 'none' }}></div>
      <canvas id="lightCanvas" style={{ zIndex: 3, pointerEvents: 'none' }}></canvas>
    </>
  );
}
