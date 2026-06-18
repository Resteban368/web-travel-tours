'use client';

import { useState, useCallback } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { cn } from '@/lib/utils/cn';
import { IMAGEN_FALLBACK } from '@/lib/constants';

interface TourImageSliderProps {
  imagenes: string[];
  nombreTour: string;
}

export function TourImageSlider({ imagenes, nombreTour }: TourImageSliderProps) {
  const imgs = imagenes.length > 1 ? imagenes.slice(1) : [];
  const showLogo = imgs.length === 0;
  const total = imgs.length;
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  const slides = imgs.map((src) => ({ src }));

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-white h-full">

        {showLogo ? (
          /* Solo 1 imagen — mostramos logo centrado */
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="relative w-48 h-48">
              <FallbackImage
                src="/logo-empresa.jpeg"
                alt="Travel Tours"
                fill
                sizes="192px"
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          /* Track deslizante */
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {imgs.map((img, i) => (
              <div
                key={i}
                className="relative min-w-full h-full cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <FallbackImage
                  src={img}
                  alt={`${nombreTour} — imagen ${i + 1} de ${total}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Hint de zoom y controles — solo con imágenes reales */}
        {!showLogo && (
        <div className="absolute bottom-14 right-3 pointer-events-none">
          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>zoom_in</span>
            Toca para ampliar
          </span>
        </div>
        )}

        {/* Botones prev / next — solo si hay más de 1 imagen */}
        {!showLogo && total > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 text-primary" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 text-primary" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Contador */}
            <span className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white font-medium">
              {current + 1} / {total}
            </span>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  aria-label={`Ir a imagen ${i + 1}`}
                  className={cn(
                    'size-2 rounded-full transition-all duration-300',
                    i === current ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/80',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={current}
        on={{ view: ({ index }) => setCurrent(index) }}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(0,0,0,0.92)' } }}
      />
    </>
  );
}
