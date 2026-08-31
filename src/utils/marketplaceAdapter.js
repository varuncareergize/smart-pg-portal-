import { BASE_URL } from '../api';

const value = (...items) => items.find((item) => item !== undefined && item !== null && item !== '');
const labelize = (input) => String(input || '').replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

export function absoluteMediaUrl(input) {
  const source = typeof input === 'string' ? input : value(input?.url, input?.file, input?.image);
  if (!source) return null;
  if (/^(https?:|data:|blob:)/i.test(source)) return source;
  return `${BASE_URL.replace(/\/$/, '')}/${String(source).replace(/^\//, '')}`;
}

function collectMedia(listing) {
  const listingMedia = Array.isArray(listing.media) ? listing.media : [];
  const propertyMedia = Array.isArray(listing.property?.media) ? listing.property.media : [];
  const legacy = [listing.image, listing.property?.image].filter(Boolean);
  const ordered = [...listingMedia].sort((a, b) => Number(Boolean(b?.is_primary)) - Number(Boolean(a?.is_primary)));
  return [...ordered, ...propertyMedia, ...legacy].map(absoluteMediaUrl).filter(Boolean).filter((url, index, all) => all.indexOf(url) === index);
}

export function formatPrice(pricing) {
  const amount = value(pricing?.amount, pricing?.price);
  if (amount === undefined) return null;
  const numeric = Number(amount);
  const currency = pricing?.currency || 'INR';
  const formatted = Number.isFinite(numeric)
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: numeric % 1 ? 2 : 0 }).format(numeric)
    : `${currency} ${amount}`;
  const cycle = pricing?.billing_cycle ? labelize(pricing.billing_cycle).toLowerCase() : null;
  return { amount, currency, formatted, cycle, display: `${formatted}${cycle ? ` / ${cycle.replace(/^per /, '')}` : ''}` };
}

function locationText(property) {
  if (typeof property?.location === 'string') return property.location;
  const location = property?.location || {};
  return [value(location.locality, property?.locality), value(location.city, property?.city)].filter(Boolean).join(', ') || null;
}

function factsFor(listing) {
  const details = listing.category_details || {};
  const offer = listing.offer || {};
  const category = String(listing.category || '').toLowerCase();
  const candidates = category.includes('office')
    ? [[value(offer.capacity, details.workstations, details.capacity), 'workstations'], [details.office_type], [value(details.furnishing, details.fit_out)]]
    : category.includes('pg')
      ? [[value(offer.capacity, details.sharing, details.capacity), 'sharing'], [details.gender_policy], [details.meals === true ? 'Meals available' : null]]
      : [[[value(details.bedrooms, details.bhk), 'BHK']], [details.furnishing], [details.parking === true ? 'Parking' : null]];
  return candidates.map((entry) => Array.isArray(entry) ? entry.filter(Boolean).join(' ') : entry).filter(Boolean).slice(0, 3);
}

export function mapListing(listing = {}) {
  const media = collectMedia(listing);
  const pricing = formatPrice(listing.pricing);
  return {
    raw: listing,
    id: listing.id,
    slug: listing.slug,
    category: listing.category,
    categoryLabel: labelize(listing.category),
    title: value(listing.title, listing.property?.name, 'Untitled property'),
    description: listing.description || null,
    property: listing.property || {},
    offer: listing.offer || {},
    pricing,
    availability: listing.availability ?? null,
    amenities: Array.isArray(listing.amenities) ? listing.amenities : [],
    categoryDetails: listing.category_details || {},
    publishedAt: listing.published_at || null,
    location: locationText(listing.property),
    media,
    primaryImage: media[0] || null,
    facts: factsFor(listing),
  };
}

export function listingArray(envelope) {
  const data = envelope?.data;
  if (Array.isArray(data)) return data;
  return data?.results || data?.items || data?.listings || [];
}

export function availabilityLabel(availability) {
  if (availability === null || availability === undefined) return 'Contact for availability';
  if (typeof availability === 'boolean') return availability ? 'Available' : 'Currently unavailable';
  if (typeof availability === 'number') return availability > 0 ? `${availability} available` : 'Currently unavailable';
  const status = value(availability.status, availability.state);
  const quantity = value(availability.quantity, availability.available_quantity);
  if (quantity !== undefined) return Number(quantity) > 0 ? `${quantity} available` : 'Currently unavailable';
  return status ? labelize(status) : 'Contact for availability';
}
