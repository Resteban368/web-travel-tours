'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  {
    display: '2021',
    label: 'Año de fundación',
    desc: 'Nacimos en plena pandemia',
    num: null,
    prefix: '', suffix: '',
    icono: 'calendar_month',
    accent: 'primary' as const,
  },
  {
    display: '+10.000',
    label: 'Viajeros movilizados',
    desc: 'Por todo el territorio nacional',
    num: 10000,
    prefix: '+', suffix: '',
    icono: 'groups',
    accent: 'secondary' as const,
  },
  {
    display: '52+',
    label: 'Salidas al año',
    desc: 'Cada fin de semana, sin parar',
    num: 52,
    prefix: '', suffix: '+',
    icono: 'event_repeat',
    accent: 'primary' as const,
  },
  {
    display: '100%',
    label: 'Respaldo legal',
    desc: 'RNT registrado ante el MinComercio',
    num: 100,
    prefix: '', suffix: '%',
    icono: 'verified_user',
    accent: 'secondary' as const,
  },
];

function Counter({ end, prefix, suffix, triggered, format }: {
  end: number; prefix: string; suffix: string; triggered: boolean; format?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, end]);

  const display = format ? count.toLocaleString('es-CO') : count;
  return <>{`${prefix}${display}${suffix}`}</>;
}

export function NosotrosStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 px-5 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
            Nuestra trayectoria
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface">
            Números que nos respaldan
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => {
            const isPrimary = stat.accent === 'primary';
            const accentColor  = isPrimary ? '#1B90D2' : '#a88500';
            const accentBg     = isPrimary ? 'rgba(27,144,210,0.12)' : 'rgba(255,202,0,0.15)';
            const accentCircle = isPrimary ? '#1B90D2' : '#FFCA00';

            return (
              <div
                key={stat.label}
                className="relative bg-surface-container-lowest rounded-2xl p-6 flex flex-col items-center text-center gap-3 border border-outline-variant shadow-sm overflow-hidden"
                style={{
                  opacity: triggered ? 1 : 0,
                  transform: triggered ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s`,
                }}
              >
                {/* Círculo decorativo */}
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-[0.07]"
                  style={{ backgroundColor: accentCircle }}
                />

                {/* Ícono */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: accentBg }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 24, color: accentColor }}>
                    {stat.icono}
                  </span>
                </div>

                {/* Valor */}
                <div>
                  <span
                    className="font-display text-3xl md:text-4xl font-bold leading-none block"
                    style={{ color: accentColor }}
                  >
                    {stat.num !== null ? (
                      <Counter
                        end={stat.num}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        triggered={triggered}
                        format={stat.num >= 1000}
                      />
                    ) : (
                      stat.display
                    )}
                  </span>
                  <span className="text-on-surface font-bold text-sm mt-1 block">{stat.label}</span>
                </div>

                {/* Descripción */}
                <p className="text-on-surface-variant text-xs leading-relaxed">{stat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
