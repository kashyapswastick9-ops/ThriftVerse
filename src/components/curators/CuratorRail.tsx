import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { CURATORS, formatCompact } from '@/data/curators';

interface CuratorRailProps {
  activeSlug: string;
}

const RAIL_SELECTED_BG = {
  crimson: 'bg-crimson text-stark shadow-comic -translate-x-1 sm:-translate-y-1 lg:translate-y-0 lg:-translate-x-1',
  vibranium: 'bg-vibranium text-ink shadow-comic -translate-x-1 sm:-translate-y-1 lg:translate-y-0 lg:-translate-x-1',
  gold: 'bg-gold text-ink shadow-comic -translate-x-1 sm:-translate-y-1 lg:translate-y-0 lg:-translate-x-1',
};

export default function CuratorRail({ activeSlug }: CuratorRailProps) {
  return (
    <div 
      className="flex lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar gap-3 pb-4 lg:pb-0 pt-2 lg:pt-0"
      role="tablist"
      aria-orientation="vertical"
    >
      {CURATORS.map((curator) => {
        const isSelected = activeSlug === curator.slug;

        return (
          <Link
            key={curator.slug}
            to={`/curators/${curator.slug}`}
            role="tab"
            aria-selected={isSelected}
            className={clsx(
              "flex items-center gap-3 p-2 border-3 border-black min-w-[240px] lg:min-w-0 snap-start transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vibranium",
              isSelected 
                ? RAIL_SELECTED_BG[curator.accent]
                : "bg-ink-700 text-stark hover:bg-ink-600 hover:-translate-y-1 hover:shadow-comic-sm lg:hover:-translate-x-1 lg:hover:translate-y-0"
            )}
          >
            <img 
              src={curator.avatar} 
              alt="" 
              className={clsx(
                "w-12 h-12 lg:w-14 lg:h-14 shrink-0 object-cover border-2 border-black",
                !isSelected && "grayscale"
              )} 
            />
            
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="font-display text-xl lg:text-2xl leading-none truncate">{curator.alias}</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono text-[10px] tracking-wider truncate mr-2 opacity-80">
                  {curator.clearance}
                </span>
                <span className="font-mono text-[10px] opacity-80 whitespace-nowrap">
                  {formatCompact(curator.followers)}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
