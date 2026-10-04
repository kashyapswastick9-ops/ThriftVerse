import type { Rarity } from '@/types';
import clsx from 'clsx';

const RARITY_STYLES: Record<Rarity, string> = {
  COMMON: 'bg-stark text-ink border-black',
  UNCOMMON: 'bg-vibranium text-ink border-black',
  RARE: 'bg-gold text-ink border-black',
  EPIC: 'bg-crimson text-stark border-black',
  LEGENDARY: 'bg-gradient-to-r from-gold via-crimson to-vibranium text-ink animate-pulse-glow border-black',
};

const BOLT_COUNT: Record<Rarity, number> = { COMMON: 1, UNCOMMON: 2, RARE: 3, EPIC: 4, LEGENDARY: 5 };

const RARITY_TITLES: Record<Rarity, string> = {
  COMMON: 'Found in most thrift stores',
  UNCOMMON: 'Shows up a few times a year',
  RARE: 'Only a handful surface per year',
  EPIC: 'Extremely hard to find',
  LEGENDARY: 'Once in a generation drop',
};

interface RarityTagProps {
  rarity: Rarity;
  className?: string;
}

export default function RarityTag({ rarity, className }: RarityTagProps) {
  return (
    <span 
      className={clsx('badge', RARITY_STYLES[rarity], className)}
      title={RARITY_TITLES[rarity]}
    >
      {'⚡'.repeat(BOLT_COUNT[rarity])} {rarity}
    </span>
  );
}
