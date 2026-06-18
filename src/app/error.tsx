'use client';

import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-5xl mb-6" aria-hidden="true">⚠️</p>
      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-3">
        Algo salió mal
      </h1>
      <p className="text-neutral-500 mb-8 max-w-md">
        {error.message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.'}
      </p>
      <Button onClick={reset}>Intentar de nuevo</Button>
    </div>
  );
}
