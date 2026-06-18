'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import FallbackImage from '@/components/ui/FallbackImage';
import { RUTAS, TIPOS_TOUR } from '@/lib/constants';
import type { TourUI } from '@/lib/types/tour.types';

const TIPO_BADGE: Record<string, string> = {
  pasadia:   'bg-secondary-container text-on-secondary-container',
  terrestre: 'bg-tertiary-container text-on-tertiary-container',
  aereo:     'bg-primary text-white',
};

interface Props { tours: TourUI[] }

function Badge2x1() {
  return (
    <div className="w-[58px] h-[58px] rounded-xl bg-primary flex flex-col items-center justify-center text-white shadow-lg shadow-primary/40 shrink-0">
      <span className="text-[16px] font-black leading-none tracking-tight">2X1</span>
      <span className="text-[8px] font-bold uppercase leading-none mt-0.5 opacity-85">pareja</span>
    </div>
  );
}

function PromoBadge() {
  return (
    <div className="badge-promo w-[62px] h-[62px] flex items-center justify-center text-white text-center shrink-0">
      <span className="text-[11px] font-black uppercase tracking-tight leading-tight">¡PROMO!</span>
    </div>
  );
}

/* Cada slot tiene su propia dirección de entrada y delay */
const SLOT_ANIM = [
  { anim: 'bento-left',  delay: '0s'     },  // grande izq
  { anim: 'bento-right', delay: '0.1s'   },  // lateral der
  { anim: 'bento-up',    delay: '0.2s'   },  // banner full
] as const;

export function ToursBentoSlider({ tours }: Props) {
  const total  = tours.length;
  const pages  = Math.ceil(total / 3);

  const [startIdx, setStartIdx] = useState(0);
  const [fading,   setFading]   = useState(false);
  const [animKey,  setAnimKey]  = useState(0);   // cambia → React remonta → CSS re-dispara

  const goTo = useCallback((nextStart: number) => {
    setFading(true);
    setTimeout(() => {
      setStartIdx(nextStart);
      setAnimKey((k) => k + 1);
      setFading(false);
    }, 320);
  }, []);

  const advance = useCallback(() => {
    goTo(((Math.floor(startIdx / 3) + 1) % pages) * 3);
  }, [goTo, startIdx, pages]);

  useEffect(() => {
    if (total <= 3) return;
    const id = setInterval(advance, 6000);
    return () => clearInterval(id);
  }, [advance, total]);

  const t = (offset: number) => tours[(startIdx + offset) % total];
  const currentPage = Math.floor(startIdx / 3) % pages;

  return (
    <div>
      {/* Grid con fade-out en transición */}
      <div
        className="overflow-hidden"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.32s ease' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* ── Slot 0 — Grande (8 cols) ── */}
          <Link
            key={`s0-${animKey}`}
            href={RUTAS.tour(t(0).id)}
            className="md:col-span-8 relative overflow-hidden rounded-xl h-[450px] group shadow-lg block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            style={{ animation: `${SLOT_ANIM[0].anim} 0.6s cubic-bezier(0.16,1,0.3,1) ${SLOT_ANIM[0].delay} both` }}
          >
            <FallbackImage src={t(0).imagenPrincipal} alt={t(0).nombreLimpio}
              fill sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 flex items-start gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${TIPO_BADGE[t(0).tipo_tour] ?? 'bg-primary text-white'}`}>
                {TIPOS_TOUR[t(0).tipo_tour]}
              </span>
              {t(0).es_promocion && (
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Promoción
                </span>
              )}
            </div>
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
              {t(0).es_promocion   && <PromoBadge />}
              {t(0).precio_por_pareja && <Badge2x1 />}
            </div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-white font-display text-3xl font-bold mb-2 line-clamp-2">{t(0).nombreLimpio}</h3>
              <div className="flex justify-between items-end flex-wrap gap-2">
                <p className="text-white/80 text-base">{t(0).punto_partida}</p>
                <div className="text-right">
                  <span className="text-secondary-container text-2xl font-bold block">{t(0).precioFormateado} COP</span>
                  <span className="text-white/60 text-xs">{t(0).precio_por_pareja ? 'por pareja' : 'por persona'}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* ── Slot 1 — Lateral (4 cols) ── */}
          <Link
            key={`s1-${animKey}`}
            href={RUTAS.tour(t(1).id)}
            className="md:col-span-4 relative overflow-hidden rounded-xl h-[450px] group shadow-lg block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            style={{ animation: `${SLOT_ANIM[1].anim} 0.6s cubic-bezier(0.16,1,0.3,1) ${SLOT_ANIM[1].delay} both` }}
          >
            <FallbackImage src={t(1).imagenPrincipal} alt={t(1).nombreLimpio}
              fill sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${TIPO_BADGE[t(1).tipo_tour] ?? 'bg-primary text-white'}`}>
                {TIPOS_TOUR[t(1).tipo_tour]}
              </span>
            </div>
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
              {t(1).es_promocion   && <PromoBadge />}
              {t(1).precio_por_pareja && <Badge2x1 />}
            </div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">{t(1).nombreLimpio}</h3>
              <p className="text-white/80 text-sm mb-3 line-clamp-1">{t(1).punto_partida}</p>
              <span className="text-secondary-container text-xl font-bold block">{t(1).precioFormateado} COP</span>
              <span className="text-white/60 text-xs">{t(1).precio_por_pareja ? 'por pareja' : 'por persona'}</span>
            </div>
          </Link>

          {/* ── Slot 2 — Banner completo (12 cols) ── */}
          <Link
            key={`s2-${animKey}`}
            href={RUTAS.tour(t(2).id)}
            className="md:col-span-12 relative overflow-hidden rounded-xl h-[400px] group shadow-lg block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            style={{ animation: `${SLOT_ANIM[2].anim} 0.6s cubic-bezier(0.16,1,0.3,1) ${SLOT_ANIM[2].delay} both` }}
          >
            <FallbackImage src={t(2).imagenPrincipal} alt={t(2).nombreLimpio}
              fill sizes="100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${TIPO_BADGE[t(2).tipo_tour] ?? 'bg-primary text-white'}`}>
                {TIPOS_TOUR[t(2).tipo_tour]}
              </span>
            </div>
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
              {t(2).es_promocion   && <PromoBadge />}
              {t(2).precio_por_pareja && <Badge2x1 />}
            </div>
            <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-white text-2xl font-bold mb-2 line-clamp-1">{t(2).nombreLimpio}</h3>
                <p className="text-white/80 text-base">{t(2).punto_partida}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-secondary-container text-2xl font-bold block">{t(2).precioFormateado} COP</span>
                <span className="text-white/60 text-xs">{t(2).precio_por_pareja ? 'por pareja' : 'por persona'}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Dots */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Grupo ${i + 1}`}
              onClick={() => goTo(i * 3)}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === currentPage ? '28px' : '9px',
                height: '9px',
                backgroundColor: i === currentPage ? '#1B90D2' : 'rgba(0,0,0,0.18)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
