import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function AuditAdmin() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { api.get('/audit/').then((d) => setItems(d.results || d || [])).catch(() => {}); }, []);
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Audit Log (Read-only)</h1>
      <p className="mb-4 text-sm text-slate-600">Restricted view of important admin/security events. Records cannot be edited or deleted.</p>
      <div className="overflow-auto rounded border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50"><tr><th className="p-2 text-left">Timestamp</th><th className="p-2 text-left">Actor</th><th className="p-2 text-left">Action</th><th className="p-2 text-left">IP</th></tr></thead>
          <tbody>{items.map((a) => <tr key={a.id} className="border-t"><td className="p-2">{a.timestamp}</td><td className="p-2">{a.actor || '—'}</td><td className="p-2">{a.action}</td><td className="p-2">{a.ip_address || '—'}</td></tr>)}</tbody>
        </table>
        {!items.length && <p className="p-3 text-slate-500">No audit entries yet.</p>}
      </div>
    </div>
  );
}
