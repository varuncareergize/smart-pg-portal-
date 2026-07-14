const AMENITY_KEYWORDS = {
  WiFi: ['wifi', 'wi-fi', 'internet'],
  Food: ['food', 'meals', 'mess', 'breakfast', 'lunch', 'dinner'],
  AC: ['ac', 'air conditioning', 'air-condition'],
  Laundry: ['laundry', 'washing'],
  Parking: ['parking', 'car park'],
  Gym: ['gym', 'fitness'],
  Security: ['security', 'cctv', 'guard'],
};

export const TRENDING_LOCATIONS = [
  'HSR Layout',
  'Whitefield',
  'Indiranagar',
  'Electronic City',
  'Koramangala',
];

export const QUICK_FILTER_OPTIONS = [
  { id: 'metro', label: 'Near Metro', amenity: null, maxPrice: null },
  { id: 'food', label: 'Food Included', amenity: 'Food' },
  { id: 'ac', label: 'AC', amenity: 'AC' },
  { id: 'under10k', label: 'Under ₹10K', maxPrice: 10000 },
  { id: 'instant', label: 'Instant Move-in', trust: 'instant' },
  { id: 'noDeposit', label: 'No Deposit', trust: 'noDeposit' },
  { id: 'wifi', label: 'WiFi', amenity: 'WiFi' },
  { id: 'laundry', label: 'Laundry', amenity: 'Laundry' },
  { id: 'verified', label: 'Verified', trust: 'verified' },
];

export const SORT_OPTIONS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'lowest_rent', label: 'Lowest Rent' },
  { id: 'highest_rated', label: 'Highest Rated' },
  { id: 'nearest', label: 'Nearest' },
  { id: 'newest', label: 'Newest' },
];

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function detectAmenities(property) {
  const sources = [
    ...(property.tags || []),
    property.address || '',
    property.city || '',
  ].join(' ').toLowerCase();

  const amenities = Object.entries(AMENITY_KEYWORDS)
    .filter(([, keywords]) => keywords.some((k) => sources.includes(k)))
    .map(([name]) => name);

  if (amenities.length === 0) {
    const defaults = ['WiFi', 'Security'];
    const idx = hashCode(String(property.id)) % 4;
    if (idx === 0) defaults.push('Food', 'AC');
    if (idx === 1) defaults.push('Laundry');
    if (idx === 2) defaults.push('Parking');
    return defaults;
  }
  return amenities;
}

export function enrichProperty(property, index = 0) {
  const hash = hashCode(String(property.id));
  const price = parseFloat(property.price) || 0;
  const amenities = detectAmenities(property);
  const rating = parseFloat(property.rating) || 4.2 + (hash % 8) / 10;

  const metroDistance = 300 + (hash % 12) * 100;
  const collegeDistance = 800 + (hash % 15) * 150;

  const badges = [];
  if (hash % 3 !== 0) badges.push({ type: 'verified', label: 'Verified' });
  if (hash % 5 === 0) badges.push({ type: 'choice', label: 'LivZZ Choice' });
  if (hash % 4 === 0) badges.push({ type: 'instant', label: 'Instant Book' });
  if (hash % 2 === 0) badges.push({ type: 'brokerage', label: 'No Brokerage' });

  const genders = ['Male', 'Female', 'Unisex'];
  const sharingTypes = ['Single', 'Double', 'Triple', 'Multiple Sharing'];

  const aiMatch = 78 + (hash % 22);
  const aiReasons = [
    price > 0 && price <= 12000 ? 'Within your budget' : null,
    metroDistance < 1000 ? 'Near preferred location' : null,
    rating >= 4.3 ? 'Highly rated' : null,
    amenities.length >= 3 ? 'Good amenities' : null,
  ].filter(Boolean);

  const mapPositions = [
    { top: '18%', left: '22%' },
    { top: '35%', left: '55%' },
    { top: '52%', left: '30%' },
    { top: '28%', left: '72%' },
    { top: '65%', left: '48%' },
    { top: '42%', left: '18%' },
    { top: '58%', left: '78%' },
    { top: '22%', left: '42%' },
  ];

  return {
    ...property,
    price,
    rating,
    amenities,
    deposit: price > 0 ? Math.round(price * (0.4 + (hash % 3) * 0.2)) : 0,
    metroDistance,
    collegeDistance,
    badges,
    gender: genders[hash % 3],
    sharingType: sharingTypes[hash % 4],
    isVerified: hash % 3 !== 0,
    isCertified: hash % 7 === 0,
    instantBooking: hash % 4 === 0,
    noDeposit: hash % 6 === 0,
    nearMetro: metroDistance < 800,
    images: [
      property.image,
      property.image,
      property.image,
    ],
    aiMatch,
    aiReasons: aiReasons.length ? aiReasons : ['Matches your preferences'],
    mapPosition: mapPositions[index % mapPositions.length],
    createdAt: hash % 100,
  };
}

export function filterAndSortProperties(properties, filters) {
  const {
    searchTerm,
    location,
    selectedType,
    propertyTypes,
    gender,
    sharingType,
    minPrice,
    maxPrice,
    quickFilters,
    roomTypes,
    genders,
    distance,
    amenities,
    trustFilters,
    sortBy,
  } = filters;

  let result = properties.filter((p) => {
    const search = (searchTerm || location || '').toLowerCase();
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search) ||
      p.address.toLowerCase().includes(search) ||
      (p.city || '').toLowerCase().includes(search);

    const types = propertyTypes?.length ? propertyTypes : selectedType && selectedType !== 'All Stays' ? [selectedType] : [];
    const matchesType = !types.length || types.includes(p.property_type);

    const genderList = genders?.length ? genders : gender ? [gender] : [];
    const matchesGender = !genderList.length || genderList.includes(p.gender);

    const roomList = roomTypes?.length ? roomTypes : sharingType ? [sharingType] : [];
    const matchesRoom = !roomList.length || roomList.includes(p.sharingType);

    const price = p.price;
    const matchesMin = !minPrice || price === 0 || price >= minPrice;
    const matchesMax = !maxPrice || price === 0 || price <= maxPrice;

    const distanceLimits = { '500m': 500, '1km': 1000, '3km': 3000, '5km': 5000 };
    const matchesDistance = !distance || p.metroDistance <= distanceLimits[distance];

    const matchesAmenities =
      !amenities?.length || amenities.every((a) => p.amenities.includes(a));

    const matchesQuick = (quickFilters || []).every((qfId) => {
      const qf = QUICK_FILTER_OPTIONS.find((q) => q.id === qfId);
      if (!qf) return true;
      if (qf.amenity) return p.amenities.includes(qf.amenity);
      if (qf.maxPrice) return p.price === 0 || p.price <= qf.maxPrice;
      if (qf.trust === 'verified') return p.isVerified;
      if (qf.trust === 'instant') return p.instantBooking;
      if (qf.trust === 'noDeposit') return p.noDeposit;
      if (qf.id === 'metro') return p.nearMetro;
      return true;
    });

    const matchesTrust = (trustFilters || []).every((tf) => {
      if (tf === 'verified') return p.isVerified;
      if (tf === 'certified') return p.isCertified;
      if (tf === 'instant') return p.instantBooking;
      return true;
    });

    return (
      matchesSearch &&
      matchesType &&
      matchesGender &&
      matchesRoom &&
      matchesMin &&
      matchesMax &&
      matchesDistance &&
      matchesAmenities &&
      matchesQuick &&
      matchesTrust
    );
  });

  switch (sortBy) {
    case 'lowest_rent':
      result = [...result].sort((a, b) => (a.price || 99999) - (b.price || 99999));
      break;
    case 'highest_rated':
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case 'nearest':
      result = [...result].sort((a, b) => a.metroDistance - b.metroDistance);
      break;
    case 'newest':
      result = [...result].sort((a, b) => b.createdAt - a.createdAt);
      break;
    default:
      result = [...result].sort((a, b) => b.aiMatch - a.aiMatch);
  }

  return result;
}

export function getSavedProperties() {
  try {
    return JSON.parse(localStorage.getItem('livzz_saved_properties') || '[]');
  } catch {
    return [];
  }
}

export function toggleSavedProperty(id) {
  const saved = getSavedProperties();
  const next = saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id];
  localStorage.setItem('livzz_saved_properties', JSON.stringify(next));
  return next;
}

export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem('livzz_recent_searches') || '[]');
  } catch {
    return [];
  }
}

export function addRecentSearch(location) {
  if (!location?.trim()) return;
  const recent = getRecentSearches().filter((r) => r !== location);
  const next = [location, ...recent].slice(0, 5);
  localStorage.setItem('livzz_recent_searches', JSON.stringify(next));
  return next;
}
