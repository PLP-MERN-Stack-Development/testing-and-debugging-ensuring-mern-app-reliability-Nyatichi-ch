// services/api.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function fetchBugs() {
  const res = await fetch(`${API_BASE}/issues`);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
  return res.json();
}

export async function createBug(data) {
  const res = await fetch(`${API_BASE}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to create bug');
  }
  return res.json();
}

export async function updateBug(id, data) {
  const res = await fetch(`${API_BASE}/issues/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to update bug');
  }
  return res.json();
}

export async function deleteBug(id) {
  const res = await fetch(`${API_BASE}/issues/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to delete bug');
  }
  return res.json();
}
