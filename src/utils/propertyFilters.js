export const DEFAULT_FILTERS = Object.freeze({
  location: '',
  propertyType: '',
  propertyTypes: [],
  gender: '',
  genders: [],
  minPrice: '',
  maxPrice: '',
  amenities: [],
  quickFilters: [],
  minRating: 'any',
  sortBy: 'recommended',
  page: 1,
});

export const ALLOWED_PROPERTY_TYPES = ['House', 'Apartment', 'Villa', 'PG', 'Office', 'Hostel', 'Co-living'];
export const ALLOWED_GENDERS = ['Male', 'Female', 'Unisex'];
export const ALLOWED_AMENITIES = ['WiFi', 'Food', 'AC', 'Laundry', 'Parking', 'Gym', 'Security'];
export const ALLOWED_SORTS = ['recommended', 'lowest_rent', 'highest_rated', 'newest'];
export const ALLOWED_QUICK_FILTERS = ['food', 'ac', 'under10k', 'wifi', 'laundry'];

const aliases = new Map([
  ['coliving', 'Co-living'],
  ['co-living', 'Co-living'],
  ...ALLOWED_PROPERTY_TYPES.map((value) => [value.toLowerCase(), value]),
]);

function list(params, key, allowed, normalize = (value) => value) {
  return [...new Set(params.getAll(key).flatMap((value) => value.split(','))
    .map((value) => normalize(value.trim())).filter((value) => allowed.includes(value)))];
}

function price(value) {
  if (value == null || value === '') return '';
  if (String(value).trim().startsWith('-')) return '';
  const parsed = Number(String(value).replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : '';
}

export function normalizePropertyType(value) {
  return aliases.get(String(value || '').trim().toLowerCase()) || '';
}

export function parseFilterParams(input) {
  const params = input instanceof URLSearchParams ? input : new URLSearchParams(input);
  const propertyType = normalizePropertyType(params.get('type'));
  const gender = ALLOWED_GENDERS.find((item) => item.toLowerCase() === (params.get('gender') || '').toLowerCase()) || '';
  const minPrice = price(params.get('minPrice'));
  const maxPrice = price(params.get('maxPrice'));
  const page = Math.max(1, Number.parseInt(params.get('page'), 10) || 1);

  return {
    location: (params.get('location') || params.get('city') || '').trim().slice(0, 100),
    propertyType,
    propertyTypes: list(params, 'propertyTypes', ALLOWED_PROPERTY_TYPES, normalizePropertyType),
    gender,
    genders: list(params, 'genders', ALLOWED_GENDERS),
    minPrice,
    maxPrice,
    amenities: list(params, 'amenities', ALLOWED_AMENITIES, (value) => {
      const match = ALLOWED_AMENITIES.find((item) => item.toLowerCase() === value.toLowerCase());
      return match || '';
    }),
    quickFilters: list(params, 'quick', ALLOWED_QUICK_FILTERS),
    minRating: ['3', '4'].includes(params.get('minRating')) ? params.get('minRating') : 'any',
    sortBy: ALLOWED_SORTS.includes(params.get('sort')) ? params.get('sort') : 'recommended',
    page,
  };
}

export function serializeFilterParams(filters) {
  const params = new URLSearchParams();
  if (filters.location?.trim()) params.set('location', filters.location.trim());
  if (normalizePropertyType(filters.propertyType)) params.set('type', normalizePropertyType(filters.propertyType));
  filters.propertyTypes?.forEach((value) => {
    const normalized = normalizePropertyType(value);
    if (normalized) params.append('propertyTypes', normalized);
  });
  if (ALLOWED_GENDERS.includes(filters.gender)) params.set('gender', filters.gender);
  filters.genders?.filter((value) => ALLOWED_GENDERS.includes(value)).forEach((value) => params.append('genders', value));
  if (price(filters.minPrice) !== '') params.set('minPrice', String(price(filters.minPrice)));
  if (price(filters.maxPrice) !== '') params.set('maxPrice', String(price(filters.maxPrice)));
  filters.amenities?.filter((value) => ALLOWED_AMENITIES.includes(value)).forEach((value) => params.append('amenities', value));
  filters.quickFilters?.filter((value) => ALLOWED_QUICK_FILTERS.includes(value)).forEach((value) => params.append('quick', value));
  if (['3', '4'].includes(filters.minRating)) params.set('minRating', filters.minRating);
  if (ALLOWED_SORTS.includes(filters.sortBy) && filters.sortBy !== 'recommended') params.set('sort', filters.sortBy);
  if (Number(filters.page) > 1) params.set('page', String(Math.floor(Number(filters.page))));
  return params;
}

export function buildPropertyApiQuery(filters) {
  const params = new URLSearchParams();
  if (filters.location) params.set('location', filters.location);
  const types = [...new Set([filters.propertyType, ...(filters.propertyTypes || [])].map(normalizePropertyType).filter(Boolean))];
  // The API supports one property_type. Multiple types must be OR-filtered client-side.
  if (types.length === 1) params.set('property_type', types[0]);
  return params.toString();
}
