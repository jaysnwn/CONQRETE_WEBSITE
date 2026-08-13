"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageCarouselProps {
  images: string[];
  slug: string;
  title: string;
}

export default function ImageCarousel({ images, slug, title }: ImageCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 5);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [images]);

  const scroll = (direction: 'left' | 'right', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };

  if (!images || images.length === 0) {
    return (
      <Link href={`/products/${slug}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', backgroundColor: '#f3f4f6' }}>
        📦
      </Link>
    );
  }

  if (images.length === 1) {
    return (
      <Link href={`/products/${slug}`} style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#f3f4f6', display: 'block' }}>
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </Link>
    );
  }

  return (
    <div 
      className="carousel-wrapper" 
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onMouseEnter={checkScroll}
    >
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          width: '100%',
          height: '100%'
        }} 
        className="card-carousel"
      >
        {images.map((img, idx) => (
          <Link key={idx} href={`/products/${slug}`} style={{ flexShrink: 0, width: '100%', height: '100%', position: 'relative', scrollSnapAlign: 'start', backgroundColor: '#f3f4f6', display: 'block' }}>
            <Image
              src={img}
              alt={`${title} - ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </Link>
        ))}
      </div>

      {showLeft && (
        <button
          onClick={(e) => scroll('left', e)}
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            fontSize: '14px',
            color: '#374151',
          }}
          aria-label="Previous image"
        >
          ←
        </button>
      )}

      {showRight && (
        <button
          onClick={(e) => scroll('right', e)}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            fontSize: '14px',
            color: '#374151',
          }}
          aria-label="Next image"
        >
          →
        </button>
      )}

      <style>{`
        .card-carousel::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
