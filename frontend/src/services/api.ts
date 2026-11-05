const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchServices() {
  const res = await fetch(`${API_BASE_URL}/services/`);
  return res.json();
}

export async function fetchPortfolio() {
  const res = await fetch(`${API_BASE_URL}/portfolio/`);
  return res.json();
}

export async function submitEnquiry(data: any) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
