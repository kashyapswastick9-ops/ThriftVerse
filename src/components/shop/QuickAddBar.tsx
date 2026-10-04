import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import type { Product, Size } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/uiStore';
import SizeSelector from './SizeSelector';

interface QuickAddBarProps {
  product: Product;
  className?: string;
}

export default function QuickAddBar({ product, className }: QuickAddBarProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [glitch, setGlitch] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const addToCart = useCartStore(s => s.add);
  const cartItems = useCartStore(s => s.items);
  const addToast = useToastStore(s => s.addToast);

  const isInCart = cartItems.some(item => item.productId === product.id);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation
    e.stopPropagation();

    if (isInCart) return;

    if (!selectedSize) {
      addToast('PICK A SIZE, HERO!', 'warning');
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
      return;
    }

    addToCart({
      productId: product.id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      size: selectedSize
    });
    
    addToast('SECURED IN YOUR STASH! ⚡', 'success');
  };

  return (
    <div 
      className={clsx(
        'absolute inset-x-0 bottom-0 bg-ink/95 border-t-[3px] border-black p-2 space-y-2 transition-transform duration-200 z-20',
        isTouchDevice 
          ? 'translate-y-0' 
          : 'translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0',
        className
      )}
      onClick={e => e.preventDefault()} // intercept clicks so card link doesn't trigger when interacting with add bar
    >
      <div className={clsx('transition-transform', glitch && '-translate-x-1 translate-y-0.5')}>
        <SizeSelector 
          sizes={product.sizes} 
          selected={selectedSize} 
          onSelect={setSelectedSize} 
          compact 
        />
      </div>
      
      <button
        onClick={handleAdd}
        disabled={isInCart}
        className={clsx(
          'w-full flex items-center justify-center gap-2 py-2 font-cond font-bold text-sm uppercase border-[3px] border-black transition-all',
          isInCart 
            ? 'bg-ink-600 text-stark-dim cursor-not-allowed shadow-none' 
            : 'bg-crimson text-stark hover:bg-crimson-light active:translate-y-1 shadow-comic-sm'
        )}
      >
        <ShoppingBag size={16} />
        {isInCart ? 'IN YOUR STASH ✓' : 'ADD TO STASH'}
      </button>
    </div>
  );
}
