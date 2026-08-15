"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#ffffff', 
      padding: '5rem 2rem 2rem 2rem', 
      color: '#000000',
      fontFamily: 'monospace',
      borderTop: '1px solid #e5e7eb',
      overflow: 'hidden'
    }}>
      {/* Structural Grid & Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 5rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* 4-Column Professional Grid - Tweaked to give the email column more room */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          gap: 4rem;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .footer-col-title {
          font-size: 14px;
          color: #6b7280;
          letter-spacing: 0.15em;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        /* Link Hover Highlights */
        .footer-link {
          color: #000000;
          text-decoration: none;
          font-size: 16px; 
          font-weight: 900;
          transition: all 0.2s ease;
          width: fit-content;
          padding: 2px 6px;
          margin-left: -6px; /* Offsets the padding so text aligns perfectly */
        }
        .footer-link:hover {
          background-color: #c8ff00;
          color: #000000;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
          border-top: 1px solid #e5e7eb;
          padding-top: 2rem;
        }
        .footer-socials {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          flex-wrap: wrap;
        }
        
        /* Mobile Alignment Override */
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 4rem; }
        }
        @media (max-width: 640px) {
          .footer-container { gap: 3.5rem; }
          .footer-grid { grid-template-columns: 1fr; gap: 3.5rem; } 
          .footer-bottom { flex-direction: column-reverse; align-items: flex-start; gap: 2.5rem; }
          .footer-socials { flex-direction: column; align-items: flex-start; gap: 1.25rem; } 
        }
      `}} />

      <div className="footer-container">
        
        {/* TOP SECTION: 4-COLUMN GRID */}
        <div className="footer-grid">
          
          {/* Col 1: Brand */}
          <div className="footer-col" style={{ gap: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-16px' }}>
              <img src="/logo.png?v=2" alt="CONQRETE Logo" style={{ height: '64px', objectFit: 'contain' }} />
            </div>
            {/* NEW MANIFESTO QUOTE */}
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, maxWidth: '90%', fontWeight: 'bold' }}>
              MOST TECH IS BUILT TO SELL.<br/>
              OURS IS BUILT TO SURVIVE.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <span className="footer-col-title">// EXPLORE</span>
            <Link href="/products" className="footer-link">PRODUCTS</Link>
            <Link href="/about" className="footer-link">ABOUT US</Link>
            <Link href="/contact" className="footer-link">CONTACT</Link>
          </div>

          {/* Col 3: Legal */}
          <div className="footer-col">
            <span className="footer-col-title">// LEGAL</span>
            <Link href="#" className="footer-link">PRIVACY POLICY</Link>
            <Link href="#" className="footer-link">TERMS OF USE</Link>
            <Link href="#" className="footer-link">WARRANTY POLICY</Link>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col">
            <span className="footer-col-title">// DIRECT LINE</span>
            <a href="mailto:ask@conqrete.in" style={{ 
              fontSize: 'clamp(1.2rem, 1.5vw, 1.8rem)', 
              fontWeight: 900, 
              color: '#000000', 
              textDecoration: 'none',
              borderBottom: '4px solid #c8ff00', 
              paddingBottom: '4px',
              fontFamily: '"Black Han Sans", sans-serif',
              letterSpacing: '0.05em',
              width: 'fit-content',
              whiteSpace: 'nowrap', /* <--- THIS PREVENTS THE GHOST WRAPPING */
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c8ff00'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              ASK@CONQRETE.IN
            </a>
          </div>

        </div>

        {/* BOTTOM ROW: COPYRIGHT & SOCIALS */}
        <div className="footer-bottom">
          
          {/* Copyright Area - FORCED TO SINGLE LINE */}
          <div style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '0.15em', fontWeight: 'bold' }}>
            © {new Date().getFullYear()} CONQRETE &nbsp;|&nbsp; MADE BY HUMANS, ON EARTH &nbsp;|&nbsp; ALL RIGHTS RESERVED.
          </div>
          
          {/* Links Area */}
          <div className="footer-socials" style={{ fontSize: '13px', letterSpacing: '0.1em', fontWeight: 'bold' }}>
            <a href="https://www.instagram.com/conqrete.tech" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#000'} onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}>INSTAGRAM</a>
            <Link href="#" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#000'} onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}>TWITTER</Link>
            <Link href="#" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#000'} onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}>LINKEDIN</Link>
          </div>

        </div>
        
      </div>
    </footer>
  );
}