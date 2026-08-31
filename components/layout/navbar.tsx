"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartStore } from '#/store/cart';
import LoginClientPage from '../../app/(storefront)/login/client-page';

const ProfileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const HeadsetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const NavIconAdapter = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="6" width="10" height="12" rx="2" />
    <path d="M9 2v4" />
    <path d="M15 2v4" />
    <path d="M10 18v2h4v-2" />
    <polygon points="13 9 11 12 13 12 11 15" stroke="#f97316" />
  </svg>
);

const NavIconCable = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="8" width="4" height="6" rx="1" />
    <path d="M7 4v4" />
    <path d="M9 4v4" />
    <rect x="14" y="8" width="4" height="6" rx="1" />
    <path d="M15 5v3" stroke="#f97316" />
    <path d="M17 5v3" stroke="#f97316" />
    <path d="M8 14v3a4 4 0 0 0 8 0v-3" />
  </svg>
);

const NavIconBank = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <polygon points="13 8 10 12 13 12 11 16" stroke="#f97316" />
    <circle cx="10" cy="18" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="18" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="14" cy="18" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const NavIconViewAll = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="5" width="6" height="6" rx="1" />
    <rect x="13" y="5" width="6" height="6" rx="1" stroke="#f97316" />
    <rect x="5" y="13" width="6" height="6" rx="1" />
    <rect x="13" y="13" width="6" height="6" rx="1" />
  </svg>
);

export default function Navbar({ isLoggedIn = false, isReviewMode = false }: { isLoggedIn?: boolean, isReviewMode?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { toggleCart, items } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = isMounted ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* DESKTOP LINKS */
        .desktop-nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }
        .desktop-link {
          color: #6b7280; 
          text-decoration: none;
          font-size: 13px; 
          font-weight: bold;
          font-family: monospace; 
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 8px 12px;
          border: 2px solid transparent;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .desktop-link:hover {
          color: #000000; 
        }

        /* ACTIONS GROUP */
        .desktop-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        /* SUPPORT PILL */
        .support-pill {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 20px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          background-color: #fafafa;
          color: #111827;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .support-pill:hover {
          background-color: #f4f4f5;
          border-color: #d1d5db;
        }
        .support-pill svg {
          width: 28px;
          height: 28px;
          color: #111827;
        }
        .support-pill-text {
          display: flex;
          flex-direction: column;
        }
        .support-pill-top {
          font-size: 12px;
          color: #6b7280;
          font-family: inherit;
          line-height: 1;
        }
        .support-pill-bottom {
          font-size: 16px;
          font-weight: 800;
          font-family: inherit;
          line-height: 1.2;
        }

        /* PROFILE BTN */
        .profile-btn {
          background: transparent;
          border: none;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          padding: 4px;
          cursor: pointer;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }
        .profile-btn:hover {
          transform: scale(1.05);
        }

        /* CART BTN */
        .cart-btn {
          position: relative;
          background: transparent;
          border: none;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          padding: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 44px;
          perspective: 800px;
        }
        
        @keyframes revolve3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        .bag-group-3d {
          position: relative;
          width: 24px;
          height: 26px;
          transform-style: preserve-3d;
          animation: revolve3d 6s infinite linear;
          margin-top: 6px;
        }

        .cart-btn:hover .bag-group-3d {
          animation-play-state: paused;
        }
        
        .face {
          position: absolute;
          box-sizing: border-box;
          background-color: #f3f4f6;
          border: 1px solid #111827;
        }

        .face.front, .face.back {
          width: 24px;
          height: 26px;
          top: 0;
          left: 0;
        }
        .face.front {
          transform: translateZ(6px);
        }
        .face.back {
          transform: rotateY(180deg) translateZ(6px);
        }

        .face.left, .face.right {
          width: 12px;
          height: 26px;
          top: 0;
          left: 6px;
        }
        .face.left {
          transform: rotateY(-90deg) translateZ(12px);
          background-color: #e5e7eb;
        }
        .face.right {
          transform: rotateY(90deg) translateZ(12px);
          background-color: #e5e7eb;
        }

        .face.bottom {
          width: 24px;
          height: 12px;
          top: 7px;
          left: 0;
          transform: rotateX(-90deg) translateZ(13px);
          background-color: #d1d5db;
        }

        .bag-handle-3d {
          position: absolute;
          top: -7px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 7px;
          border: 1px solid #111827;
          border-bottom: none;
          border-radius: 4px 4px 0 0;
        }
        
        .new-cart-badge {
          position: absolute;
          top: -4px;
          right: -8px;
          background-color: #ffffff;
          color: #111827;
          font-size: 11px;
          font-weight: 800;
          font-family: system-ui, sans-serif;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        /* MOBILE HANDLING */
        .mobile-actions, .mobile-left {
          display: none;
        }
        .hamburger-wrapper {
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
        }
        
        @media (max-width: 900px) {
          .desktop-nav-links { display: none !important; }
          .desktop-actions { display: none !important; }
          .mobile-left { display: flex !important; align-items: center; z-index: 10; }
          .mobile-actions { display: flex !important; align-items: center; gap: 0.75rem; z-index: 10; }
          
          .nav-logo {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-left: 0 !important;
          }
          nav {
            padding: 0.75rem 1rem !important;
          }
        }

        /* PREMIUM MOBILE MENU */
        .premium-mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 260px;
          max-width: 85vw;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          box-shadow: 10px 10px 30px rgba(0,0,0,0.05);
          border-right: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          border-bottom-right-radius: 16px;
          overflow: hidden;
          
          /* Animation */
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 40;
        }
        
        .premium-mobile-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .premium-nav-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          color: #111827;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          border-bottom: 1px solid #f9fafb;
          
          /* Sequence Animation */
          opacity: 0;
          transform: translateX(-15px);
          transition: opacity 0.4s ease, transform 0.4s ease, background-color 0.2s ease, padding-left 0.2s ease;
        }

        .premium-mobile-menu.open .premium-nav-link {
          opacity: 1;
          transform: translateX(0);
        }
        
        .premium-mobile-menu .premium-nav-link:nth-child(1) { transition-delay: 0.05s, 0.05s, 0s, 0s; }
        .premium-mobile-menu .premium-nav-link:nth-child(2) { transition-delay: 0.1s, 0.1s, 0s, 0s; }
        .premium-mobile-menu .premium-nav-link:nth-child(3) { transition-delay: 0.15s, 0.15s, 0s, 0s; }
        .premium-mobile-menu .premium-nav-link:nth-child(4) { transition-delay: 0.2s, 0.2s, 0s, 0s; }

        .premium-nav-link:last-child {
          border-bottom: none;
        }

        .premium-nav-link:active,
        .premium-nav-link:hover {
          background-color: #f8f9fa;
          padding-left: 28px;
        }

        .premium-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          color: #111827;
          flex-shrink: 0;
        }
      `}} />

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', borderBottom: '2px solid #c8ff00', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', zIndex: 50, padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* MOBILE LEFT */}
        <div className="mobile-left">
          <button 
            className="hamburger-wrapper" 
            onClick={() => { setMenuOpen(!menuOpen); setProfileOpen(false); }}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            style={{ background: 'transparent', border: 'none', display: 'flex', outline: 'none', WebkitTapHighlightColor: 'transparent' }}
          >
            <span style={{ backgroundColor: '#111827', width: '24px', height: '2px', display: 'block', transition: '0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}></span>
            <span style={{ backgroundColor: '#111827', width: '24px', height: '2px', display: 'block', transition: '0.3s', opacity: menuOpen ? 0 : 1 }}></span>
            <span style={{ backgroundColor: '#111827', width: '24px', height: '2px', display: 'block', transition: '0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}></span>
          </button>
        </div>

        <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', padding: '4px 0', marginLeft: '-24px' }}>
          <Image src="/conqrete-logo.png" alt="CONQRETE Logo" width={90} height={50} style={{ objectFit: 'contain' }} priority unoptimized />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="desktop-nav-links">
          <Link href="/adapters" className="desktop-link">Power Adapters</Link>
          <Link href="/cables" className="desktop-link">Power Cables</Link>
          <Link href="/powerbanks" className="desktop-link">Power Banks</Link>
          <Link href="/products" className="desktop-link">View All</Link>
        </div>

        {/* DESKTOP RIGHT ACTIONS */}
        <div className="desktop-actions">
          
          <a href="tel:+919022281117" className="support-pill">
            <HeadsetIcon />
            <div className="support-pill-text">
              <span className="support-pill-top">Call 10AM to 5PM</span>
              <span className="support-pill-bottom">+91 9022281117</span>
            </div>
          </a>
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => { if (!isLoggedIn) setIsLoginModalOpen(true); else setProfileOpen(!profileOpen); }} 
              className="profile-btn"
              aria-label="Profile menu"
              aria-expanded={profileOpen}
            >
              <ProfileIcon />
            </button>

            {/* Profile Popover */}
            {profileOpen && (
              <div style={{ 
                position: 'absolute', 
                top: 'calc(100% + 15px)', 
                right: 0, 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
                display: 'flex', 
                flexDirection: 'column', 
                minWidth: '160px',
                borderRadius: '8px',
                overflow: 'hidden',
                zIndex: 100 
              }}>
                {isLoggedIn ? (
                  <>
                    <a href="/account" 
                      style={{ padding: '14px 16px', color: '#111827', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid #f3f4f6', fontSize: '13px', transition: 'background 0.2s' }} 
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} 
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                      onClick={() => setProfileOpen(false)}
                    >
                      Account
                    </a>
                    <a href="/orders" 
                      style={{ padding: '14px 16px', color: '#111827', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid #f3f4f6', fontSize: '13px', transition: 'background 0.2s' }} 
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} 
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                      onClick={() => setProfileOpen(false)}
                    >
                      Orders
                    </a>
                    <form action="/api/auth/logout" method="POST" style={{ margin: 0 }}>
                      <button type="submit"
                        style={{ width: '100%', textAlign: 'left', padding: '14px 16px', color: '#ef4444', fontWeight: 600, textDecoration: 'none', fontSize: '13px', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer' }} 
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'} 
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                      >
                        Log Out
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <button 
                      style={{ width: '100%', textAlign: 'left', padding: '14px 16px', color: '#111827', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid #f3f4f6', fontSize: '13px', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer' }} 
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} 
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                      onClick={() => { setProfileOpen(false); setIsLoginModalOpen(true); }}
                    >
                      Login
                    </button>
                    <button 
                      style={{ width: '100%', textAlign: 'left', padding: '14px 16px', color: '#111827', fontWeight: 600, textDecoration: 'none', fontSize: '13px', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer' }} 
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} 
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                      onClick={() => { setProfileOpen(false); setIsLoginModalOpen(true); }}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          
          <button onClick={toggleCart} className="cart-btn" aria-label="Shopping Cart">
            <div className="bag-group-3d">
              <div className="face front">
                <div className="bag-handle-3d"></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '4px' }}>
                  <Image src="/conqrete-logo.png" alt="C" width={14} height={9} style={{ objectFit: 'contain', opacity: 0.8 }} unoptimized />
                </div>
              </div>
              <div className="face back">
                <div className="bag-handle-3d"></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '4px' }}>
                  <Image src="/conqrete-logo.png" alt="C" width={14} height={9} style={{ objectFit: 'contain', opacity: 0.8 }} unoptimized />
                </div>
              </div>
              <div className="face left"></div>
              <div className="face right"></div>
              <div className="face bottom"></div>
            </div>
            <span className="new-cart-badge">{itemCount}</span>
          </button>
        </div>

        {/* MOBILE RIGHT ACTIONS */}
        <div className="mobile-actions">
          
          <button 
            className="profile-btn"
            onClick={() => { if (!isLoggedIn) setIsLoginModalOpen(true); else window.location.href = '/account'; }}
          >
            <ProfileIcon />
          </button>

          <button onClick={toggleCart} className="cart-btn" aria-label="Shopping Cart">
            <div className="bag-group-3d">
              <div className="face front">
                <div className="bag-handle-3d"></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '4px' }}>
                  <Image src="/conqrete-logo.png" alt="C" width={14} height={9} style={{ objectFit: 'contain', opacity: 0.8 }} unoptimized />
                </div>
              </div>
              <div className="face back">
                <div className="bag-handle-3d"></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '4px' }}>
                  <Image src="/conqrete-logo.png" alt="C" width={14} height={9} style={{ objectFit: 'contain', opacity: 0.8 }} unoptimized />
                </div>
              </div>
              <div className="face left"></div>
              <div className="face right"></div>
              <div className="face bottom"></div>
            </div>
            <span className="new-cart-badge">{itemCount}</span>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`premium-mobile-menu ${menuOpen ? 'open' : ''}`}>
          <a href="/adapters" onClick={() => setMenuOpen(false)} className="premium-nav-link">
            <span className="premium-icon-wrapper"><NavIconAdapter /></span>
            Power Adapters
          </a>
          <a href="/cables" onClick={() => setMenuOpen(false)} className="premium-nav-link">
            <span className="premium-icon-wrapper"><NavIconCable /></span>
            Power Cables
          </a>
          <a href="/powerbanks" onClick={() => setMenuOpen(false)} className="premium-nav-link">
            <span className="premium-icon-wrapper"><NavIconBank /></span>
            Power Banks
          </a>
          <a href="/products" onClick={() => setMenuOpen(false)} className="premium-nav-link">
            <span className="premium-icon-wrapper"><NavIconViewAll /></span>
            View All
          </a>
        </div>
      </nav>

      {/* Modals */}
      {isLoginModalOpen && (
        <LoginClientPage isModal onClose={() => setIsLoginModalOpen(false)} isReviewMode={isReviewMode} />
      )}
    </>
  );
}
