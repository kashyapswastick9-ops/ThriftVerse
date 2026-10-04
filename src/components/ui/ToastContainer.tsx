import { X } from 'lucide-react';
import { useToastStore } from '@/store/uiStore';
import type { Toast, ToastVariant } from '@/types';
import clsx from 'clsx';

// ─── Style maps ───────────────────────────────────────────────────────────────

const BORDER_CLASSES: Record<ToastVariant, string> = {
  success: 'border-l-[5px] border-l-vibranium',
  error: 'border-l-[5px] border-l-crimson',
  warning: 'border-l-[5px] border-l-gold',
  info: 'border-l-[5px] border-l-stark-dim',
};

const ICON_TEXT: Record<ToastVariant, string> = {
  success: '✓',
  error: '✖',
  warning: '⚠',
  info: 'ℹ',
};

const ICON_CLASSES: Record<ToastVariant, string> = {
  success: 'text-vibranium',
  error: 'text-crimson',
  warning: 'text-gold',
  info: 'text-stark-dim',
};

// ─── Single Toast ─────────────────────────────────────────────────────────────

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={clsx(
        'comic-card flex items-start gap-3 pr-3 pl-0 py-3',
        'animate-pop-in w-[320px] max-w-[calc(100vw-2rem)]',
        BORDER_CLASSES[toast.variant]
      )}
    >
      {/* Icon */}
      <span
        aria-hidden="true"
        className={clsx('pl-3 pt-0.5 font-mono font-bold text-sm shrink-0', ICON_CLASSES[toast.variant])}
      >
        {ICON_TEXT[toast.variant]}
      </span>

      {/* Message */}
      <p className="flex-1 font-sans text-sm text-stark leading-snug pt-0.5">
        {toast.message}
      </p>

      {/* Dismiss */}
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 p-1 text-stark-dim hover:text-stark transition-colors
                   min-w-[28px] min-h-[28px] flex items-center justify-center"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── Toast Container ──────────────────────────────────────────────────────────

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className={clsx(
        'fixed z-[9998] flex flex-col gap-2 pointer-events-none',
        // Desktop: bottom-right; Mobile: bottom-center
        'bottom-6 right-4 sm:right-6',
        'items-end sm:items-end'
      )}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={removeToast} />
        </div>
      ))}
    </div>
  );
}

// ─── useToast hook ────────────────────────────────────────────────────────────

export function useToast() {
  const addToast = useToastStore((s) => s.addToast);

  return {
    toast: (message: string, variant: ToastVariant = 'info') =>
      addToast(message, variant),
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    warning: (message: string) => addToast(message, 'warning'),
    info: (message: string) => addToast(message, 'info'),
  };
}
