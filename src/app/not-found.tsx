import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { RUTAS } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-bold text-primary/20 mb-4" aria-hidden="true">
        404
      </p>
      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-3">
        Página no encontrada
      </h1>
      <p className="text-neutral-500 mb-8 max-w-md">
        La página que buscas no existe o fue movida. Explora nuestros tours disponibles.
      </p>
      <Link href={RUTAS.tours}>
        <Button>Ver todos los tours</Button>
      </Link>
    </div>
  );
}
