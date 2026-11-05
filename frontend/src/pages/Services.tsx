import { useEffect, useState } from 'react';
import { fetchServices } from '../services/api';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices().then(setServices);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: any) => (
          <div key={service.id} className="border p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
            {service.price && <p className="text-blue-600 font-bold mt-4">?{service.price}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
