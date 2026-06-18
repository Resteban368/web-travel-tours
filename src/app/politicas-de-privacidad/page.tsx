import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/config/api.config';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad y tratamiento de datos personales de Travel Tours. Conoce cómo protegemos tu información.',
  alternates: { canonical: `${SITE_URL}/politicas-de-privacidad` },
};

const SECCIONES = [
  {
    numero: '01',
    titulo: 'Responsable del tratamiento',
    icono: 'business',
    contenido: (
      <>
        <p>
          El sitio web de viajes <strong>TravelTours.com.co</strong>, con domicilio en Colombia,
          es responsable del tratamiento de los datos personales recopilados a través de este portal web.
        </p>
        <p className="mt-3">
          La empresa garantiza la protección de los datos personales de sus usuarios conforme a
          la legislación colombiana vigente.
        </p>
      </>
    ),
  },
  {
    numero: '02',
    titulo: 'Información que recopilamos',
    icono: 'database',
    contenido: (
      <>
        <p className="mb-4">Podemos recopilar la siguiente información de los usuarios:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {[
            'Nombre y apellidos',
            'Número de identificación',
            'Número de teléfono',
            'Dirección de correo electrónico',
            'Información de contacto',
            'Datos necesarios para reservas de viajes',
            'Datos de facturación',
            'Preferencias de viaje',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="material-symbols-outlined text-primary shrink-0" style={{ fontSize: 18 }}>
                check_circle
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-on-surface-variant">
          Esta información es recopilada cuando el usuario realiza una reserva, se registra en el
          sitio web, solicita información sobre servicios turísticos, o se suscribe a boletines y
          promociones.
        </p>
      </>
    ),
  },
  {
    numero: '03',
    titulo: 'Finalidad del tratamiento',
    icono: 'target',
    contenido: (
      <ul className="space-y-2">
        {[
          'Gestionar reservas y servicios turísticos',
          'Enviar información sobre promociones y ofertas',
          'Contactar a los usuarios sobre sus solicitudes o reservas',
          'Mejorar los servicios ofrecidos en el sitio web',
          'Procesar pagos y facturación',
          'Cumplir obligaciones legales y contractuales',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm text-on-surface-variant">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    numero: '04',
    titulo: 'Protección de la información',
    icono: 'shield',
    contenido: (
      <>
        <p className="mb-4">
          El sitio web adopta medidas de seguridad técnicas y administrativas para proteger la
          información de los usuarios contra:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icono: 'lock', texto: 'Acceso no autorizado' },
            { icono: 'delete_forever', texto: 'Pérdida de información' },
            { icono: 'edit_off', texto: 'Alteración o uso indebido de los datos' },
          ].map(({ icono, texto }) => (
            <div key={texto} className="flex flex-col items-center text-center gap-2 bg-surface-container-low rounded-xl p-4">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 28 }}>
                {icono}
              </span>
              <span className="text-xs font-medium text-on-surface-variant">{texto}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    numero: '05',
    titulo: 'Derechos de los titulares',
    icono: 'gavel',
    contenido: (
      <ul className="space-y-2">
        {[
          'Conocer, actualizar y rectificar sus datos personales',
          'Solicitar prueba de la autorización otorgada',
          'Ser informados sobre el uso de sus datos',
          'Revocar la autorización o solicitar la eliminación de los datos',
          'Presentar quejas ante la Superintendencia de Industria y Comercio',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary-container shrink-0" style={{ fontSize: 18 }}>
              verified
            </span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    numero: '06',
    titulo: 'Autorización del titular',
    icono: 'how_to_reg',
    contenido: (
      <p>
        Al utilizar este sitio web, el usuario autoriza de manera <strong>libre, previa, expresa e
        informada</strong> el tratamiento de sus datos personales para las finalidades descritas en
        esta política.
      </p>
    ),
  },
  {
    numero: '07',
    titulo: 'Uso de cookies',
    icono: 'cookie',
    contenido: (
      <>
        <p className="mb-4">Este sitio web puede utilizar cookies para:</p>
        <ul className="space-y-2 mb-4">
          {[
            'Mejorar la experiencia del usuario',
            'Analizar el comportamiento de navegación',
            'Personalizar contenidos y promociones',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary shrink-0" style={{ fontSize: 18 }}>
                check_circle
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-on-surface-variant">
          El usuario puede configurar su navegador para rechazar el uso de cookies si así lo desea.
        </p>
      </>
    ),
  },
  {
    numero: '08',
    titulo: 'Compartición de información',
    icono: 'share',
    contenido: (
      <>
        <p className="mb-4">Los datos personales podrán ser compartidos con:</p>
        <ul className="space-y-2">
          {[
            'Proveedores de servicios turísticos',
            'Plataformas de pago',
            'Autoridades competentes cuando la ley lo requiera',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary shrink-0" style={{ fontSize: 18 }}>
                arrow_forward
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-on-surface-variant">
          Siempre garantizando la protección de la información compartida.
        </p>
      </>
    ),
  },
  {
    numero: '09',
    titulo: 'Vigencia de la política',
    icono: 'calendar_month',
    contenido: (
      <p>
        La presente política de tratamiento de datos personales rige a partir de su publicación
        en el sitio web y podrá ser actualizada en cualquier momento conforme a cambios legales
        o internos de la empresa.
      </p>
    ),
  },
];

export default function PoliticasPrivacidadPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-10 md:py-16">

      {/* Encabezado */}
      <header className="mb-12 md:mb-16">
        <nav className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span className="material-symbols-outlined shrink-0" style={{ fontSize: 14 }}>chevron_right</span>
          <span className="text-primary">Política de Privacidad</span>
        </nav>

        <div className="flex items-start gap-4">
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 28 }}>privacy_tip</span>
          </div>
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-3">
              Política de Privacidad y Tratamiento de Datos Personales
            </h1>
            <p className="text-on-surface-variant text-base max-w-2xl leading-relaxed">
              En Travel Tours valoramos y respetamos tu privacidad. A continuación te explicamos
              cómo recopilamos, usamos y protegemos tu información personal.
            </p>
          </div>
        </div>
      </header>

      {/* Secciones */}
      <div className="space-y-6">
        {SECCIONES.map((seccion) => (
          <section
            key={seccion.numero}
            className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden"
          >
            {/* Cabecera de sección */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-outline-variant bg-surface-container-low">
              <span className="font-display text-3xl font-bold text-outline-variant leading-none">
                {seccion.numero}
              </span>
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>
                {seccion.icono}
              </span>
              <h2 className="font-semibold text-lg text-on-surface">{seccion.titulo}</h2>
            </div>
            {/* Contenido */}
            <div className="px-6 py-5 text-on-surface-variant leading-relaxed">
              {seccion.contenido}
            </div>
          </section>
        ))}
      </div>

      {/* Sección de contacto */}
      <section className="mt-8 rounded-2xl bg-primary text-on-primary p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-on-primary" style={{ fontSize: 26 }}>
            contact_support
          </span>
          <h2 className="font-display text-2xl font-bold">10. Contacto</h2>
        </div>
        <p className="mb-6 text-on-primary/90 text-sm leading-relaxed">
          Para consultas relacionadas con el tratamiento de datos personales, puedes comunicarte
          con nosotros a través de los siguientes canales:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="mailto:asesoria.traveltours@gmail.com"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3"
          >
            <span className="material-symbols-outlined shrink-0" style={{ fontSize: 20 }}>mail</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">Correo</p>
              <p className="text-sm font-medium break-all">asesoria.traveltours@gmail.com</p>
            </div>
          </a>
          <a
            href="https://wa.me/573142266528"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3"
          >
            <span className="material-symbols-outlined shrink-0" style={{ fontSize: 20 }}>phone</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">Teléfono</p>
              <p className="text-sm font-medium">314 226 6528</p>
            </div>
          </a>
          <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined shrink-0" style={{ fontSize: 20 }}>location_on</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">Dirección</p>
              <p className="text-sm font-medium">Carrera 7 No. 16a – 08, Barrio Normandía, Local 101</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
