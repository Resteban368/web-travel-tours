// Raw API response shape
export interface TourItineraryItem {
  titulo: string;
  dia_numero: number;
  descripcion: string;
}

export interface TourPrecioEspecial {
  id: number;
  descripcion: string;
  precio: number;
  edad_min: number;
  edad_max: number;
  punto_partida: string;
  activo: boolean;
}

export type TipoTour = 'pasadia' | 'terrestre' | 'aereo';
export type ModoPrecio = 'individual' | 'grupal';

export interface Tour {
  id: number;
  id_tour: number;
  nombre_tour: string;
  tipo_tour: TipoTour;
  fecha_inicio: string;
  fecha_fin: string;
  precio: string;
  precio_por_pareja: boolean;
  modo_precio: ModoPrecio;
  punto_partida: string;
  hora_partida: string;
  llegada: string;
  url_imagen: string | null;
  imagenes: string[];
  link_pdf: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryItem[];
  cupos: number;
  es_promocion: boolean;
  sede_id: string;
  precios: TourPrecioEspecial[];
  precios_grupales: unknown[];
}

// Processed/display-ready shape
export interface TourUI extends Tour {
  nombreLimpio: string;
  precioFormateado: string;
  duracionDias: number;
  imagenPrincipal: string;
  ultimosCupos: boolean;
}
