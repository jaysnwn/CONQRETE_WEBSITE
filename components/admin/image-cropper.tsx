'use client';

import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  imageFile: File;
  aspectRatio: number;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
}

export default function ImageCropper({ imageFile, aspectRatio, onCropComplete, onCancel }: ImageCropperProps) {
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  React.useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    
    // Set an initial crop (90% of image width/height)
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, aspectRatio, width, height),
      width,
      height
    );
    setCrop(initialCrop);
  }

  async function getCroppedImg() {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    const image = imgRef.current;
    
    // Calculate scale by looking at actual vs rendered dimensions
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );

    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
      }
    }, 'image/jpeg', 0.95);
  }

  if (!imgSrc) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ backgroundColor: 'var(--admin-bg)', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Adjust Crop</h2>
        
        <div style={{ maxHeight: '60vh', overflow: 'auto', display: 'flex', justifyContent: 'center', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ maxHeight: '60vh', width: 'auto' }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button type="button" onClick={onCancel} className="admin-cancel-action">Cancel</button>
          <button type="button" onClick={getCroppedImg} className="admin-primary-action" disabled={!completedCrop?.width || !completedCrop?.height}>
            Confirm & Upload
          </button>
        </div>
      </div>
    </div>
  );
}
