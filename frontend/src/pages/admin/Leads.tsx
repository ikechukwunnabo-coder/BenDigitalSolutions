import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function Leads() {
  const [items, setItems] = useState<any[]>([]);
  const load = () => api.get('/crm/').then((d) => setItems(d.results || d || []));
  useEffect(() => { load().catch(() => {}); }, []);
  const updateStatus = async (id: number, status: string) => { await api.patch(`/crm/${id}/`, { status }); load(); };
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Leads & Enquiries</h1>
      <div className="space-y-3">
        {items.map((l) => (
          <div key={l.id} className="rounded border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div><div className="font-semibold">{l.name}</div><div className="text-sm text-slate-600">{l.email} • {l.phone} • {l.service || '—'}</div></div>
              <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)} className="rounded border p-1 text-sm">
                {['new','contacted','qualified','converted','lost'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <p className="mt-2 text-sm text-slate-700">{l.message}</p>
          </div>
        ))}
        {!items.length && <p className="text-slate-500">No leads yet.</p>}
      </div>
    </div>
  );
}
