import { useState, useEffect } from 'react';
import clsx from 'clsx';
import type { CuratorStat } from '@/types';

interface StatBarsProps {
  stats: CuratorStat[];
  accent: 'crimson' | 'vibranium' | 'gold';
}

const ACCENT_BG = {
  crimson: 'bg-crimson',
  vibranium: 'bg-vibranium',
  gold: 'bg-gold',
};

function useAnimatedValue(endValue: number, delayMs: number = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setValue(endValue);
      return;
    }

    const timer = setTimeout(() => {
      setValue(endValue);
    }, delayMs); // Stagger start
    
    return () => clearTimeout(timer);
  }, [endValue, delayMs]);

  return value;
}

export default function StatBars({ stats, accent }: StatBarsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-3xl text-stark">POWER GRID</h3>
      <div className="space-y-3">
        {stats.map((stat, i) => {
          // Stagger each row by 100ms
          const activeWidth = useAnimatedValue(stat.value, 100 + i * 100);

          return (
            <div key={stat.key} className="flex items-center gap-3">
              <span className="font-cond text-stark-dim uppercase tracking-wider text-sm w-28 sm:w-36 shrink-0 leading-tight">
                {stat.label}
              </span>

              <div 
                className="flex-1 h-5 bg-ink border-3 border-black relative overflow-hidden"
                role="meter"
                aria-valuenow={stat.value}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={stat.label}
              >
                <div
                  className={clsx(
                    'absolute top-0 bottom-0 left-0 transition-all duration-700 ease-out',
                    ACCENT_BG[accent]
                  )}
                  style={{ 
                    width: `${activeWidth}%`,
                    // Mask creates 10 segments (9% color, 1% gap = 10%)
                    maskImage: 'repeating-linear-gradient(to right, black 0%, black 9%, transparent 9%, transparent 10%)',
                    WebkitMaskImage: 'repeating-linear-gradient(to right, black 0%, black 9%, transparent 9%, transparent 10%)',
                  }}
                />
              </div>

              <span className="font-mono text-stark font-bold text-sm w-8 shrink-0 text-right">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
