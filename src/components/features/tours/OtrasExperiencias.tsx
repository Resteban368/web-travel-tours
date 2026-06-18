import Link from 'next/link';
import { RUTAS, TIPOS_TOUR } from '@/lib/constants';
import type { TourUI } from '@/lib/types/tour.types';
import FallbackImage from '@/components/ui/FallbackImage';

interface OtrasExperienciasProps {
  tours: TourUI[];
  currentId: number;
}

export function OtrasExperiencias({ tours, currentId }: OtrasExperienciasProps) {
  const otros = tours.filter((t) => t.id !== currentId).slice(0, 3);
  if (otros.length === 0) return null;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
      {/* Encabezado */}
      <div className="px-5 py-4 border-b border-outline-variant flex items-center gap-2">
        <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>
          explore
        </span>
        <h3 className="font-display font-bold text-on-surface text-base">Otras experiencias</h3>
      </div>

      <ul className="divide-y divide-outline-variant">
        {otros.map((tour) => (
          <li key={tour.id}>
            <Link
              href={RUTAS.tour(tour.id)}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary/5 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="relative w-[64px] h-[64px] shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                {tour.imagenes.length > 1 ? (
                  <FallbackImage
                    src={tour.imagenes[1]}
                    alt={tour.nombreLimpio}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="relative w-10 h-10">
                    <FallbackImage
                      src="/logo-empresa.jpeg"
                      alt="Travel Tours"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="text-on-surface font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {tour.nombreLimpio}
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {TIPOS_TOUR[tour.tipo_tour]}
                </span>
              </div>

              <span
                className="material-symbols-outlined text-outline group-hover:text-primary transition-colors shrink-0"
                style={{ fontSize: 18 }}
              >
                chevron_right
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
