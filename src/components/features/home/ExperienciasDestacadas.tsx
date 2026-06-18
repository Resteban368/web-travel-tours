'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import FallbackImage from '@/components/ui/FallbackImage';
import { RUTAS, TIPOS_TOUR } from '@/lib/constants';
import type { TourUI } from '@/lib/types/tour.types';

/* ── Badges ─────────────────────────────────────────────── */
function PromoBadge() {
  return (
    <div className="badge-promo w-[56px] h-[56px] flex items-center justify-center text-white text-center shrink-0">
      <span className="text-[10px] font-black uppercase tracking-tight leading-tight">¡PROMO!</span>
    </div>
  );
}

function Badge2x1() {
  return (
    <div className="w-[52px] h-[52px] rounded-xl bg-primary flex flex-col items-center justify-center text-white shadow-md shadow-primary/40 shrink-0">
      <span className="text-[14px] font-black leading-none tracking-tight">2X1</span>
      <span className="text-[8px] font-bold uppercase leading-none mt-0.5 opacity-85">pareja</span>
    </div>
  );
}

/* ── Icono WhatsApp SVG ──────────────────────────────────── */
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ── Tipos badge ─────────────────────────────────────────── */
const TIPO_COLORS: Record<string, string> = {
  pasadia:   '#FFCA00',
  terrestre: '#4671cd',
  aereo:     '#1B90D2',
};

/* ── Componente principal ────────────────────────────────── */
interface Props {
  tours: TourUI[];
  backgroundImage?: string;
}

export function ExperienciasDestacadas({
  tours,
  backgroundImage = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80',
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  }, []);

  if (tours.length === 0) return null;

  return (
    <section className="relative w-full py-16 overflow-hidden">

      {/* ── Fondo parallax ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Overlay */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary-900/75" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10">

        {/* ── Encabezado ── */}
        <div className="flex items-center justify-between mb-10 gap-4">
          <button
            onClick={() => scroll('left')}
            aria-label="Anterior"
            className="shrink-0 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-white/40 hover:scale-105"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>chevron_left</span>
          </button>

          <div className="text-center">
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.22em] block mb-1">
              Tours Disponibles
            </span>
            <h2 className="font-display text-white text-3xl md:text-4xl font-bold leading-tight">
              Experiencias Destacadas
            </h2>
          </div>

          <button
            onClick={() => scroll('right')}
            aria-label="Siguiente"
            className="shrink-0 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-white/40 hover:scale-105"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>chevron_right</span>
          </button>
        </div>

        {/* ── Carrusel ── */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tours.map((tour) => {
            const waText = encodeURIComponent(`Hola, quiero reservar el tour "${tour.nombreLimpio}". ¿Podría darme más información?`);
            const tipoColor = TIPO_COLORS[tour.tipo_tour] ?? '#1B90D2';

            const cardImg = tour.imagenes.length > 1 ? tour.imagenes[1] : null;

            return (
              <article
                key={tour.id}
                data-card
                className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col shrink-0"
                style={{
                  scrollSnapAlign: 'start',
                  width: 'calc(85vw - 40px)',
                  maxWidth: '320px',
                }}
              >
                {/* Imagen */}
                <div className="relative h-64 w-full overflow-hidden bg-white">
                  {cardImg ? (
                    <FallbackImage
                      src={cardImg}
                      alt={tour.nombreLimpio}
                      fill
                      sizes="(max-width: 640px) 85vw, 320px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <div className="relative w-32 h-32">
                        <FallbackImage
                          src="/logo-empresa.jpeg"
                          alt="Travel Tours"
                          fill
                          sizes="128px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                  {/* Gradiente y tipo — solo con imagen */}
                  {cardImg && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: tipoColor }}
                      >
                        {TIPOS_TOUR[tour.tipo_tour]}
                      </span>
                    </>
                  )}

                  {/* Promo / 2X1 — siempre visibles */}
                  {(tour.es_promocion || tour.precio_por_pareja) && (
                    <div className="absolute top-2 right-2 flex flex-col items-end gap-1.5">
                      {tour.es_promocion      && <PromoBadge />}
                      {tour.precio_por_pareja && <Badge2x1 />}
                    </div>
                  )}

                </div>

                {/* Nombre + precio */}
                <div className="px-4 py-4 flex-1 flex flex-col items-center gap-1.5">
                  <h3 className="text-center uppercase font-black text-on-surface text-base leading-snug tracking-wide">
                    {tour.nombreLimpio}
                  </h3>
                  <p className="text-center">
                    <span className="text-primary text-lg font-black leading-none block">
                      {tour.precioFormateado} COP
                    </span>
                    <span className="text-outline text-[10px]">
                      {tour.precio_por_pareja ? 'por pareja' : 'por persona'}
                    </span>
                  </p>
                </div>

                {/* Botones */}
                <div className="flex border-t border-outline-variant">
                  <Link
                    href={RUTAS.tour(tour.id)}
                    className="flex-1 py-3.5 flex items-center justify-center gap-1.5 bg-primary-900 hover:bg-primary text-white text-xs font-bold uppercase tracking-wide transition-colors duration-200 border-r border-white/10"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>format_list_bulleted</span>
                    Ver Plan
                  </Link>
                  <a
                    href={`https://wa.me/573142266528?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 flex items-center justify-center gap-1.5 bg-primary-900 hover:bg-[#25D366] text-white text-xs font-bold uppercase tracking-wide transition-colors duration-200"
                  >
                    <IconWhatsApp />
                    Reserva Ya
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Indicador de scroll ── */}
        <p className="text-center text-white/40 text-xs mt-3 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>swipe</span>
          Desliza para ver más
        </p>
      </div>
    </section>
  );
}
