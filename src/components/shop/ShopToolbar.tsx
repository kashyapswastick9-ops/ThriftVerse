import { LayoutGrid, Grip, SlidersHorizontal } from 'lucide-react';
import clsx from 'clsx';
import { useUIStore } from '@/store/uiStore';

interface ShopToolbarProps {
  total: number;
  activeCount: number;
  sort: string;
  onSortChange: (s: string) => void;
  density: 2 | 3;
  onDensityChange: (d: 2 | 3) => void;
}

export default function ShopToolbar({ total, activeCount, sort, onSortChange, density, onDensityChange }: ShopToolbarProps) {
  const setFilterDrawerOpen = useUIStore(s => s.setFilterDrawerOpen);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b-[3px] border-black">
      
      {/* Mobile filter trigger */}
      <button 
        onClick={() => setFilterDrawerOpen(true)}
        className="lg:hidden btn-comic w-full sm:w-auto"
      >
        <SlidersHorizontal size={18} />
        FILTERS {activeCount > 0 && `(${activeCount})`}
      </button>
      
      {/* Spacer for desktop */}
      <div className="hidden lg:block w-[280px] shrink-0" />

      {/* Right controls */}
      <div className="flex items-center justify-between sm:justify-end w-full lg:w-auto gap-4">
        
        <div className="font-mono text-xs text-stark-dim whitespace-nowrap">
          {total} PIECE{total !== 1 ? 'S' : ''}
        </div>

        <select
          value={sort}
          onChange={e => onSortChange(e.target.value)}
          className="bg-ink-700 border-[3px] border-black rounded-comic text-stark font-cond uppercase px-3 py-1.5 shadow-comic-sm outline-none focus-visible:ring-4 focus-visible:ring-vibranium"
          aria-label="Sort by"
        >
          <option value="newest">NEW DROPS FIRST</option>
          <option value="price-asc">PRICE: LOW TO HIGH</option>
          <option value="price-desc">PRICE: HIGH TO LOW</option>
          <option value="rarity">RARITY</option>
          <option value="discount">BIGGEST STEAL</option>
        </select>

        {/* Density toggle (desktop only) */}
        <div 
          role="radiogroup" 
          aria-label="Grid density"
          className="hidden lg:flex border-[3px] border-black rounded-comic bg-ink-700 shadow-comic-sm overflow-hidden"
        >
          <button
            role="radio"
            aria-checked={density === 3}
            onClick={() => onDensityChange(3)}
            aria-label="3 columns"
            className={clsx(
              'p-1.5 transition-colors',
              density === 3 ? 'bg-gold text-ink' : 'text-stark-dim hover:text-stark hover:bg-ink-600'
            )}
          >
            <Grip size={18} />
          </button>
          <div className="w-[3px] bg-black" />
          <button
            role="radio"
            aria-checked={density === 2}
            onClick={() => onDensityChange(2)}
            aria-label="4 columns (compact)"
            className={clsx(
              'p-1.5 transition-colors',
              density === 2 ? 'bg-gold text-ink' : 'text-stark-dim hover:text-stark hover:bg-ink-600'
            )}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
        
      </div>
    </div>
  );
}
