import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import clsx from 'clsx';

interface FilterGroupProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function FilterGroup({ title, defaultOpen = false, children }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b-2 border-black last:border-b-0 py-4">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full font-cond font-bold uppercase text-lg text-stark hover:text-gold transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      
      <div 
        className={clsx(
          'mt-4 overflow-hidden transition-all duration-200',
          !isOpen && 'hidden'
        )}
      >
        {children}
      </div>
    </div>
  );
}
