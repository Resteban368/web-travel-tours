import { Skeleton } from '@/components/ui/Skeleton';

export default function TourDetailLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-40" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Skeleton className="h-96 rounded-2xl sm:col-span-2" />
        <div className="space-y-3">
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
        </div>
      </div>
      <Skeleton className="h-40 rounded-2xl" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-5 w-full" />)}
      </div>
    </div>
  );
}
