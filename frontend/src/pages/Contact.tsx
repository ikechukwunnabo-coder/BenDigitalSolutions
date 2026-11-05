import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { submitEnquiry } from '../services/api';

type Form = { name: string; email: string; phone: string; service: string; message: string };

export default function Contact() {
  const location = useLocation() as any;
  const [form, setForm] = useState<Form>({ name: '', email: '', phone: '', service: location?.state?.service || '', message: '' });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<Form> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (form.phone.trim().length < 7) e.phone = 'Valid phone is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    if (!validate()) return;
    setLoading(true);
    try {
      await submitEnquiry(form);
      setStatus({ type: 'success', message: 'Enquiry submitted successfully. We will get back to you soon.' });
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setErrors({});
    } catch (err: any) {
      const apiErrors = err?.data?.errors || err?.data;
      if (apiErrors && typeof apiErrors === 'object') setErrors((p) => ({ ...p, ...apiErrors }));
      setStatus({ type: 'error', message: 'Unable to submit enquiry. Please check your details and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const field = (k: keyof Form, label: string, type = 'text', area = false) => (
    <div>
      {area ? <textarea placeholder={label} value={form[k]} onChange={(e) => set(k, e.target.value)} className="h-32 w-full rounded border p-2" required={k==='message'} /> : <input type={type} placeholder={label} value={form[k]} onChange={(e) => set(k, e.target.value)} className="w-full rounded border p-2" required={['name','email','phone'].includes(k)} />}
      {errors[k] && <p className="mt-1 text-xs text-red-600">{String(errors[k])}</p>}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="mb-3 text-3xl font-bold">Contact Us</h1>
          <p className="text-slate-600">Tell us about your needs. Your enquiry will be captured for follow-up.</p>
          <div className="mt-6 rounded-lg border bg-white p-4 text-sm text-slate-600">
            <p><strong>Location:</strong> Port Harcourt, Nigeria</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6 shadow-sm" noValidate>
          {field('name','Full name')}
          {field('email','Email address','email')}
          {field('phone','Phone number','tel')}
          {field('service','Service of interest (optional)')}
          {field('message','Message','text',true)}
          <button type="submit" disabled={loading} className="rounded bg-sky-600 px-6 py-2 font-semibold text-white hover:bg-sky-500 disabled:opacity-60">{loading ? 'Submitting...' : 'Submit Enquiry'}</button>
          {status.message && <p className={status.type === 'success' ? 'text-green-700' : 'text-red-600'}>{status.message}</p>}
        </form>
      </div>
    </div>
  );
}
