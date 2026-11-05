import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function AdminLayout() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/me/').then((d) => { if (!d.user?.is_staff) throw new Error('forbidden'); setUser(d.user); }).catch(() => navigate('/admin/login')).finally(() => setLoading(false));
  }, [navigate]);

  const logout = async () => { try { await api.post('/auth/logout/'); } catch {} navigate('/admin/login'); };
  if (loading) return <div className="p-8">Checking session...</div>;

  const link = ({ isActive }: any) => `block rounded px-3 py-2 ${isActive ? 'bg-sky-600 text-white' : 'hover:bg-slate-100'}`;
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="min-h-screen w-60 border-r bg-white p-4">
          <Link to="/" className="mb-4 block text-sm text-sky-700">? Public site</Link>
          <h2 className="mb-4 font-bold">Admin Dashboard</h2>
          <nav className="space-y-1 text-sm">
            <NavLink to="/admin" end className={link}>Overview</NavLink>
            <NavLink to="/admin/leads" className={link}>Leads</NavLink>
            <NavLink to="/admin/customers" className={link}>Customers</NavLink>
            <NavLink to="/admin/services" className={link}>Services</NavLink>
            <NavLink to="/admin/portfolio" className={link}>Portfolio</NavLink>
            <NavLink to="/admin/projects" className={link}>Projects</NavLink>
            <NavLink to="/admin/notifications" className={link}>Notifications</NavLink>
            <NavLink to="/admin/audit" className={link}>Audit Log</NavLink>
          </nav>
          <div className="mt-8 border-t pt-4 text-sm">
            <div className="mb-2 text-slate-600">{user?.username}</div>
            <button onClick={logout} className="rounded border px-3 py-1">Logout</button>
          </div>
        </aside>
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  );
}
