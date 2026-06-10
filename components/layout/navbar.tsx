"use client";
import Link from 'next/link';
import { useContext, useState } from 'react';
import { ThemeContext } from './theme-provider';

export default function Navbar() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div id="acid-line"></div>
      <nav>
        {/* Strictly clean logo */}
        <Link href="/" className="nav-logo">
          CONQ<span className="dot">.</span>RETE
        </Link>

        <div className="nav-links">
          <Link href="/products" className="nav-link">Products</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-right-group">
          <div className="theme-toggle" onClick={toggleTheme} title="Toggle dark / light mode">
            <span className="toggle-icon" style={{ fontSize: '14px' }}>⚡</span>
            <div className="toggle-track">
              <div className="toggle-thumb"></div>
            </div>
            <span className="toggle-icon" style={{ fontSize: '14px' }}>☀️</span>
          </div>
          
          <div 
            className={`hamburger ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </div>
          
          <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
            <Link href="/" className="mobile-menu-link mobile-home-link" onClick={() => setMenuOpen(false)}>← Home</Link>
            <Link href="/products" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/about" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      </nav>
    </>
  );
}