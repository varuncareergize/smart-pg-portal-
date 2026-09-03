import { BASE_URL } from '../api';

// Maps our internal category keys to app routes and the backend's property_type values.
export const categoryConfig = {
  pg: { route: '/pg', propertyType: 'PG' },
  apartments: { route: '/apartments', propertyType: 'Apartment' },
  villas: { route: '/villas', propertyType: 'Villa' },
  office: { route: '/office', propertyType: 'Office' },
};

/**
 * Fetches properties from GET /properties/
 * Response shape: { success: true, data: [ {...flat property...} ] }
 *
 * Supported params:
 *  - page_size
 *  - locality (sent as `city`)
 *  - category (sent as `property_type`, mapped via categoryConfig)
 */
export async function getProperties(params = {}) {
  const query = new URLSearchParams();

  if (params.page_size) query.set('page_size', params.page_size);
  if (params.locality) query.set('city', params.locality);
  if (params.category && categoryConfig[params.category]) {
    query.set('property_type', categoryConfig[params.category].propertyType);
  }

  const qs = query.toString();
  const res = await fetch(`${BASE_URL.replace(/\/$/, '')}/properties/${qs ? `?${qs}` : ''}`, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.status} ${res.statusText}`);
  }

  return res.json();
}