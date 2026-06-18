import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { toursApi } from '@/lib/api/tours.api';
import { nextcloudApi } from '@/lib/api/nextcloud.api';
import { toTourUI } from '@/lib/utils/formatters';
import { EMPRESA, RUTAS, TIPOS_TOUR } from '@/lib/constants';
import { SITE_URL } from '@/config/api.config';
import HeroSection from '@/components/ui/HeroSection';
import StatsBar from '@/components/ui/StatsBar';
import { ExperienciasDestacadas } from '@/components/features/home/ExperienciasDestacadas';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const TIPO_ICONS: Record<keyof typeof TIPOS_TOUR, string> = {
  pasadia:   'wb_sunny',
  terrestre: 'directions_bus',
  aereo:     'flight',
};

const TIPO_IMAGES: Record<keyof typeof TIPOS_TOUR, string> = {
  pasadia:   'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80',
  terrestre: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  aereo:     'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
};

export default async function HomePage() {
  const [tours, sliderImages] = await Promise.all([
    toursApi.getAll(),
    nextcloudApi.getFolderImages('Photos/web'),
  ]);
  const toursUI = tours.map(toTourUI);

  return (
    <>
      <RevealOnScroll />

      {/* HERO */}
      <HeroSection
        images={sliderImages}
        fallbackSrc="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80"
        ciudad={EMPRESA.ciudad}
        nombre={EMPRESA.nombre}
        toursHref={RUTAS.tours}
        cotizacionesHref={RUTAS.cotizaciones}
      />

      {/* STATS */}
      <StatsBar />

      {/* TIPOS DE TOUR */}
      <section className="py-20 bg-surface overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <h2 data-anim="up" className="text-3xl font-bold text-center mb-12 text-on-surface">
            Tipo de tours
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(Object.entries(TIPOS_TOUR) as [keyof typeof TIPOS_TOUR, string][]).map(
              ([tipo, label], i) => (
                <Link
                  key={tipo}
                  href={`${RUTAS.tours}?tipo=${tipo}`}
                  data-anim="up"
                  data-anim-delay={`${i * 0.13}s`}
                  className="group relative overflow-hidden rounded-2xl shadow-md h-40 md:h-48 flex flex-col items-center justify-end transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <Image
                    src={TIPO_IMAGES[tipo]}
                    alt={`Tours tipo ${label}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center text-center px-6 pb-5">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-primary transition-all duration-300">
                      <span className="material-symbols-outlined text-white" style={{ fontSize: '1.5rem' }}>
                        {TIPO_ICONS[tipo]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{label}</h3>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* EXPERIENCIAS DESTACADAS — carrusel parallax */}
      {toursUI.length > 0 && (
        <ExperienciasDestacadas tours={toursUI} />
      )}

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary-container/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <h2 data-anim="up" className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-6">
            ¿Tienes un destino en mente?
          </h2>
          <p data-anim="up" data-anim-delay="0.1s" className="text-lg text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
            Cuéntanos tu sueño y nosotros lo convertimos en realidad. Recibe una cotización
            personalizada sin compromiso y empieza a planear tu próxima aventura.
          </p>
          <div data-anim="scale" data-anim-delay="0.2s">
            <Link
              href={RUTAS.cotizaciones}
              className="inline-block bg-primary text-on-primary px-12 py-5 rounded-lg font-semibold text-xl hover:bg-primary-container hover:shadow-2xl transition-all duration-300 active:scale-95"
            >
              Solicitar cotización gratis
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD — TravelAgency (SEO local + rich results) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: EMPRESA.nombre,
            description: EMPRESA.slogan,
            url: SITE_URL,
            logo: `${SITE_URL}/LOGO.png`,
            image: `${SITE_URL}/og-default.jpg`,
            telephone: EMPRESA.telefono,
            email: EMPRESA.email,
            priceRange: '$$',
            currenciesAccepted: 'COP',
            paymentAccepted: 'Cash, Credit Card, Nequi, Daviplata',
            areaServed: [
              { '@type': 'State', name: 'Caquetá', containedInPlace: { '@type': 'Country', name: 'Colombia' } },
              { '@type': 'Country', name: 'Colombia' },
            ],
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: EMPRESA.sede1,
                addressLocality: 'Florencia',
                addressRegion: 'Caquetá',
                addressCountry: 'CO',
                postalCode: '180001',
              },
              {
                '@type': 'PostalAddress',
                streetAddress: EMPRESA.sede2,
                addressLocality: 'Florencia',
                addressRegion: 'Caquetá',
                addressCountry: 'CO',
                postalCode: '180001',
              },
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: EMPRESA.telefono,
              contactType: 'customer service',
              availableLanguage: 'Spanish',
              areaServed: 'CO',
            },
            sameAs: [
              EMPRESA.facebook,
              EMPRESA.instagram,
              EMPRESA.tiktok,
            ],
          }),
        }}
      />
    </>
  );
}
