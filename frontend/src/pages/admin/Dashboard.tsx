import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { api.get('/dashboard/summary/').then(setData).catch(() => {}); }, []);
  const cards = [
    ['Customers', data?.customers], ['Leads', data?.leads_total], ['New Leads', data?.leads_new], ['Active Projects', data?.projects_active],
    ['Active Services', data?.services_active], ['Published Portfolio', data?.portfolio_published], ['Unread Notifications', data?.notifications_unread],
  ];
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={String(label)} className="rounded-lg border bg-white p-4 shadow-sm"><div className="text-sm text-slate-500">{label}</div><div className="text-2xl font-bold">{value ?? '—'}</div></div>
        ))}
      </div>
    </div>
  );
}
