"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ChevronDown = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronRight = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

interface Section {
  id: string;
  title: string;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  breadcrumbCurrent: string;
  sections: Section[];
  children: React.ReactNode;
}

export default function LegalPage({ title, lastUpdated, breadcrumbCurrent, sections, children }: LegalPageProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileTocOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', color: '#171717', fontFamily: 'var(--font-sans), sans-serif', paddingBottom: '80px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .legal-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }
        .legal-breadcrumb {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .legal-breadcrumb a {
          color: #171717;
          text-decoration: none;
          transition: color 0.2s;
        }
        .legal-breadcrumb a:hover {
          color: #c8ff00;
        }
        .legal-title {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(32px, 5vw, 52px);
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }
        .legal-date {
          font-size: 14px;
          color: #666666;
          margin-bottom: 60px;
          border-bottom: 1px solid #E8E8E5;
          padding-bottom: 24px;
        }
        .legal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 900px) {
          .legal-grid {
            grid-template-columns: 300px 1fr;
            gap: 60px;
          }
        }
        /* Desktop TOC */
        .legal-toc-desktop {
          display: none;
        }
        @media (min-width: 900px) {
          .legal-toc-desktop {
            display: block;
            position: sticky;
            top: 100px;
            max-height: calc(100vh - 120px);
            overflow-y: auto;
            padding-right: 20px;
          }
        }
        .legal-toc-desktop h3 {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #171717;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .legal-toc-desktop ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .legal-toc-link {
          display: block;
          font-size: 14px;
          color: #666666;
          text-decoration: none;
          transition: all 0.2s ease;
          line-height: 1.4;
          padding-left: 12px;
          border-left: 2px solid transparent;
        }
        .legal-toc-link:hover {
          color: #171717;
          border-left-color: #E8E8E5;
        }
        .legal-toc-link.active {
          color: #171717;
          font-weight: 600;
          border-left-color: #c8ff00;
        }

        /* Mobile TOC */
        .legal-toc-mobile {
          display: block;
          background: #F3F3F0;
          border: 1px solid #E8E8E5;
          border-radius: 8px;
          margin-bottom: 40px;
          overflow: hidden;
        }
        @media (min-width: 900px) {
          .legal-toc-mobile {
            display: none;
          }
        }
        .legal-toc-mobile-header {
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
        }
        .legal-toc-mobile-content {
          border-top: 1px solid #E8E8E5;
          max-height: 300px;
          overflow-y: auto;
        }
        .legal-toc-mobile-content ul {
          list-style: none;
          padding: 12px 0;
          margin: 0;
        }
        .legal-toc-mobile-content a {
          display: block;
          padding: 10px 20px;
          color: #666666;
          text-decoration: none;
          font-size: 14px;
        }
        .legal-toc-mobile-content a.active {
          color: #171717;
          font-weight: 600;
          background: #FAFAF8;
          border-left: 3px solid #c8ff00;
        }

        /* Content Area */
        .legal-content {
          max-width: 780px;
          font-size: 16px;
          line-height: 1.8;
          color: #171717;
        }
        .legal-content section {
          margin-bottom: 60px;
          scroll-margin-top: 100px;
        }
        .legal-content h2 {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(22px, 3vw, 28px);
          font-weight: 700;
          margin-bottom: 24px;
          color: #171717;
          letter-spacing: -0.01em;
          padding-bottom: 12px;
          border-bottom: 1px solid #E8E8E5;
        }
        .legal-content h3 {
          font-size: 18px;
          font-weight: 600;
          margin-top: 32px;
          margin-bottom: 16px;
          color: #171717;
        }
        .legal-content p {
          margin-bottom: 20px;
          color: #444444;
        }
        .legal-content ul {
          margin-bottom: 24px;
          padding-left: 24px;
          color: #444444;
        }
        .legal-content li {
          margin-bottom: 8px;
        }
        .legal-content a {
          color: #171717;
          text-decoration: underline;
          text-decoration-color: #E8E8E5;
          text-underline-offset: 4px;
          transition: all 0.2s;
        }
        .legal-content a:hover {
          text-decoration-color: #c8ff00;
          background-color: rgba(200, 255, 0, 0.1);
        }
        .legal-content blockquote {
          background: #F3F3F0;
          padding: 24px;
          border-left: 4px solid #c8ff00;
          margin: 32px 0;
          font-style: italic;
          border-radius: 0 4px 4px 0;
        }
        .legal-content strong {
          color: #171717;
          font-weight: 600;
        }
        /* Part Headers for Shipping & Returns */
        .legal-content h2.part-header {
           font-family: 'Black Han Sans', sans-serif;
           font-size: 24px;
           text-transform: uppercase;
           letter-spacing: 0.05em;
           margin-top: 80px;
           margin-bottom: 30px;
           color: #171717;
           border: none;
           padding: 0;
        }
      `}} />

      <main className="legal-main">
        <div className="legal-breadcrumb">
          <Link href="/">Home</Link> / Legal / {breadcrumbCurrent}
        </div>
        <h1 className="legal-title">{title}</h1>
        <div className="legal-date">Last Updated: {lastUpdated}</div>

        <div className="legal-grid">
          {/* Mobile TOC */}
          <div className="legal-toc-mobile">
            <div className="legal-toc-mobile-header" onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}>
              <span>On this page</span>
              {isMobileTocOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            {isMobileTocOpen && (
              <div className="legal-toc-mobile-content">
                <ul>
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a 
                        href={`#${s.id}`}
                        className={activeId === s.id ? 'active' : ''}
                        onClick={(e) => handleScroll(e, s.id)}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Desktop TOC */}
          <aside className="legal-toc-desktop">
            <h3>Contents</h3>
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <a 
                    href={`#${s.id}`} 
                    className={`legal-toc-link ${activeId === s.id ? 'active' : ''}`}
                    onClick={(e) => handleScroll(e, s.id)}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <div className="legal-content">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
