'use client';

import { cn } from '@/lib/utils/cn';
import type { TipoTour } from '@/lib/types/tour.types';
import { DateRangePicker } from '@/components/ui/DateRangePicker';

type FiltroTour = TipoTour | 'todos';

interface TourFilterProps {
  filtroActivo: FiltroTour;
  onFiltroChange: (filtro: FiltroTour) => void;
  conteos: Record<FiltroTour, number>;
  busqueda: string;
  onBusquedaChange: (valor: string) => void;
  fechaDesde: string;
  onFechaDesdeChange: (valor: string) => void;
  fechaHasta: string;
  onFechaHastaChange: (valor: string) => void;
  onLimpiar: () => void;
  hayFiltrosActivos: boolean;
}

const CATEGORIAS: { valor: FiltroTour; label: string; desc: string; icon: string; accent: 'primary' | 'secondary' }[] = [
  { valor: 'todos',      label: 'Todos',      desc: 'Ver listado completo', icon: 'grid_view',      accent: 'primary'   },
  { valor: 'pasadia',    label: 'Pasadía',    desc: 'Ida y vuelta en el día', icon: 'wb_sunny',    accent: 'secondary' },
  { valor: 'terrestre',  label: 'Terrestre',  desc: 'Aventura por carretera', icon: 'directions_bus', accent: 'primary' },
  { valor: 'aereo',      label: 'Aéreo',      desc: 'Destinos en avión',    icon: 'flight_takeoff', accent: 'secondary' },
];

export function TourFilter({
  filtroActivo,
  onFiltroChange,
  conteos,
  busqueda,
  onBusquedaChange,
  fechaDesde,
  onFechaDesdeChange,
  fechaHasta,
  onFechaHastaChange,
  onLimpiar,
  hayFiltrosActivos,
}: TourFilterProps) {
  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="bg-surface-container-lowest rounded-xl shadow-lg p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 border border-outline-variant">
        <div className="flex-1 flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-lg border border-transparent focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-outline" style={{ fontSize: '20px' }}>
            search
          </span>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            placeholder="Buscar tour por nombre o destino..."
            className="bg-transparent border-none focus:ring-0 w-full text-sm text-on-surface placeholder:text-outline outline-none"
            aria-label="Buscar tours"
          />
        </div>

        <div className="md:border-l border-outline-variant md:pl-4">
          <DateRangePicker
            desde={fechaDesde}
            hasta={fechaHasta}
            onDesdeChange={onFechaDesdeChange}
            onHastaChange={onFechaHastaChange}
          />
        </div>

        <div className="flex items-center gap-2">
          {hayFiltrosActivos && (
            <button
              onClick={onLimpiar}
              className="px-4 py-3 rounded-lg text-xs font-medium text-outline border border-outline-variant hover:border-red-300 hover:text-red-500 transition-colors whitespace-nowrap"
            >
              Limpiar
            </button>
          )}
          <button
            onClick={() => {}}
            className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-lg font-bold hover:brightness-95 transition-all whitespace-nowrap"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Category cards */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        role="group"
        aria-label="Filtrar por tipo"
      >
        {CATEGORIAS.map(({ valor, label, desc, icon, accent }) => {
          const activo = filtroActivo === valor;
          const isPrimary = accent === 'primary';
          const accentColor  = isPrimary ? '#1B90D2' : '#a88500';
          const accentBg     = isPrimary ? 'rgba(27,144,210,0.12)' : 'rgba(255,202,0,0.15)';
          const accentCircle = isPrimary ? '#1B90D2' : '#FFCA00';

          return (
            <button
              key={valor}
              onClick={() => onFiltroChange(valor)}
              aria-pressed={activo}
              className={cn(
                'group relative p-6 rounded-2xl flex flex-col items-center gap-3 transition-all duration-200 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:-translate-y-1',
                activo
                  ? 'bg-primary shadow-lg shadow-primary/20'
                  : 'bg-surface-container-lowest border border-outline-variant shadow-sm hover:shadow-md hover:border-primary/30',
              )}
            >
              {/* Círculo decorativo */}
              <div
                className="absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-[0.08] transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: activo ? '#ffffff' : accentCircle }}
              />

              {/* Count badge */}
              <span
                className={cn(
                  'absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full',
                  activo
                    ? 'bg-white/20 text-white'
                    : 'bg-surface-container text-on-surface-variant',
                )}
              >
                {conteos[valor] ?? 0}
              </span>

              {/* Ícono */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: activo ? 'rgba(255,255,255,0.2)' : accentBg }}
              >
                <span
                  className={cn('material-symbols-outlined', activo && 'icon-filled')}
                  style={{ fontSize: 24, color: activo ? '#ffffff' : accentColor }}
                >
                  {icon}
                </span>
              </div>

              {/* Texto */}
              <div className="text-center">
                <span className={cn('block font-bold text-sm', activo ? 'text-white' : 'text-on-surface')}>
                  {label}
                </span>
                <span className={cn('block text-[11px] mt-0.5', activo ? 'text-white/70' : 'text-on-surface-variant')}>
                  {desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
