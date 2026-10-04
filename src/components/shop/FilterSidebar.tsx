import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import type { ShopFilters, Product, Gender, CategoryKey } from '@/types';
import { CATALOG, BUDGET_TIERS } from '@/data/catalog';
import { useUIStore } from '@/store/uiStore';
import FilterGroup from './FilterGroup';
import { Button } from '@/components/ui/Button';

// ─── PriceRange Component ───────────────────────────────────────────────────

function PriceRange({ 
  min, max, onSet 
}: { 
  min?: number; max?: number; onSet: (min?: number, max?: number) => void 
}) {
  const [localMin, setLocalMin] = useState(min || 0);
  const [localMax, setLocalMax] = useState(max || 2500);

  // Sync from props
  useEffect(() => { setLocalMin(min || 0); setLocalMax(max || 2500); }, [min, max]);

  // Debounce apply
  useEffect(() => {
    const timer = setTimeout(() => {
      onSet(localMin === 0 ? undefined : localMin, localMax === 2500 ? undefined : localMax);
    }, 250);
    return () => clearTimeout(timer);
  }, [localMin, localMax, onSet]);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), localMax - 50);
    setLocalMin(val);
  };
  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), localMin + 50);
    setLocalMax(val);
  };

  const leftPercent = (localMin / 2500) * 100;
  const rightPercent = (localMax / 2500) * 100;

  return (
    <div className="space-y-6 pt-2">
      <div className="relative h-6 w-full flex items-center">
        {/* Track */}
        <div className="absolute w-full h-2 bg-ink-900 border-2 border-black" />
        {/* Active Track */}
        <div 
          className="absolute h-2 bg-crimson border-y-2 border-black z-10" 
          style={{ left: `${leftPercent}%`, width: `${rightPercent - leftPercent}%` }} 
        />
        {/* Inputs */}
        <input 
          type="range" min="0" max="2500" step="50" value={localMin} onChange={handleMin}
          className="absolute w-full h-full appearance-none bg-transparent z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:rounded-full"
          aria-label="Minimum price"
        />
        <input 
          type="range" min="0" max="2500" step="50" value={localMax} onChange={handleMax}
          className="absolute w-full h-full appearance-none bg-transparent z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:rounded-full"
          aria-label="Maximum price"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 bg-ink border-2 border-black rounded-comic px-2 py-1 font-mono text-sm text-stark flex items-center">
          <span className="text-stark-dim mr-1">₹</span>
          <input 
            type="number" value={localMin} onChange={handleMin}
            className="w-full bg-transparent outline-none" 
            aria-label="Min price input"
          />
        </div>
        <div className="flex-1 bg-ink border-2 border-black rounded-comic px-2 py-1 font-mono text-sm text-stark flex items-center">
          <span className="text-stark-dim mr-1">₹</span>
          <input 
            type="number" value={localMax} onChange={handleMax}
            className="w-full bg-transparent outline-none" 
            aria-label="Max price input"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {BUDGET_TIERS.map(tier => (
          <button
            key={tier.label}
            onClick={() => onSet(undefined, tier.max)}
            className="font-mono text-[10px] bg-ink border-2 border-black px-2 py-1 text-stark-dim hover:text-gold hover:border-gold transition-colors"
          >
            {tier.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── FilterSidebar Component ────────────────────────────────────────────────

interface FilterSidebarProps {
  filters: ShopFilters;
  gender: Gender;
  category?: CategoryKey;
  products: Product[];
  onSetFilter: (key: keyof ShopFilters, val: any) => void;
  onToggle: (key: keyof ShopFilters, val: string) => void;
  onClear: () => void;
  activeCount: number;
  totalProducts: number;
  className?: string;
}

export default function FilterSidebar({ 
  filters, gender, category, products, onSetFilter, onToggle, onClear, activeCount, totalProducts, className 
}: FilterSidebarProps) {
  
  const drawerOpen = useUIStore(s => s.filterDrawerOpen);
  const setDrawerOpen = useUIStore(s => s.setFilterDrawerOpen);
  
  const [brandSearch, setBrandSearch] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Derive unique brands from current products (or all products if needed, passing products allows dynamic)
  const BRANDS = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), [products]);
  const filteredBrands = BRANDS.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));
  const displayedBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 8);

  // Derive subcategories for the current context
  const activeCatalog = CATALOG[gender || 'unisex'] || CATALOG.unisex;
  const subCats = category 
    ? activeCatalog.categories.find(c => c.key === category)?.subcategories 
    : activeCatalog.categories.flatMap(c => c.subcategories);

  const sizesMap = {
    Apparel: ['XS','S','M','L','XL','XXL'],
    Waist: ['28','30','32','34','36'],
    Shoe: ['UK6','UK7','UK8','UK9','UK10'],
    Other: ['FREE']
  };

  const handlePriceSet = (min?: number, max?: number) => {
    onSetFilter('minPrice', min);
    onSetFilter('maxPrice', max);
  };

  const closeDrawer = () => setDrawerOpen(false);

  // In the layout, desktop is always rendered (drawerOpen doesn't matter). 
  // We'll wrap the inner content.

  const content = (
    <div className="space-y-2">
      {/* 1. CATEGORY */}
      {subCats && subCats.length > 0 && (
        <FilterGroup title="CATEGORY" defaultOpen>
          <div className="space-y-2">
            {subCats.map(sub => {
              const checked = filters.sub?.includes(sub.slug);
              return (
                <label key={sub.slug} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black rounded-comic-sm shrink-0 group-hover:border-stark transition-colors">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={checked}
                      onChange={() => onToggle('sub', sub.slug)}
                    />
                    {checked && <div className="w-full h-full bg-crimson flex items-center justify-center text-stark">✓</div>}
                  </div>
                  <span className={clsx('font-sans text-sm transition-colors', checked ? 'text-stark font-medium' : 'text-stark-dim group-hover:text-stark')}>
                    {sub.label}
                  </span>
                  <span className="ml-auto font-mono text-[10px] opacity-40">{sub.count}</span>
                </label>
              );
            })}
          </div>
        </FilterGroup>
      )}

      {/* 2. PRICE */}
      <FilterGroup title="PRICE" defaultOpen>
        <PriceRange min={filters.minPrice} max={filters.maxPrice} onSet={handlePriceSet} />
      </FilterGroup>

      {/* 3. SIZE */}
      <FilterGroup title="SIZE" defaultOpen>
        <div className="space-y-4">
          {Object.entries(sizesMap).map(([group, sizes]) => (
            <div key={group}>
              <p className="font-mono text-[10px] text-stark-dim mb-2 uppercase tracking-wider">{group}</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => {
                  const checked = filters.size?.includes(size as any);
                  return (
                    <button
                      key={size}
                      onClick={() => onToggle('size', size)}
                      className={clsx(
                        'h-9 min-w-[2.25rem] px-2 font-mono text-sm border-2 border-black transition-colors',
                        checked ? 'bg-gold text-ink shadow-comic-sm' : 'bg-ink-700 text-stark hover:bg-ink-600'
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </FilterGroup>

      {/* 4. CONDITION */}
      <FilterGroup title="CONDITION">
        <div className="space-y-3">
          {[
            { val: 'MINT', color: 'bg-vibranium', desc: 'Flawless, deadstock or near new' },
            { val: 'EXCELLENT', color: 'bg-[#3DDC97]', desc: 'Minor signs of wear, well kept' },
            { val: 'GOOD', color: 'bg-gold', desc: 'Visible wear, true vintage fade' },
            { val: 'WORN-IN', color: 'bg-[#FF8A3D]', desc: 'Heavy distressing, thrashed' },
          ].map(c => {
            const checked = filters.condition?.includes(c.val as any);
            return (
              <label key={c.val} className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black rounded-comic-sm shrink-0 mt-0.5">
                  <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => onToggle('condition', c.val)} />
                  {checked && <div className="w-full h-full bg-crimson flex items-center justify-center text-stark">✓</div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${c.color}`} />
                    <span className={clsx('font-sans text-sm', checked ? 'text-stark' : 'text-stark-dim group-hover:text-stark')}>{c.val}</span>
                  </div>
                  <p className="font-mono text-[9px] text-stark-dim opacity-70 mt-1">{c.desc}</p>
                </div>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* 5. THRIFT RARITY */}
      <FilterGroup title="THRIFT RARITY">
        <div className="space-y-2">
          {['LEGENDARY', 'EPIC', 'RARE', 'UNCOMMON', 'COMMON'].map(r => {
            const checked = filters.rarity?.includes(r as any);
            return (
              <label key={r} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black rounded-comic-sm shrink-0">
                  <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => onToggle('rarity', r)} />
                  {checked && <div className="w-full h-full bg-crimson flex items-center justify-center text-stark">✓</div>}
                </div>
                <span className={clsx('font-sans text-sm transition-colors', checked ? 'text-stark' : 'text-stark-dim group-hover:text-stark')}>{r}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* 6. ERA */}
      <FilterGroup title="ERA">
        <div className="flex flex-wrap gap-2">
          {['80s', '90s', 'Y2K', '2010s'].map(era => {
            const checked = filters.era?.includes(era);
            return (
              <button
                key={era}
                onClick={() => onToggle('era', era)}
                className={clsx(
                  'px-3 py-1.5 font-mono text-sm border-2 border-black transition-colors',
                  checked ? 'bg-gold text-ink shadow-comic-sm' : 'bg-ink-700 text-stark hover:bg-ink-600'
                )}
              >
                {era}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* 7. BRAND */}
      <FilterGroup title="BRAND">
        <input 
          type="text" 
          placeholder="Search brands..." 
          value={brandSearch}
          onChange={e => setBrandSearch(e.target.value)}
          className="w-full bg-ink border-2 border-black rounded-comic px-3 py-2 font-sans text-sm text-stark placeholder:text-stark-dim mb-3 outline-none focus-visible:ring-2 focus-visible:ring-vibranium"
        />
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {displayedBrands.map(b => {
            const checked = filters.brand?.includes(b);
            return (
              <label key={b} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 bg-ink-700 border-2 border-black rounded-comic-sm shrink-0">
                  <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => onToggle('brand', b)} />
                  {checked && <div className="w-full h-full bg-crimson flex items-center justify-center text-stark">✓</div>}
                </div>
                <span className={clsx('font-sans text-sm transition-colors truncate', checked ? 'text-stark' : 'text-stark-dim group-hover:text-stark')}>{b}</span>
              </label>
            );
          })}
          {filteredBrands.length > 8 && !showAllBrands && (
            <button onClick={() => setShowAllBrands(true)} className="font-mono text-xs text-crimson hover:underline pt-2">
              SHOW MORE
            </button>
          )}
        </div>
      </FilterGroup>

      {/* 8. SPECIAL */}
      <FilterGroup title="SPECIAL" defaultOpen>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="font-sans text-sm text-stark-dim group-hover:text-stark transition-colors">NEW DROPS ONLY</span>
            <button 
              role="switch" 
              aria-checked={filters.filter === 'drops'}
              onClick={() => onSetFilter('filter', filters.filter === 'drops' ? undefined : 'drops')}
              className={clsx(
                "relative w-10 h-5 border-2 border-black rounded-full transition-colors flex items-center",
                filters.filter === 'drops' ? "bg-crimson" : "bg-ink-700"
              )}
            >
              <div className={clsx(
                "w-3 h-3 bg-stark border border-black rounded-full absolute top-0.5 transition-transform",
                filters.filter === 'drops' ? "translate-x-5" : "translate-x-1"
              )} />
            </button>
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <span className="font-sans text-sm text-stark-dim group-hover:text-stark transition-colors">1 OF 1 VINTAGE ONLY</span>
            <button 
              role="switch" 
              aria-checked={filters.oneofone}
              onClick={() => onSetFilter('oneofone', filters.oneofone ? undefined : true)}
              className={clsx(
                "relative w-10 h-5 border-2 border-black rounded-full transition-colors flex items-center",
                filters.oneofone ? "bg-gold" : "bg-ink-700"
              )}
            >
              <div className={clsx(
                "w-3 h-3 bg-stark border border-black rounded-full absolute top-0.5 transition-transform",
                filters.oneofone ? "translate-x-5" : "translate-x-1"
              )} />
            </button>
          </label>
        </div>
      </FilterGroup>
    </div>
  );

  // Desktop render
  const desktop = (
    <aside className={clsx("comic-border bg-ink-800 shadow-comic rounded-comic-xl p-5 flex-col", className)}>
      <div className="flex items-center justify-between mb-4 border-b-[3px] border-black pb-4">
        <h2 className="font-display text-3xl text-stark">FILTERS</h2>
        {activeCount > 0 && (
          <button onClick={onClear} className="font-mono text-xs text-crimson-light hover:underline uppercase">
            Clear All
          </button>
        )}
      </div>
      {content}
    </aside>
  );

  // Mobile drawer render
  if (drawerOpen) {
    return (
      <div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-0 z-[200] lg:hidden flex flex-col justify-end">
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={closeDrawer} aria-hidden="true" />
        
        <div className="relative bg-ink-800 border-t-[3px] border-black flex flex-col max-h-[90vh] w-full animate-slide-down shadow-[0_-8px_0_#000] rounded-t-comic-xl overflow-hidden">
          
          <div className="flex items-center justify-between px-5 py-4 border-b-[3px] border-black bg-ink flex-shrink-0">
            <h2 className="font-display text-3xl text-stark">FILTERS</h2>
            <button onClick={closeDrawer} className="p-1 text-stark-dim hover:text-stark"><X size={24} /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-2">
            {content}
          </div>

          <div className="p-4 border-t-[3px] border-black bg-ink flex gap-3 flex-shrink-0">
            <Button variant="ghost" onClick={onClear} className="flex-1">CLEAR</Button>
            <Button variant="red" onClick={closeDrawer} className="flex-[2]">SHOW {totalProducts} PIECES</Button>
          </div>

        </div>
      </div>
    );
  }

  // If not mobile drawer open, and not lg, it hides itself via classes on parent in ShopPage.
  // But we render the desktop version anyway for the lg screen.
  return desktop;
}
