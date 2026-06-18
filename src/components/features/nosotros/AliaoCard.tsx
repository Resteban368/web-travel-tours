'use client';

import Image from 'next/image';
import { useState } from 'react';

interface AliaoCardProps {
  nombre: string;
  dominio: string;
}

export function AliaoCard({ nombre, dominio }: AliaoCardProps) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${dominio}&size=128`;

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-100 bg-white px-4 py-5 min-h-[110px] hover:border-primary-200 hover:shadow-sm transition-all">
      {!imgError ? (
        <Image
          src={logoUrl}
          alt={`Logo ${nombre}`}
          width={96}
          height={48}
          className="h-12 w-auto max-w-[96px] object-contain"
          onError={() => setImgError(true)}
          unoptimized
        />
      ) : (
        // Fallback — inicial de la empresa en círculo azul
        <span className="flex size-12 items-center justify-center rounded-full bg-primary-100 text-primary font-bold text-xl select-none">
          {nombre[0]}
        </span>
      )}
      <span className="text-xs font-semibold text-neutral-600 text-center leading-tight">
        {nombre}
      </span>
    </div>
  );
}
