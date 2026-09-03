import { publicApiGet } from './client';

const PROPERTY_PARAMS = new Set(['page', 'page_size', 'city', 'property_type']);

// Maps our internal category keys to app routes and the backend's property_type values.
export const categoryConfig = {
  pg: { route: '/pg', propertyType: 'PG', label: 'PG Rooms', singular: 'PG room' },
  apartments: { route: '/apartments', propertyType: 'Apartment', label: 'Apartments', singular: 'apartment' },
  villas: { route: '/villas', propertyType: 'Villa', label: 'Villas', singular: 'villa' },
  office: { route: '/offices', propertyType: 'Office', label: 'Office Spaces', singular: 'office space' },
};

export function sanitizeMarketplaceParams(params, category) {
  const sanitized = {};
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) sanitized[key] = value;
  });
  if (sanitized.locality) {
    sanitized.city = sanitized.locality;
    delete sanitized.locality;
  }
  if (categoryConfig[category]) sanitized.property_type = categoryConfig[category].propertyType;
  return Object.fromEntries(Object.entries(sanitized).filter(([key]) => PROPERTY_PARAMS.has(key)));
}

export const getProperties = (params = {}, options = {}) => publicApiGet('/properties/', { ...options, params: sanitizeMarketplaceParams(params, params.category) });
export const getListings = getProperties;
const getCategoryListings = (category, params, options = {}) => getProperties({ ...params, category }, options);
export const getPGListings = (params, options) => getCategoryListings('pg', params, options);
export const getApartmentListings = (params, options) => getCategoryListings('apartments', params, options);
export const getVillaListings = (params, options) => getCategoryListings('villas', params, options);
export const getOfficeListings = (params, options) => getCategoryListings('office', params, options);
export const getListingBySlug = (slug, options = {}) => publicApiGet(`${ROOT}/listings/${encodeURIComponent(slug)}/`, options);

export const categoryLoaders = { pg: getPGListings, apartments: getApartmentListings, villas: getVillaListings, office: getOfficeListings };