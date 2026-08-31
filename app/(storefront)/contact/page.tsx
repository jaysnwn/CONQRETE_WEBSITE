"use client";
import { useEffect, useContext } from 'react';
import { ThemeContext } from '@/components/layout/theme-provider';
import Script from 'next/script';

export default function Contact() {
  const { isDark } = useContext(ThemeContext);



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
    <div className="contact-page-wrapper" style={{ backgroundColor: '#F1F2EF', minHeight: '100vh', paddingBottom: '40px' }}>
      <style>{`
        /* Button */
        .contact-page-wrapper .sib-form-block__button { color: #111827 !important; border-color: #111827 !important; }
        .contact-page-wrapper .sib-form-block__button:hover { background: #111827 !important; color: #F1F2EF !important; }
        
        /* Headers & Labels */
        .contact-page-wrapper .page-eyebrow { color: #111827 !important; }
        .contact-page-wrapper .page-eyebrow::before { background: #111827 !important; }
        .contact-page-wrapper .contact-block-label { color: #111827 !important; }
        .contact-page-wrapper .response-note-label { color: #111827 !important; }
        .contact-page-wrapper .form-label { color: #111827 !important; }

        /* Links & Hover States */
        .contact-page-wrapper .contact-email:hover { color: #111827 !important; }
        .contact-page-wrapper .social-row:hover { border-bottom-color: #111827 !important; }
        .contact-page-wrapper .social-row:hover .social-name, 
        .contact-page-wrapper .social-row:hover .social-arrow { color: #111827 !important; transform: none !important; }

        /* Form Inputs */
        .contact-page-wrapper .form__entry:focus-within .entry__label { color: #111827 !important; }
        .contact-page-wrapper .input:focus { border-color: #111827 !important; box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.1) !important; }

        /* Messages */
        .contact-page-wrapper #success-message { color: #111827 !important; border-color: #111827 !important; background: rgba(17, 24, 39, 0.05) !important; }
        
        /* Premium Support Card */
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(200, 255, 0, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(200, 255, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(200, 255, 0, 0); }
        }
        
        .premium-support-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.08);
          border-color: #d1d5db;
        }

        .premium-support-card:hover .support-icon-wrapper {
          transform: scale(1.05) rotate(-4deg);
          background-color: #111827 !important;
          color: #ffffff !important;
        }

        .support-action-btn:hover {
          background-color: #111827 !important;
          color: #ffffff !important;
          border-color: #111827 !important;
        }

        .support-action-btn:hover .action-arrow {
          transform: translateX(4px);
        }
      `}</style>
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

      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="page-bg">CONTACT</div>
        <div className="page-eyebrow">GET IN TOUCH</div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <h1 className="page-title">Talk<br />To Us<span style={{ color: 'var(--acid)' }}>.</span></h1>
            <p className="page-sub" style={{ marginTop: '20px' }}>// WE READ EVERY MESSAGE. SERIOUSLY.</p>
          </div>
          
          <div className="premium-support-card" style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            padding: '32px',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            minWidth: '320px',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            
            {/* Top Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--acid)',
                    animation: 'pulseGlow 2s infinite'
                  }}></div>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '0.25em', color: '#111827', fontWeight: 700 }}>CALL SUPPORT</span>
                </div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '0.15em', color: '#6b7280', paddingLeft: '18px' }}>
                  10 AM TO 5 PM
                </div>
              </div>
              
              <div className="support-icon-wrapper" style={{ 
                color: '#111827', 
                padding: '12px', 
                backgroundColor: '#F1F2EF', 
                borderRadius: '4px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
              </div>
            </div>

            {/* Main Number */}
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: 'clamp(32px, 8vw, 42px)', color: '#111827', letterSpacing: '0.02em', margin: '4px 0', lineHeight: 1, whiteSpace: 'nowrap' }}>
              +91 9022281117
            </div>

            {/* Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <a href="tel:+919022281117" className="support-action-btn" style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                padding: '16px 24px', backgroundColor: '#111827', color: '#ffffff', border: '1px solid #111827',
                textDecoration: 'none', fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', 
                letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'all 0.3s', borderRadius: '2px'
              }}>
                <span>CALL NOW</span>
                <svg className="action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s' }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              
              <a href="https://wa.me/919022281117" className="support-action-btn" style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                padding: '16px 24px', backgroundColor: 'transparent', border: '1px solid #d1d5db', color: '#111827', 
                textDecoration: 'none', fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', 
                letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'all 0.3s', borderRadius: '2px'
              }}>
                <span>WHATSAPP</span>
                <svg className="action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s' }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
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
    </div>
  );
}