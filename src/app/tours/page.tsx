import type { Metadata } from 'next';
import { TourGrid } from '@/components/features/tours/TourGrid';
import { toursApi } from '@/lib/api/tours.api';
import { nextcloudApi } from '@/lib/api/nextcloud.api';
import { toTourUI } from '@/lib/utils/formatters';
import { SITE_URL } from '@/config/api.config';
import BgSlider from '@/components/ui/BgSlider';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Tours y planes de viaje | Travel Tours',
  description:
    'Explora todos nuestros tours: pasadías, terrestres y aéreos desde Florencia, Caquetá. Destinos de playa, aventura y ecoturismo. Precios en COP, salidas garantizadas.',
  keywords: [
    'tours disponibles colombia 2025',
    'pasadías florencia caquetá',
    'tours terrestres colombia baratos',
    'tours aéreos colombia',
    'paquetes turísticos caquetá',
    'planes de playa desde florencia',
    'tours de aventura caquetá',
  ],
  alternates: { canonical: `${SITE_URL}/tours` },
  openGraph: {
    title: 'Tours y planes de viaje | Travel Tours',
    description: 'Pasadías, terrestres y aéreos desde Florencia, Caquetá. Precios en COP, salidas garantizadas.',
    url: `${SITE_URL}/tours`,
    locale: 'es_CO',
    type: 'website',
  },
};

const TIPO_ICONS = {
  pasadia: 'wb_sunny',
  terrestre: 'directions_bus',
  aereo: 'flight',
} as const;

export default async function ToursPage() {
  const [tours, sliderImages] = await Promise.all([
    toursApi.getAll(),
    nextcloudApi.getFolderImages('Photos/web'),
  ]);
  const toursUI = tours.map(toTourUI);

  const conteos = {
    pasadia: toursUI.filter((t) => t.tipo_tour === 'pasadia').length,
    terrestre: toursUI.filter((t) => t.tipo_tour === 'terrestre').length,
    aereo: toursUI.filter((t) => t.tipo_tour === 'aereo').length,
  };

  const stats = [
    { label: 'Pasadías', count: conteos.pasadia, icon: TIPO_ICONS.pasadia },
    { label: 'Terrestres', count: conteos.terrestre, icon: TIPO_ICONS.terrestre },
    { label: 'Aéreos', count: conteos.aereo, icon: TIPO_ICONS.aereo },
  ].filter((s) => s.count > 0);

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-8">
      {/* Hero */}
      <section className="rounded-xl overflow-hidden mb-8">
        <div className="min-h-[400px] flex flex-col justify-center px-8 md:px-12 py-16 relative overflow-hidden bg-primary-900">
          <BgSlider images={sliderImages} />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest mb-4 block text-secondary-container">
              Explora Colombia
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Destinos disponibles
            </h1>
            <p className="text-lg text-primary-fixed mb-10 leading-relaxed">
              {toursUI.length} tours desde Florencia, Caquetá. Filtra por tipo y encuentra tu próxima aventura con expertos locales.
            </p>

            {stats.length > 0 && (
              <div className="flex flex-wrap gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 text-white">
                    <div className="bg-white/10 p-2 rounded-lg">
                      <span className="material-symbols-outlined">{stat.icon}</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold leading-none">{stat.count}</div>
                      <div className="text-xs opacity-80 mt-1">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid + Filtros */}
      <div className="pb-16">
        <TourGrid tours={toursUI} conFiltros />
      </div>
    </div>
  );
}
