import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';
import { Alert, Badge, Button, Card, EmptyState, LoadingState, PageHeader, TextAreaField, TextField } from '../../components/ui';

export default function PortfolioAdmin() {
  const empty = { title: '', client: '', description: '', project_date: '', image_url: '', is_published: false, is_featured: false };
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(empty);
  const load = async () => { setLoading(true); setError(''); try { setItems(normalizeList(await api.get('/portfolio/'))); } catch { setError('Unable to load portfolio items.'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); setError(''); try { await api.post('/portfolio/', form); setForm(empty); await load(); } catch { setError('Unable to save portfolio item.'); } finally { setSaving(false); } };
  const publish = async (p: any, v: boolean) => { try { await api.patch(`/portfolio/${p.slug}/`, { is_published: v }); await load(); } catch { setError('Unable to update publish status.'); } };
  return (
    <div>
      <PageHeader title="Portfolio" description="CRUD and publish/unpublish portfolio items." />
      {error ? <Alert variant="error" className="mb-4">{error}</Alert> : null}
      <Card className="mb-6"><form onSubmit={save} className="grid gap-3 md:grid-cols-2" aria-label="Add portfolio item form">
        <TextField label="Title" name="title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
        <TextField label="Client" name="client" value={form.client} onChange={(e)=>setForm({...form,client:e.target.value})} required />
        <TextField label="Project date" name="project_date" type="date" value={form.project_date} onChange={(e)=>setForm({...form,project_date:e.target.value})} required />
        <TextField label="Image URL (optional)" name="image_url" value={form.image_url} onChange={(e)=>setForm({...form,image_url:e.target.value})} />
        <div className="md:col-span-2"><TextAreaField label="Description" name="description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required /></div>
        <label className="text-sm"><input type="checkbox" checked={form.is_published} onChange={(e)=>setForm({...form,is_published:e.target.checked})} /> Published</label>
        <label className="text-sm"><input type="checkbox" checked={form.is_featured} onChange={(e)=>setForm({...form,is_featured:e.target.checked})} /> Featured</label>
        <div className="md:col-span-2"><Button type="submit" loading={saving}>Add Portfolio Item</Button></div>
      </form></Card>
      {loading ? <LoadingState label="Loading portfolio..." /> : !items.length ? <EmptyState title="No portfolio items" description="Add a project to showcase published work." /> : (
        <div className="space-y-2">{items.map((p) => <Card key={p.id} className="flex items-center justify-between gap-3"><div><div className="flex items-center gap-2 font-medium">{p.title} <Badge tone={p.is_published ? 'success' : 'warning'}>{p.is_published ? 'Published' : 'Draft'}</Badge>{p.is_featured ? <Badge tone="info">Featured</Badge> : null}</div><div className="text-sm text-slate-600">{p.client}</div></div><Button variant="secondary" onClick={() => publish(p, !p.is_published)}>{p.is_published ? 'Unpublish' : 'Publish'}</Button></Card>)}</div>
      )}
    </div>
  );
}
