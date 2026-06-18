import Link from 'next/link';
import { RUTAS, TIPOS_TOUR } from '@/lib/constants';
import type { TourUI } from '@/lib/types/tour.types';
import FallbackImage from '@/components/ui/FallbackImage';

function formatBadgeDate(fecha: string): string {
  const date = new Date(fecha);
  const day = date.getUTCDate();
  const month = date.toLocaleDateString('es', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
}

const TIPO_BADGE: Record<string, string> = {
  pasadia: 'bg-secondary-container text-on-secondary-container',
  terrestre: 'bg-tertiary-container text-on-tertiary-container',
  aereo: 'bg-primary text-white',
};

interface TourCardProps {
  tour: TourUI;
}

export function TourCard({ tour }: TourCardProps) {
  const dateBadge = [
    formatBadgeDate(tour.fecha_inicio),
    tour.duracionDias > 1 ? `• ${tour.duracionDias} Días` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const cardImg = tour.imagenes.length > 1 ? tour.imagenes[1] : null;

  return (
    <Link
      href={RUTAS.tour(tour.id)}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
    >
      <article className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant flex flex-col transition-all duration-300 group-hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-white">
          {cardImg ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <FallbackImage
                src={cardImg}
                alt={`Tour ${tour.nombreLimpio} - Travel Tours Florencia`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <div className="relative w-36 h-36">
                <FallbackImage
                  src="/LOGO.png"
                  alt="Travel Tours"
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Badges de fecha y tipo — solo con imagen */}
          {cardImg && (
            <>
              <div className="absolute top-4 left-4 z-20 bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
                {dateBadge}
              </div>
              <div className={`absolute top-4 right-4 z-20 text-[10px] font-bold px-3 py-1 rounded-full uppercase ${TIPO_BADGE[tour.tipo_tour] ?? 'bg-primary text-white'}`}>
                {TIPOS_TOUR[tour.tipo_tour]}
              </div>
            </>
          )}

          {/* Promo / 2x1 / últimos cupos — siempre visibles */}
          {(tour.es_promocion || tour.ultimosCupos || tour.precio_por_pareja) && (
            <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5">
              {tour.es_promocion && (
                <div className="badge-promo w-[72px] h-[72px] flex items-center justify-center text-white text-center">
                  <span className="text-[12px] font-black uppercase tracking-tight">¡PROMO!</span>
                </div>
              )}
              {tour.precio_por_pareja && (
                <div className="w-[64px] h-[64px] rounded-xl bg-primary flex flex-col items-center justify-center text-white shadow-md shadow-primary/40">
                  <span className="text-[18px] font-black leading-none tracking-tight">2X1</span>
                  <span className="text-[9px] font-bold uppercase leading-none mt-0.5 opacity-85">pareja</span>
                </div>
              )}
              {tour.ultimosCupos && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ¡Últimos cupos!
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-on-surface mb-3 line-clamp-2 leading-snug">
            {tour.nombreLimpio}
          </h3>

          <div className="mb-3">
            <span className="text-primary text-xl font-black leading-none block">
              {tour.precioFormateado} COP
            </span>
            <span className="text-outline text-xs">
              {tour.precio_por_pareja ? 'por pareja' : 'por persona'}
            </span>
          </div>

          {tour.punto_partida && (
            <div className="flex items-start gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                location_on
              </span>
              <p className="text-xs text-outline leading-relaxed">
                Salida: {tour.punto_partida}
              </p>
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-outline-variant">
            <div className="w-full bg-primary-container text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 group-hover:bg-primary transition-colors duration-300">
              Ver tour
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
