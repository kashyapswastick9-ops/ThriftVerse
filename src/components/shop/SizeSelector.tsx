import { useEffect } from 'react';
import type { Size } from '@/types';
import clsx from 'clsx';

const SELECTED_SIZE = 'bg-gold text-ink border-2 border-black font-mono text-sm shadow-comic-sm';
const UNSELECTED_SIZE = 'bg-ink-700 text-stark border-2 border-black font-mono text-sm hover:bg-ink-600';

interface SizeSelectorProps {
  sizes: Size[];
  selected: Size | null;
  onSelect: (s: Size) => void;
  compact?: boolean;
}

export default function SizeSelector({ sizes, selected, onSelect, compact }: SizeSelectorProps) {
  useEffect(() => {
    if (sizes.length === 1 && !selected) {
      onSelect(sizes[0]);
    }
  }, [sizes, selected, onSelect]);

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map(size => (
        <button
          key={size}
          type="button"
          onClick={() => onSelect(size)}
          className={clsx(
            compact ? 'h-9 min-w-[2.25rem] px-1' : 'h-11 min-w-[2.75rem] px-2',
            'rounded-comic-sm',
            selected === size ? SELECTED_SIZE : UNSELECTED_SIZE,
            'transition-colors duration-150 flex items-center justify-center'
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
