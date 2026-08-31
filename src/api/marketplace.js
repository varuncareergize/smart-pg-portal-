import { publicApiGet } from './client';

const ROOT = '/api/v2/marketplace';
const COMMON_PARAMS = new Set(['city', 'locality', 'min_price', 'max_price', 'amenities', 'availability', 'sort', 'page', 'page_size']);
const CATEGORY_PARAMS = {
  pg: new Set(['gender_policy', 'capacity', 'meals', 'minimum_stay']),
  apartments: new Set(['bedrooms', 'furnishing', 'preferred_tenant', 'parking']),
  villas: new Set(['bedrooms', 'furnishing', 'parking']),
  office: new Set(['office_type', 'min_area', 'max_area', 'capacity', 'furnishing', 'parking', 'lease_type']),
};

export const categoryConfig = {
  pg: { path: 'pg', route: '/pg', label: 'PG Rooms', singular: 'PG room' },
  apartments: { path: 'apartments', route: '/apartments', label: 'Apartments', singular: 'apartment' },
  villas: { path: 'villas', route: '/villas', label: 'Villas', singular: 'villa' },
  office: { path: 'office', route: '/offices', label: 'Office Spaces', singular: 'office space' },
};

export function sanitizeMarketplaceParams(params, category) {
  const allowed = new Set([...COMMON_PARAMS, ...(CATEGORY_PARAMS[category] || [])]);
  return Object.fromEntries(Object.entries(params || {}).filter(([key, value]) => allowed.has(key) && value !== ''));
}

export const getListings = (params, options = {}) => publicApiGet(`${ROOT}/listings/`, { ...options, params: sanitizeMarketplaceParams(params) });
const getCategoryListings = (category, params, options = {}) => publicApiGet(`${ROOT}/${categoryConfig[category].path}/`, { ...options, params: sanitizeMarketplaceParams(params, category) });
export const getPGListings = (params, options) => getCategoryListings('pg', params, options);
export const getApartmentListings = (params, options) => getCategoryListings('apartments', params, options);
export const getVillaListings = (params, options) => getCategoryListings('villas', params, options);
export const getOfficeListings = (params, options) => getCategoryListings('office', params, options);
export const getListingBySlug = (slug, options = {}) => publicApiGet(`${ROOT}/listings/${encodeURIComponent(slug)}/`, options);

export const categoryLoaders = { pg: getPGListings, apartments: getApartmentListings, villas: getVillaListings, office: getOfficeListings };
