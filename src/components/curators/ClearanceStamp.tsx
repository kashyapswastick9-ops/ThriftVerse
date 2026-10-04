import clsx from 'clsx';
import type { Curator } from '@/types';

interface ClearanceStampProps {
  clearance: Curator['clearance'];
  className?: string;
}

const STAMP_COLORS: Record<Curator['clearance'], string> = {
  ALPHA: 'border-gold text-gold',
  BETA: 'border-vibranium text-vibranium',
  GAMMA: 'border-crimson text-crimson',
  OMEGA: 'border-stark text-stark',
};

export default function ClearanceStamp({ clearance, className }: ClearanceStampProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'inline-block px-2 py-0.5 border-4 border-dashed -rotate-12 mix-blend-screen opacity-90 rounded-comic-sm',
        'font-comic text-xl tracking-widest leading-none pointer-events-none select-none',
        STAMP_COLORS[clearance],
        className
      )}
    >
      CLEARANCE: {clearance}
    </div>
  );
}
