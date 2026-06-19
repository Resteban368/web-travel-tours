'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { RUTAS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

const LINKS = [
  { href: RUTAS.home, label: 'Inicio' },
  { href: RUTAS.tours, label: 'Tours' },
  { href: RUTAS.galeria, label: 'Galería' },
  { href: RUTAS.nosotros, label: 'Nosotros' },
  { href: RUTAS.faqs, label: 'Preguntas frecuentes' },
  { href: RUTAS.cotizaciones, label: 'Cotizaciones' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="flex items-center gap-6">
      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-1">
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-primary/10 text-primary'
                  : 'text-neutral-600 hover:text-primary hover:bg-primary/5',
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link href={RUTAS.cotizaciones} className="hidden md:block">
        <Button color='primary' size="sm">Cotizar ahora</Button>
      </Link>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
        aria-expanded={menuAbierto}
      >
        <span className={cn('block w-5 h-0.5 bg-current transition-all', menuAbierto && 'rotate-45 translate-y-1.5')} />
        <span className={cn('block w-5 h-0.5 bg-current my-1 transition-all', menuAbierto && 'opacity-0')} />
        <span className={cn('block w-5 h-0.5 bg-current transition-all', menuAbierto && '-rotate-45 -translate-y-1.5')} />
      </button>

      {/* Mobile menu */}
      {menuAbierto && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-lg md:hidden z-50">
          <ul className="flex flex-col p-4 gap-1">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuAbierto(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 font-medium transition-colors',
                    pathname === href
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-700 hover:bg-primary/5',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href={RUTAS.cotizaciones} onClick={() => setMenuAbierto(false)}>
                <Button className="w-full">Cotizar ahora</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
