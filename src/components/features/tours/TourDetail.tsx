import Link from 'next/link';
import Image from 'next/image';
import { TourImageSlider } from './TourImageSlider';
import { TourItinerary } from './TourItinerary';
import { TourInclusions } from './TourInclusions';
import { TourHighlights } from './TourHighlights';
import { OtrasExperiencias } from './OtrasExperiencias';
import { RUTAS, TIPOS_TOUR, EMPRESA } from '@/lib/constants';
import { formatearFecha, formatearPrecioCOP } from '@/lib/utils/formatters';
import type { TourUI } from '@/lib/types/tour.types';

interface TourDetailProps {
  tour: TourUI;
  otrosTours: TourUI[];
}

export function TourDetail({ tour, otrosTours }: TourDetailProps) {
  const preciosEspeciales = tour.precios.filter((p) => p.activo);

  return (
    <>
      <article className="max-w-[1280px] mx-auto px-5 md:px-16 py-8 md:py-12 pb-24 lg:pb-12">

        {/* Breadcrumbs & Header */}
        <header className="mb-6 md:mb-10">
          {/* Breadcrumb — prevents overflow on narrow screens */}
          <nav className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-4 overflow-hidden">
            <Link className="hover:text-primary transition-colors shrink-0" href={RUTAS.home}>Inicio</Link>
            <span className="material-symbols-outlined shrink-0" style={{ fontSize: 14 }}>chevron_right</span>
            <Link className="hover:text-primary transition-colors shrink-0" href={RUTAS.tours}>Tours</Link>
            <span className="material-symbols-outlined shrink-0" style={{ fontSize: 14 }}>chevron_right</span>
            <span className="text-primary font-bold truncate min-w-0">{tour.nombreLimpio}</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="inline-flex items-center bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {TIPOS_TOUR[tour.tipo_tour]}
            </div>
            {tour.es_promocion && (
              <div className="inline-flex items-center bg-secondary text-on-surface px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Promoción
              </div>
            )}
            {tour.precio_por_pareja && (
              <div className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider">
                2X1 — precio por pareja
              </div>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-on-surface mb-2 leading-tight">
            {tour.nombreLimpio}
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base">
            Próxima salida:{' '}
            <span className="font-semibold text-primary">{formatearFecha(tour.fecha_inicio)}</span>
            {tour.duracionDias > 1 && (
              <> · <span className="font-semibold text-primary">{tour.duracionDias} días</span></>
            )}
          </p>
        </header>

        {/* Hero Grid: imagen + chips | booking card */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start mb-12 md:mb-20">

          {/* Columna principal (2/3) */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">

            {/* Imagen — más alta en móvil con aspect-ratio 4:3, 16:9 en desktop */}
            <div className="relative aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden shadow-xl">
              <TourImageSlider imagenes={tour.imagenes} nombreTour={tour.nombreLimpio} />

              {/* Badges promo / 2X1 — siempre visibles */}
              {(tour.es_promocion || tour.precio_por_pareja) && (
                <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2 pointer-events-none">
                  {tour.es_promocion && (
                    <div className="badge-promo w-[72px] h-[72px] flex items-center justify-center text-white text-center">
                      <span className="text-[12px] font-black uppercase tracking-tight">¡PROMO!</span>
                    </div>
                  )}
                  {tour.precio_por_pareja && (
                    <div className="w-[64px] h-[64px] rounded-xl bg-primary flex flex-col items-center justify-center text-white shadow-md shadow-primary/40">
                      <span className="text-[18px] font-black leading-none tracking-tight">2X1</span>
                      <span className="text-[9px] font-bold uppercase leading-none mt-0.5 opacity-85">pareja</span>
                    </div>
                  )}
                </div>
              )}

              {tour.ultimosCupos && (
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-secondary text-on-surface px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg pointer-events-none">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>local_fire_department</span>
                  ¡Últimos cupos!
                </div>
              )}
            </div>

            {/* Quick info chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tour.punto_partida && (
                <InfoChip icon="location_on" label="Salida" value={tour.punto_partida} />
              )}
              {tour.hora_partida && (
                <InfoChip icon="schedule" label="Hora" value={tour.hora_partida} />
              )}
              {tour.llegada && (
                <InfoChip icon="flag" label="Llegada" value={tour.llegada} />
              )}
              {tour.cupos > 0 && (
                <InfoChip icon="groups" label="Cupos" value={`${tour.cupos} disp.`} />
              )}
            </div>

            {/* Resumen de lo que incluye el tour */}
            <TourHighlights tour={tour} />
          </div>

          {/* Booking card (1/3) — sticky en desktop, inline en móvil */}
          <aside className="lg:sticky lg:top-24">
            <div className="bg-surface-container-lowest p-5 sm:p-8 rounded-2xl shadow-xl border border-outline-variant">

              {/* Precio */}
              <div className="mb-6 md:mb-8">
                <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
                  Precio {tour.precio_por_pareja ? 'por pareja' : 'por persona'}
                </span>
                <div className="flex items-baseline gap-1 mt-1 flex-wrap">
                  <p className="font-display text-primary text-3xl md:text-4xl font-bold">
                    {tour.precioFormateado}
                  </p>
                  <span className="text-on-surface-variant text-base">COP</span>
                </div>
                {preciosEspeciales.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {preciosEspeciales.map((p) => (
                      <div key={p.id} className="flex justify-between gap-2 text-sm flex-wrap">
                        <span className="text-on-surface-variant">
                          {p.descripcion} ({p.edad_min}–{p.edad_max} años)
                        </span>
                        <span className="font-semibold text-on-surface shrink-0">
                          {formatearPrecioCOP(p.precio)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-primary font-semibold text-sm mt-2">¡Precio Garantizado!</p>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/573142266528?text=${encodeURIComponent(`Hola, quiero reservar el viaje de ${tour.nombreLimpio} con fecha del ${formatearFecha(tour.fecha_inicio)} al ${formatearFecha(tour.fecha_fin)}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-primary text-on-primary py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  Reservar
                </a>
                {tour.link_pdf && (
                  <a
                    href={tour.link_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary py-3 rounded-xl font-bold text-sm md:text-base hover:bg-primary/5 transition-all"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>download</span>
                    Ver itinerario
                  </a>
                )}
              </div>

              <hr className="my-5 md:my-8 border-outline-variant" />

              {/* Detalles rápidos */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary icon-filled shrink-0 text-xl">pin_drop</span>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Punto de salida</p>
                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">{EMPRESA.sede1}.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary icon-filled shrink-0 text-xl">payments</span>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Formas de pago</p>
                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                      Reserva con $50.000. Aceptamos tarjetas, Nequi y Daviplata.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Otras experiencias — solo desktop (sidebar) */}
            <div className="hidden lg:block mt-6">
              <OtrasExperiencias tours={otrosTours} currentId={tour.id} />
            </div>
          </aside>
        </section>

        {/* Detalles del Plan */}
        {(tour.inclusions.length > 0 || tour.exclusions.length > 0) && (
          <section className="mb-12 md:mb-20">
            <h2 className="text-xl md:text-3xl font-bold text-on-surface mb-6 md:mb-10 text-center">
              Detalles del Plan
            </h2>
            <TourInclusions inclusions={tour.inclusions} exclusions={tour.exclusions} />
          </section>
        )}

        {/* Itinerario */}
        {tour.itinerary.length > 0 && (
          <section className="mb-12 md:mb-20">
            <TourItinerary itinerary={tour.itinerary} />
          </section>
        )}

        {/* Otras experiencias — solo móvil/tablet (después del itinerario) */}
        <div className="lg:hidden mb-12">
          <OtrasExperiencias tours={otrosTours} currentId={tour.id} />
        </div>

        {/* CTA final */}
        <section className="rounded-2xl md:rounded-3xl overflow-hidden relative mb-4 min-h-[280px] md:min-h-[400px] flex items-center justify-center text-center p-6 md:p-8 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <Image
              src={tour.imagenes.length > 1 ? tour.imagenes[1] : tour.imagenPrincipal}
              alt={tour.nombreLimpio}
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-primary/40" />
          </div>
          <div className="relative z-10 max-w-2xl w-full">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              ¿Listo para vivir esta experiencia?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-6 md:mb-10">
              Reserva tu lugar hoy con solo $50.000 y crea recuerdos que durarán toda la vida.
              Nuestros asesores están listos para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href={`${RUTAS.cotizaciones}?tour=${tour.id}`}
                className="w-full sm:w-auto bg-secondary-container text-on-secondary-container px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-xl shadow-xl hover:scale-105 transition-transform"
              >
                Cotizar ahora
              </Link>
              <a
                href={`https://wa.me/573142266528?text=${encodeURIComponent(`Hola, quiero reservar el viaje de ${tour.nombreLimpio} con fecha del ${formatearFecha(tour.fecha_inicio)} al ${formatearFecha(tour.fecha_fin)}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-xl hover:bg-white/20 transition-all"
              >
                Hablar con un asesor
              </a>
            </div>
          </div>
        </section>

      </article>

      {/* Barra sticky de reserva — solo en móvil y tablet (oculta en lg) */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-surface-container-lowest border-t border-outline-variant shadow-2xl">
        <div className="flex items-center justify-between gap-4 px-5 py-3 max-w-[1280px] mx-auto">
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">
              {tour.precio_por_pareja ? 'Por pareja' : 'Por persona'}
            </p>
            <p className="font-bold text-primary text-xl leading-tight">
              {tour.precioFormateado}
            </p>
          </div>
          <Link
            href={`${RUTAS.cotizaciones}?tour=${tour.id}`}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold text-sm shrink-0 hover:opacity-90 transition-opacity active:scale-95"
          >
            Cotizar ahora
          </Link>
        </div>
      </div>
    </>
  );
}

/* ── Sub-componentes ─────────────────────────── */

interface InfoChipProps {
  icon: string;
  label: string;
  value: string;
}

function InfoChip({ icon, label, value }: InfoChipProps) {
  return (
    <div className="bg-surface-container-low p-3 sm:p-4 rounded-xl flex flex-col items-center text-center gap-2 border border-outline-variant">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div className="min-w-0 w-full">
        <p className="text-[9px] sm:text-[10px] uppercase font-bold text-outline tracking-widest">{label}</p>
        <p className="font-semibold text-on-surface text-xs sm:text-sm line-clamp-2 break-words">{value}</p>
      </div>
    </div>
  );
}
