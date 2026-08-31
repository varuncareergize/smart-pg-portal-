import test from 'node:test';
import assert from 'node:assert/strict';
import { filterAndSortProperties } from '../src/utils/propertyHelpers.js';
import { buildPropertyApiQuery, parseFilterParams, serializeFilterParams } from '../src/utils/propertyFilters.js';

const properties = [
  { id: 1, name: 'Central Apartment', address: 'Indiranagar, Bengaluru', city: 'Bengaluru', property_type: 'Apartment', gender: 'Unisex', price: 20000, amenities: ['WiFi', 'Gym'], rating: 4.5, aiMatch: 80, createdAt: 1 },
  { id: 2, name: 'Budget PG', address: 'Whitefield, Bengaluru', city: 'Bengaluru', property_type: 'PG', gender: 'Male', price: 12000, amenities: ['WiFi'], rating: 4, aiMatch: 90, createdAt: 3 },
  { id: 3, name: 'Pune Apartment', address: 'Baner, Pune', city: 'Pune', property_type: 'Apartment', gender: 'Female', price: 40000, amenities: ['Parking'], rating: 3.5, aiMatch: 70, createdAt: 2 },
];

const defaults = { searchTerm: '', location: '', selectedType: '', propertyTypes: [], gender: '', sharingType: '', minPrice: '', maxPrice: '', quickFilters: [], roomTypes: [], genders: [], distance: '', amenities: [], trustFilters: [], sortBy: 'recommended' };
const ids = (filters) => filterAndSortProperties(properties, { ...defaults, ...filters }).map((property) => property.id);

test('filters location using structured and address fields', () => assert.deepEqual(ids({ location: 'Bengaluru' }), [2, 1]));
test('normalizes property type aliases', () => assert.deepEqual(ids({ propertyTypes: ['apartment'] }), [1, 3]));
test('applies numeric minimum, maximum, and inclusive boundaries', () => {
  assert.deepEqual(ids({ minPrice: 20000 }), [1, 3]);
  assert.deepEqual(ids({ maxPrice: 20000 }), [2, 1]);
  assert.deepEqual(ids({ minPrice: 20000, maxPrice: 20000 }), [1]);
});
test('combines categories with AND and values in a category with OR', () => {
  assert.deepEqual(ids({ location: 'Bengaluru', propertyTypes: ['Apartment', 'PG'], minPrice: 15000, maxPrice: 25000, amenities: ['WiFi'] }), [1]);
});
test('returns no unrelated fallback for no matches', () => assert.deepEqual(ids({ location: 'Chennai' }), []));
test('sort runs after filtering', () => assert.deepEqual(ids({ location: 'Bengaluru', sortBy: 'lowest_rent' }), [2, 1]));

test('validates malformed URL parameters and canonicalizes aliases', () => {
  const filters = parseFilterParams('type=coliving&minPrice=-2&maxPrice=%E2%82%B940,000&page=-4&sort=drop_table');
  assert.equal(filters.propertyType, 'Co-living');
  assert.equal(filters.minPrice, '');
  assert.equal(filters.maxPrice, 40000);
  assert.equal(filters.page, 1);
  assert.equal(filters.sortBy, 'recommended');
});

test('URL round-trip preserves filters, sort, and pagination', () => {
  const query = serializeFilterParams({ location: 'Bengaluru', propertyType: 'Apartment', propertyTypes: [], gender: '', genders: [], minPrice: 20000, maxPrice: 40000, amenities: ['Gym'], quickFilters: ['wifi'], minRating: '4', sortBy: 'newest', page: 2 });
  assert.deepEqual(parseFilterParams(query), { location: 'Bengaluru', propertyType: 'Apartment', propertyTypes: [], gender: '', genders: [], minPrice: 20000, maxPrice: 40000, amenities: ['Gym'], quickFilters: ['wifi'], minRating: '4', sortBy: 'newest', page: 2 });
});

test('API query uses backend-supported parameter names only', () => {
  const query = new URLSearchParams(buildPropertyApiQuery({ location: 'Bengaluru', propertyType: 'Apartment', propertyTypes: [] }));
  assert.equal(query.get('location'), 'Bengaluru');
  assert.equal(query.get('property_type'), 'Apartment');
  assert.equal(query.has('type'), false);
});
