'use client';

import { useEffect, useState } from 'react';
import type { TipoTour, TourUI } from '@/lib/types/tour.types';
import { toTourUI } from '@/lib/utils/formatters';

interface UseToursState {
  tours: TourUI[];
  loading: boolean;
  error: string | null;
}

/** Hook client-side para filtrado interactivo de tours ya cargados por SSR/ISR */
export function useTourFilter(toursSsr: TourUI[]) {
  const [filtro, setFiltro] = useState<TipoTour | 'todos'>('todos');

  const toursFiltrados =
    filtro === 'todos' ? toursSsr : toursSsr.filter((t) => t.tipo_tour === filtro);

  return { toursFiltrados, filtro, setFiltro };
}

/** Hook para cargar tours en el cliente (CSR, ej. formulario de cotización) */
export function useTours(): UseToursState {
  const [tours, setTours] = useState<TourUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTours = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/integracion/tours`,
        );
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setTours(data.map(toTourUI));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTours();
    return () => { cancelled = true; };
  }, []);

  return { tours, loading, error };
}
