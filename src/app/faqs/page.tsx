import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqAccordion } from '@/components/features/faqs/FaqAccordion';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { faqsApi } from '@/lib/api/faqs.api';
import { SITE_URL } from '@/config/api.config';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre tours | Travel Tours',
  description:
    'Resuelve todas tus dudas antes de reservar: documentos necesarios, política de reservas, menores de edad, equipaje, formas de pago y más. Agencia Travel Tours, Florencia, Caquetá.',
  keywords: [
    'preguntas frecuentes tours colombia',
    'dudas viajes florencia caquetá',
    'documentos para tour colombia',
    'cómo reservar tour travel tours',
    'política de cancelación tours',
  ],
  alternates: { canonical: `${SITE_URL}/faqs` },
  openGraph: {
    title: 'Preguntas frecuentes | Travel Tours',
    description: 'Todo lo que necesitas saber antes de reservar tu tour con Travel Tours Florencia, Caquetá.',
    url: `${SITE_URL}/faqs`,
    locale: 'es_CO',
    type: 'website',
  },
};

export default async function FaqsPage() {
  const faqs = await faqsApi.getAll();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
      <RevealOnScroll />

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 px-8 py-14 my-10 text-white text-center">
        {/* Círculos decorativos */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-secondary/10" aria-hidden="true" />

        <div className="relative">
          <span data-anim="scale" className="inline-flex items-center justify-center size-14 rounded-2xl bg-white/10 mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-7 text-secondary" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </span>
          <p data-anim="up" data-anim-delay="0.1s" className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">
            Resolvemos tus dudas
          </p>
          <h1 data-anim="up" data-anim-delay="0.18s" className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-3">
            Preguntas frecuentes
          </h1>
          <p data-anim="up" data-anim-delay="0.26s" className="text-primary-100 max-w-md mx-auto">
            Todo lo que necesitas saber antes de reservar tu tour con Travel Tours.
          </p>
          {faqs.length > 0 && (
            <p data-anim="fade" data-anim-delay="0.38s" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80">
              <span className="size-1.5 rounded-full bg-secondary inline-block" aria-hidden="true" />
              {faqs.length} preguntas respondidas
            </p>
          )}
        </div>
      </div>

      {/* Acordeón */}
      {faqs.length === 0 ? (
        <p className="text-center text-neutral-400 py-16">
          No hay preguntas frecuentes disponibles en este momento.
        </p>
      ) : (
        <div data-anim="up" data-anim-delay="0.05s">
          <FaqAccordion faqs={faqs} />
        </div>
      )}

      {/* CTA de contacto */}
      <div data-anim="up" data-anim-delay="0.08s" className="mt-12 rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <div data-anim="scale" className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 text-primary" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>
        <h2 data-anim="up" data-anim-delay="0.1s" className="font-display text-xl font-bold text-neutral-900 mb-2">
          ¿No encontraste tu respuesta?
        </h2>
        <p data-anim="up" data-anim-delay="0.18s" className="text-neutral-500 mb-6 max-w-sm mx-auto text-sm">
          Nuestro equipo está listo para resolver cualquier duda personalizada sobre tus planes de viaje.
        </p>
        <div data-anim="up" data-anim-delay="0.26s">
          <a
            href={`https://wa.me/573142266528?text=${encodeURIComponent('Hola, tengo una pregunta sobre los tours y me gustaría recibir más información.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Contáctanos por WhatsApp
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.pregunta,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.respuesta,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
