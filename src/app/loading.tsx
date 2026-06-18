import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white gap-6">
      <div className="relative w-52 h-52">
        <Image
          src="/LOGO.png"
          alt="Travel Tours"
          fill
          priority
          sizes="208px"
          className="object-contain"
        />
      </div>

      {/* Barra de carga animada */}
      <div className="w-40 h-1 bg-primary/15 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-loading-bar" />
      </div>

      <p className="text-outline text-sm font-medium tracking-wide">Cargando...</p>
    </div>
  );
}
