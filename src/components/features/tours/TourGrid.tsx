'use client';

import { useState, useMemo, useEffect } from 'react';
import { TourCard } from './TourCard';
import { TourFilter } from './TourFilter';
import { TourGridSkeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils/cn';
import type { TipoTour, TourUI } from '@/lib/types/tour.types';

type FiltroTour = TipoTour | 'todos';

interface TourGridProps {
  tours: TourUI[];
  conFiltros?: boolean;
}

const ITEMS_PER_PAGE = 9;

export function TourGrid({ tours, conFiltros = true }: TourGridProps) {
  const [filtro, setFiltro] = useState<FiltroTour>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const hayFiltrosActivos =
    filtro !== 'todos' || busqueda.trim() !== '' || fechaDesde !== '' || fechaHasta !== '';

  const limpiarFiltros = () => {
    setFiltro('todos');
    setBusqueda('');
    setFechaDesde('');
    setFechaHasta('');
  };

  const toursFiltrados = useMemo(() => {
    return tours.filter((tour) => {
      if (filtro !== 'todos' && tour.tipo_tour !== filtro) return false;

      if (busqueda.trim()) {
        const termino = busqueda.toLowerCase();
        const coincide =
          tour.nombreLimpio.toLowerCase().includes(termino) ||
          tour.punto_partida?.toLowerCase().includes(termino) ||
          tour.llegada?.toLowerCase().includes(termino);
        if (!coincide) return false;
      }

      if (fechaDesde) {
        const inicio = new Date(tour.fecha_inicio);
        const desde = new Date(fechaDesde);
        if (inicio < desde) return false;
      }

      if (fechaHasta) {
        const inicio = new Date(tour.fecha_inicio);
        const hasta = new Date(fechaHasta);
        hasta.setHours(23, 59, 59);
        if (inicio > hasta) return false;
      }

      return true;
    });
  }, [tours, filtro, busqueda, fechaDesde, fechaHasta]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filtro, busqueda, fechaDesde, fechaHasta]);

  const conteos: Record<FiltroTour, number> = useMemo(
    () => ({
      todos: tours.length,
      pasadia: tours.filter((t) => t.tipo_tour === 'pasadia').length,
      terrestre: tours.filter((t) => t.tipo_tour === 'terrestre').length,
      aereo: tours.filter((t) => t.tipo_tour === 'aereo').length,
    }),
    [tours],
  );

  const totalPages = Math.ceil(toursFiltrados.length / ITEMS_PER_PAGE);
  const toursEnPagina = toursFiltrados.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const pageNumbers = useMemo<(number | '...')[]>(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  }, [totalPages, currentPage]);

  if (tours.length === 0) return <TourGridSkeleton count={6} />;

  return (
    <div className="space-y-6">
      {conFiltros && (
        <TourFilter
          filtroActivo={filtro}
          onFiltroChange={(f) => { setFiltro(f); setCurrentPage(1); }}
          conteos={conteos}
          busqueda={busqueda}
          onBusquedaChange={(v) => { setBusqueda(v); setCurrentPage(1); }}
          fechaDesde={fechaDesde}
          onFechaDesdeChange={(v) => { setFechaDesde(v); setCurrentPage(1); }}
          fechaHasta={fechaHasta}
          onFechaHastaChange={(v) => { setFechaHasta(v); setCurrentPage(1); }}
          onLimpiar={limpiarFiltros}
          hayFiltrosActivos={hayFiltrosActivos}
        />
      )}

      {toursFiltrados.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-5xl mb-4" aria-hidden="true">🔍</p>
          <p className="text-on-surface-variant font-medium">
            No hay tours que coincidan con tu búsqueda.
          </p>
          <button
            onClick={limpiarFiltros}
            className="mt-4 text-sm text-primary underline hover:no-underline"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <>
          {conFiltros && hayFiltrosActivos && (
            <p className="text-sm text-on-surface-variant">
              {toursFiltrados.length}{' '}
              {toursFiltrados.length === 1 ? 'resultado' : 'resultados'}
            </p>
          )}

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {toursEnPagina.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="flex justify-center items-center gap-2 py-8"
          aria-label="Paginación de tours"
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Página anterior"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              chevron_left
            </span>
          </button>

          {pageNumbers.map((page, i) =>
            page === '...' ? (
              <span key={`ellipsis-${i}`} className="px-2 text-outline select-none">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page as number)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors',
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'border border-outline-variant text-on-surface hover:border-primary hover:text-primary',
                )}
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Página siguiente"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              chevron_right
            </span>
          </button>
        </nav>
      )}
    </div>
  );
}
