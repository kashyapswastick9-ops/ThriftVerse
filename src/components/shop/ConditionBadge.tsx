import type { Condition } from '@/types';
import clsx from 'clsx';

const CONDITION_STYLES: Record<Condition, string> = {
  'MINT': 'bg-vibranium text-ink border-black',
  'EXCELLENT': 'bg-[#3DDC97] text-ink border-black',
  'GOOD': 'bg-gold text-ink border-black',
  'WORN-IN': 'bg-[#FF8A3D] text-ink border-black',
};

interface ConditionBadgeProps {
  condition: Condition;
  short?: boolean;
  className?: string;
}

export default function ConditionBadge({ condition, short, className }: ConditionBadgeProps) {
  return (
    <span className={clsx('badge', CONDITION_STYLES[condition], className)}>
      {short ? condition : `VINTAGE CONDITION: ${condition}`}
    </span>
  );
}
