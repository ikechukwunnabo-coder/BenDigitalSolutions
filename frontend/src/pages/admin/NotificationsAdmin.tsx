import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';
import { Alert, Badge, Button, Card, EmptyState, LoadingState, PageHeader } from '../../components/ui';

export default function NotificationsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = async () => { setLoading(true); setError(''); try { setItems(normalizeList(await api.get('/notifications/'))); } catch { setError('Unable to load notifications.'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const markRead = async (id: number) => { try { await api.post(`/notifications/${id}/mark_read/`); await load(); } catch { setError('Unable to mark notification as read.'); } };
  return (
    <div>
      <PageHeader title="In-app Notifications" description="Admin notifications (read/unread)." />
      {error ? <Alert variant="error" className="mb-4">{error}</Alert> : null}
      {loading ? <LoadingState label="Loading notifications?" /> : !items.length ? <EmptyState title="No notifications" description="New system notifications will appear here." /> : (
        <div className="space-y-2" aria-live="polite">{items.map((n) => (
          <Card key={n.id} className={n.is_read ? '' : 'ring-1 ring-sky-200'}>
            <div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2 font-medium">{n.title} {!n.is_read ? <Badge tone="info">Unread</Badge> : null}</div><div className="text-sm text-slate-600">{n.message}</div><div className="mt-1 text-xs text-slate-500">{n.notification_type} ? {n.created_at}</div></div>{!n.is_read ? <Button variant="secondary" onClick={()=>markRead(n.id)}>Mark read</Button> : null}</div>
          </Card>
        ))}</div>
      )}
    </div>
  );
}
