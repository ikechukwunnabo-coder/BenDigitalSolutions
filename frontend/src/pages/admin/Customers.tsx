import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function Customers() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const load = () => api.get('/customers/').then((d) => setItems(d.results || d || []));
  useEffect(() => { load().catch(() => {}); }, []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); await api.post('/customers/', form); setForm({ name: '', email: '', phone: '', company: '' }); load(); };
  const remove = async (id: number) => { await api.del(`/customers/${id}/`); load(); };
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Customers</h1>
      <form onSubmit={save} className="mb-6 grid gap-2 rounded border bg-white p-4 md:grid-cols-4">
        {Object.keys(form).map((k) => <input key={k} className="rounded border p-2" placeholder={k} value={(form as any)[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required={['name','email','phone'].includes(k)} />)}
        <button className="rounded bg-sky-600 px-4 py-2 text-white md:col-span-4">Add Customer</button>
      </form>
      <div className="space-y-2">{items.map((c) => <div key={c.id} className="flex items-center justify-between rounded border bg-white p-3"><div><div className="font-medium">{c.name}</div><div className="text-sm text-slate-600">{c.email} • {c.phone} • {c.company || '—'}</div></div><button onClick={() => remove(c.id)} className="text-sm text-red-600">Delete</button></div>)}</div>
    </div>
  );
}
