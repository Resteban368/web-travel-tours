import { IMAGEN_FALLBACK, UMBRAL_ULTIMOS_CUPOS } from '@/lib/constants';
import type { Tour, TourUI } from '@/lib/types/tour.types';

/** "06_20 PISCILAGO EL MEJOR PARQUE" → "Piscilago El Mejor Parque" */
export function limpiarNombreTour(nombre: string): string {
  return nombre
    .replace(/^\d{2}_\d{2,4}\s*/i, '')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/** "240000.00" → "$240.000" */
export function formatearPrecioCOP(precio: string | number): string {
  const valor = typeof precio === 'string' ? parseFloat(precio) : precio;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
}

/** "2026-06-20T00:00:00.000Z" → "20 de junio de 2026" */
export function formatearFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Número de días entre fecha_inicio y fecha_fin (mínimo 1) */
export function calcularDuracion(inicio: string, fin: string): number {
  const diff = new Date(fin).getTime() - new Date(inicio).getTime();
  const dias = Math.round(diff / (1000 * 60 * 60 * 24));
  return dias <= 0 ? 1 : dias + 1;
}

/** Transforma un Tour API en TourUI listo para renderizar */
export function toTourUI(tour: Tour): TourUI {
  return {
    ...tour,
    nombreLimpio: limpiarNombreTour(tour.nombre_tour),
    precioFormateado: formatearPrecioCOP(tour.precio),
    duracionDias: calcularDuracion(tour.fecha_inicio, tour.fecha_fin),
    imagenPrincipal: tour.imagenes[0] ?? tour.url_imagen ?? IMAGEN_FALLBACK,
    ultimosCupos: tour.cupos > 0 && tour.cupos < UMBRAL_ULTIMOS_CUPOS,
  };
}
