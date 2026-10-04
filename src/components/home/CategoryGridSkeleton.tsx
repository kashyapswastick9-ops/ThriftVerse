import { Skeleton } from '@/components/ui/Skeleton';

export default function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 grid-flow-dense mt-8">
      {/* Featured Large Block */}
      <div className="col-span-2 lg:row-span-2">
        <Skeleton className="w-full h-full aspect-[16/10] lg:aspect-auto lg:min-h-[420px] rounded-comic-lg" />
      </div>
      
      {/* Remaining 4 smaller blocks */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="col-span-1">
          <Skeleton className="w-full aspect-[4/5] rounded-comic-lg" />
        </div>
      ))}
    </div>
  );
}
