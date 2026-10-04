import { X } from 'lucide-react';
import type { ShopFilters } from '@/types';

interface ActiveFilterChipsProps {
  filters: ShopFilters;
  onRemove: (key: string, val?: string) => void;
  onClearAll: () => void;
  total: number;
}

export default function ActiveFilterChips({ filters, onRemove, onClearAll, total }: ActiveFilterChipsProps) {
  const chips: { key: string; val?: string; label: string }[] = [];

  if (filters.sub) {
    filters.sub.forEach(v => chips.push({ key: 'sub', val: v, label: v }));
  }
  if (filters.size) {
    filters.size.forEach(v => chips.push({ key: 'size', val: v, label: `Size: ${v}` }));
  }
  if (filters.condition) {
    filters.condition.forEach(v => chips.push({ key: 'condition', val: v, label: v }));
  }
  if (filters.rarity) {
    filters.rarity.forEach(v => chips.push({ key: 'rarity', val: v, label: v }));
  }
  if (filters.brand) {
    filters.brand.forEach(v => chips.push({ key: 'brand', val: v, label: v }));
  }
  if (filters.era) {
    filters.era.forEach(v => chips.push({ key: 'era', val: v, label: v }));
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice || 0;
    const max = filters.maxPrice || 'MAX';
    chips.push({ key: 'price', label: `₹${min} - ₹${max}` });
  }
  if (filters.q) {
    chips.push({ key: 'q', label: `"${filters.q}"` });
  }
  if (filters.curator) {
    chips.push({ key: 'curator', label: `Curator: ${filters.curator}` });
  }
  if (filters.filter) {
    chips.push({ key: 'filter', label: filters.filter.toUpperCase() });
  }
  if (filters.oneofone) {
    chips.push({ key: 'oneofone', label: '1 OF 1 ONLY' });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-2 mb-6" aria-live="polite">
      <span className="sr-only">{total} results found.</span>
      
      {chips.map((chip, i) => (
        <button
          key={`${chip.key}-${chip.val || i}`}
          onClick={() => onRemove(chip.key, chip.val)}
          className="chip !bg-crimson !text-stark !shadow-none !border-2 !border-black !py-1 !px-2 !min-h-0 flex items-center gap-1 text-[10px] hover:!bg-crimson-light"
        >
          {chip.label}
          <X size={12} strokeWidth={3} />
        </button>
      ))}

      <button
        onClick={onClearAll}
        className="font-mono text-[10px] text-stark-dim hover:text-crimson underline ml-2 py-1"
      >
        CLEAR ALL
      </button>
    </div>
  );
}
