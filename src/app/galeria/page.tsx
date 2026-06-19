import type { Metadata } from 'next';
import { nextcloudApi } from '@/lib/api/nextcloud.api';
import { SITE_URL } from '@/config/api.config';
import { GaleriaGrid } from '@/components/features/galeria/GaleriaGrid';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Galería de Viajes',
  description:
    'Descubre la belleza de los destinos de Travel Tours a través de nuestra galería de fotografías. Paisajes únicos, aventuras y momentos inolvidables desde Florencia, Caquetá.',
  alternates: { canonical: `${SITE_URL}/galeria` },
  openGraph: {
    title: 'Galería | Travel Tours',
    description: 'Fotografías de nuestros tours y destinos favoritos en Colombia.',
    url: `${SITE_URL}/galeria`,
  },
};

export default async function GaleriaPage() {
  const images = await nextcloudApi.getFolderImages('Photos/web');

  return (
    <>
      <RevealOnScroll />

      {/* Hero header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background pt-24 pb-16">
        {/* Decoraciones de fondo */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute top-10 -left-16 w-56 h-56 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-5 md:px-16 text-center relative z-10">
          {/* Eyebrow */}
          <div
            data-anim="fade"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>photo_camera</span>
            Travel Tours
          </div>

          <h1
            data-anim="up"
            data-anim-delay="0.05s"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-5 leading-tight"
          >
            Nuestra{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Galería</span>
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-3 bg-secondary/30 -skew-x-2 rounded"
              />
            </span>
          </h1>

          <p
            data-anim="up"
            data-anim-delay="0.15s"
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
          >
            Cada fotografía cuenta una historia. Explora los destinos, paisajes y momentos
            que hacen únicos nuestros viajes por Colombia.
          </p>

          {/* Línea decorativa */}
          <div data-anim="scale" data-anim-delay="0.25s" className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-outline-variant" />
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '1.1rem' }}>landscape</span>
            <span className="h-px w-16 bg-outline-variant" />
          </div>
        </div>
      </section>

      {/* Grid section */}
      <section className="py-16 bg-background">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <GaleriaGrid images={images} />
        </div>
      </section>

      {/* CTA */}
      <section data-anim="up" className="py-16 bg-surface-container-low">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <span className="material-symbols-outlined text-primary mb-4 block" style={{ fontSize: '2.5rem' }}>
            travel_explore
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-4">
            ¿Quieres vivir estas experiencias?
          </h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            Estas fotografías son solo el comienzo. Contáctanos y planea tu próxima aventura.
          </p>
          <a
            href="/cotizaciones"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-lg font-semibold text-base hover:bg-primary-container hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>send</span>
            Solicitar cotización gratis
          </a>
        </div>
      </section>
    </>
  );
}
