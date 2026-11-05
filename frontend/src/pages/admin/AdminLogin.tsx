import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Alert, Button, Card, TextField } from '../../components/ui';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await api.get('/auth/csrf/'); await api.post('/auth/login/', form); navigate('/admin'); }
    catch { setError('Login failed. Use valid staff credentials.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md p-6">
        <form onSubmit={submit} aria-label="Admin login form" className="space-y-4" noValidate>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <TextField label="Username" name="username" autoComplete="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <TextField label="Password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {error ? <Alert variant="error">{error}</Alert> : null}
          <Button type="submit" className="w-full" loading={loading}>Sign in</Button>
          <Link to="/" className="block text-center text-sm text-sky-700 hover:underline">Back to website</Link>
        </form>
      </Card>
    </div>
  );
}
