"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartStore } from '#/store/cart';

// Minimalist SVG Icons
const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1.5"></circle>
    <circle cx="20" cy="21" r="1.5"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // NEW: State for the popup window
  const [isMounted, setIsMounted] = useState(false);
  
  const { toggleCart, items, isOpen } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = isMounted ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* CLEAN FONT + BRUTALIST HOVER RESTORED */
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
          background-color: #c8ff00;
          border-color: #000;
          transform: translateY(-2px);
          box-shadow: 3px 3px 0px #000;
        }

        /* MINIMALIST ICON BUTTONS */
        .desktop-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 2px solid transparent;
          padding: 8px;
          cursor: pointer;
          color: #000;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .icon-btn:hover {
          background-color: #c8ff00;
          border-color: #000;
          transform: translateY(-2px);
          box-shadow: 3px 3px 0px #000;
        }
        .icon-btn.active {
          background-color: #c8ff00;
          border-color: #000;
        }

        /* CART BADGE */
        .cart-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: #c8ff00;
          color: #000;
          font-size: 10px;
          font-weight: 900;
          font-family: sans-serif;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* MOBILE HANDLING */
        .hamburger-wrapper {
          display: none; 
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
        }
        
        @media (max-width: 900px) {
          .desktop-nav-links { display: none !important; }
          .desktop-actions { display: none !important; }
          .hamburger-wrapper { display: flex !important; }
        }

        /* Mobile Menu Links */
        .mobile-nav-link {
          display: block;
          color: #000;
          font-weight: 900;
          padding: 1.2rem 2rem;
          border-bottom: 1px solid #f4f4f5;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .mobile-nav-link:hover {
          background-color: #c8ff00;
          padding-left: 2.5rem;
        }
      `}} />

      {/* NAVBAR WITH ACID GREEN BOTTOM BORDER */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', borderBottom: '4px solid #c8ff00', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', zIndex: 50, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* LOGO */}
        <Link href="/" className="nav-logo" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4px 0', 
          textDecoration: 'none', 
          fontFamily: '"Black Han Sans", sans-serif', 
          lineHeight: 0.85
        }}>
          <span style={{ 
            color: '#000000', 
            fontSize: '1.6rem', 
            fontWeight: 900, 
            letterSpacing: '-0.02em',
            clipPath: 'inset(0% 0 0 0)'
          }}>CONQ</span>
          <span style={{ 
            color: '#000000', 
            fontSize: '1.6rem', 
            fontWeight: 900, 
            letterSpacing: '-0.02em'
          }}>RETE</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="desktop-nav-links">
          <Link href="/adapters" className="desktop-link">Power Adapters</Link>
          <Link href="/cables" className="desktop-link">Power Cables</Link>
          <Link href="/powerbanks" className="desktop-link">Power Banks</Link>
          <Link href="/products" className="desktop-link">View All</Link>
        </div>

        <div className="nav-right-group" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          
          {/* DESKTOP ICONS */}
          <div className="desktop-actions">
            
            {/* 💥 NEW: PROFILE POPOVER SYSTEM 💥 */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setProfileOpen(!profileOpen)} 
                className={`icon-btn ${profileOpen ? 'active' : ''}`}
                aria-label="Profile menu"
                aria-expanded={profileOpen}
              >
                <ProfileIcon />
              </button>

              {/* The actual Pop-Up Window */}
              {profileOpen && (
                <div style={{ 
                  position: 'absolute', 
                  top: 'calc(100% + 15px)', 
                  right: 0, 
                  backgroundColor: '#ffffff', 
                  border: '2px solid #000000', 
                  boxShadow: '4px 4px 0px #000000', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  minWidth: '160px',
                  zIndex: 100 
                }}>
                  {isLoggedIn ? (
                    <>
                      <a href="/account" 
                        style={{ padding: '14px 16px', color: '#000', fontWeight: 900, textDecoration: 'none', borderBottom: '2px solid #000', fontSize: '12px', letterSpacing: '0.1em', fontFamily: 'monospace', transition: 'background 0.2s' }} 
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c8ff00'} 
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                        onClick={() => setProfileOpen(false)}
                      >
                        ACCOUNT
                      </a>
                      <a href="/orders" 
                        style={{ padding: '14px 16px', color: '#000', fontWeight: 900, textDecoration: 'none', borderBottom: '2px solid #000', fontSize: '12px', letterSpacing: '0.1em', fontFamily: 'monospace', transition: 'background 0.2s' }} 
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c8ff00'} 
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                        onClick={() => setProfileOpen(false)}
                      >
                        ORDERS
                      </a>
                      <form action="/api/auth/logout" method="POST" style={{ margin: 0 }}>
                        <button type="submit"
                          style={{ width: '100%', textAlign: 'left', padding: '14px 16px', color: '#ff0000', fontWeight: 900, textDecoration: 'none', fontSize: '12px', letterSpacing: '0.1em', fontFamily: 'monospace', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer' }} 
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff000020'} 
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                          onClick={() => setProfileOpen(false)}
                        >
                          LOG OUT
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <a href="/login" 
                        style={{ padding: '14px 16px', color: '#000', fontWeight: 900, textDecoration: 'none', borderBottom: '2px solid #000', fontSize: '12px', letterSpacing: '0.1em', fontFamily: 'monospace', transition: 'background 0.2s' }} 
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c8ff00'} 
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                        onClick={() => setProfileOpen(false)}
                      >
                        LOGIN
                      </a>
                      <a href="/signup" 
                        style={{ padding: '14px 16px', color: '#000', fontWeight: 900, textDecoration: 'none', fontSize: '12px', letterSpacing: '0.1em', fontFamily: 'monospace', transition: 'background 0.2s' }} 
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c8ff00'} 
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                        onClick={() => setProfileOpen(false)}
                      >
                        REGISTER
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* CART BUTTON */}
            <button onClick={toggleCart} className={`icon-btn ${isOpen ? 'active' : ''}`} aria-label="Shopping Cart" aria-expanded={isOpen}>
              <CartIcon />
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </button>
          </div>
          
          {/* HAMBURGER ICON */}
          <button 
            className={`hamburger-wrapper ${menuOpen ? 'open' : ''}`} 
            onClick={() => { setMenuOpen(!menuOpen); setProfileOpen(false); }}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            style={{ background: 'transparent', border: 'none' }}
          >
            <span style={{ backgroundColor: '#000', width: '28px', height: '3px', display: 'block', transition: '0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ backgroundColor: '#000', width: '28px', height: '3px', display: 'block', transition: '0.3s', opacity: menuOpen ? 0 : 1 }}></span>
            <span style={{ backgroundColor: '#000', width: '28px', height: '3px', display: 'block', transition: '0.3s', transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
          </button>
          
          {/* MOBILE MENU */}
          <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} style={{ backgroundColor: '#ffffff', borderLeft: '1px solid #e5e7eb', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)' }}>
            
            <a href="/adapters" onClick={() => setMenuOpen(false)} className="mobile-nav-link">POWER ADAPTERS</a>
            <a href="/cables" onClick={() => setMenuOpen(false)} className="mobile-nav-link">POWER CABLES</a>
            <a href="/powerbanks" onClick={() => setMenuOpen(false)} className="mobile-nav-link">POWER BANKS</a>
            <a href="/products" onClick={() => setMenuOpen(false)} className="mobile-nav-link">VIEW ALL [↗]</a>
            
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              
              {/* 💥 NEW: MOBILE SPLIT BUTTONS FOR ACCOUNT/ORDERS 💥 */}
              {isLoggedIn ? (
                <>
                  <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <a href="/account" onClick={() => setMenuOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px', border: '2px solid #000', color: '#000', textDecoration: 'none', flexGrow: 1, fontWeight: 900, fontSize: '12px', letterSpacing: '0.1em', transition: 'all 0.2s' }}>
                      ACCOUNT
                    </a>
                    <a href="/orders" onClick={() => setMenuOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px', border: '2px solid #000', color: '#000', textDecoration: 'none', flexGrow: 1, fontWeight: 900, fontSize: '12px', letterSpacing: '0.1em', transition: 'all 0.2s' }}>
                      ORDERS
                    </a>
                  </div>
                  <form action="/api/auth/logout" method="POST" style={{ margin: 0, width: '100%' }}>
                    <button type="submit" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px', border: '2px solid #000', color: '#ff0000', textDecoration: 'none', width: '100%', fontWeight: 900, fontSize: '12px', letterSpacing: '0.1em', background: 'transparent' }}>
                      LOG OUT
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                  <a href="/login" onClick={() => setMenuOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px', border: '2px solid #000', color: '#000', textDecoration: 'none', flexGrow: 1, fontWeight: 900, fontSize: '12px', letterSpacing: '0.1em', transition: 'all 0.2s' }}>
                    LOGIN
                  </a>
                  <a href="/signup" onClick={() => setMenuOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px', border: '2px solid #000', color: '#000', textDecoration: 'none', flexGrow: 1, fontWeight: 900, fontSize: '12px', letterSpacing: '0.1em', transition: 'all 0.2s' }}>
                    REGISTER
                  </a>
                </div>
              )}
              
              <button 
                onClick={() => { setMenuOpen(false); toggleCart(); }} 
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px', border: '2px solid #000', backgroundColor: '#c8ff00', color: '#000', fontWeight: 900, cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}
              >
                <CartIcon /> CART [{itemCount}]
              </button>
              
            </div>
          </div>

        </div>
      </nav>
    </>
  );
}