"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageCarouselProps {
  images: string[];
  slug: string;
  title: string;
}

export default function ImageCarousel({ images, slug, title }: ImageCarouselProps) {
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  if (!images || images.length === 0) {
    return (
      <Link href={`/products/${slug}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', backgroundColor: '#f3f4f6' }}>
        🛍️
      </Link>
    );
  }

  let activeIndex = 0;
  if (manualIndex !== null) {
    activeIndex = manualIndex;
  } else if (isHovered && images.length > 1) {
    activeIndex = 1;
  }

  const handleNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setManualIndex((prev) => {
      const current = prev !== null ? prev : (isHovered && images.length > 1 ? 1 : 0);
      return (current + 1) % images.length;
    });
  };

  const handlePrev = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setManualIndex((prev) => {
      const current = prev !== null ? prev : (isHovered && images.length > 1 ? 1 : 0);
      return (current - 1 + images.length) % images.length;
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setManualIndex(null);
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative', 
        backgroundColor: '#f3f4f6', 
        display: 'block',
        overflow: 'hidden'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/products/${slug}`} style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
        {images.map((img, idx) => (
          <div key={idx} style={{
            position: 'absolute',
            inset: 0,
            opacity: activeIndex === idx ? 1 : 0,
            transition: 'opacity 0.4s ease',
            zIndex: activeIndex === idx ? 1 : 0
          }}>
            <Image
              src={img}
              alt={`${title} - Image ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </Link>
      
      {images.length > 1 && isHovered && (
        <>
          <button 
            onClick={handlePrev}
            onTouchEnd={handlePrev}
            style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button 
            onClick={handleNext}
            onTouchEnd={handleNext}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '4px',
            zIndex: 10
          }}>
            {images.map((_, idx) => (
              <div 
                key={idx}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: activeIndex === idx ? '#111827' : 'rgba(17, 24, 39, 0.3)'
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
