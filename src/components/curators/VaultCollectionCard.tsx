import { useState } from 'react';
import clsx from 'clsx';
import type { CuratedSet } from '@/types';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContainer';
import { useCartStore } from '@/store/cartStore';

interface VaultCollectionCardProps {
  set: CuratedSet;
  accent: 'crimson' | 'vibranium' | 'gold';
  index: number;
}

const ACCENT_BORDER = {
  crimson: 'border-crimson',
  vibranium: 'border-vibranium',
  gold: 'border-gold',
};

export default function VaultCollectionCard({ set, accent, index }: VaultCollectionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { success } = useToast();
  const addToCart = useCartStore((s) => s.add);

  const handleGrabSet = () => {
    // Mock a bundle CartItem
    const bundleItem = {
      productId: set.id,
      title: set.title,
      image: set.cover,
      price: set.totalPrice,
      size: 'FREE' as const,
    };
    addToCart(bundleItem);
    success('SET SECURED IN YOUR STASH!');
  };

  return (
    <div className={clsx('comic-card p-0 flex flex-col group', ACCENT_BORDER[accent])}>
      {/* Cover Image */}
      <div className="relative aspect-[4/5] overflow-hidden border-b-3 border-black bg-ink flex-shrink-0">
        <img
          src={set.cover}
          alt={set.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        
        {/* Set Tag */}
        <div className="absolute top-0 left-0 bg-stark text-ink font-mono text-xs font-bold px-3 py-1 border-r-3 border-b-3 border-black">
          SET 0{index + 1}
        </div>
        
        {/* Badge & Tags */}
        <div className="absolute bottom-4 inset-x-4 flex items-end justify-between z-10">
          <div className="flex flex-col gap-2 items-start">
            <span className="badge bg-gold text-ink shadow-comic-sm">
              {set.pieceCount} PIECES
            </span>
            <div className="flex gap-1">
              {set.tags.map((tag) => (
                <span key={tag} className="font-mono text-[9px] bg-ink/80 text-stark px-1.5 py-0.5 border border-stark/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 bg-ink-700">
        <h3 className="font-display text-3xl text-stark leading-none mb-1">{set.title}</h3>
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className="font-display text-3xl text-gold">₹{set.totalPrice.toLocaleString('en-IN')}</span>
          <span className="font-mono text-xs line-through text-stark-dim">
            worth ₹{(set.totalPrice * 2.4).toLocaleString('en-IN')}
          </span>
        </div>

        <div className="mt-auto space-y-3">
          {expanded && (
            <div className="animate-slide-down bg-ink border-2 border-black p-3 mb-3 font-sans text-xs text-stark-dim space-y-1">
              <p>• Heavyweight Graphic Tee (Vintage)</p>
              <p>• Parachute Cargo Pants (Archive)</p>
              {set.pieceCount > 2 && <p>• Distressed Canvas Cap</p>}
              {set.pieceCount > 3 && <p>• Signature Silver Chain</p>}
            </div>
          )}
          
          <div className="flex gap-3">
            <Button variant="gold" className="flex-1 !px-2" onClick={handleGrabSet}>
              GRAB THE SET
            </Button>
            <Button variant="ghost" className="!px-3" onClick={() => setExpanded(!expanded)}>
              PEEK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
