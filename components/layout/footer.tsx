import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">CONQ<span className="dot">.</span>RETE</div>
      
      <div className="footer-contact">
        <span className="footer-contact-label">// FOR MORE INFO, DROP US AT</span>
        <a href="mailto:ask@conqrete.in" className="footer-email">ask@conqrete.in</a>
      </div>
      
      <div className="footer-right">
        <div className="footer-copy">© 2026 CONQRETE — MADE BY HUMANS, ON EARTH — ALL RIGHTS RESERVED.</div>
        
        <div className="footer-social" style={{ alignItems: 'center' }}>
          {/* Link to your Dashboard HQ */}
          <a href="https://conqrete-dashboard.vercel.app/login" target="_blank" rel="noopener noreferrer" className="social-link" style={{ border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'var(--transition)' }}>
            <span style={{ width: '6px', height: '6px', background: 'var(--acid)', borderRadius: '50%', display: 'inline-block', animation: 'blink 2s infinite' }}></span>
            HQ PORTAL
          </a>
          
          <a href="https://www.instagram.com/conqrete.tech" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
          <Link href="#" className="social-link">Twitter</Link>
          <Link href="#" className="social-link">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}