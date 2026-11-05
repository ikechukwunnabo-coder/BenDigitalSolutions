import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';

export default function PortfolioAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', client: '', description: '', project_date: '', image_url: '', is_published: false, is_featured: false });
  const load = () => api.get('/portfolio/').then((d) => setItems(normalizeList(d)));
  useEffect(() => { load().catch(() => {}); }, []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); await api.post('/portfolio/', form); setForm({ title: '', client: '', description: '', project_date: '', image_url: '', is_published: false, is_featured: false }); load(); };
  const publish = async (p: any, v: boolean) => { await api.patch(`/portfolio/${p.slug}/`, { is_published: v }); load(); };
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Portfolio (CRUD + publish/unpublish)</h1>
      <form onSubmit={save} className="mb-6 grid gap-2 rounded border bg-white p-4 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
        <input className="rounded border p-2" placeholder="Client" value={form.client} onChange={(e)=>setForm({...form,client:e.target.value})} required />
        <input className="rounded border p-2" type="date" value={form.project_date} onChange={(e)=>setForm({...form,project_date:e.target.value})} required />
        <input className="rounded border p-2" placeholder="Image URL (optional)" value={form.image_url} onChange={(e)=>setForm({...form,image_url:e.target.value})} />
        <textarea className="rounded border p-2 md:col-span-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required />
        <label className="text-sm"><input type="checkbox" checked={form.is_published} onChange={(e)=>setForm({...form,is_published:e.target.checked})} /> Published</label>
        <label className="text-sm"><input type="checkbox" checked={form.is_featured} onChange={(e)=>setForm({...form,is_featured:e.target.checked})} /> Featured</label>
        <button className="rounded bg-sky-600 px-4 py-2 text-white md:col-span-2">Add Portfolio Item</button>
      </form>
      <div className="space-y-2">{items.map((p) => <div key={p.id} className="flex items-center justify-between rounded border bg-white p-3"><div><div className="font-medium">{p.title}</div><div className="text-sm text-slate-600">{p.client} • {p.is_published ? 'Published' : 'Draft'}</div></div><button onClick={() => publish(p, !p.is_published)} className="text-sm text-sky-700">{p.is_published ? 'Unpublish' : 'Publish'}</button></div>)}</div>
    </div>
  );
}
