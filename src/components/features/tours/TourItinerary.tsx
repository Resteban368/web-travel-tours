import type { TourItineraryItem } from '@/lib/types/tour.types';

interface TourItineraryProps {
  itinerary: TourItineraryItem[];
}

export function TourItinerary({ itinerary }: TourItineraryProps) {
  if (itinerary.length === 0) return null;

  return (
    <section aria-labelledby="itinerario-titulo">
      <h2 id="itinerario-titulo" className="text-2xl md:text-3xl font-bold text-on-surface mb-12">
        Itinerario del viaje
      </h2>
      <div className="relative itinerary-line pl-12 space-y-12">
        {itinerary.map((item) => (
          <div key={item.dia_numero} className="relative group">
            <div className="absolute -left-12 top-0 w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold shadow-lg z-10 group-hover:scale-110 transition-transform">
              {item.dia_numero}
            </div>
            <div className="bg-white p-8 rounded-2xl border border-outline-variant shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-bold text-primary mb-4 uppercase tracking-wide">
                {item.titulo}
              </h4>
              <p className="text-on-surface-variant text-base leading-relaxed">
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
