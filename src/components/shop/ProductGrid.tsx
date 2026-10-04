import clsx from 'clsx';
import type { Product } from '@/types';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import EmptyState from './EmptyState';
import { Button } from '@/components/ui/Button';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  total: number;
  loadMore: () => void;
  hasMore: boolean;
  density: 2 | 3;
}

export default function ProductGrid({ products, loading, total, loadMore, hasMore, density }: ProductGridProps) {
  if (!loading && products.length === 0) {
    return <EmptyState onClear={() => window.location.href = '/shop'} />;
  }

  return (
    <div className="flex flex-col">
      <div 
        className={clsx(
          'grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3',
          density === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'
        )}
      >
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
        {loading && products.length === 0 && Array.from({ length: 12 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex flex-col items-center">
          <p className="font-mono text-xs text-stark-dim mb-3">
            SHOWING {products.length} OF {total}
          </p>
          <div className="w-full max-w-xs h-3 border-[3px] border-black bg-ink-700 mb-6 overflow-hidden rounded-full">
            <div 
              className="h-full bg-crimson transition-all duration-300"
              style={{ width: `${Math.min(100, (products.length / total) * 100)}%` }}
            />
          </div>
          <Button 
            variant="red" 
            size="lg" 
            onClick={loadMore} 
            className="w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? 'LOADING...' : `LOAD MORE (${total - products.length})`}
          </Button>
        </div>
      )}
    </div>
  );
}
