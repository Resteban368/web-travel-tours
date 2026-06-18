import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { RUTAS } from '@/lib/constants';

export default function TourNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl mb-6" aria-hidden="true">🗺️</p>
      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-3">
        Tour no encontrado
      </h1>
      <p className="text-neutral-500 mb-8 max-w-md">
        Este tour no existe o ya no está disponible. Explora nuestros otros destinos.
      </p>
      <Link href={RUTAS.tours}>
        <Button>Ver todos los tours</Button>
      </Link>
    </div>
  );
}
