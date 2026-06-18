'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { NcImage } from '@/lib/types/nextcloud.types';

interface BgSliderProps {
  images: NcImage[];
  overlay?: string;
}

export default function BgSlider({
  images,
  overlay = 'bg-gradient-to-r from-black/65 to-black/25',
}: BgSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, total]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0">
      {images.map((img, i) => (
        <div
          key={img.url}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={img.url}
            alt={img.name || 'Travel Tours'}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      <div className={`absolute inset-0 ${overlay}`} />

      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>chevron_left</span>
          </button>
          <button
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>chevron_right</span>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Imagen ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '22px' : '8px',
                  height: '8px',
                  backgroundColor: i === current ? '#FFCA00' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
