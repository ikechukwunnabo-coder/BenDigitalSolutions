import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchService } from '../services/api';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetchService(slug).then(setService).catch(() => setError('Service not found.'));
  }, [slug]);

  if (error) return <div className="mx-auto max-w-4xl px-4 py-12"><p className="text-red-600">{error}</p><Link to="/services" className="text-sky-700">Back to services</Link></div>;
  if (!service) return <div className="mx-auto max-w-4xl px-4 py-12">Loading...</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link to="/services" className="text-sm text-sky-700 hover:underline">&larr; Back to services</Link>
      <h1 className="mt-3 mb-4 text-3xl font-bold">{service.title}</h1>
      <p className="mb-6 whitespace-pre-wrap text-slate-700">{service.description}</p>
      {service.features && <div className="mb-6 rounded-lg border bg-white p-4"><h2 className="font-semibold">Key features</h2><p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{service.features}</p></div>}
      <Link to="/contact" state={{ service: service.title }} className="inline-block rounded bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-500">Enquire about this service</Link>
    </div>
  );
}
