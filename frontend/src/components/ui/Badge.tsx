import type { PropsWithChildren } from 'react';
const tones = { default: 'bg-slate-100 text-slate-800', success: 'bg-green-100 text-green-800', warning: 'bg-amber-100 text-amber-900', danger: 'bg-red-100 text-red-800', info: 'bg-sky-100 text-sky-800' };
export function Badge({ children, tone = 'default' }: PropsWithChildren<{ tone?: keyof typeof tones }>) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
