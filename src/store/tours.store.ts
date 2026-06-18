'use client';

import { create } from 'zustand';
import type { TipoTour, TourUI } from '@/lib/types/tour.types';

interface ToursStore {
  filtroActivo: TipoTour | 'todos';
  tourSeleccionado: TourUI | null;
  setFiltro: (filtro: TipoTour | 'todos') => void;
  setTourSeleccionado: (tour: TourUI | null) => void;
}

export const useToursStore = create<ToursStore>((set) => ({
  filtroActivo: 'todos',
  tourSeleccionado: null,
  setFiltro: (filtroActivo) => set({ filtroActivo }),
  setTourSeleccionado: (tourSeleccionado) => set({ tourSeleccionado }),
}));
