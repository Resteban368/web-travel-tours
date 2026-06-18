'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { NcImage } from '@/lib/types/nextcloud.types';

interface HeroBgSliderProps {
  images: NcImage[];
  fallbackSrc: string;
}

export default function HeroBgSlider({ images, fallbackSrc }: HeroBgSliderProps) {
  const slides = images.length > 0 ? images : [{ url: fallbackSrc, name: 'Hero' }];
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, slides.length]);

  return (
    <div className="absolute inset-0 z-0">
      {slides.map((slide, i) => (
        <div
          key={slide.url}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.url}
            alt={slide.name}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Overlay para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/65 to-white/35" />

      {/* Controles — solo si hay más de una imagen */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>
              chevron_left
            </span>
          </button>
          <button
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>
              chevron_right
            </span>
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Imagen ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '26px' : '9px',
                  height: '9px',
                  backgroundColor: i === current ? '#1B90D2' : 'rgba(255,255,255,0.7)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
