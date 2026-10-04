import type { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  /** Aligns text: 'left' (default) | 'center' */
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-1',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="font-comic tracking-wide text-lg text-vibranium uppercase">
          {eyebrow}
        </p>
      )}

      <div className={clsx('flex items-end gap-4', align === 'center' && 'justify-center')}>
        {/* Title with crimson underline block offset behind */}
        <div className="relative inline-block">
          {/* Crimson block — sits behind text, offset down-right */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[10px] translate-y-[4px] translate-x-[4px] bg-crimson"
          />
          <h2 className="relative font-display text-5xl md:text-7xl text-stark leading-none">
            {title}
          </h2>
        </div>

        {/* Optional action (e.g. "View all" link) */}
        {action && (
          <div className="pb-2 shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
