"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CATEGORIES, FAQ_DATA, Category, FAQ } from './faq-data';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const PlusIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ 
      transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)'
    }}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const FaqItem = ({ faq }: { faq: FAQ }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button 
        className="faq-question-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="faq-question-text">{faq.question}</span>
        <span className="faq-icon-wrapper">
          <PlusIcon isOpen={isOpen} />
        </span>
      </button>
      <div 
        className="faq-answer-container" 
        data-open={isOpen}
      >
        <div className="faq-answer-inner">
          <div className="faq-answer-content">
            {faq.highlight && (
              <div className="faq-highlight">
                <div className="faq-highlight-title">Important</div>
                <div className="faq-highlight-text">{faq.highlight}</div>
              </div>
            )}
            
            {faq.answer.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            {faq.links && faq.links.length > 0 && (
              <div className="faq-links">
                {faq.links.map((link, idx) => (
                  <Link href={link.url} key={idx} className="faq-link">
                    {link.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  const filteredFaqs = useMemo(() => {
    let filtered = FAQ_DATA;
    
    if (activeCategory !== 'ALL') {
      filtered = filtered.filter(f => f.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.question.toLowerCase().includes(query) || 
        f.answer.some(p => p.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [searchQuery, activeCategory]);

  return (
    <div className="faq-page">
      <style>{`
        /* Core tokens & foundation */
        .faq-page {
          background-color: #FAFAF8;
          min-height: 100vh;
          color: #171717;
          font-family: var(--font-sans), 'Inter', sans-serif;
          padding-bottom: 80px;
        }
        
        /* Hero Section */
        .faq-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px 40px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .faq-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #666666;
          margin-bottom: 16px;
        }
        .faq-heading {
          font-family: 'Black Han Sans', 'Manrope', sans-serif;
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1.1;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        .faq-subheading {
          font-size: clamp(15px, 2vw, 18px);
          color: #666666;
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 48px;
        }
        
        /* Search Bar */
        .faq-search-wrapper {
          position: relative;
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
        }
        .faq-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #666666;
          pointer-events: none;
        }
        .faq-search-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid #E7E7E3;
          border-radius: 12px;
          padding: 20px 50px 20px 52px;
          font-size: 16px;
          color: #171717;
          outline: none;
          transition: all 250ms ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }
        .faq-search-input:focus {
          border-color: #171717;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }
        .faq-search-input::placeholder {
          color: #999999;
        }
        .faq-search-clear {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #999999;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 200ms ease;
        }
        .faq-search-clear:hover {
          color: #171717;
          background: #F3F3F0;
        }

        /* Categories */
        .faq-categories-wrapper {
          border-bottom: 1px solid #E7E7E3;
          background: #FAFAF8;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .faq-categories {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 0 24px;
        }
        .faq-categories::-webkit-scrollbar {
          display: none;
        }
        .faq-category-btn {
          background: none;
          border: none;
          padding: 20px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          transition: color 200ms ease;
        }
        .faq-category-btn:hover {
          color: #171717;
        }
        .faq-category-btn.active {
          color: #171717;
        }
        .faq-category-btn::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #C8FF00;
          transform: scaleX(0);
          transition: transform 250ms ease;
        }
        .faq-category-btn.active::after {
          transform: scaleX(1);
        }

        /* Content Area */
        .faq-content {
          max-width: 900px;
          margin: 60px auto;
          padding: 0 24px;
        }
        
        /* Accordion Item */
        .faq-item {
          border-bottom: 1px solid #E7E7E3;
        }
        .faq-item:first-child {
          border-top: 1px solid #E7E7E3;
        }
        .faq-question-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          padding: 28px 0;
          cursor: pointer;
          text-align: left;
          color: #171717;
          transition: opacity 200ms ease;
          min-height: 56px;
        }
        .faq-question-btn:hover {
          opacity: 0.7;
        }
        .faq-question-text {
          font-size: clamp(16px, 2vw, 18px);
          font-weight: 600;
          padding-right: 24px;
          line-height: 1.4;
        }
        .faq-icon-wrapper {
          color: #171717;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Accordion Animation using Grid Trick */
        .faq-answer-container {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 350ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-answer-container[data-open="true"] {
          grid-template-rows: 1fr;
        }
        .faq-answer-inner {
          overflow: hidden;
        }
        .faq-answer-content {
          padding-bottom: 32px;
          color: #444444;
          font-size: clamp(15px, 1.5vw, 16px);
          line-height: 1.7;
        }
        .faq-answer-content p {
          margin-bottom: 16px;
        }
        .faq-answer-content p:last-child {
          margin-bottom: 0;
        }

        /* Highlight Block */
        .faq-highlight {
          background-color: #F3F3F0;
          border: 1px solid #E7E7E3;
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }
        .faq-highlight::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: #C8FF00;
        }
        .faq-highlight-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #171717;
          margin-bottom: 8px;
        }
        .faq-highlight-text {
          color: #171717;
        }

        /* Links in answers */
        .faq-links {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-link {
          display: inline-flex;
          align-items: center;
          color: #171717;
          font-weight: 600;
          text-decoration: none;
          position: relative;
          width: fit-content;
        }
        .faq-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #C8FF00;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        .faq-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        /* Empty States */
        .faq-empty {
          text-align: center;
          padding: 80px 24px;
        }
        .faq-empty h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .faq-empty p {
          color: #666666;
          margin-bottom: 24px;
        }
        .faq-empty-btn {
          background: #171717;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 200ms ease;
        }
        .faq-empty-btn:hover {
          opacity: 0.8;
        }

        /* Support CTA */
        .faq-support {
          max-width: 600px;
          margin: 80px auto 40px auto;
          text-align: center;
          padding: 60px 24px;
          background: #F3F3F0;
          border-radius: 16px;
        }
        .faq-support h2 {
          font-family: 'Black Han Sans', 'Manrope', sans-serif;
          font-size: 28px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .faq-support p {
          color: #666666;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .faq-support-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: #171717;
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 6px;
          font-weight: 600;
          text-decoration: none;
          transition: background 200ms ease;
        }
        .btn-primary:hover {
          background: #333333;
        }
        .btn-secondary {
          background: #ffffff;
          color: #171717;
          border: 1px solid #E7E7E3;
          padding: 14px 28px;
          border-radius: 6px;
          font-weight: 600;
          text-decoration: none;
          transition: all 200ms ease;
        }
        .btn-secondary:hover {
          border-color: #171717;
          background: #FAFAF8;
        }
        
        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .faq-answer-container,
          .faq-category-btn::after,
          .faq-link::after,
          .faq-search-input {
            transition: none !important;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-eyebrow">FAQ</div>
        <h1 className="faq-heading">Everything you need to know.</h1>
        <p className="faq-subheading">
          Clear answers about CONQRETE products, orders, shipping, returns, warranty and support.
        </p>
        
        <div className="faq-search-wrapper">
          <div className="faq-search-icon">
            <SearchIcon />
          </div>
          <input 
            type="text" 
            className="faq-search-input"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search FAQs"
          />
          {searchQuery && (
            <button 
              className="faq-search-clear" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </section>

      {/* Categories */}
      <div className="faq-categories-wrapper">
        <div className="faq-categories" role="tablist">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`faq-category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="faq-content">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(faq => (
            <FaqItem key={faq.id} faq={faq} />
          ))
        ) : (
          <div className="faq-empty">
            <h3>No results found</h3>
            <p>
              {searchQuery 
                ? `We couldn't find any answers matching "${searchQuery}".` 
                : "No questions in this category yet."}
            </p>
            {searchQuery && (
              <button 
                className="faq-empty-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </section>

      {/* Support CTA */}
      <section className="faq-support">
        <h2>Still need help?</h2>
        <p>Our support team is available Monday–Friday, <br/>10:00 AM–5:00 PM.</p>
        <div className="faq-support-actions">
          <a href="https://wa.me/919022281117" className="btn-primary" target="_blank" rel="noopener noreferrer">
            WhatsApp Us
          </a>
          <Link href="/contact" className="btn-secondary">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
