import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FormCotizacion } from '@/components/features/cotizaciones/FormCotizacion';
import { EMPRESA } from '@/lib/constants';
import { SITE_URL } from '@/config/api.config';

export const metadata: Metadata = {
  title: 'Cotiza tu tour gratis | Travel Tours',
  description:
    'Solicita tu cotización personalizada sin compromiso. Tours pasadías, terrestres y aéreos desde Florencia, Caquetá. Respuesta en menos de 24 horas. ¡Empieza a planear tu viaje!',
  keywords: [
    'cotizar tour colombia',
    'cotización viaje florencia caquetá',
    'planes de viaje personalizados colombia',
    'presupuesto tour travel tours',
  ],
  alternates: { canonical: `${SITE_URL}/cotizaciones` },
  openGraph: {
    title: 'Cotiza tu tour gratis | Travel Tours',
    description: 'Planes personalizados desde Florencia, Caquetá. Respuesta en menos de 24 horas.',
    url: `${SITE_URL}/cotizaciones`,
    locale: 'es_CO',
    type: 'website',
  },
};

const PASOS = [
  {
    title: 'Envía tu solicitud',
    desc:  'Completa el formulario con los detalles de tu viaje ideal.',
  },
  {
    title: 'Recibe tu propuesta',
    desc:  'En menos de 24 horas te enviamos una cotización personalizada.',
  },
  {
    title: 'Confirma y viaja',
    desc:  'Escoge la opción que más te guste y nosotros nos encargamos del resto.',
  },
];

export default function CotizacionesPage() {
  const hasContactInfo = !!(EMPRESA.telefono || EMPRESA.email || EMPRESA.whatsapp);

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-16 px-5 md:px-7"
        style={{ background: '#0D0E18' }}
      >
        {/* Decorative gradient */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 70% at 80% 50%, rgba(27,144,210,.18) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-primary" />
              <span className="text-white/50 text-[11px] font-mono uppercase tracking-widest">
                Agencia de Viajes
              </span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold text-white leading-[1.08] tracking-tight mb-5">
              Tu viaje<br />
              empieza{' '}
              <span className="text-primary">aquí</span>
            </h1>
            <p className="text-white/50 text-[15px] leading-relaxed max-w-md">
              Completa el formulario y en las próximas{' '}
              <strong className="text-white/80 font-semibold">24 horas</strong>{' '}
              te enviamos una propuesta personalizada con todo listo para viajar.
            </p>
          </div>

          {/* Right — stats */}
          <div className="flex flex-row md:flex-col gap-3 md:items-end">
            <StatBox num="24h"  label="Tiempo de respuesta" />
            <StatBox num="100%" label="Personalizado" />
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="bg-[#F2EFE9] flex-1">
        <div className="max-w-[1120px] mx-auto px-5 md:px-7 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Form (client — wrapped in Suspense for useSearchParams) */}
          <Suspense fallback={<FormSkeleton />}>
            <FormCotizacion />
          </Suspense>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24">

            {/* Steps card */}
            <div className="bg-white border border-[#E2DDD5] rounded-2xl shadow-sm overflow-hidden">
              <div className="h-[2.5px] bg-primary" />
              <div className="px-6 py-5 border-b border-[#E2DDD5]">
                <h3 className="text-sm font-bold text-[#0D0E18]">¿Cómo funciona?</h3>
                <p className="text-xs text-[#6B6E85] mt-0.5">Tu viaje en 3 simples pasos</p>
              </div>
              <div className="px-6 pb-2">
                {PASOS.map((paso, i) => (
                  <div
                    key={paso.title}
                    className={`flex gap-4 py-4 items-start ${i < PASOS.length - 1 ? 'border-b border-[#E2DDD5]' : ''}`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 font-mono text-[11px] font-medium">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#0D0E18]">{paso.title}</p>
                      <p className="text-xs text-[#6B6E85] mt-0.5 leading-relaxed">{paso.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card — conditional */}
            {hasContactInfo && (
              <div className="bg-white border border-[#E2DDD5] rounded-2xl shadow-sm p-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B6E85] mb-3">
                  Contáctanos directamente
                </p>
                <div className="flex flex-col gap-1">
                  {EMPRESA.telefono && (
                    <ContactItem
                      href={`tel:${EMPRESA.telefono}`}
                      icon="phone"
                      label={EMPRESA.telefono}
                      sub="Llámanos"
                    />
                  )}
                  {EMPRESA.whatsapp && (
                    <ContactItem
                      href={`https://wa.me/${EMPRESA.whatsapp}`}
                      external
                      icon="chat"
                      label="WhatsApp"
                      sub="Chatear"
                    />
                  )}
                  {EMPRESA.email && (
                    <ContactItem
                      href={`mailto:${EMPRESA.email}`}
                      icon="mail"
                      label={EMPRESA.email}
                      sub="Escríbenos"
                    />
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

/* ── Sub-components ──────────────────────────────── */

function StatBox({ num, label }: { num: string; label: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 md:w-48">
      <div className="text-2xl font-bold text-white tracking-tight leading-none mb-1">{num}</div>
      <div className="text-xs text-white/40">{label}</div>
    </div>
  );
}

interface ContactItemProps {
  href: string;
  icon: string;
  label: string;
  sub: string;
  external?: boolean;
}

function ContactItem({ href, icon, label, sub, external }: ContactItemProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8F6F2] transition-colors"
    >
      <div className="w-8 h-8 rounded-lg bg-[#F8F6F2] border border-[#E2DDD5] flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[#3D3F52]" style={{ fontSize: 16 }}>
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <strong className="block text-[13px] font-semibold text-[#0D0E18] truncate">{label}</strong>
        <span className="text-xs text-[#6B6E85]">{sub}</span>
      </div>
    </a>
  );
}

function FormSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2DDD5] shadow-lg overflow-hidden animate-pulse">
      <div className="h-0.5 bg-primary/30" />
      <div className="px-7 py-6 border-b border-[#E2DDD5]">
        <div className="h-5 w-48 bg-[#F2EFE9] rounded" />
        <div className="h-3 w-72 bg-[#F2EFE9] rounded mt-2" />
      </div>
      <div className="px-7 py-6 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 w-28 bg-[#F2EFE9] rounded" />
            <div className="h-10 bg-[#F2EFE9] rounded-xl" />
          </div>
        ))}
        <div className="h-12 bg-[#F2EFE9] rounded-xl mt-4" />
      </div>
    </div>
  );
}
