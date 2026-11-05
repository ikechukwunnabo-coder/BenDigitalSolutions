import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';
import { Alert, Badge, Button, Card, EmptyState, LoadingState, PageHeader, SelectField, TextAreaField, TextField } from '../../components/ui';

export default function ProjectsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ customer: '', title: '', description: '', status: 'pending' });
  const statuses = ['pending','in_progress','completed','on_hold'].map((s) => ({ value: s, label: s }));
  const load = async () => { setLoading(true); setError(''); try { const [p, c] = await Promise.all([api.get('/projects/'), api.get('/customers/')]); setItems(normalizeList(p)); setCustomers(normalizeList(c)); } catch { setError('Unable to load projects.'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); setError(''); try { await api.post('/projects/', form); setForm({ customer: '', title: '', description: '', status: 'pending' }); await load(); } catch { setError('Unable to save project.'); } finally { setSaving(false); } };
  const update = async (id: number, status: string) => { try { await api.patch(`/projects/${id}/`, { status }); await load(); } catch { setError('Unable to update project status.'); } };
  return (
    <div>
      <PageHeader title="Projects" description="Track client projects and statuses." />
      {error ? <Alert variant="error" className="mb-4">{error}</Alert> : null}
      <Card className="mb-6"><form onSubmit={save} className="grid gap-3 md:grid-cols-2" aria-label="Add project form">
        <SelectField label="Customer" name="customer" value={form.customer} onChange={(e)=>setForm({...form,customer:e.target.value})} required options={[{value:'',label:'Select customer'}, ...customers.map((c:any)=>({value:String(c.id),label:c.name}))]} />
        <SelectField label="Status" name="status" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})} options={statuses} />
        <TextField label="Title" name="title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
        <div className="md:col-span-2"><TextAreaField label="Description" name="description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required /></div>
        <div className="md:col-span-2"><Button type="submit" loading={saving}>Add Project</Button></div>
      </form></Card>
      {loading ? <LoadingState label="Loading projects?" /> : !items.length ? <EmptyState title="No projects" description="Create a project for a customer." /> : (
        <div className="space-y-2">{items.map((p) => <Card key={p.id} className="flex flex-wrap items-center justify-between gap-3"><div><div className="flex items-center gap-2 font-medium">{p.title} <Badge tone={p.status==='completed'?'success':p.status==='in_progress'?'info':'default'}>{p.status}</Badge></div><div className="text-sm text-slate-600">Customer #{p.customer}</div></div><div className="w-full max-w-xs"><SelectField label="Update status" name={`project-status-${p.id}`} value={p.status} onChange={(e)=>update(p.id,e.target.value)} options={statuses} /></div></Card>)}</div>
      )}
    </div>
  );
}
