'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import type { NcImage } from '@/lib/types/nextcloud.types';

interface GaleriaGridProps {
  images: NcImage[];
}

export function GaleriaGrid({ images }: GaleriaGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Set<number>>(new Set());

  const markLoaded = useCallback((i: number) => {
    setLoaded((prev) => new Set([...prev, i]));
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-on-surface-variant">
        <span className="material-symbols-outlined" style={{ fontSize: '4rem' }}>photo_library</span>
        <p className="text-lg font-medium">Próximamente compartiremos nuestras aventuras aquí.</p>
      </div>
    );
  }

  return (
    <>
      {/* Contador */}
      <p className="text-sm text-on-surface-variant mb-8 text-center tracking-wide uppercase font-medium">
        {images.length} {images.length === 1 ? 'fotografía' : 'fotografías'}
      </p>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {images.map((img, i) => {
          const delay = Math.min(i * 60, 600);
          return (
            <div
              key={img.url}
              className="gallery-item break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl cursor-pointer"
              style={{ animationDelay: `${delay}ms` }}
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={`Ver imagen ${i + 1}: ${img.name}`}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
            >
              {/* Skeleton shimmer */}
              <div
                className={cn(
                  'absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-500',
                  loaded.has(i) ? 'opacity-0 pointer-events-none' : 'opacity-100',
                )}
              >
                <div className="w-full h-52 bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container animate-shimmer bg-[length:200%_100%]" />
              </div>

              {/* Image */}
              <Image
                src={img.url}
                alt={img.name}
                width={800}
                height={600}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={cn(
                  'w-full h-auto object-cover transition-all duration-700 rounded-2xl',
                  'group-hover:scale-[1.04] group-hover:brightness-90',
                  loaded.has(i) ? 'opacity-100' : 'opacity-0',
                )}
                onLoad={() => markLoaded(i)}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-350 rounded-2xl flex items-end p-5">
                <div className="flex items-center gap-2 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>zoom_in</span>
                  </div>
                  <span className="text-sm font-medium">Ver imagen</span>
                </div>

                {/* Badge número */}
                <span className="ml-auto text-white/60 text-xs font-mono">
                  {i + 1}/{images.length}
                </span>
              </div>

              {/* Borde accent en hover */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-primary/40 transition-all duration-300 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 py-4 bg-gradient-to-b from-black/60 to-transparent z-10">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-white/60" style={{ fontSize: '1.3rem' }}>photo_library</span>
              <span className="text-white/70 text-sm font-medium tracking-wide">
                {lightboxIndex + 1} <span className="text-white/30">/</span> {images.length}
              </span>
            </div>
            <button
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.3rem' }}>close</span>
            </button>
          </div>

          {/* Image container */}
          <div
            className="relative max-w-[88vw] max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].name}
              width={1400}
              height={1000}
              sizes="90vw"
              className="max-h-[80vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
              priority
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm z-10"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                aria-label="Imagen anterior"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.6rem' }}>chevron_left</span>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm z-10"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                aria-label="Imagen siguiente"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.6rem' }}>chevron_right</span>
              </button>
            </>
          )}

          {/* Bottom thumbnail strip */}
          <div
            className="absolute bottom-0 inset-x-0 pb-4 pt-6 bg-gradient-to-t from-black/70 to-transparent flex justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 overflow-x-auto max-w-[90vw] px-4 pb-1 scrollbar-none">
              {images.map((thumb, i) => (
                <button
                  key={thumb.url}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                  className={cn(
                    'flex-shrink-0 w-12 h-9 rounded-md overflow-hidden transition-all duration-200',
                    i === lightboxIndex
                      ? 'ring-2 ring-primary scale-110 opacity-100'
                      : 'opacity-50 hover:opacity-80',
                  )}
                >
                  <Image
                    src={thumb.url}
                    alt={`Miniatura ${i + 1}`}
                    width={96}
                    height={72}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
