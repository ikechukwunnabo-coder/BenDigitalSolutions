import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Button, LoadingState } from '../../components/ui';

export default function AdminLayout() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/me/').then((d) => { if (!d.user?.is_staff) throw new Error('forbidden'); setUser(d.user); }).catch(() => navigate('/admin/login')).finally(() => setLoading(false));
  }, [navigate]);

  const logout = async () => { try { await api.post('/auth/logout/'); } catch {} navigate('/admin/login'); };
  if (loading) return <div className="p-8"><LoadingState label="Checking session…" /></div>;

  const link = ({ isActive }: any) => `block rounded px-3 py-2 focus-visible:outline-none ${isActive ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`;
  return (
    <div className="min-h-screen bg-slate-100">
      <a href="#admin-main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Skip to main content</a>
      <div className="flex">
        <aside className="min-h-screen w-64 border-r bg-white p-4" aria-label="Admin navigation">
          <Link to="/" className="mb-4 block text-sm text-sky-700 hover:underline">? Public site</Link>
          <h2 className="mb-4 font-bold text-slate-900">Admin Dashboard</h2>
          <nav className="space-y-1 text-sm" aria-label="Admin sections">
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
            <div className="mb-2 text-slate-600" aria-label="Signed in user">{user?.username}</div>
            <Button variant="ghost" onClick={logout}>Logout</Button>
          </div>
        </aside>
        <main id="admin-main" className="flex-1 p-6" tabIndex={-1}><Outlet /></main>
      </div>
    </div>
  );
}
