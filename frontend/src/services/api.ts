const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:8081/api';

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function normalizeList(data: any) {
  if (Array.isArray(data)) return data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  if (data?.data?.results && Array.isArray(data.data.results)) return data.data.results;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
}

async function request(path: string, options: RequestInit = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...((options.headers as any) || {}) };
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    const csrf = getCookie('csrftoken');
    if (csrf) headers['X-CSRFToken'] = csrf;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  });
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export const api = {
  get: (p: string) => request(p),
  post: (p: string, body?: any) => request(p, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: (p: string, body?: any) => request(p, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: (p: string, body?: any) => request(p, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  del: (p: string) => request(p, { method: 'DELETE' }),
};

export const fetchServices = () => api.get('/services/');
export const fetchService = (slug: string) => api.get(`/services/${slug}/`);
export const fetchPortfolio = () => api.get('/portfolio/');
export const fetchPortfolioItem = (slug: string) => api.get(`/portfolio/${slug}/`);
export const submitEnquiry = (data: any) => api.post('/enquiries/', data);
