export const EMPRESA = {
  nombre: 'Travel Tours',
  slogan: 'Experiencias únicas desde el corazón de Colombia',
  ciudad: 'Florencia, Caquetá, Colombia',
  sede1: 'Barrio Siete de Agosto, Oficina Agencia de Viajes TRAVEL TOURS',
  telefono: '+573142266528',
  whatsapp: '+573142266528',
  email: 'infoasesoras2022@gmail.com',
  facebook: 'https://www.facebook.com/TravelToursoficial?locale=es_LA',
  instagram: 'https://www.instagram.com/traveltours_oficial/',
  tiktok: 'https://www.tiktok.com/@traveltours.oficial',
} as const;

export const RUTAS = {
  home: '/',
  tours: '/tours',
  tour: (id: number) => `/tours/${id}`,
  cotizaciones: '/cotizaciones',
  faqs: '/faqs',
  nosotros: '/nosotros',
  galeria: '/galeria',
} as const;

export const TIPOS_TOUR = {
  pasadia: 'Pasadía',
  terrestre: 'Terrestre',
  aereo: 'Aéreo',
} as const;

export const UMBRAL_ULTIMOS_CUPOS = 5;

export const IMAGEN_FALLBACK =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
