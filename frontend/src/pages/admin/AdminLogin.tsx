import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.get('/auth/csrf/');
      await api.post('/auth/login/', form);
      navigate('/admin');
    } catch {
      setError('Login failed. Use staff credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Admin Login</h1>
        <input className="mb-3 w-full rounded border p-2" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input className="mb-3 w-full rounded border p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <button className="w-full rounded bg-sky-600 py-2 font-semibold text-white">Sign in</button>
        <Link to="/" className="mt-4 block text-center text-sm text-sky-700">Back to website</Link>
      </form>
    </div>
  );
}
