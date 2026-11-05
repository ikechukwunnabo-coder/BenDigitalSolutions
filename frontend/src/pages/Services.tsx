import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchServices, normalizeList } from '../services/api';

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices()
      .then((d) => setServices(normalizeList(d)))
      .catch(() => setError('Unable to load services.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Services</h1>
      <p className="mb-8 text-slate-600">Explore how we can support your business goals.</p>
      {loading && <p>Loading services...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s: any) => (
          <Link key={s.id || s.slug} to={`/services/${s.slug}`} className="rounded-lg border bg-white p-5 shadow-sm hover:border-sky-300">
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-slate-600 line-clamp-4">{s.description}</p>
            {s.price && <p className="mt-4 font-semibold text-sky-700">NGN {s.price}</p>}
          </Link>
        ))}
      </div>
      {!loading && !services.length && !error && <p className="text-slate-500">No active services yet.</p>}
    </div>
  );
}
