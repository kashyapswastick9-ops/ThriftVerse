import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  /** aria-label for screen readers */
  label?: string;
}

export function Skeleton({ className, label = 'Loading…' }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={clsx(
        'animate-pulse bg-ink-700 border-2 border-black',
        className
      )}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** Preset: product card skeleton */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" role="status" aria-label="Loading product">
      <Skeleton className="w-full aspect-[3/4]" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full" />
      <span className="sr-only">Loading product…</span>
    </div>
  );
}

/** Preset: page-level loading fallback */
export function PageSkeleton() {
  return (
    <div className="min-h-[60vh] flex flex-col gap-8 p-6" role="status" aria-label="Loading page">
      <Skeleton className="h-12 w-1/3" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
