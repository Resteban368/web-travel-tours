import type { TourUI } from '@/lib/types/tour.types';

interface Highlight {
  icon: string;
  label: string;
  value: string;
}

function sentenceCase(str: string): string {
  const lower = str.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function derivarDestaques(tour: TourUI): Highlight[] {
  const inc = tour.inclusions;
  const highlights: Highlight[] = [];

  // 1. Transporte
  const transporteItem = inc.find((i) => /transport|traslado|transfer|bus|vuelo/i.test(i));
  highlights.push({
    icon: tour.tipo_tour === 'aereo' ? 'flight' : 'directions_bus',
    label: 'Transporte',
    value: transporteItem
      ? sentenceCase(transporteItem)
      : tour.punto_partida
        ? `Salida desde ${sentenceCase(tour.punto_partida)}`
        : 'Incluido',
  });

  // 2. Alojamiento / Duración
  if (tour.duracionDias > 1) {
    const hotelItem = inc.find((i) =>
      /hotel|alojamiento|hospedaje|habitaci|noche/i.test(i),
    );
    const noches = tour.duracionDias - 1;
    highlights.push({
      icon: 'hotel',
      label: 'Alojamiento',
      value: hotelItem
        ? sentenceCase(hotelItem)
        : `${tour.duracionDias} Días y ${noches} Noche${noches > 1 ? 's' : ''}`,
    });
  } else {
    highlights.push({
      icon: 'wb_sunny',
      label: 'Duración',
      value: '1 Día (Pasadía)',
    });
  }

  // 3. Comidas
  const comidasItems = inc.filter((i) =>
    /almuerzo|desayuno|cena|merienda|comida|snack|refrigerio|buffet/i.test(i),
  );
  if (comidasItems.length > 0) {
    highlights.push({
      icon: 'restaurant',
      label: 'Comidas',
      value: comidasItems.map(sentenceCase).join(' · '),
    });
  }

  // 4. Actividad / acceso principal
  const actividadItem = inc.find((i) =>
    /ingreso|acceso|entrada|actividad|pasaporte|paquete|ticket/i.test(i),
  );
  if (actividadItem) {
    highlights.push({
      icon: 'confirmation_number',
      label: 'Incluye',
      value: sentenceCase(actividadItem),
    });
  } else if (tour.llegada) {
    highlights.push({
      icon: 'place',
      label: 'Destino',
      value: sentenceCase(tour.llegada),
    });
  }

  return highlights.slice(0, 4);
}

interface TourHighlightsProps {
  tour: TourUI;
}

export function TourHighlights({ tour }: TourHighlightsProps) {
  const highlights = derivarDestaques(tour);
  if (highlights.length === 0) return null;

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {highlights.map((h) => (
          <div key={h.label} className="flex items-start gap-4">
            <span
              className="material-symbols-outlined text-on-surface-variant shrink-0 mt-0.5"
              style={{ fontSize: '2rem' }}
            >
              {h.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs text-on-surface-variant mb-0.5 font-medium">{h.label}</p>
              <p className="font-bold text-on-surface text-base leading-snug line-clamp-2">{h.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
