import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Leads from './pages/admin/Leads';
import Customers from './pages/admin/Customers';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import PortfolioAdmin from './pages/admin/PortfolioAdmin';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import NotificationsAdmin from './pages/admin/NotificationsAdmin';
import AuditAdmin from './pages/admin/AuditAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="portfolio" element={<PortfolioAdmin />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="notifications" element={<NotificationsAdmin />} />
          <Route path="audit" element={<AuditAdmin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
