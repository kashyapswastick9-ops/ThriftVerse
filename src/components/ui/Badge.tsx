import type { ReactNode } from 'react';
import clsx from 'clsx';

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeVariant = 'red' | 'gold' | 'cyan' | 'white' | 'black';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

// ─── Style map (full string literals — no dynamic construction) ───────────────

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  red: 'bg-crimson text-stark border-black',
  gold: 'bg-gold text-ink border-black',
  cyan: 'bg-vibranium text-ink border-black',
  white: 'bg-stark text-ink border-black',
  black: 'bg-ink text-stark border-stark',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Badge({ variant = 'red', children, className }: BadgeProps) {
  return (
    <span className={clsx('badge', VARIANT_CLASSES[variant], className)}>
      {children}
    </span>
  );
}
