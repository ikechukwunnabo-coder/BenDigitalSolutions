import { useEffect, useState } from 'react';
import { api, normalizeList } from '../../services/api';
import { Alert, Button, Card, EmptyState, LoadingState, PageHeader, TextField } from '../../components/ui';

export default function Customers() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const load = async () => { setLoading(true); setError(''); try { setItems(normalizeList(await api.get('/customers/'))); } catch { setError('Unable to load customers.'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const save = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); setError(''); try { await api.post('/customers/', form); setForm({ name: '', email: '', phone: '', company: '' }); await load(); } catch { setError('Unable to save customer.'); } finally { setSaving(false); } };
  const remove = async (id: number) => { if (!confirm('Delete this customer?')) return; try { await api.del(`/customers/${id}/`); await load(); } catch { setError('Unable to delete customer.'); } };
  return (
    <div>
      <PageHeader title="Customers" description="Manage customer records (admin-only)." />
      {error ? <Alert variant="error" className="mb-4">{error}</Alert> : null}
      <Card className="mb-6">
        <form onSubmit={save} className="grid gap-3 md:grid-cols-2" aria-label="Add customer form">
          <TextField label="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <TextField label="Email" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <TextField label="Phone" name="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <TextField label="Company (optional)" name="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <div className="md:col-span-2"><Button type="submit" loading={saving}>Add Customer</Button></div>
        </form>
      </Card>
      {loading ? <LoadingState label="Loading customers?" /> : !items.length ? <EmptyState title="No customers" description="Add a customer to begin tracking work." /> : (
        <div className="space-y-2">{items.map((c) => <Card key={c.id} className="flex items-center justify-between gap-3"><div><div className="font-medium">{c.name}</div><div className="text-sm text-slate-600">{c.email} ? {c.phone} ? {c.company || '?'}</div></div><Button variant="ghost" onClick={() => remove(c.id)}>Delete</Button></Card>)}</div>
      )}
    </div>
  );
}
