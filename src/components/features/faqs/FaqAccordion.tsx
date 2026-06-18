'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import type { Faq } from '@/lib/types/faq.types';

interface FaqAccordionProps {
  faqs: Faq[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [abierto, setAbierto] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const toggle = (id: number) => setAbierto((prev) => (prev === id ? null : id));

  const faqsFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return faqs;
    return faqs.filter(
      (f) =>
        f.pregunta.toLowerCase().includes(termino) ||
        f.respuesta.toLowerCase().includes(termino),
    );
  }, [faqs, busqueda]);

  return (
    <div className="space-y-4">
      {/* Buscador */}
      <div className="relative mb-8">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-400"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="search"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setAbierto(null);
          }}
          placeholder="Buscar pregunta..."
          className="w-full rounded-xl border border-neutral-200 bg-white py-3.5 pl-12 pr-4 text-sm text-neutral-800 placeholder:text-neutral-400 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
          aria-label="Buscar preguntas frecuentes"
        />
        {busqueda && (
          <button
            onClick={() => setBusqueda('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>

      {/* Sin resultados */}
      {faqsFiltradas.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-4xl mb-3" aria-hidden="true">🔍</p>
          <p className="font-medium text-neutral-600">
            No hay preguntas que coincidan con &ldquo;{busqueda}&rdquo;.
          </p>
          <button
            onClick={() => setBusqueda('')}
            className="mt-3 text-sm text-primary underline hover:no-underline"
          >
            Ver todas las preguntas
          </button>
        </div>
      )}

      {/* Lista de preguntas */}
      <div className="space-y-3">
        {faqsFiltradas.map((faq, index) => {
          const estaAbierto = abierto === faq.id_faq;
          const numero = String(index + 1).padStart(2, '0');

          return (
            <div
              key={faq.id_faq}
              className={cn(
                'rounded-2xl border bg-white transition-all duration-200',
                estaAbierto
                  ? 'border-primary/30 shadow-md shadow-primary/5'
                  : 'border-neutral-100 shadow-sm hover:border-neutral-200 hover:shadow',
              )}
            >
              <button
                onClick={() => toggle(faq.id_faq)}
                aria-expanded={estaAbierto}
                className="flex w-full items-start gap-4 px-6 py-5 text-left"
              >
                {/* Número */}
                <span
                  className={cn(
                    'shrink-0 font-mono text-xs font-bold mt-0.5 transition-colors duration-200',
                    estaAbierto ? 'text-primary' : 'text-neutral-300',
                  )}
                  aria-hidden="true"
                >
                  {numero}
                </span>

                {/* Pregunta */}
                <span
                  className={cn(
                    'flex-1 font-semibold text-sm sm:text-base leading-snug transition-colors duration-200',
                    estaAbierto ? 'text-primary' : 'text-neutral-800',
                  )}
                >
                  {formatearPregunta(faq.pregunta)}
                </span>

                {/* Chevron */}
                <span
                  className={cn(
                    'shrink-0 flex size-7 items-center justify-center rounded-full transition-all duration-300',
                    estaAbierto
                      ? 'bg-primary text-white rotate-180'
                      : 'bg-neutral-100 text-neutral-500',
                  )}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              {/* Respuesta animada */}
              <div
                className={cn(
                  'grid transition-all duration-300 ease-in-out',
                  estaAbierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <div className="mx-6 mb-5 border-l-2 border-primary/30 pl-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-600">
                      {faq.respuesta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contador de resultados al buscar */}
      {busqueda && faqsFiltradas.length > 0 && (
        <p className="text-center text-xs text-neutral-400 pt-2">
          {faqsFiltradas.length} {faqsFiltradas.length === 1 ? 'resultado' : 'resultados'} para &ldquo;{busqueda}&rdquo;
        </p>
      )}
    </div>
  );
}

function formatearPregunta(pregunta: string): string {
  return pregunta
    .replace(/['"]/g, '')
    .replace(/¿\s*/g, '¿')
    .trim();
}
