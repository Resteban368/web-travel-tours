import type { Metadata } from 'next';
import { SITE_URL } from './api.config';

export const SEO_BASE: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Travel Tours | Agencia de Viajes en Florencia, Caquetá',
    template: '%s | Travel Tours',
  },
  description:
    'Agencia de viajes registrada en Florencia, Caquetá. Tours pasadías, terrestres y aéreos a los mejores destinos de Colombia. Salidas garantizadas, precios en COP. ¡Cotiza gratis!',
  keywords: [
    'agencia de viajes florencia caquetá',
    'tours florencia caquetá',
    'pasadías florencia caquetá',
    'tours terrestres colombia',
    'tours aéreos colombia baratos',
    'travel tours florencia',
    'paquetes turísticos caquetá',
    'turismo caquetá colombia',
    'viajes desde florencia caquetá',
    'planes de viaje colombia familias',
    'tours de aventura colombia',
    'ecoturismo caquetá',
    'planes de playa colombia',
    'tours 2x1 colombia parejas',
    'agencia de viajes caquetá rnt',
  ],
  authors: [{ name: 'Travel Tours', url: SITE_URL }],
  creator: 'Travel Tours',
  publisher: 'Travel Tours',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: SITE_URL,
    siteName: 'Travel Tours',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel Tours - Agencia de Viajes en Florencia, Caquetá, Colombia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Tours | Agencia de Viajes en Florencia, Caquetá',
    description: 'Tours pasadías, terrestres y aéreos desde Florencia, Caquetá. ¡Cotiza gratis!',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};
