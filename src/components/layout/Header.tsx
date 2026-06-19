import Image from 'next/image';
import Link from 'next/link';
import { RUTAS } from '@/lib/constants';
import { Navbar } from './Navbar';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        {/* Logo */}
        <Link href={RUTAS.home} className="shrink-0">
          <Image
            src="/logo2.png"
            alt="Travel Tours - Agencia de Viajes Florencia, Caquetá"
            width={180}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <Navbar />
      </div>
    </header>
  );
}
