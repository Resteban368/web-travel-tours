export interface CotizacionFormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tour_id?: number;
  nombre_tour?: string;
  fecha_viaje?: string;
  numero_personas: number;
  mensaje?: string;
}

export interface CotizacionResponse {
  success: boolean;
  mensaje: string;
}
