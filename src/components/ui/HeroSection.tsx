'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NcImage } from '@/lib/types/nextcloud.types';

interface HeroSectionProps {
  images: NcImage[];
  fallbackSrc: string;
  ciudad: string;
  nombre: string;
  toursHref: string;
  cotizacionesHref: string;
}

export default function HeroSection({
  images,
  fallbackSrc,
  ciudad,
  nombre,
  toursHref,
  cotizacionesHref,
}: HeroSectionProps) {
  const slides = images.length > 0 ? images : [{ url: fallbackSrc, name: 'Hero' }];
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, slides.length]);

  const isFirst = current === 0;

  return (
    <section className="relative min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.url}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.url}
            alt={slide.name || 'Travel Tours'}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Overlay blanco solo en la primera imagen para que el texto sea legible */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/40 transition-opacity duration-700 pointer-events-none"
        style={{ opacity: isFirst ? 1 : 0 }}
      />

      {/* Contenido — visible solo en la primera imagen */}
      <div
        className="relative z-10 text-center max-w-4xl px-5 mx-auto transition-all duration-700"
        style={{
          opacity: isFirst ? 1 : 0,
          transform: isFirst ? 'translateY(0)' : 'translateY(-16px)',
          pointerEvents: isFirst ? 'auto' : 'none',
        }}
      >
        <span className="anim-fade-up anim-delay-1 text-primary text-sm tracking-[0.2em] mb-4 block uppercase font-bold">
          {ciudad}
        </span>
        <h1 className="anim-fade-up anim-delay-2 font-display text-[32px] md:text-[48px] font-bold text-on-surface mb-6 leading-[1.2] tracking-tight">
          Descubre Colombia con{' '}
          <span className="text-primary">{nombre}</span>
        </h1>
        <p className="anim-fade-up anim-delay-3 text-lg text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
          Experiencias únicas desde el corazón de Colombia. Tours pasadías, terrestres y
          aéreos desde el corazón del Caquetá.
        </p>
        <div className="anim-fade-up anim-delay-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={toursHref}
            className="bg-primary text-on-primary px-8 py-4 rounded-lg font-semibold text-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            Ver todos los tours
          </Link>
          <Link
            href={cotizacionesHref}
            className="border-2 border-primary text-primary bg-white/50 backdrop-blur-sm px-8 py-4 rounded-lg font-semibold text-xl hover:bg-primary/5 transition-all duration-300 active:scale-95"
          >
            Cotizar ahora
          </Link>
        </div>
      </div>

      {/* Controles */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 hover:bg-black/55 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>
              chevron_left
            </span>
          </button>
          <button
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 hover:bg-black/55 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>
              chevron_right
            </span>
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Imagen ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '26px' : '9px',
                  height: '9px',
                  backgroundColor: i === current ? '#1B90D2' : 'rgba(255,255,255,0.65)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
