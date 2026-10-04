import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap } from 'lucide-react';
import clsx from 'clsx';
import type { Product } from '@/types';
import { useWishlistStore } from '@/store/uiStore';
import ConditionBadge from './ConditionBadge';
import RarityTag from './RarityTag';
import QuickAddBar from './QuickAddBar';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard = memo(function ProductCard({ product, priority }: ProductCardProps) {
  const isWishlisted = useWishlistStore(s => s.has(product.id));
  const toggleWishlist = useWishlistStore(s => s.toggle);

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <article className="group relative bg-ink-800 comic-border shadow-comic transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-comic-red focus-within:shadow-comic-cyan flex flex-col h-full">
      {/* IMAGE BOX */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-700 border-b-[3px] border-black shrink-0">
        <Link to={`/product/${product.id}`} aria-label={product.title} className="block w-full h-full">
          <img 
            src={product.images[0]} 
            alt={product.title}
            loading={priority ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <img 
            src={product.images[1]} 
            alt={product.title}
            loading={priority ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
          />
        </Link>
        
        {/* TOP-LEFT stack */}
        <div className="absolute top-3 -left-2 z-10 flex flex-col items-start gap-2">
          {product.isOneOfOne && (
            <span className="bg-gold text-ink font-comic tracking-wide text-lg px-3 py-0.5 border-[3px] border-black shadow-comic-sm -rotate-3 rounded-comic-sm">
              1 OF 1 VINTAGE
            </span>
          )}
          {product.isNewDrop && (
            <span className="badge bg-crimson text-stark shadow-glow-red animate-pulse-glow flex items-center gap-1 ml-2">
              <Zap size={10} fill="currentColor" /> NEW DROP
            </span>
          )}
        </div>

        {/* TOP-RIGHT wishlist */}
        <button
          onClick={handleWishlist}
          aria-pressed={isWishlisted}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 p-2 bg-ink/50 backdrop-blur border-2 border-transparent rounded-full hover:border-black transition-colors"
        >
          <Heart 
            size={20} 
            className={clsx(
              'transition-all duration-300',
              isWishlisted ? 'fill-crimson text-crimson animate-pop-in' : 'text-stark hover:text-crimson'
            )} 
          />
        </button>

        {/* BOTTOM-LEFT Rarity */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0">
          <RarityTag rarity={product.rarity} />
        </div>

        <QuickAddBar product={product} />
      </div>

      {/* INFO */}
      <div className="p-3 space-y-2 flex flex-col flex-1">
        <div>
          <p className="font-mono text-[11px] text-vibranium uppercase truncate">
            {product.brand}
          </p>
          <Link to={`/product/${product.id}`} className="block focus-visible:outline-none">
            <h3 className="font-cond text-lg font-bold text-stark leading-tight line-clamp-2 mt-0.5 group-hover:text-gold transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="mt-auto">
          <div className="flex items-end gap-2 flex-wrap">
            <span className="font-display text-3xl text-gold leading-none">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="font-mono text-xs text-stark-dim line-through mb-1">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            {discount > 0 && (
              <span className="badge bg-crimson text-stark mb-1 border-transparent">- {discount}%</span>
            )}
          </div>
          
          <div className="flex items-center flex-wrap gap-2 mt-3 pt-3 border-t-2 border-black/30">
            <ConditionBadge condition={product.condition} short />
            <span className="badge bg-ink-700 text-stark border-stark-dim">{product.era}</span>
            <span className="font-mono text-[10px] text-stark-dim ml-auto">
              SIZE: {product.sizes.length === 1 ? product.sizes[0] : 'VARIES'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});

export default ProductCard;
