import { useState } from 'react';
import { submitEnquiry } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitEnquiry(form);
      setStatus('Enquiry submitted successfully!');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setStatus('Error submitting enquiry');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({...form, phone: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Service"
          value={form.service}
          onChange={(e) => setForm({...form, service: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({...form, message: e.target.value})}
          className="w-full p-2 border rounded h-32"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Submit
        </button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
}
