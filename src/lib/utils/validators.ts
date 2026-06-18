import { z } from 'zod';

export const cotizacionSchema = z.object({
  nombre_completo: z.string().min(2, 'Por favor ingresa tu nombre completo.'),
  correo_electronico: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: 'Ingresa un correo válido.' },
    ),
  indicativo: z.string(),
  /* Stored as string in the form; onSubmit converts to number */
  telefono: z
    .string()
    .min(1, 'Ingresa un número de teléfono.')
    .regex(/^\d{6,15}$/, 'Solo dígitos, sin espacios (ej: 3001234567).'),
  numero_pasajeros: z
    .string()
    .min(1, 'Ingresa el número de pasajeros.')
    .refine((v) => /^\d+$/.test(v) && Number(v) >= 1, {
      message: 'Ingresa al menos 1 pasajero.',
    }),
  fecha_salida: z.string().min(1, 'Selecciona la fecha de salida.'),
  fecha_regreso: z.string().optional(),
  origen: z.string().min(1, 'Indica la ciudad de origen.'),
  destino: z.string().min(1, 'Indica la ciudad de destino.'),
  edades_menores: z.string().optional(),
  especificaciones: z.string().optional(),
  tour_id: z.number().optional(),
  phone: z.string().optional(),
  asesor_id: z.number().nullable().optional(),
});

export type CotizacionSchema = z.infer<typeof cotizacionSchema>;
