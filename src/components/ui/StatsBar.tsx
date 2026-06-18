'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { display: '+15',        label: 'Experiencias',  desc: 'Tours disponibles',    num: 15,  prefix: '+', suffix: '', icono: 'explore',       accent: 'primary'   },
  { display: 'Eco',        label: 'Turismo',       desc: 'Sostenible y responsable',num:null,prefix: '',  suffix: '', icono: 'eco',           accent: 'primary'   },
  { display: 'RNT',        label: 'Registrado',    desc: 'Ante el MinComercio',   num:null, prefix: '',  suffix: '', icono: 'verified_user', accent: 'secondary' },
  { display: '24/7',       label: 'Atención',      desc: 'Siempre disponibles',   num:null, prefix: '',  suffix: '', icono: 'support_agent', accent: 'primary'   },
] as const;

function Counter({ end, prefix, suffix, triggered }: {
  end: number; prefix: string; suffix: string; triggered: boolean;
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
  return <>{`${prefix}${count}${suffix}`}</>;
}

export default function StatsBar() {
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

        {/* Encabezado de sección */}
        <div className="text-center mb-10">
          <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
            ¿Por qué elegirnos?
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface">
            Comprometidos con tu experiencia
          </h2>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => {
            const isPrimary = stat.accent === 'primary';
            return (
              <div
                key={stat.label}
                className="relative bg-surface-container-lowest rounded-2xl p-6 flex flex-col items-center text-center gap-3 border border-outline-variant shadow-sm overflow-hidden"
                style={{
                  opacity: triggered ? 1 : 0,
                  transform: triggered ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
                }}
              >
                {/* Decoración de fondo */}
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-[0.06]"
                  style={{ backgroundColor: isPrimary ? '#1B90D2' : '#FFCA00' }}
                />

                {/* Ícono */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: isPrimary ? 'rgba(27,144,210,0.12)' : 'rgba(255,202,0,0.15)',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 24,
                      color: isPrimary ? '#1B90D2' : '#a88500',
                    }}
                  >
                    {stat.icono}
                  </span>
                </div>

                {/* Valor */}
                <div>
                  <span
                    className="font-display text-3xl md:text-4xl font-bold leading-none block"
                    style={{ color: isPrimary ? '#1B90D2' : '#a88500' }}
                  >
                    {stat.num !== null ? (
                      <Counter end={stat.num} prefix={stat.prefix} suffix={stat.suffix} triggered={triggered} />
                    ) : (
                      stat.display
                    )}
                  </span>
                  <span className="text-on-surface font-bold text-sm mt-1 block">{stat.label}</span>
                </div>

                {/* Descripción */}
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
