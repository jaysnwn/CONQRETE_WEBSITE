"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  "/hero_new_1.png",
  "/hero_new_2.png",
  "/hero_img_01.png",
  "/hero_img_02.png",
  "/hero_img_03.png"
];

const carouselStyles = `
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    color: #000;
  }
  .arrow-left { left: 20px; }
  .arrow-right { right: 20px; }
  .carousel-dots {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 20;
  }
  .carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
  }
  .carousel-dot.active {
    background: #ffffff;
    width: 24px;
    border-radius: 4px;
  }
  .hero-cta {
    position: absolute;
    bottom: 64px;
    left: 48px;
    z-index: 20;
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .hero-cta-btn {
    background: #ffffff;
    color: #111827;
    border: none;
    padding: 14px 32px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: background 0.2s ease, transform 0.2s ease;
    letter-spacing: 0.02em;
  }
  .hero-cta-btn:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
  }
  .hero-cta-btn.secondary {
    background: transparent;
    color: #ffffff;
    border: 2px solid rgba(255,255,255,0.7);
  }
  .hero-cta-btn.secondary:hover {
    background: rgba(255,255,255,0.1);
  }
  @media (max-width: 768px) {
    .hero-cta {
      position: static;
      margin-top: 24px;
      justify-content: center;
      width: 100%;
    }
    .hero-cta-btn {
      flex: 1;
      text-align: center;
      padding: 14px 20px;
    }
    .hero-cta-btn.secondary {
      color: #111827;
      border-color: #e5e7eb;
    }
    .carousel-arrow {
      width: 32px;
      height: 32px;
    }
    .carousel-arrow svg {
      width: 16px;
      height: 16px;
    }
    .arrow-left { left: 12px; }
    .arrow-right { right: 12px; }
    .carousel-dots { bottom: 12px; }
  }
`;

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // AUTOPLAY SLIDER CLOCK
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-carousel-container" style={{ position: 'relative', zIndex: 10, padding: '24px', boxSizing: 'border-box', backgroundColor: 'var(--bg)' }}>
      <style dangerouslySetInnerHTML={{ __html: carouselStyles }} />
      <div 
        className="carousel-inner-wrapper" 
        style={{ 
          position: 'relative', 
          borderRadius: '24px', 
          overflow: 'hidden',
          width: '100%',
          maxWidth: '1920px',
          margin: '0 auto',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          transform: 'translateZ(0)',
          isolation: 'isolate'
        }}
      >
        {/* Navigation Arrows */}
        <button 
          className="carousel-arrow arrow-left" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button 
          className="carousel-arrow arrow-right" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Sliding Visual Track */}
        <div 
          className="carousel-track" 
          style={{ 
            display: 'flex', 
            transition: 'transform 0.5s ease-in-out', 
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
          role="region"
          aria-label="Hero Image Carousel"
        >
          {slides.map((url, index) => (
            <div className="carousel-slide" key={index} style={{ flex: '0 0 100%', width: '100%', position: 'relative' }}>
              <Image 
                src={url} 
                alt={`Conqrete Campaign ${index + 1}`} 
                className="carousel-img" 
                width={1920}
                height={1080}
                priority={index === 0}
                style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block', borderRadius: '24px' }}
              />
            </div>
          ))}
        </div>


        {/* Floating Minimal Dots */}
        <div className="carousel-dots" role="tablist">
          {slides.map((_, index) => (
            <button 
              key={index}
              className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={currentSlide === index}
              role="tab"
            />
          ))}
        </div>
      </div>

      {/* Hero CTA Buttons */}
      <div className="hero-cta">
        <a href="/products" className="hero-cta-btn">Shop Now</a>
        <a href="/products" className="hero-cta-btn secondary">View All Products</a>
      </div>


    </section>
  );
}
