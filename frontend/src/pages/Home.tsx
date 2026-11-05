import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchServices, fetchPortfolio } from '../services/api';

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);

  useEffect(() => {
    fetchServices().then((d) => setServices((d.results || d || []).slice(0, 3))).catch(() => {});
    fetchPortfolio().then((d) => setPortfolio((d.results || d || []).slice(0, 2))).catch(() => {});
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-2 text-sm uppercase tracking-widest text-sky-300">Digital Business Platform</p>
            <h1 className="mb-4 text-4xl font-bold leading-tight">Practical digital solutions for growing businesses</h1>
            <p className="mb-8 text-slate-200">Ben Digital Solutions helps businesses in Port Harcourt and beyond build credible web presence, manage leads, and deliver client work with confidence.</p>
            <div className="flex gap-3">
              <Link to="/contact" className="rounded bg-sky-500 px-5 py-3 font-semibold text-white hover:bg-sky-400">Request a Consultation</Link>
              <Link to="/services" className="rounded border border-white/30 px-5 py-3 font-semibold hover:bg-white/10">View Services</Link>
            </div>
          </div>
          <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
            <h2 className="mb-3 font-semibold">What this MVP delivers</h2>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• Public website with services and portfolio</li>
              <li>• Enquiry capture and lead management</li>
              <li>• Customer, project, notification, and audit modules</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Services</h2>
          <Link to="/services" className="text-sky-700 hover:underline">All services</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((s: any) => (
            <Link key={s.id || s.slug} to={`/services/${s.slug}`} className="rounded-lg border bg-white p-5 shadow-sm hover:border-sky-300">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{s.description}</p>
            </Link>
          ))}
          {!services.length && <p className="text-slate-500">Services will appear here once added in admin.</p>}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold">Recent Work</h2>
            <Link to="/portfolio" className="text-sky-700 hover:underline">View portfolio</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {portfolio.map((p: any) => (
              <Link key={p.id || p.slug} to={`/portfolio/${p.slug}`} className="rounded-lg border p-5 hover:border-sky-300">
                <div className="text-sm text-slate-500">{p.client}</div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{p.description}</p>
              </Link>
            ))}
            {!portfolio.length && <p className="text-slate-500">Published portfolio items will appear here.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
