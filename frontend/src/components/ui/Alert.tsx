import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ variant?: 'success' | 'error' | 'info' | 'warning'; title?: string; className?: string }>;
const map = {
  success: 'border-green-200 bg-green-50 text-green-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-sky-200 bg-sky-50 text-sky-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
};

export function Alert({ variant = 'info', title, className = '', children }: Props) {
  return (
    <div role={variant === 'error' ? 'alert' : 'status'} aria-live={variant === 'error' ? 'assertive' : 'polite'} className={`rounded border px-4 py-3 text-sm ${map[variant]} ${className}`}>
      {title ? <div className="font-semibold">{title}</div> : null}
      {children ? <div className={title ? 'mt-1' : ''}>{children}</div> : null}
    </div>
  );
}
