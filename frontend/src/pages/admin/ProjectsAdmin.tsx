import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';

export default function ProjectsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [form, setForm] = useState({ customer: '', title: '', description: '', status: 'pending' });
  const load = async () => { setItems(normalizeList(await api.get('/projects/'))); setCustomers(normalizeList(await api.get('/customers/'))); };
  useEffect(() => { load().catch(() => {}); }, []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); await api.post('/projects/', form); setForm({ customer: '', title: '', description: '', status: 'pending' }); load(); };
  const update = async (id: number, status: string) => { await api.patch(`/projects/${id}/`, { status }); load(); };
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Projects</h1>
      <form onSubmit={save} className="mb-6 grid gap-2 rounded border bg-white p-4 md:grid-cols-2">
        <select className="rounded border p-2" value={form.customer} onChange={(e)=>setForm({...form,customer:e.target.value})} required><option value="">Select customer</option>{customers.map((c)=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <input className="rounded border p-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
        <textarea className="rounded border p-2 md:col-span-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required />
        <button className="rounded bg-sky-600 px-4 py-2 text-white md:col-span-2">Add Project</button>
      </form>
      <div className="space-y-2">{items.map((p) => <div key={p.id} className="flex items-center justify-between rounded border bg-white p-3"><div><div className="font-medium">{p.title}</div><div className="text-sm text-slate-600">Customer #{p.customer}</div></div><select value={p.status} onChange={(e)=>update(p.id,e.target.value)} className="rounded border p-1 text-sm">{['pending','in_progress','completed','on_hold'].map((s)=><option key={s} value={s}>{s}</option>)}</select></div>)}</div>
    </div>
  );
}
