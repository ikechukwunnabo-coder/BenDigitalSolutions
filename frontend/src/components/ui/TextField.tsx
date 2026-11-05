import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string; containerClassName?: string };

export function TextField({ label, error, hint, containerClassName = '', id, className = '', required, ...props }: Props) {
  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, '-');
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className={containerClassName}>
      <label htmlFor={inputId} className="bds-label">{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <input
        id={inputId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`w-full rounded border px-3 py-2 text-sm ${error ? 'border-red-500' : 'border-slate-300'} ${className}`}
        {...props}
      />
      {error ? <p id={`${inputId}-error`} className="bds-error" role="alert">{error}</p> : hint ? <p id={`${inputId}-hint`} className="bds-hint">{hint}</p> : null}
    </div>
  );
}
