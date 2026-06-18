import { formatearPrecioCOP } from '@/lib/utils/formatters';
import type { TourPrecioEspecial } from '@/lib/types/tour.types';

interface TourPricesProps {
  precios: TourPrecioEspecial[];
  precioBase: string;
  precioPareja: boolean;
}

export function TourPrices({ precios, precioBase, precioPareja }: TourPricesProps) {
  const preciosActivos = precios.filter((p) => p.activo);

  return (
    <section aria-labelledby="precios-titulo">
      <h2 id="precios-titulo" className="font-display text-2xl font-bold text-neutral-900 mb-6">
        Precios
      </h2>

      <div className="rounded-2xl border border-neutral-100 overflow-hidden">
        {/* Precio base */}
        <div className="flex items-center justify-between bg-primary/5 px-6 py-4">
          <span className="font-semibold text-neutral-800">
            Precio {precioPareja ? 'por pareja' : 'por persona'}
          </span>
          <span className="text-2xl font-bold text-primary">
            {formatearPrecioCOP(precioBase)}
          </span>
        </div>

        {/* Precios especiales por edad */}
        {preciosActivos.length > 0 && (
          <div className="divide-y divide-neutral-50">
            {preciosActivos.map((precio) => (
              <div key={precio.id} className="flex items-center justify-between px-6 py-3">
                <div>
                  <span className="text-sm font-medium text-neutral-700">{precio.descripcion}</span>
                  <span className="ml-2 text-xs text-neutral-400">
                    ({precio.edad_min}–{precio.edad_max} años)
                  </span>
                </div>
                <span className="font-semibold text-neutral-800">
                  {formatearPrecioCOP(precio.precio)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
