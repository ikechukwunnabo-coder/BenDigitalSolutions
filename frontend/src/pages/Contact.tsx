import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { submitEnquiry } from '../services/api';
import { Alert, Button, Card, PageHeader, TextAreaField, TextField } from '../components/ui';

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

  return (
    <div className="bds-container py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <PageHeader title="Contact Us" description="Tell us about your needs. Your enquiry will be captured for follow-up by the admin team." />
          <Card className="text-sm text-slate-600"><p><strong>Location:</strong> Port Harcourt, Nigeria</p></Card>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-label="Contact enquiry form">
            <TextField label="Full name" name="name" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} error={errors.name} required />
            <TextField label="Email address" name="email" type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} error={errors.email} required />
            <TextField label="Phone number" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} required />
            <TextField label="Service of interest (optional)" name="service" value={form.service} onChange={(e) => set('service', e.target.value)} />
            <TextAreaField label="Message" name="message" value={form.message} onChange={(e) => set('message', e.target.value)} error={errors.message} className="h-32" required />
            <Button type="submit" loading={loading} disabled={loading}>Submit Enquiry</Button>
            {status.message ? <Alert variant={status.type === 'success' ? 'success' : 'error'}>{status.message}</Alert> : null}
          </form>
        </Card>
      </div>
    </div>
  );
}
