import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">Ben Digital Solutions</h1>
          <div className="space-x-4">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </nav>
      
      <header className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Digital Business Solutions</h2>
          <p className="text-xl mb-8">Transforming businesses with innovative digital solutions</p>
          <Link to="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
            Get Started
          </Link>
        </div>
      </header>
    </div>
  );
}
