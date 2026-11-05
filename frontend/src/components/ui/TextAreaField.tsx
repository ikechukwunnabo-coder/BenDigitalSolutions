import type { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; hint?: string };

export function TextAreaField({ label, error, hint, id, className = '', required, ...props }: Props) {
  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, '-');
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div>
      <label htmlFor={inputId} className="bds-label">{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <textarea
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
