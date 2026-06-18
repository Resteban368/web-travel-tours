import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'promo' | 'cupos' | 'tipo' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    promo: 'bg-primary text-white',
    cupos: 'bg-amber-500 text-white animate-pulse',
    tipo: 'bg-primary/10 text-primary border border-primary/20',
    default: 'bg-neutral-100 text-neutral-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
