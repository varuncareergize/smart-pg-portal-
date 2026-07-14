import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Wifi, Utensils, Wind, Shirt, Car, Dumbbell, Shield, Star } from 'lucide-react';
import { SORT_OPTIONS } from '../../utils/propertyHelpers';

const PROPERTY_TYPES = ['PG', 'Hostel', 'Coliving', 'Apartment'];
const GENDERS = ['Male', 'Female', 'Unisex'];
const ROOM_TYPES = ['Single', 'Double', 'Triple', 'Multiple Sharing'];
const DISTANCE_OPTIONS = [
  { id: '500m', label: 'Under 500m' },
  { id: '1km', label: 'Under 1km' },
  { id: '3km', label: 'Under 3km' },
  { id: '5km', label: 'Under 5km' },
];
const AMENITY_OPTIONS = [
  { id: 'WiFi', icon: Wifi },
  { id: 'Food', icon: Utensils },
  { id: 'AC', icon: Wind },
  { id: 'Laundry', icon: Shirt },
  { id: 'Parking', icon: Car },
  { id: 'Gym', icon: Dumbbell },
  { id: 'Security', icon: Shield },
];
const RATING_OPTIONS = [
  { id: '4', label: '4+' },
  { id: '3', label: '3+' },
  { id: 'any', label: 'Any rating' },
];
const TRUST_OPTIONS = [
  { id: 'verified', label: 'Verified Only' },
  { id: 'certified', label: 'LivZZ Certified' },
  { id: 'instant', label: 'Instant Booking' },
];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{title}</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && children}
    </div>
  );
}

function ChipGroup({ options, selected, onChange, multi = true }) {
  const toggle = (val) => {
    if (multi) {
      onChange(selected.includes(val) ? selected.filter((s) => s !== val) : [...selected, val]);
    } else {
      onChange(selected === val ? '' : val);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.id;
        const label = typeof opt === 'string' ? opt : opt.label;
        const isActive = multi ? selected.includes(val) : selected === val;
        return (
          <button
            key={val}
            onClick={() => toggle(val)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isActive ? 'chip-active' : 'chip-inactive'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function FilterSidebar({
  propertyTypes,
  setPropertyTypes,
  genders,
  setGenders,
  roomTypes,
  setRoomTypes,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  distance,
  setDistance,
  amenities,
  setAmenities,
  minRating,
  setMinRating,
  trustFilters,
  setTrustFilters,
  sortBy,
  setSortBy,
  onReset,
  collapsed,
}) {
  if (collapsed) return null;

  const toggleAmenity = (id) => {
    setAmenities(amenities.includes(id) ? amenities.filter((a) => a !== id) : [...amenities, id]);
  };

  const toggleTrust = (id) => {
    setTrustFilters(trustFilters.includes(id) ? trustFilters.filter((t) => t !== id) : [...trustFilters, id]);
  };

  return (
    <aside className="livzz-glass rounded-2xl p-5 space-y-4 h-fit lg:sticky lg:top-36">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-[#001F3F] text-sm">Filters</h3>
        <button onClick={onReset} className="text-xs font-bold text-[#FFC107] hover:text-[#001F3F] transition-colors">
          Reset
        </button>
      </div>

      <FilterSection title="Property Type">
        <ChipGroup options={PROPERTY_TYPES} selected={propertyTypes} onChange={setPropertyTypes} />
      </FilterSection>

      <FilterSection title="Gender">
        <ChipGroup options={GENDERS} selected={genders} onChange={setGenders} />
      </FilterSection>

      <FilterSection title="Room Type">
        <ChipGroup options={ROOM_TYPES} selected={roomTypes} onChange={setRoomTypes} />
      </FilterSection>

      <FilterSection title="Budget">
        <p className="text-xs font-bold text-slate-500 mb-2">
          ₹{minPrice.toLocaleString()} – ₹{maxPrice.toLocaleString()}
        </p>
        <input
          type="range"
          min="3000"
          max="50000"
          step="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#FFC107] h-1.5"
        />
        <input
          type="range"
          min="3000"
          max="50000"
          step="1000"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="w-full accent-[#001F3F] h-1.5 mt-2"
        />
      </FilterSection>

      <FilterSection title="Distance">
        <ChipGroup
          options={DISTANCE_OPTIONS}
          selected={distance}
          onChange={setDistance}
          multi={false}
        />
      </FilterSection>

      <FilterSection title="Amenities">
        <div className="grid grid-cols-2 gap-2">
          {AMENITY_OPTIONS.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => toggleAmenity(id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                amenities.includes(id) ? 'chip-active' : 'chip-inactive'
              }`}
            >
              <Icon size={14} />
              {id}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Ratings">
        <div className="flex gap-2">
          {RATING_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setMinRating(id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                minRating === id ? 'chip-active' : 'chip-inactive'
              }`}
            >
              {id !== 'any' && <Star size={12} fill="currentColor" />}
              {label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Trust Filters">
        <div className="space-y-2">
          {TRUST_OPTIONS.map(({ id, label }) => (
            <label key={id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={trustFilters.includes(id)}
                onChange={() => toggleTrust(id)}
                className="accent-[#FFC107] w-4 h-4 rounded"
              />
              <span className="text-xs font-semibold text-slate-600">{label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Sort By">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-sm font-semibold text-[#001F3F] outline-none"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </FilterSection>
    </aside>
  );
}
