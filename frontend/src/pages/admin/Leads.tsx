import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';
import { Alert, Badge, Card, EmptyState, LoadingState, PageHeader, SelectField } from '../../components/ui';

export default function Leads() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);
  const load = async () => { setLoading(true); setError(''); try { setItems(normalizeList(await api.get('/crm/'))); } catch { setError('Unable to load leads.'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const updateStatus = async (id: number, status: string) => { setBusyId(id); try { await api.patch(`/crm/${id}/`, { status }); await load(); } catch { setError('Unable to update lead status.'); } finally { setBusyId(null); } };
  return (
    <div>
      <PageHeader title="Leads & Enquiries" description="Review enquiries, update statuses, and track follow-up." />
      {error ? <Alert variant="error" className="mb-4">{error}</Alert> : null}
      {loading ? <LoadingState label="Loading leads..." /> : null}
      {!loading && !items.length && !error ? <EmptyState title="No leads yet" description="New contact enquiries will appear here." /> : null}
      <div className="space-y-3" aria-live="polite">
        {items.map((l) => (
          <Card key={l.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2"><div className="font-semibold">{l.name}</div><Badge tone={l.status === 'new' ? 'info' : l.status === 'converted' ? 'success' : l.status === 'lost' ? 'danger' : 'default'}>{l.status}</Badge></div>
                <div className="text-sm text-slate-600">{l.email} &middot; {l.phone} &middot; {l.service || 'N/A'}</div>
              </div>
              <div className="w-full max-w-xs">
                <SelectField label="Status" name={`status-${l.id}`} value={l.status} disabled={busyId === l.id} onChange={(e) => updateStatus(l.id, e.target.value)} options={['new','contacted','qualified','converted','lost'].map((s) => ({ value: s, label: s }))} />
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">{l.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
