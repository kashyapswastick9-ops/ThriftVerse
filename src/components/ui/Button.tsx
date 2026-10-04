import { type ElementType, type ReactNode, type ComponentPropsWithRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = 'gold' | 'red' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: ElementType;
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

type ButtonProps = ButtonOwnProps & Omit<ComponentPropsWithRef<'button'>, keyof ButtonOwnProps>;

// ─── Style maps (no dynamic class construction) ───────────────────────────────

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gold: 'btn-comic',
  red: 'btn-comic-red',
  ghost: 'btn-comic-ghost',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[36px]',
  md: 'px-5 py-2.5 text-sm gap-2 min-h-[44px]',
  lg: 'px-7 py-3 text-base gap-2.5 min-h-[52px]',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
  variant = 'gold',
  size = 'md',
  as,
  to,
  href,
  children,
  className,
  disabled,
  loading,
  leftIcon,
  rightIcon,
  ...rest
}: ButtonProps) {
  const baseClass = clsx(
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    disabled || loading ? 'opacity-50 pointer-events-none' : '',
    className
  );

  const content = (
    <>
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      {loading ? (
        <span className="inline-flex items-center gap-1.5">
          <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full" />
          {children}
        </span>
      ) : (
        children
      )}
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </>
  );

  // Router Link
  if (to !== undefined) {
    return (
      <Link to={to} className={baseClass} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  // External anchor
  if (href !== undefined) {
    return (
      <a
        href={href}
        className={baseClass}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled}
      >
        {content}
      </a>
    );
  }

  // Custom element
  const Tag = as ?? 'button';

  return (
    <Tag
      className={baseClass}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {content}
    </Tag>
  );
}
