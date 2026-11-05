import { useEffect, useState } from 'react';
import { fetchPortfolio } from '../services/api';

export default function Portfolio() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchPortfolio().then(setItems);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Our Portfolio</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item: any) => (
          <div key={item.id} className="border p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-2">{item.client}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
