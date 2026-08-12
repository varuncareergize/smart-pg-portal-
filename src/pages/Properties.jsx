import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Map, X, GitCompareArrows, SlidersHorizontal } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/properties/SearchBar';
import QuickFilters from '../components/properties/QuickFilters';
import FilterSidebar from '../components/properties/FilterSidebar';
import PropertyCard from '../components/properties/PropertyCard';
import MapView from '../components/properties/MapView';
import CompareDrawer from '../components/properties/CompareDrawer';
import AIRecommendation from '../components/properties/AIRecommendation';
import EmptyState from '../components/properties/EmptyState';
import SkeletonCard from '../components/properties/SkeletonCard';
import TrustSignals from '../components/properties/TrustSignals';
import {
  enrichProperty,
  filterAndSortProperties,
  toggleSavedProperty,
  getSavedProperties,
  addRecentSearch,
} from '../utils/propertyHelpers';
import { apiFetch } from '../api';

const PAGE_SIZE = 6;

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Search bar state
  const [location, setLocation] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [flexibleDate, setFlexibleDate] = useState(false);
  const [minBudget, setMinBudget] = useState(5000);
  const [maxBudget, setMaxBudget] = useState(25000);
  const [propertyType, setPropertyType] = useState('');
  const [gender, setGender] = useState('');
  const [sharingType, setSharingType] = useState('');

  // Quick filters
  const [quickFilters, setQuickFilters] = useState([]);

  // Sidebar filters
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [minPrice, setMinPrice] = useState(5000);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [distance, setDistance] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [minRating, setMinRating] = useState('any');
  const [trustFilters, setTrustFilters] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');

  // UI state
  const [savedIds, setSavedIds] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [highlightedId, setHighlightedId] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const loadMoreRef = useRef(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setSavedIds(getSavedProperties());
    const fetchProperties = async () => {
      try {
        const response = await apiFetch('/owner/properties/');
        const data = await response.json();
        setProperties(data.map((p, i) => enrichProperty(p, i)));
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = () => {
    if (location) addRecentSearch(location);
    setVisibleCount(PAGE_SIZE);
    searchBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleQuickFilter = (id) => {
    setQuickFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    setVisibleCount(PAGE_SIZE);
  };

  const resetFilters = () => {
    setLocation('');
    setPropertyType('');
    setGender('');
    setSharingType('');
    setQuickFilters([]);
    setPropertyTypes([]);
    setGenders([]);
    setRoomTypes([]);
    setMinPrice(5000);
    setMaxPrice(30000);
    setDistance('');
    setAmenities([]);
    setMinRating('any');
    setTrustFilters([]);
    setSortBy('recommended');
    setVisibleCount(PAGE_SIZE);
  };

  const handleToggleSave = (id) => {
    const next = toggleSavedProperty(id);
    setSavedIds(next);
  };

  const handleToggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
    setShowCompare(true);
  };

  const enrichedFilters = useMemo(() => ({
    searchTerm: location,
    location,
    selectedType: propertyType,
    propertyTypes: propertyType ? [propertyType, ...propertyTypes] : propertyTypes,
    gender,
    sharingType,
    minPrice: Math.min(minPrice, minBudget),
    maxPrice: Math.max(maxPrice, maxBudget),
    quickFilters,
    roomTypes,
    genders: gender ? [gender, ...genders] : genders,
    distance,
    amenities,
    trustFilters,
    sortBy,
  }), [location, propertyType, propertyTypes, gender, sharingType, minPrice, maxPrice, minBudget, maxBudget, quickFilters, roomTypes, genders, distance, amenities, trustFilters, sortBy]);

  const filteredProperties = useMemo(() => {
    let result = filterAndSortProperties(properties, enrichedFilters);
    if (minRating !== 'any') {
      const min = parseFloat(minRating);
      result = result.filter((p) => p.rating >= min);
    }
    return result;
  }, [properties, enrichedFilters, minRating]);

  const visibleProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;

  const compareProperties = useMemo(
    () => properties.filter((p) => compareIds.includes(p.id)),
    [properties, compareIds]
  );

  const similarProperties = useMemo(() => {
    if (filteredProperties.length > 0) return filteredProperties.slice(0, 8);
    return [...properties].sort((a, b) => b.aiMatch - a.aiMatch).slice(0, 8);
  }, [filteredProperties, properties]);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => c + PAGE_SIZE);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) loadMore();
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filteredProperties.length]);

  const showSidebar = !isMobile && !isTablet;
  const showMapPanel = showMap && !isMobile;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="marketplace" />

      {/* Sticky Search Bar */}
      <div ref={searchBarRef} className="sticky top-[60px] md:top-[68px] z-40 bg-slate-50/95 backdrop-blur-sm pt-20 md:pt-24 pb-2 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto">
          <SearchBar
            location={location}
            setLocation={setLocation}
            moveInDate={moveInDate}
            setMoveInDate={setMoveInDate}
            flexibleDate={flexibleDate}
            setFlexibleDate={setFlexibleDate}
            minBudget={minBudget}
            setMinBudget={setMinBudget}
            maxBudget={maxBudget}
            setMaxBudget={setMaxBudget}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            gender={gender}
            setGender={setGender}
            sharingType={sharingType}
            setSharingType={setSharingType}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <main className="px-4 md:px-8 pb-24 max-w-[1600px] mx-auto">
        {/* Quick Filters */}
        <QuickFilters activeFilters={quickFilters} onToggle={toggleQuickFilter} />

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <p className="text-sm font-semibold text-slate-500">
            {loading ? 'Discovering spaces...' : (
              <><span className="font-black text-[#001F3F]">{filteredProperties.length}</span> properties found</>
            )}
          </p>
          <div className="flex items-center gap-2">
            {compareIds.length > 0 && (
              <button
                onClick={() => setShowCompare(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#001F3F] text-[#FFC107] rounded-xl text-xs font-bold"
              >
                <GitCompareArrows size={14} />
                Compare ({compareIds.length})
              </button>
            )}
            {(isMobile || isTablet) && (
              <button
                onClick={() => setShowFilterDrawer(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#001F3F]"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
            )}
            {!isMobile && (
              <button
                onClick={() => setShowMap(!showMap)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  showMap ? 'bg-[#001F3F] text-[#FFC107]' : 'bg-white border border-slate-200 text-[#001F3F]'
                }`}
              >
                <Map size={14} />
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            )}
          </div>
        </div>

        {/* Three-column layout */}
        <div className={`grid gap-6 ${showMapPanel ? 'lg:grid-cols-[260px_1fr_380px]' : showSidebar ? 'lg:grid-cols-[260px_1fr]' : 'grid-cols-1'}`}>
          {/* Filter Sidebar — Desktop */}
          {showSidebar && (
            <FilterSidebar
              propertyTypes={propertyTypes}
              setPropertyTypes={setPropertyTypes}
              genders={genders}
              setGenders={setGenders}
              roomTypes={roomTypes}
              setRoomTypes={setRoomTypes}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              distance={distance}
              setDistance={setDistance}
              amenities={amenities}
              setAmenities={setAmenities}
              minRating={minRating}
              setMinRating={setMinRating}
              trustFilters={trustFilters}
              setTrustFilters={setTrustFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={resetFilters}
              collapsed={false}
            />
          )}

          {/* Property Listings — Center */}
          <div className="min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <>
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <AnimatePresence mode="popLayout">
                    {visibleProperties.length > 0 ? (
                      visibleProperties.map((p) => (
                        <PropertyCard
                          key={p.id}
                          property={p}
                          isSaved={savedIds.includes(p.id)}
                          isCompared={compareIds.includes(p.id)}
                          isHighlighted={highlightedId === p.id}
                          onToggleSave={handleToggleSave}
                          onToggleCompare={handleToggleCompare}
                          onHover={setHighlightedId}
                          onLeave={() => setHighlightedId(null)}
                        />
                      ))
                    ) : (
                      <EmptyState
                        recommendations={similarProperties}
                        savedIds={savedIds}
                        compareIds={compareIds}
                        onToggleSave={handleToggleSave}
                        onToggleCompare={handleToggleCompare}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {hasMore && (
                  <div ref={loadMoreRef} className="flex justify-center py-8">
                    <div className="w-8 h-8 border-3 border-[#FFC107] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </>
            )}

            {!loading && filteredProperties.length > 0 && (
              <AIRecommendation
                similarProperties={similarProperties}
                budget={minBudget}
                maxBudget={maxBudget}
              />
            )}

            <TrustSignals />
          </div>

          {/* Map — Right */}
          {showMapPanel && !loading && (
            <div className="hidden lg:block sticky top-36 h-fit">
              <MapView
                properties={visibleProperties}
                highlightedId={highlightedId}
                onMarkerHover={setHighlightedId}
                onMarkerLeave={() => setHighlightedId(null)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Mobile Map Toggle FAB */}
      {isMobile && !loading && (
        <button
          onClick={() => setShowMap(!showMap)}
          className="fixed bottom-20 right-4 z-50 w-12 h-12 bg-[#001F3F] text-[#FFC107] rounded-full shadow-xl flex items-center justify-center"
        >
          <Map size={20} />
        </button>
      )}

      {/* Mobile Map Overlay */}
      {isMobile && showMap && !loading && (
        <div className="fixed inset-0 z-[90] bg-white pt-16">
          <button
            onClick={() => setShowMap(false)}
            className="absolute top-20 right-4 z-50 p-2 bg-white rounded-full shadow-lg"
          >
            <X size={20} />
          </button>
          <MapView
            properties={visibleProperties}
            highlightedId={highlightedId}
            onMarkerHover={setHighlightedId}
            onMarkerLeave={() => setHighlightedId(null)}
          />
        </div>
      )}

      {/* Filter Drawer — Mobile/Tablet */}
      <AnimatePresence>
        {showFilterDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[150]"
              onClick={() => setShowFilterDrawer(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 z-[160] bg-white rounded-t-3xl max-h-[85vh] overflow-auto p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-[#001F3F] flex items-center gap-2">
                  <Filter size={18} className="text-[#FFC107]" /> Filters
                </h3>
                <button onClick={() => setShowFilterDrawer(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar
                propertyTypes={propertyTypes}
                setPropertyTypes={setPropertyTypes}
                genders={genders}
                setGenders={setGenders}
                roomTypes={roomTypes}
                setRoomTypes={setRoomTypes}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                distance={distance}
                setDistance={setDistance}
                amenities={amenities}
                setAmenities={setAmenities}
                minRating={minRating}
                setMinRating={setMinRating}
                trustFilters={trustFilters}
                setTrustFilters={setTrustFilters}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onReset={resetFilters}
                collapsed={false}
              />
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="w-full mt-4 py-3 bg-[#FFC107] text-[#001F3F] font-black rounded-xl"
              >
                Show {filteredProperties.length} Properties
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Compare Drawer */}
      <CompareDrawer
        properties={compareProperties}
        onRemove={(id) => setCompareIds((prev) => prev.filter((c) => c !== id))}
        onClose={() => setShowCompare(false)}
        isOpen={showCompare && compareIds.length > 0}
      />

      <Footer />
    </div>
  );
}
