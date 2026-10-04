import { useRef } from 'react';
import clsx from 'clsx';
import Container from '@/components/layout/Container';
import type { Gender, GenderCatalog } from '@/types';
import { getGenderTotal } from '@/data/catalog';

interface GenderTabsProps {
  gender: Gender;
  setGender: (g: Gender) => void;
  catalog: Record<Gender, GenderCatalog>;
}

const GENDERS: Gender[] = ['men', 'women', 'unisex'];

export default function GenderTabs({ gender, setGender, catalog }: GenderTabsProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = GENDERS.indexOf(gender);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % GENDERS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + GENDERS.length) % GENDERS.length;
    }

    if (nextIndex !== currentIndex) {
      setGender(GENDERS[nextIndex]);
      tabsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <section className="bg-ink pt-12 pb-6" aria-label="Choose department">
      <Container>
        <div 
          role="tablist" 
          aria-label="Departments"
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6"
          onKeyDown={handleKeyDown}
        >
          {GENDERS.map((g, index) => {
            const isSelected = gender === g;
            const cat = catalog[g];
            const total = getGenderTotal(cat);

            return (
              <button
                key={g}
                ref={(el) => (tabsRef.current[index] = el)}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${g}`}
                id={`tab-${g}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setGender(g)}
                className={clsx(
                  'relative group flex flex-col items-center justify-center border-3 border-black px-8 py-3 -skew-x-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vibranium focus-visible:z-10',
                  isSelected 
                    ? 'bg-crimson text-stark shadow-comic scale-105 z-10' 
                    : 'bg-ink-700 text-stark-dim hover:bg-ink-600 hover:text-stark hover:-translate-y-1 hover:shadow-comic-sm'
                )}
              >
                <span className="skew-x-6 font-display text-3xl tracking-wide uppercase">
                  {cat.label}
                </span>
                <span className={clsx(
                  "skew-x-6 font-mono text-xs mt-1 transition-colors",
                  isSelected ? "text-stark" : "text-stark-dim group-hover:text-stark"
                )}>
                  {total.toLocaleString('en-IN')} PCS
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
