import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function ServicesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', description: '', is_active: true });
  const load = () => api.get('/services/').then((d) => setItems(d.results || d || []));
  useEffect(() => { load().catch(() => {}); }, []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); await api.post('/services/', form); setForm({ title: '', description: '', is_active: true }); load(); };
  const toggle = async (s: any) => { await api.patch(`/services/${s.slug}/`, { is_active: !s.is_active }); load(); };
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Services</h1>
      <form onSubmit={save} className="mb-6 space-y-2 rounded border bg-white p-4">
        <input className="w-full rounded border p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea className="w-full rounded border p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active</label>
        <button className="rounded bg-sky-600 px-4 py-2 text-white">Add Service</button>
      </form>
      <div className="space-y-2">{items.map((s) => <div key={s.id} className="flex items-center justify-between rounded border bg-white p-3"><div><div className="font-medium">{s.title}</div><div className="text-sm text-slate-600">{s.is_active ? 'Active' : 'Inactive'}</div></div><button onClick={() => toggle(s)} className="text-sm text-sky-700">Toggle</button></div>)}</div>
    </div>
  );
}
