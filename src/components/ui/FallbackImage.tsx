'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

const FALLBACK_SRC = '/logo-empresa.jpeg';

export default function FallbackImage({ onError, src, ...props }: ImageProps) {
  const isEmpty = !src || src === '';
  const [failed, setFailed] = useState(isEmpty);

  if (failed) {
    return (
      <div
        className={
          props.fill
            ? 'absolute inset-0 bg-white flex flex-col items-center justify-center gap-2'
            : 'relative w-full h-full bg-white flex flex-col items-center justify-center gap-2 rounded-xl'
        }
      >
        <div className="relative w-24 h-24 drop-shadow-sm">
          <Image
            src={FALLBACK_SRC}
            alt="Travel Tours"
            fill
            className="object-contain rounded-xl p-1"
          />
        </div>
        {!props.fill && (
          <span className="text-[10px] text-neutral-400 font-medium tracking-wide">
            Imagen no disponible
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      {...props}
      onError={() => setFailed(true)}
    />
  );
}
