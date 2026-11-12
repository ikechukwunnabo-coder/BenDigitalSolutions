import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';
import { Alert, Card, EmptyState, LoadingState, PageHeader } from '../../components/ui';

export default function AuditAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { api.get('/audit/').then((d) => setItems(normalizeList(d))).catch(() => setError('Unable to load audit log.')).finally(() => setLoading(false)); }, []);
  return (
    <div>
      <PageHeader title="Audit Log" description="Restricted, read-only view of important admin/security events." />
      {error ? <Alert variant="error" className="mb-4">{error}</Alert> : null}
      {loading ? <LoadingState label="Loading audit log..." /> : !items.length ? <EmptyState title="No audit entries" description="Audit events will appear as actions occur." /> : (
        <Card className="overflow-auto p-0">
          <table className="min-w-full text-sm" aria-label="Audit log table">
            <thead className="bg-slate-50"><tr><th scope="col" className="p-2 text-left">Timestamp</th><th scope="col" className="p-2 text-left">Actor</th><th scope="col" className="p-2 text-left">Action</th><th scope="col" className="p-2 text-left">IP</th></tr></thead>
            <tbody>{items.map((a) => <tr key={a.id} className="border-t align-top"><td className="p-2 whitespace-nowrap">{a.timestamp}</td><td className="p-2">{a.actor || '?'}</td><td className="p-2">{a.action}</td><td className="p-2">{a.ip_address || '?'}</td></tr>)}</tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
