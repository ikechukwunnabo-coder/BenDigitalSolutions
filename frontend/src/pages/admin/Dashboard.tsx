import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Alert, Card, LoadingState, PageHeader } from '../../components/ui';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { api.get('/dashboard/summary/').then(setData).catch(() => setError('Unable to load dashboard summary.')).finally(() => setLoading(false)); }, []);
  const cards = [
    ['Customers', data?.customers], ['Leads', data?.leads_total], ['New Leads', data?.leads_new], ['Active Projects', data?.projects_active],
    ['Active Services', data?.services_active], ['Published Portfolio', data?.portfolio_published], ['Unread Notifications', data?.notifications_unread],
  ];
  return (
    <div>
      <PageHeader title="Overview" description="Operational summary across MVP modules." />
      {error ? <Alert variant="error" className="mb-4">{error}</Alert> : null}
      {loading ? <LoadingState label="Loading dashboard?" /> : (
        <div className="grid gap-4 md:grid-cols-3" aria-live="polite">
          {cards.map(([label, value]) => (
            <Card key={String(label)}><div className="text-sm text-slate-500">{label}</div><div className="text-2xl font-bold" aria-label={`${label}: ${value ?? 'unavailable'}`}>{value ?? '?'}</div></Card>
          ))}
        </div>
      )}
    </div>
  );
}
