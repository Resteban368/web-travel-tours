import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TourDetail } from '@/components/features/tours/TourDetail';
import { toursApi } from '@/lib/api/tours.api';
import { toTourUI, limpiarNombreTour } from '@/lib/utils/formatters';
import { SITE_URL } from '@/config/api.config';
import { EMPRESA } from '@/lib/constants';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

// Genera rutas estáticas para todos los tours en build time (ISR)
export async function generateStaticParams() {
  const tours = await toursApi.getAll();
  return tours.map((t) => ({ id: String(t.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tour = await toursApi.getById(Number(id));
  if (!tour) return { title: 'Tour no encontrado' };

  const nombre = limpiarNombreTour(tour.nombre_tour);
  const descripcion = tour.inclusions.slice(0, 3).join(', ').substring(0, 160);
  const imagen = tour.imagenes.length > 1 ? tour.imagenes[1] : (tour.imagenes[0] ?? '/og-default.jpg');

  return {
    title: `${nombre} | Travel Tours`,
    description: descripcion || `Tour ${nombre} desde Florencia, Caquetá, Colombia. Reserva con solo $50.000 y viaja con Travel Tours.`,
    keywords: [
      nombre.toLowerCase(),
      `tour ${nombre.toLowerCase()} colombia`,
      'tours florencia caquetá',
      'agencia de viajes caquetá',
      'travel tours colombia',
      tour.tipo_tour,
    ],
    openGraph: {
      title: `${nombre} | Travel Tours`,
      description: descripcion || `Reserva el tour ${nombre} desde Florencia, Caquetá.`,
      images: [{ url: imagen, width: 1200, height: 630, alt: nombre }],
      locale: 'es_CO',
      type: 'website',
    },
    alternates: { canonical: `${SITE_URL}/tours/${tour.id}` },
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [tour, todos] = await Promise.all([
    toursApi.getById(Number(id)),
    toursApi.getAll(),
  ]);

  if (!tour) notFound();

  const tourUI = toTourUI(tour);
  const otrosTours = todos
    .filter((t) => t.id !== tour.id)
    .slice(0, 3)
    .map(toTourUI);
  const imagen = tour.imagenes[0] ?? '/og-default.jpg';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tourUI.nombreLimpio,
    description: tour.inclusions.join(', '),
    image: imagen,
    touristType: tour.tipo_tour,
    startDate: tour.fecha_inicio,
    endDate: tour.fecha_fin,
    offers: {
      '@type': 'Offer',
      price: parseFloat(tour.precio),
      priceCurrency: 'COP',
      availability:
        tour.cupos > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
    },
    provider: {
      '@type': 'TravelAgency',
      name: EMPRESA.nombre,
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Florencia',
        addressRegion: 'Caquetá',
        addressCountry: 'CO',
      },
    },
  };

  return (
    <>
      <TourDetail tour={tourUI} otrosTours={otrosTours} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
