import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AliaoCard } from '@/components/features/nosotros/AliaoCard';
import { NosotrosStats } from '@/components/features/nosotros/NosotrosStats';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { EMPRESA, RUTAS } from '@/lib/constants';
import { SITE_URL } from '@/config/api.config';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Quiénes somos | Travel Tours Florencia, Caquetá',
  description:
    'Conoce Travel Tours: agencia de viajes fundada en 2021 en Florencia, Caquetá, registrada ante MinComercio (RNT). Más de 10.000 viajeros, 52+ salidas y el respaldo de expertos locales.',
  keywords: [
    'agencia de viajes florencia caquetá',
    'travel tours quiénes somos',
    'agencia turismo caquetá rnt',
    'empresa de viajes caquetá',
    'historia travel tours colombia',
  ],
  alternates: { canonical: `${SITE_URL}/nosotros` },
  openGraph: {
    title: 'Quiénes somos | Travel Tours',
    description: 'Agencia de viajes registrada en Florencia, Caquetá. +10.000 viajeros y 52+ salidas desde 2021.',
    url: `${SITE_URL}/nosotros`,
    locale: 'es_CO',
    type: 'website',
  },
};

const VALORES = [
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    titulo: 'Coordinación experta',
    descripcion:
      'Gestionamos salidas colectivas con precisión: reservas formales, itinerarios claros y atención personalizada para cada integrante.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    titulo: 'Atención directa, rápida y profesional',
    descripcion:
      'Resolvemos tus dudas con agilidad, empatía y conocimiento. No hay intermediarios: hablamos contigo, te escuchamos y actuamos.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    titulo: 'Soporte completo antes, durante y después',
    descripcion:
      'Acompañamos cada etapa del proceso: desde la reserva hasta el regreso. Si surge algo, estamos contigo para solucionarlo.',
  },
];

const ALIADOS_AEREOS = [
  { nombre: 'Avianca', dominio: 'avianca.com' },
  { nombre: 'LATAM Colombia', dominio: 'latamairlines.com' },
  { nombre: 'Wingo', dominio: 'wingo.com' },
  { nombre: 'EasyFly', dominio: 'easyfly.com.co' },
  { nombre: 'Satena', dominio: 'satena.com' },
  { nombre: 'Copa Airlines', dominio: 'copaair.com' },
];

const ALIADOS_TERRESTRES = [
  { nombre: 'Flota Magdalena', dominio: 'flotamagdalena.com.co' },
  { nombre: 'Expreso Brasilia', dominio: 'expresobrasilia.com' },
  { nombre: 'Bolivariano', dominio: 'bolivariano.com.co' },
  { nombre: 'Coomotor', dominio: 'coomotor.com.co' },
  { nombre: 'Cootranscaquetá', dominio: 'cootranscaqueta.com.co' },
  { nombre: 'Rápido Ochoa', dominio: 'rapidoochoa.com' },
];

export default function NosotrosPage() {
  return (
    <>
      <RevealOnScroll />

      {/* HERO */}
      <section className="bg-primary-50 border-b border-primary-100 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

            {/* Texto */}
            <div>
              <p data-anim="up" className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Quiénes somos
              </p>
              <h1 data-anim="up" data-anim-delay="0.1s" className="font-display text-4xl font-bold text-neutral-900 sm:text-5xl leading-tight mb-6">
                Creamos Experiencias <br className="hidden sm:block" />
                <span className="text-primary">de Viaje</span>
              </h1>
              <p data-anim="up" data-anim-delay="0.2s" className="text-lg text-neutral-600 leading-relaxed mb-4">
                <strong className="text-neutral-800">Travel Tours</strong> es una agencia de viajes fundada en{' '}
                <strong className="text-primary">2021</strong>, creada con el propósito de ofrecer a los colombianos
                una forma <strong className="text-neutral-800">económica, confiable y divertida</strong> de viajar
                y descubrir el país.
              </p>
              <p data-anim="up" data-anim-delay="0.3s" className="text-neutral-600 leading-relaxed mb-4">
                Nacimos tras los desafíos del coronavirus, con la idea de volver a explorar Colombia a través de una
                propuesta accesible y segura para todos.
              </p>
              <p data-anim="up" data-anim-delay="0.38s" className="text-neutral-600 leading-relaxed mb-8">
                Desde entonces, organizamos planes turísticos cada fin de semana, conectando destinos en todo el país
                y ofreciendo <strong className="text-neutral-800">facilidades de pago</strong> que se adaptan a cada
                viajero. Gracias a nuestra constancia, hemos movilizado a casi{' '}
                <strong className="text-primary">10.000 personas</strong> en todo el territorio nacional.
              </p>
              <div data-anim="up" data-anim-delay="0.46s">
                <Link href={RUTAS.tours}>
                  <Button size="lg">Ver nuestros tours</Button>
                </Link>
              </div>
            </div>

            {/* Imagen */}
            <div data-anim="right" className="relative h-80 overflow-hidden rounded-2xl shadow-xl lg:h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
                alt="Equipo Travel Tours explorando Colombia"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-xl font-bold text-white leading-snug drop-shadow">
                  "{EMPRESA.slogan}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <NosotrosStats />

      {/* MISIÓN */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p data-anim="up" className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Nuestro compromiso
          </p>
          <blockquote data-anim="scale" data-anim-delay="0.1s" className="font-display text-2xl font-semibold text-neutral-800 leading-relaxed">
            "Hacer que viajar sea posible, placentero y legalmente respaldado. Con Travel Tours,
            no solo viajas… <span className="text-primary">te reencuentras con lo mejor de Colombia</span>."
          </blockquote>
        </div>
      </section>

      {/* VALORES / POR QUÉ ELEGIRNOS — fondo parallax */}
      <section className="relative py-20 overflow-hidden">
        {/* Imagen de fondo con parallax */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80')",
            backgroundAttachment: 'fixed',
          }}
        />
        {/* Overlay azul oscuro */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary-900/80" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p data-anim="up" className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">
              Por qué elegirnos
            </p>
            <h2 data-anim="up" data-anim-delay="0.1s" className="font-display text-3xl font-bold text-white">
              Nuestro diferencial
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALORES.map(({ icono, titulo, descripcion }, i) => (
              <div
                key={titulo}
                data-anim="up"
                data-anim-delay={`${i * 0.14}s`}
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="flex size-14 items-center justify-center rounded-xl bg-white/15 text-secondary mb-5">
                  {icono}
                </span>
                <h3 className="font-display text-lg font-bold text-white mb-3">{titulo}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALIADOS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p data-anim="up" className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
              Nuestros aliados
            </p>
            <h2 data-anim="up" data-anim-delay="0.1s" className="font-display text-3xl font-bold text-neutral-900 mb-3">
              Viaja con los mejores
            </h2>
            <p data-anim="fade" data-anim-delay="0.2s" className="text-neutral-500 max-w-xl mx-auto">
              Aliados con las mejores empresas de transporte terrestre y aéreo, para que tu viaje
              sea cómodo y sin preocupaciones.
            </p>
          </div>

          {/* Aéreos */}
          <div data-anim="up" data-anim-delay="0.05s" className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary-50">
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 text-primary" aria-hidden="true">
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                </svg>
              </span>
              <h3 className="font-semibold text-neutral-700 text-sm uppercase tracking-wide">
                Transporte Aéreo
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {ALIADOS_AEREOS.map(({ nombre, dominio }, i) => (
                <div key={nombre} data-anim="up" data-anim-delay={`${i * 0.07}s`}>
                  <AliaoCard nombre={nombre} dominio={dominio} />
                </div>
              ))}
            </div>
          </div>

          {/* Terrestres */}
          <div data-anim="up" data-anim-delay="0.1s">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary-50">
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 text-primary" aria-hidden="true">
                  <path d="M6.5 3A1.5 1.5 0 005 4.5v.5H3.5A1.5 1.5 0 002 6.5v8A1.5 1.5 0 003.5 16h13a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0016.5 5H15v-.5A1.5 1.5 0 0013.5 3h-7zM13 5v-.5a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5V5h6zm-8 5a1 1 0 112 0 1 1 0 01-2 0zm8 0a1 1 0 112 0 1 1 0 01-2 0zm-6 4.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" />
                </svg>
              </span>
              <h3 className="font-semibold text-neutral-700 text-sm uppercase tracking-wide">
                Transporte Terrestre
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {ALIADOS_TERRESTRES.map(({ nombre, dominio }, i) => (
                <div key={nombre} data-anim="up" data-anim-delay={`${i * 0.07}s`}>
                  <AliaoCard nombre={nombre} dominio={dominio} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="bg-neutral-50 border-t border-neutral-100 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p data-anim="up" className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
              Visítanos
            </p>
            <h2 data-anim="up" data-anim-delay="0.1s" className="font-display text-3xl font-bold text-neutral-900 mb-3">
              ¿Dónde estamos?
            </h2>
            <p data-anim="fade" data-anim-delay="0.2s" className="text-neutral-500 max-w-xl mx-auto">
              Estamos en el corazón de Florencia, Caquetá. Pasa por nuestra oficina y planifica tu
              próxima aventura con nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            {/* Info de contacto */}
            <div data-anim="left" className="space-y-6">
              <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-6">
                  Nuestra oficina
                </h3>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-1">
                        Sede principal
                      </p>
                      <p className="text-neutral-800 font-medium">{EMPRESA.sede1}</p>
                      <p className="text-sm text-neutral-500 mt-0.5">{EMPRESA.ciudad}</p>
                    </div>
                  </div>

                </div>

                <a
                  href="https://www.google.com/maps?cid=1373090523832058178"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                  </svg>
                  Ver en Google Maps
                </a>
              </div>
            </div>

            {/* Mapa embebido */}
            <div data-anim="right" className="overflow-hidden rounded-2xl shadow-md border border-neutral-100 h-72 lg:h-full min-h-72">
              <iframe
                title="Ubicación Travel Tours en Google Maps"
                src="https://maps.google.com/maps?cid=1373090523832058178&output=embed&hl=es-419&gl=CO"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '288px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-50 border-t border-primary-100 py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 data-anim="up" className="font-display text-3xl font-bold text-primary-900 mb-3">
            ¿Listo para tu próxima aventura?
          </h2>
          <p data-anim="up" data-anim-delay="0.1s" className="text-neutral-600 mb-8">
            Explora nuestros tours disponibles y reserva hoy con facilidades de pago.
          </p>
          <div data-anim="up" data-anim-delay="0.2s" className="flex flex-wrap justify-center gap-4">
            <Link href={RUTAS.tours}>
              <Button size="lg">Ver tours disponibles</Button>
            </Link>
            <Link href={RUTAS.cotizaciones}>
              <Button variant="outline" size="lg">Cotizar ahora</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: EMPRESA.nombre,
            description: EMPRESA.slogan,
            foundingDate: '2021',
            url: SITE_URL,
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: EMPRESA.sede1,
                addressLocality: 'Florencia',
                addressRegion: 'Caquetá',
                addressCountry: 'CO',
              },
            ],
          }),
        }}
      />
    </>
  );
}
