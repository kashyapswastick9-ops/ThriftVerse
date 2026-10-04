import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductSkeleton() {
  return (
    <article className="bg-ink-800 comic-border shadow-comic flex flex-col h-full overflow-hidden rounded-comic-lg">
      <div className="relative aspect-[4/5] bg-ink-700 border-b-[3px] border-black shrink-0">
        <Skeleton className="absolute inset-0 rounded-none bg-ink-600" />
      </div>
      <div className="p-3 space-y-3 flex-1 flex flex-col">
        <Skeleton className="h-3 w-16 bg-ink-600 rounded-none" />
        <Skeleton className="h-5 w-full bg-ink-600 rounded-none" />
        <Skeleton className="h-5 w-3/4 bg-ink-600 rounded-none mt-1" />
        
        <div className="mt-auto pt-3">
          <Skeleton className="h-8 w-24 bg-ink-600 rounded-none" />
          <div className="flex gap-2 mt-3 pt-3 border-t-2 border-black/30">
            <Skeleton className="h-4 w-12 bg-ink-600 rounded-none" />
            <Skeleton className="h-4 w-10 bg-ink-600 rounded-none" />
          </div>
        </div>
      </div>
    </article>
  );
}
