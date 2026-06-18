'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { NcImage } from '@/lib/types/nextcloud.types';

interface HomeSliderProps {
  images: NcImage[];
}

export default function HomeSlider({ images }: HomeSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, images.length, paused]);

  if (images.length === 0) return null;

  return (
    <section
      className="relative w-full h-[420px] md:h-[580px] overflow-hidden bg-surface-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {images.map((img, i) => (
        <div
          key={img.url}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={img.url}
            alt={img.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none" />

      {/* Flechas */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>
              chevron_left
            </span>
          </button>
          <button
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>
              chevron_right
            </span>
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir a imagen ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '28px' : '10px',
                  height: '10px',
                  backgroundColor: i === current ? '#1B90D2' : 'rgba(255,255,255,0.6)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
