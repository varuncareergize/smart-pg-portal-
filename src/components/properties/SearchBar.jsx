import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, IndianRupee, ChevronDown, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { TRENDING_LOCATIONS, getRecentSearches } from '../../utils/propertyHelpers';

const PROPERTY_TYPES = ['PG', 'Hostel', 'Coliving', 'Apartment'];
const GENDERS = ['Male', 'Female', 'Unisex'];
const SHARING_TYPES = ['Single', 'Double', 'Triple', 'Multiple Sharing'];

export default function SearchBar({
  location,
  setLocation,
  moveInDate,
  setMoveInDate,
  flexibleDate,
  setFlexibleDate,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  propertyType,
  setPropertyType,
  gender,
  setGender,
  sharingType,
  setSharingType,
  onSearch,
}) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectLocation = (loc) => {
    setLocation(loc);
    setShowLocationDropdown(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="livzz-glass rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 md:gap-3">
        {/* Location */}
        <div className="lg:col-span-2 relative" ref={dropdownRef}>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2">Location</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FFC107]" />
            <input
              type="text"
              placeholder="Search location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setShowLocationDropdown(true)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl text-sm font-semibold text-[#001F3F] outline-none focus:ring-2 focus:ring-[#FFC107]/30 border border-transparent focus:border-[#FFC107]/50"
            />
          </div>
          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
              <button
                onClick={() => selectLocation('Current Location')}
                className="w-full px-4 py-3 text-left text-sm font-semibold text-[#001F3F] hover:bg-[#FFC107]/10 flex items-center gap-2 border-b border-slate-50"
              >
                <Navigation size={14} className="text-[#FFC107]" /> Use current location
              </button>
              {recentSearches.length > 0 && (
                <div className="px-4 py-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Recent</p>
                  {recentSearches.map((r) => (
                    <button
                      key={r}
                      onClick={() => selectLocation(r)}
                      className="block w-full text-left py-1.5 text-sm font-medium text-slate-600 hover:text-[#001F3F]"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
              <div className="px-4 py-2 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase">Trending</p>
                {TRENDING_LOCATIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => selectLocation(t)}
                    className="block w-full text-left py-1.5 text-sm font-medium text-slate-600 hover:text-[#001F3F]"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Move-in Date */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2">Move-in Date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FFC107]" />
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl text-sm font-semibold text-[#001F3F] outline-none focus:ring-2 focus:ring-[#FFC107]/30"
            />
          </div>
          <label className="flex items-center gap-1.5 mt-1 px-2 cursor-pointer">
            <input
              type="checkbox"
              checked={flexibleDate}
              onChange={(e) => setFlexibleDate(e.target.checked)}
              className="accent-[#FFC107] w-3 h-3"
            />
            <span className="text-[10px] font-bold text-slate-500">Flexible date</span>
          </label>
        </div>

        {/* Budget */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2">Budget</label>
          <div className="flex items-center gap-1 bg-slate-50 rounded-xl px-2 py-1.5">
            <IndianRupee size={14} className="text-[#FFC107] shrink-0" />
            <select
              value={minBudget}
              onChange={(e) => setMinBudget(Number(e.target.value))}
              className="flex-1 bg-transparent text-xs font-bold text-[#001F3F] outline-none"
            >
              {[3000, 5000, 8000, 10000, 15000].map((v) => (
                <option key={v} value={v}>₹{v.toLocaleString()}</option>
              ))}
            </select>
            <span className="text-slate-300">-</span>
            <select
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="flex-1 bg-transparent text-xs font-bold text-[#001F3F] outline-none"
            >
              {[10000, 15000, 20000, 25000, 30000, 50000].map((v) => (
                <option key={v} value={v}>₹{v.toLocaleString()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2">Property Type</label>
          <div className="relative">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-sm font-semibold text-[#001F3F] outline-none appearance-none focus:ring-2 focus:ring-[#FFC107]/30"
            >
              <option value="">All Types</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Gender + Sharing (stacked on mobile, inline on desktop) */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-sm font-semibold text-[#001F3F] outline-none appearance-none"
            >
              <option value="">Any</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2">Sharing</label>
            <select
              value={sharingType}
              onChange={(e) => setSharingType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-sm font-semibold text-[#001F3F] outline-none appearance-none"
            >
              <option value="">Any</option>
              {SHARING_TYPES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSearch}
          className="w-full md:w-auto px-8 py-3 bg-[#FFC107] text-[#001F3F] font-black rounded-xl shadow-lg shadow-[#FFC107]/30 hover:shadow-xl hover:shadow-[#FFC107]/40 transition-shadow flex items-center justify-center gap-2"
        >
          <Search size={18} />
          Search Properties
        </motion.button>
      </div>
    </motion.div>
  );
}
