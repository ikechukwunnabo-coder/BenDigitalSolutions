import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';

export default function NotificationsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const load = () => api.get('/notifications/').then((d) => setItems(normalizeList(d)));
  useEffect(() => { load().catch(() => {}); }, []);
  const markRead = async (id: number) => { await api.post(`/notifications/${id}/mark_read/`); load(); };
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">In-app Notifications</h1>
      <div className="space-y-2">{items.map((n) => <div key={n.id} className={`rounded border p-3 ${n.is_read ? 'bg-white' : 'bg-sky-50'}`}><div className="flex items-center justify-between"><div className="font-medium">{n.title}</div>{!n.is_read && <button onClick={()=>markRead(n.id)} className="text-sm text-sky-700">Mark read</button>}</div><div className="text-sm text-slate-600">{n.message}</div><div className="mt-1 text-xs text-slate-500">{n.notification_type} • {n.created_at}</div></div>)}{!items.length && <p className="text-slate-500">No notifications.</p>}</div>
    </div>
  );
}
