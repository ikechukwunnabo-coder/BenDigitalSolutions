import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';
import { Alert, Badge, Button, Card, EmptyState, LoadingState, PageHeader, TextAreaField, TextField } from '../../components/ui';

export default function ServicesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', description: '', is_active: true });
  const load = async () => { setLoading(true); setError(''); try { setItems(normalizeList(await api.get('/services/'))); } catch { setError('Unable to load services.'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); setError(''); try { await api.post('/services/', form); setForm({ title: '', description: '', is_active: true }); await load(); } catch { setError('Unable to save service.'); } finally { setSaving(false); } };
  const toggle = async (s: any) => { try { await api.patch(`/services/${s.slug}/`, { is_active: !s.is_active }); await load(); } catch { setError('Unable to update service.'); } };
  return (
    <div>
      <PageHeader title="Services" description="Manage public service offerings." />
      {error ? <Alert variant="error" className="mb-4">{error}</Alert> : null}
      <Card className="mb-6"><form onSubmit={save} className="space-y-3" aria-label="Add service form">
        <TextField label="Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <TextAreaField label="Description" name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active</label>
        <Button type="submit" loading={saving}>Add Service</Button>
      </form></Card>
      {loading ? <LoadingState label="Loading services..." /> : !items.length ? <EmptyState title="No services" description="Create a service to display on the public site." /> : (
        <div className="space-y-2">{items.map((s) => <Card key={s.id} className="flex items-center justify-between gap-3"><div><div className="flex items-center gap-2 font-medium">{s.title} <Badge tone={s.is_active ? 'success' : 'default'}>{s.is_active ? 'Active' : 'Inactive'}</Badge></div></div><Button variant="secondary" onClick={() => toggle(s)}>{s.is_active ? 'Deactivate' : 'Activate'}</Button></Card>)}</div>
      )}
    </div>
  );
}
