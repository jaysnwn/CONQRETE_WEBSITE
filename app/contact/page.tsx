"use client";
import { useEffect, useContext } from 'react';
import { ThemeContext } from '@/components/layout/theme-provider';
import Script from 'next/script';

export default function Contact() {
  const { isDark } = useContext(ThemeContext);

  // 1. Storm Canvas Logic
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

  // 2. Brevo Form MutationObserver
  useEffect(() => {
    const formWrap = document.getElementById('sib-form-container');
    if (!formWrap) return;

    const observer = new MutationObserver(function() {
      const form = document.getElementById('sib-form');
      const innerContainer = document.getElementById('sib-container');
      const successMsg = document.getElementById('success-message');
      const errorMsg = document.getElementById('error-message');

      if (!form || !successMsg) return;

      const formHidden = form.style.display === 'none' || form.classList.contains('sib-hidden');
      const msgActive = successMsg.style.display === 'block' || successMsg.classList.contains('sib-form-message-panel--active') || successMsg.classList.contains('active');

      if (formHidden || msgActive) {
        successMsg.style.setProperty('display', 'flex', 'important');
        if (innerContainer) innerContainer.style.setProperty('display', 'none', 'important');
        form.style.setProperty('display', 'none', 'important');
      }

      if (errorMsg && (errorMsg.style.display === 'block' || errorMsg.classList.contains('sib-form-message-panel--active'))) {
        errorMsg.style.setProperty('display', 'flex', 'important');
      }
    });

    observer.observe(formWrap, { attributes: true, childList: true, subtree: true, attributeFilter: ['style', 'className'] });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* BREVO CONFIG SCRIPTS */}
      <Script 
        id="brevo-config" 
        strategy="afterInteractive" 
        dangerouslySetInnerHTML={{
          __html: `
            window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
            window.LOCALE = 'en';
            window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Invalid email. Please check and try again.";
            window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank.";
            window.GENERIC_INVALID_MESSAGE = "Invalid information. Please review and try again.";
            window.translation = { common: { selectedList:'{quantity} list selected', selectedLists:'{quantity} lists selected', selectedOption:'{quantity} selected', selectedOptions:'{quantity} selected' } };
            var AUTOHIDE = Boolean(0);
          `
        }} 
      />
      <Script strategy="afterInteractive" src="https://sibforms.com/forms/end-form/build/main.js" />

      {/* BACKGROUND CANVAS */}
      <canvas id="stormCanvas"></canvas>
      <div id="lightningFlash"></div>

      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="page-bg">CONTACT</div>
        <div className="page-eyebrow">GET IN TOUCH</div>
        <h1 className="page-title">Talk<br />To Us<span style={{ color: 'var(--acid)' }}>.</span></h1>
        <p className="page-sub">// WE READ EVERY MESSAGE. SERIOUSLY.</p>
      </section>

      {/* CONTACT LAYOUT */}
      <div className="contact-main">

        {/* LEFT COL: INFO */}
        <div className="contact-info">
          <div className="info-label">// DIRECT CHANNELS</div>
          <div className="contact-block">
            <div className="contact-block-label">// EMAIL</div>
            <a href="mailto:ask@conqrete.in" className="contact-email">ask@conqrete.in</a>
          </div>
          <div className="contact-block">
            <div className="contact-block-label">// SOCIAL</div>
            <div className="socials">
              <a href="https://www.instagram.com/conqrete.tech" target="_blank" rel="noopener noreferrer" className="social-row">
                <div><div className="social-name">Instagram</div><div className="social-handle">@conqrete.tech</div></div>
                <span className="social-arrow">↗</span>
              </a>
              <a href="#" className="social-row">
                <div><div className="social-name">Twitter / X</div><div className="social-handle">@conqrete</div></div>
                <span className="social-arrow">↗</span>
              </a>
              <a href="#" className="social-row">
                <div><div className="social-name">LinkedIn</div><div className="social-handle">CONQRETE</div></div>
                <span className="social-arrow">↗</span>
              </a>
            </div>
          </div>
          <div className="response-note">
            <div className="response-note-label">// RESPONSE TIME</div>
            <div className="response-note-text">We typically respond within 24–48 hours. For urgent matters, Instagram DMs are fastest. No bots. Real people.</div>
          </div>
        </div>

        {/* RIGHT COL: FORM */}
        <div className="contact-form-wrap">
          <div className="form-label">// SEND A MESSAGE</div>

          <div className="sib-form">
            <div id="sib-form-container" className="sib-form-container">

              <div id="error-message" className="sib-form-message-panel">
                <div className="sib-form-message-panel__text">
                  <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon"><path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"/></svg>
                  <span className="sib-form-message-panel__inner-text">Could not send. Please try again.</span>
                </div>
              </div>

              <div id="success-message" className="sib-form-message-panel">
                <div className="sib-form-message-panel__text">
                  <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"/></svg>
                  <span className="sib-form-message-panel__inner-text">Transmission complete. Stand by for response.</span>
                </div>
              </div>

              <div id="sib-container" className="sib-container--large sib-container--vertical">
                <form id="sib-form" method="POST" action="https://066f7a35.sibforms.com/serve/MUIFABGAadgyopNrtUuzDuLhicigUwlsVv4kDc-ezczsUHEUFzwCHB4UJSjUn75j0JSEcPIS_ZX4Utc95nc26YigjTgZ17pAyg9NgmAc3NoKKHzmilUa386Io9saLF1k-RbchfTojvaf5mRQpukwyFfW8WflAPmlkTV4GjOsT83ZAt3-ky45-1MA01vcAdgsByZuWi-kh3cnpkG6xg==" data-type="subscription" noValidate>
                  
                  <input type="text" name="email_address_check" defaultValue="" className="input--hidden" style={{ display: 'none' }} />
                  <input type="hidden" name="locale" defaultValue="en" />

                  <div className="form-two-col">
                    <div className="sib-input sib-form-block">
                      <div className="form__entry entry_block">
                        <div className="form__label-row">
                          <label className="entry__label" htmlFor="FIRSTNAME">// YOUR NAME</label>
                          <div className="entry__field">
                            <input className="input" maxLength={200} type="text" id="FIRSTNAME" name="FIRSTNAME" autoComplete="off" placeholder="FULL NAME" data-required="true" required />
                          </div>
                        </div>
                        <label className="entry__error entry__error--primary"></label>
                      </div>
                    </div>
                    <div className="sib-input sib-form-block">
                      <div className="form__entry entry_block">
                        <div className="form__label-row">
                          <label className="entry__label" htmlFor="EMAIL">// EMAIL</label>
                          <div className="entry__field">
                            <input className="input" type="email" id="EMAIL" name="EMAIL" autoComplete="off" placeholder="YOUR@EMAIL.COM" data-required="true" required />
                          </div>
                        </div>
                        <label className="entry__error entry__error--primary"></label>
                      </div>
                    </div>
                  </div>

                  <div className="sib-select sib-form-block" data-required="true">
                    <div className="form__entry entry_block">
                      <div className="form__label-row">
                        <label className="entry__label" htmlFor="DROPDOWN">// TOPIC</label>
                        <div className="entry__field">
                          <select className="input" id="DROPDOWN" name="DROPDOWN" data-required="true" required defaultValue="">
                            <option value="" disabled hidden>SELECT A TOPIC</option>
                            <option value="1">PRODUCT ENQUIRY</option>
                            <option value="2">PRESS / MEDIA</option>
                            <option value="3">PARTNERSHIP</option>
                            <option value="4">GENERAL</option>
                          </select>
                        </div>
                      </div>
                      <label className="entry__error entry__error--primary"></label>
                    </div>
                  </div>

                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row">
                        <label className="entry__label" htmlFor="JOB_TITLE">// MESSAGE</label>
                        <div className="entry__field">
                          <input className="input" maxLength={200} type="text" id="JOB_TITLE" name="JOB_TITLE" autoComplete="off" placeholder="WHAT'S ON YOUR MIND..." />
                        </div>
                      </div>
                      <label className="entry__error entry__error--primary"></label>
                    </div>
                  </div>

                  <div className="sib-form-block">
                    <button className="sib-form-block__button sib-form-block__button-with-loader" form="sib-form" type="submit">
                      <svg className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512"><path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"/></svg>
                      SEND MESSAGE ↗
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}