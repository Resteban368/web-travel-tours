import Link from 'next/link';
import Image from 'next/image';
import { EMPRESA, RUTAS } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-inverse-surface text-surface-container-highest">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-16 py-20 max-w-[1280px] mx-auto">

        {/* Marca */}
        <div className="space-y-4">
          <div>
            <Image
              src="/logo2.png"
              alt={`Logo ${EMPRESA.nombre}`}
              width={180}
              height={80}
              className="object-contain"
            />
          </div>
          <p className="text-base opacity-80 max-w-sm leading-relaxed">
            {EMPRESA.slogan}. Expertos en turismo regional y nacional con sede en Florencia, Caquetá.
          </p>
          <div className="flex gap-4 pt-2">
            {EMPRESA.email && (
              <a
                href={`mailto:${EMPRESA.email}`}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"
                aria-label="Correo electrónico"
              >
                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>mail</span>
              </a>
            )}
            {EMPRESA.whatsapp && (
              <a
                href={`https://wa.me/${EMPRESA.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"
                aria-label="WhatsApp"
              >
                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>chat</span>
              </a>
            )}
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"
              aria-label="Sitio web"
            >
              <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>public</span>
            </a>
          </div>
        </div>

        {/* Sedes */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Nuestra sede</h4>
          <ul className="space-y-4 text-base">
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary-fixed-dim shrink-0">location_on</span>
              <span>
                <strong className="text-white">Florencia —</strong>{' '}
                {EMPRESA.sede1}
              </span>
            </li>
            {EMPRESA.telefono && (
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary-fixed-dim shrink-0">call</span>
                <span>{EMPRESA.telefono}</span>
              </li>
            )}
            {EMPRESA.email && (
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary-fixed-dim shrink-0">mail</span>
                <span>{EMPRESA.email}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Navegación</h4>
          <ul className="space-y-3 text-base">
            <li>
              <Link href={RUTAS.home} className="opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link href={RUTAS.tours} className="opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors">
                Tours disponibles
              </Link>
            </li>
            <li>
              <Link href={RUTAS.nosotros} className="opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href={RUTAS.faqs} className="opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link href={RUTAS.cotizaciones} className="opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors">
                Solicitar cotización
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-8 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 text-sm">
          <p>© {year} {EMPRESA.nombre}. Todos los derechos reservados. Florencia, Caquetá, Colombia.</p>
          <div className="flex gap-6">
            <Link href="/politicas-de-privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
