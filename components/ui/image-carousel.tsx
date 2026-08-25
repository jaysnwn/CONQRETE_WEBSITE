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
  const [isHovered, setIsHovered] = useState(false);

  if (!images || images.length === 0) {
    return (
      <Link href={`/products/${slug}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', backgroundColor: '#f3f4f6' }}>
        ??
      </Link>
    );
  }

  const primaryImage = images[0];
  const secondaryImage = images.length > 1 ? images[1] : null;

  return (
    <Link 
      href={`/products/${slug}`} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative', 
        backgroundColor: '#f3f4f6', 
        display: 'block',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: (isHovered && secondaryImage) ? 0 : 1,
        transition: 'opacity 0.4s ease'
      }}>
        <Image
          src={primaryImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      {secondaryImage && (
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease'
        }}>
          <Image
            src={secondaryImage}
            alt={`${title} - Alternate`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
    </Link>
  );
}

