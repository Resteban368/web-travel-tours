'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cotizacionSchema, type CotizacionSchema } from '@/lib/utils/validators';
import { API_BASE_URL } from '@/config/api.config';

/* ── Country codes ───────────────────────────────── */
const PAISES = [
  { code: '+57',   flag: '🇨🇴', label: '+57' },
  { code: '+1',    flag: '🇺🇸', label: '+1'  },
  { code: '+52',   flag: '🇲🇽', label: '+52' },
  { code: '+54',   flag: '🇦🇷', label: '+54' },
  { code: '+56',   flag: '🇨🇱', label: '+56' },
  { code: '+51',   flag: '🇵🇪', label: '+51' },
  { code: '+58',   flag: '🇻🇪', label: '+58' },
  { code: '+593',  flag: '🇪🇨', label: '+593'},
  { code: '+591',  flag: '🇧🇴', label: '+591'},
  { code: '+595',  flag: '🇵🇾', label: '+595'},
  { code: '+598',  flag: '🇺🇾', label: '+598'},
  { code: '+507',  flag: '🇵🇦', label: '+507'},
  { code: '+506',  flag: '🇨🇷', label: '+506'},
  { code: '+34',   flag: '🇪🇸', label: '+34' },
  { code: '+44',   flag: '🇬🇧', label: '+44' },
  { code: '+55',   flag: '🇧🇷', label: '+55' },
];

const TODAY = new Date().toISOString().split('T')[0];

export function FormCotizacion() {
  const searchParams = useSearchParams();
  const tourId   = searchParams.get('tour')   ? Number(searchParams.get('tour'))   : undefined;
  const phone    = searchParams.get('phone')  ?? '';
  const asesorId = searchParams.get('asesor') ? Number(searchParams.get('asesor')) : null;

  const [asesorNombre, setAsesorNombre] = useState<string | null>(null);
  const [submitError, setSubmitError]   = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const fechaRetornoRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CotizacionSchema>({
    resolver: zodResolver(cotizacionSchema),
    defaultValues: { indicativo: '+57' },
  });

  /* Fetch asesor name */
  useEffect(() => {
    if (!asesorId) return;
    fetch(`${API_BASE_URL}/v1/cotizacion-form/asesor/${asesorId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.nombre) setAsesorNombre(data.nombre); })
      .catch(() => {});
  }, [asesorId]);

  /* Keep fecha_regreso.min in sync with fecha_salida */
  const fechaSalida = watch('fecha_salida');
  useEffect(() => {
    if (fechaRetornoRef.current) {
      fechaRetornoRef.current.min = fechaSalida || TODAY;
    }
  }, [fechaSalida]);

  const { ref: retornoZodRef, ...retornoRest } = register('fecha_regreso');

  const onSubmit = async (data: CotizacionSchema) => {
    setSubmitError(false);
    try {
      const telefono = data.indicativo + data.telefono.replace(/\s/g, '');
      const res = await fetch(`${API_BASE_URL}/v1/cotizacion-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_completo:    data.nombre_completo,
          correo_electronico: data.correo_electronico || null,
          telefono,
          numero_pasajeros:   Number(data.numero_pasajeros),
          fecha_salida:       data.fecha_salida,
          fecha_regreso:      data.fecha_regreso || null,
          origen:             data.origen,
          destino:            data.destino,
          edades_menores:     data.edades_menores || null,
          especificaciones:   data.especificaciones || null,
          tour_id:            tourId ?? null,
          phone,
          asesor_id:          asesorId,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2DDD5] shadow-lg overflow-hidden">
        <div className="h-0.5 bg-primary" />
        <div className="py-16 px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#0D0E18] flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 stroke-white fill-none stroke-[2.5]" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#0D0E18] mb-2 tracking-tight">Solicitud recibida</h2>
          <p className="text-[#6B6E85] text-sm leading-relaxed">
            Tu solicitud fue enviada exitosamente.<br />
            Pronto nos pondremos en contacto contigo.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#F5F2EC] border border-[#E2DDD5] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#3D3F52] mt-6">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
            </svg>
            Respuesta en las próximas 24 horas
          </div>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="bg-white rounded-2xl border border-[#E2DDD5] shadow-lg overflow-hidden">
      <div className="h-0.5 bg-primary" />

      {/* Card header */}
      <div className="px-7 pt-7 pb-5 border-b border-[#E2DDD5]">
        <h2 className="text-xl font-bold text-[#0D0E18] tracking-tight">Solicitud de Cotización</h2>
        <p className="text-xs text-[#6B6E85] mt-1">
          Todos los campos sin etiqueta <span className="font-mono bg-[#F5F2EC] border border-[#E2DDD5] rounded px-1 py-0.5 text-[10px]">opcional</span> son obligatorios
        </p>
      </div>

      <div className="px-7 pb-9 pt-6">
        {/* Asesor banner */}
        {asesorNombre && (
          <div className="mb-5 bg-primary/10 border border-primary text-primary rounded-xl px-4 py-2.5 text-sm font-semibold">
            Tu asesor: {asesorNombre}
          </div>
        )}

        {/* Tour badge */}
        {tourId && (
          <div className="mb-5 flex items-center gap-2 bg-[#F5F2EC] border border-[#E2DDD5] rounded-xl px-4 py-2.5 text-sm text-[#3D3F52]">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>confirmation_number</span>
            <span>Cotización para tour seleccionado <span className="font-mono text-[#6B6E85]">#{tourId}</span></span>
          </div>
        )}

        {/* Global error */}
        {submitError && (
          <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth={1.5} />
              <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
            Ocurrió un error al enviar el formulario. Por favor intenta nuevamente.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

          {/* ── Información personal ── */}
          <SectionLabel>Información personal</SectionLabel>

          <Field label="Nombre completo" error={errors.nombre_completo?.message}>
            <input
              {...register('nombre_completo')}
              type="text"
              autoComplete="name"
              placeholder="Tu nombre completo"
              className={inputCls(!!errors.nombre_completo)}
            />
          </Field>

          <Field label="Correo electrónico" optional error={errors.correo_electronico?.message}>
            <input
              {...register('correo_electronico')}
              type="email"
              autoComplete="email"
              placeholder="tucorreo@ejemplo.com"
              className={inputCls(!!errors.correo_electronico)}
            />
          </Field>

          <Field label="Teléfono / WhatsApp" error={errors.telefono?.message}>
            <div
              className={`flex border-[1.5px] rounded-xl overflow-hidden bg-[#F8F6F2] transition-colors focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 ${errors.telefono ? 'border-red-400' : 'border-[#E2DDD5]'}`}
            >
              <div className="relative border-r border-[#E2DDD5] shrink-0">
                <select
                  {...register('indicativo')}
                  className="h-full pl-3 pr-7 py-2.5 bg-transparent text-sm font-semibold text-[#0D0E18] outline-none cursor-pointer appearance-none min-w-[80px]"
                >
                  {PAISES.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.flag} {p.label}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6B6E85] pointer-events-none" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                {...register('telefono')}
                type="tel"
                autoComplete="tel"
                placeholder="300 123 4567"
                className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-[#B5B2AC] text-[#0D0E18]"
              />
            </div>
          </Field>

          {/* ── Detalles del viaje ── */}
          <SectionLabel>Detalles del viaje</SectionLabel>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Ciudad de origen" error={errors.origen?.message}>
              <input
                {...register('origen')}
                type="text"
                placeholder="Ej: Florencia"
                className={inputCls(!!errors.origen)}
              />
            </Field>
            <Field label="Ciudad de destino" error={errors.destino?.message}>
              <input
                {...register('destino')}
                type="text"
                placeholder="Ej: Cartagena"
                className={inputCls(!!errors.destino)}
              />
            </Field>
          </div>

          <Field label="Número de pasajeros" error={errors.numero_pasajeros?.message}>
            <input
              {...register('numero_pasajeros')}
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="¿Cuántas personas viajan?"
              className={inputCls(!!errors.numero_pasajeros)}
            />
          </Field>

          <div>
            <label className="block text-xs font-bold text-[#3D3F52] mb-2 tracking-wide">Fechas de viaje</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-[#6B6E85] mb-1.5 font-medium">Fecha de salida</label>
                <input
                  {...register('fecha_salida')}
                  type="date"
                  min={TODAY}
                  className={inputCls(!!errors.fecha_salida)}
                />
                {errors.fecha_salida && <ErrorMsg>{errors.fecha_salida.message}</ErrorMsg>}
              </div>
              <div>
                <label className="block text-[11px] text-[#6B6E85] mb-1.5 font-medium">
                  Regreso
                  <span className="font-mono bg-[#F5F2EC] border border-[#E2DDD5] rounded px-1 py-0.5 text-[10px] ml-1.5">opcional</span>
                </label>
                <input
                  {...retornoRest}
                  ref={(el) => {
                    retornoZodRef(el);
                    fechaRetornoRef.current = el;
                  }}
                  type="date"
                  min={fechaSalida || TODAY}
                  className={inputCls(false)}
                />
              </div>
            </div>
          </div>

          {/* ── Información adicional ── */}
          <SectionLabel>Información adicional</SectionLabel>

          <Field label="Menores de 12 años" optional>
            <input
              {...register('edades_menores')}
              type="text"
              placeholder="Ej: 5 años, 8 años"
              className={inputCls(false)}
            />
          </Field>

          <Field label="Especificaciones" optional>
            <textarea
              {...register('especificaciones')}
              rows={4}
              placeholder="Preferencias de hotel, tipo de habitación, necesidades especiales..."
              className={`${inputCls(false)} resize-y min-h-[96px] leading-relaxed`}
            />
          </Field>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 mt-4 bg-[#0D0E18] text-white rounded-xl text-[15px] font-bold tracking-tight hover:bg-[#1a1c2e] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[.99]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                Enviando...
              </span>
            ) : (
              'Enviar solicitud de cotización'
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-primary text-[10px] font-mono uppercase tracking-widest my-6 first:mt-0">
      <span>{children}</span>
      <div className="flex-1 h-px bg-[#E2DDD5]" />
    </div>
  );
}

interface FieldProps {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, optional, error, children }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#3D3F52] mb-2 tracking-wide">
        {label}
        {optional && (
          <span className="font-mono bg-[#F5F2EC] border border-[#E2DDD5] rounded px-1 py-0.5 text-[10px] ml-1.5 font-normal text-[#6B6E85]">
            opcional
          </span>
        )}
      </label>
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600 font-medium">
      <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth={1.5} />
        <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
      {children}
    </p>
  );
}

function inputCls(hasError: boolean) {
  return [
    'w-full px-3.5 py-2.5 rounded-xl border-[1.5px] text-sm text-[#0D0E18] bg-[#F8F6F2]',
    'placeholder:text-[#B5B2AC] outline-none transition-all duration-200',
    'focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10',
    hasError
      ? 'border-red-400 bg-white'
      : 'border-[#E2DDD5]',
  ].join(' ');
}
