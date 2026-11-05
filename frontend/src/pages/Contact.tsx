import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { submitEnquiry } from '../services/api';

export default function Contact() {
  const location = useLocation() as any;
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: location?.state?.service || '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      await submitEnquiry(form);
      setStatus({ type: 'success', message: 'Enquiry submitted successfully. We will get back to you soon.' });
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err: any) {
      setStatus({ type: 'error', message: 'Unable to submit enquiry. Please check your details and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="mb-3 text-3xl font-bold">Contact Us</h1>
          <p className="text-slate-600">Tell us about your needs. Your enquiry will be captured for follow-up.</p>
          <div className="mt-6 rounded-lg border bg-white p-4 text-sm text-slate-600">
            <p><strong>Location:</strong> Port Harcourt, Nigeria</p>
            <p className="mt-2">Use the form to submit service enquiries, project requests, or general questions.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
          <input type="text" placeholder="Full name" value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full rounded border p-2" required />
          <input type="email" placeholder="Email address" value={form.email} onChange={(e) => set('email', e.target.value)} className="w-full rounded border p-2" required />
          <input type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => set('phone', e.target.value)} className="w-full rounded border p-2" required />
          <input type="text" placeholder="Service of interest (optional)" value={form.service} onChange={(e) => set('service', e.target.value)} className="w-full rounded border p-2" />
          <textarea placeholder="Message" value={form.message} onChange={(e) => set('message', e.target.value)} className="h-32 w-full rounded border p-2" required />
          <button type="submit" disabled={loading} className="rounded bg-sky-600 px-6 py-2 font-semibold text-white hover:bg-sky-500 disabled:opacity-60">{loading ? 'Submitting...' : 'Submit Enquiry'}</button>
          {status.message && <p className={status.type === 'success' ? 'text-green-700' : 'text-red-600'}>{status.message}</p>}
        </form>
      </div>
    </div>
  );
}
