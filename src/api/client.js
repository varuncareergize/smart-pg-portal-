import { BASE_URL } from '../api';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function publicApiGet(path, { params, signal } = {}) {
  const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  const url = new URL(path.replace(/^\//, ''), base);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      url.searchParams.set(key, Array.isArray(value) ? value.join(',') : String(value));
    }
  });

  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new ApiError('We could not load properties right now.', response.status);
  const body = await response.json();
  if (!body || !Object.prototype.hasOwnProperty.call(body, 'data')) {
    throw new ApiError('The property service returned an unexpected response.', response.status);
  }
  return body;
}
