import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  loading?: boolean;
};

const styles: Record<string, string> = {
  primary: 'bg-sky-600 text-white hover:bg-sky-500 disabled:bg-sky-300',
  secondary: 'bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-400',
  danger: 'bg-red-600 text-white hover:bg-red-500 disabled:bg-red-300',
  ghost: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 disabled:text-slate-400',
};

export function Button({ variant = 'primary', loading, className = '', disabled, children, type = 'button', ...props }: Props) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center rounded px-4 py-2 text-sm font-semibold transition focus-visible:outline-none ${styles[variant]} ${className}`}
      {...props}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}
