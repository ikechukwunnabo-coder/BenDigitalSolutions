import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPortfolioItem } from '../services/api';

export default function PortfolioDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetchPortfolioItem(slug).then(setItem).catch(() => setError('Portfolio item not found.'));
  }, [slug]);

  if (error) return <div className="mx-auto max-w-4xl px-4 py-12"><p className="text-red-600">{error}</p></div>;
  if (!item) return <div className="mx-auto max-w-4xl px-4 py-12">Loading...</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link to="/portfolio" className="text-sm text-sky-700 hover:underline">&larr; Back to portfolio</Link>
      <h1 className="mt-3 text-3xl font-bold">{item.title}</h1>
      <p className="mt-1 text-slate-600">{item.client}{item.project_date ? ` - ${item.project_date}` : ''}</p>
      {item.image_url && <img src={item.image_url} alt={item.title} className="mt-6 max-h-96 w-full rounded-lg object-cover" />}
      <p className="mt-6 whitespace-pre-wrap text-slate-700">{item.description}</p>
    </div>
  );
}
