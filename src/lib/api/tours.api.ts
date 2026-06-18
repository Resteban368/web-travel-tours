import { API_ENDPOINTS, REVALIDATE_SECONDS } from '@/config/api.config';
import type { Tour } from '@/lib/types/tour.types';

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const toursApi = {
  /** Obtiene todos los tours. Usa ISR con revalidación cada hora. */
  getAll: async (): Promise<Tour[]> => {
    const res = await fetch(API_ENDPOINTS.tours, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      throw new ApiError('Error al obtener tours', res.status);
    }
    const data: Tour[] = await res.json();
    return data;
  },

  /** Obtiene un tour por id. Busca en el listado completo (la API no tiene endpoint individual). */
  getById: async (id: number): Promise<Tour | null> => {
    const todos = await toursApi.getAll();
    return todos.find((t) => t.id === id) ?? null;
  },

  /** Filtra por tipo de tour. */
  getByTipo: async (tipo: Tour['tipo_tour']): Promise<Tour[]> => {
    const todos = await toursApi.getAll();
    return todos.filter((t) => t.tipo_tour === tipo);
  },

  /** Retorna solo los tours en promoción. */
  getPromociones: async (): Promise<Tour[]> => {
    const todos = await toursApi.getAll();
    return todos.filter((t) => t.es_promocion);
  },

  /** Retorna hasta `limit` tours para destacados en Home. */
  getDestacados: async (limit = 6): Promise<Tour[]> => {
    const todos = await toursApi.getAll();
    // Promociones primero, luego resto
    const sorted = [...todos.filter((t) => t.es_promocion), ...todos.filter((t) => !t.es_promocion)];
    return sorted.slice(0, limit);
  },
};
