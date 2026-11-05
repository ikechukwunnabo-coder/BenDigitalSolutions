import type { PropsWithChildren } from 'react';
export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={`bds-card p-4 ${className}`}>{children}</section>;
}
