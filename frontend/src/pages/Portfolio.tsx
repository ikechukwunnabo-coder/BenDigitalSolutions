import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPortfolio } from '../services/api';

export default function Portfolio() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio().then((d) => setItems(d.results || d || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Portfolio</h1>
      <p className="mb-8 text-slate-600">Selected completed projects and outcomes.</p>
      {loading && <p>Loading...</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item: any) => (
          <Link key={item.id || item.slug} to={`/portfolio/${item.slug}`} className="rounded-lg border bg-white p-5 shadow-sm hover:border-sky-300">
            {item.image_url && <img src={item.image_url} alt={item.title} className="mb-3 h-40 w-full rounded object-cover" />}
            <div className="text-sm text-slate-500">{item.client}{item.project_date ? ` • ${item.project_date}` : ''}</div>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600 line-clamp-3">{item.description}</p>
          </Link>
        ))}
      </div>
      {!loading && !items.length && <p className="text-slate-500">No published portfolio items yet.</p>}
    </div>
  );
}
