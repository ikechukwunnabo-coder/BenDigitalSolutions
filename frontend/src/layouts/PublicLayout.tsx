import { Link, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-bold tracking-tight">Ben Digital Solutions</Link>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/" className="hover:text-sky-300">Home</Link>
            <Link to="/about" className="hover:text-sky-300">About</Link>
            <Link to="/services" className="hover:text-sky-300">Services</Link>
            <Link to="/portfolio" className="hover:text-sky-300">Portfolio</Link>
            <Link to="/contact" className="hover:text-sky-300">Contact</Link>
            <Link to="/admin/login" className="rounded bg-sky-600 px-3 py-1 hover:bg-sky-500">Admin</Link>
          </div>
        </div>
      </nav>
      <main><Outlet /></main>
      <footer className="mt-16 border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">&copy; {new Date().getFullYear()} Ben Digital Solutions. Port Harcourt, Nigeria.</div>
      </footer>
    </div>
  );
}
