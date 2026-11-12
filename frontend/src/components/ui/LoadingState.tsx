export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return <div role="status" aria-live="polite" className="bds-card p-4 text-sm text-slate-600">{label}</div>;
}
