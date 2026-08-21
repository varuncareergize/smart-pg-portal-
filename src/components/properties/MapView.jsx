import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, X, LocateFixed, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GoogleMap,
  Marker,
  Circle,
  useJsApiLoader,
} from '@react-google-maps/api';

// ============================================================
// GOOGLE MAPS CONFIG
// ============================================================

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const DEFAULT_CENTER = {
  lat: 9.9312,
  lng: 76.2673,
};

// FIX: fallback height inline, so the map can never collapse to 0px even
// if a parent container forgets to set an explicit height. width/height
// 100% still wins whenever the parent DOES have a real height.
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
};

// ============================================================
// MAP STYLES
// ============================================================

const MAP_STYLES = [
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
];

// A fixed list of libraries prevents @react-google-maps/api from
// re-requesting the script on every render, which can otherwise
// silently break the loader in some Vite/StrictMode setups.
const LIBRARIES = [];

// ============================================================
// COMPONENT
// ============================================================

export default function MapView({
  properties = [],
  highlightedId,
  onMarkerHover,
  onMarkerLeave,
  onMarkerClick,
  visible = true,
}) {
  // ----------------------------------------------------------
  // STATE
  // ----------------------------------------------------------

  const [map, setMap] = useState(null);
  const [previewProperty, setPreviewProperty] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState(null);

  // ----------------------------------------------------------
  // DEBUG: confirm the key is actually reaching the browser.
  // Check your browser console — if this prints blank/undefined,
  // the .env file isn't being picked up (wrong name/location, or
  // the dev server wasn't restarted after adding it).
  // Remove this once things are working.
  // ----------------------------------------------------------
  useEffect(() => {
    console.log('VITE_GOOGLE_MAPS_API_KEY loaded:', GOOGLE_MAPS_API_KEY ? `yes (${GOOGLE_MAPS_API_KEY.slice(0, 6)}...)` : 'NO — key is missing');
  }, []);

  // ----------------------------------------------------------
  // GOOGLE MAPS LOADER
  // ----------------------------------------------------------

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  // ----------------------------------------------------------
  // MAP LOAD
  // ----------------------------------------------------------

  const handleMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const handleMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // ----------------------------------------------------------
  // GET USER LOCATION
  // ----------------------------------------------------------

  const locateMe = useCallback(() => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    setLocError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        setUserLocation(location);
        setLocating(false);

        if (map) {
          map.panTo({ lat: location.lat, lng: location.lng });
          map.setZoom(16);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocating(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocError('Location permission was denied. Please allow location access in your browser.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocError('Your location is currently unavailable.');
            break;
          case error.TIMEOUT:
            setLocError('Getting your location timed out. Please try again.');
            break;
          default:
            setLocError('Unable to get your location.');
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [map]);

  // ----------------------------------------------------------
  // LIVE LOCATION TRACKING
  // ----------------------------------------------------------

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        console.log('Location tracking error:', error.message);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // ----------------------------------------------------------
  // MARKER CLICK
  // ----------------------------------------------------------

  const handleMarkerClick = (property) => {
    setPreviewProperty(property);
    onMarkerClick?.(property.id);
  };

  // ----------------------------------------------------------
  // MAP CENTER
  // ----------------------------------------------------------

  const mapCenter = userLocation
    ? { lat: userLocation.lat, lng: userLocation.lng }
    : DEFAULT_CENTER;

  // ----------------------------------------------------------
  // HIDDEN
  // ----------------------------------------------------------

  if (!visible) return null;

  // ----------------------------------------------------------
  // API KEY MISSING
  // ----------------------------------------------------------

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <AlertCircle size={32} className="text-red-500 mb-3" />
        <h3 className="font-bold text-red-700">Google Maps API Key Missing</h3>
        <p className="text-sm text-red-600 mt-2">Add the following environment variable:</p>
        <code className="mt-3 bg-white px-3 py-2 rounded-lg text-xs text-red-700">
          VITE_GOOGLE_MAPS_API_KEY
        </code>
        <p className="text-xs text-red-500 mt-3">
          Add it to a .env file in your project root, then fully restart (not
          hot-reload) your Vite dev server.
        </p>
      </div>
    );
  }

  // ----------------------------------------------------------
  // GOOGLE MAPS LOAD ERROR
  // ----------------------------------------------------------

  if (loadError) {
    console.error('Google Maps loading error:', loadError);

    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <AlertCircle size={32} className="text-red-500 mb-3" />
        <h3 className="font-bold text-red-700">Google Maps Failed to Load</h3>
        <p className="text-sm text-red-600 mt-2 max-w-md">
          Check your Google Maps API key, billing, Maps JavaScript API, and
          API key restrictions.
        </p>
        <p className="text-xs text-red-500 mt-3">
          Open your browser console for the exact Google Maps error
          (e.g. ApiNotActivatedMapError, RefererNotAllowedMapError,
          InvalidKeyMapError, or BillingNotEnabledMapError).
        </p>
      </div>
    );
  }

  // ----------------------------------------------------------
  // LOADING
  // ----------------------------------------------------------

  if (!isLoaded) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-[#001F3F] rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    // FIX: explicit min-height here too, as a second safety net in case
    // a parent flex/grid container collapses this wrapper to 0px.
    <div
      className="relative w-full h-full min-h-[400px] lg:min-h-[calc(100vh-220px)] rounded-2xl overflow-hidden border border-slate-200 shadow-lg"
      style={{ minHeight: '400px' }}
    >
      {/* ======================================================
          GOOGLE MAP
      ====================================================== */}

      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={mapCenter}
        zoom={12}
        onLoad={handleMapLoad}
        onUnmount={handleMapUnmount}
        options={{
          styles: MAP_STYLES,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: true,
          clickableIcons: true,
          gestureHandling: 'greedy',
        }}
      >
        {/* ==================================================
            PROPERTY MARKERS
        ================================================== */}

        {isLoaded &&
          window.google &&
          properties.map((property) => {
            if (!property.coords) return null;

            const isHighlighted = highlightedId === property.id;

            return (
              <Marker
                key={property.id}
                position={{
                  lat: Number(property.coords.lat),
                  lng: Number(property.coords.lng),
                }}
                onMouseOver={() => onMarkerHover?.(property.id)}
                onMouseOut={() => onMarkerLeave?.()}
                onClick={() => handleMarkerClick(property)}
                zIndex={isHighlighted ? 999 : 1}
                title={property.name}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: isHighlighted ? 10 : 8,
                  fillColor: isHighlighted ? '#FFC107' : '#001F3F',
                  fillOpacity: 1,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 3,
                }}
              />
            );
          })}

        {/* ==================================================
            USER LOCATION
        ================================================== */}

        {isLoaded && window.google && userLocation && (
          <>
            <Circle
              center={{ lat: userLocation.lat, lng: userLocation.lng }}
              radius={userLocation.accuracy}
              options={{
                fillColor: '#1A73E8',
                fillOpacity: 0.12,
                strokeColor: '#1A73E8',
                strokeOpacity: 0.35,
                strokeWeight: 1,
                clickable: false,
                zIndex: 1,
              }}
            />

            <Marker
              position={{ lat: userLocation.lat, lng: userLocation.lng }}
              title="Your location"
              zIndex={1000}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 9,
                fillColor: '#1A73E8',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 3,
              }}
            />
          </>
        )}
      </GoogleMap>

      {/* ======================================================
          MAP LABEL
      ====================================================== */}

      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 shadow-sm z-10 pointer-events-none">
        Map View • {properties.length} properties
      </div>

      {/* ======================================================
          MY LOCATION BUTTON
      ====================================================== */}

      <button
        type="button"
        onClick={locateMe}
        disabled={locating}
        className={`absolute top-3 right-3 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-slate-50 active:scale-95 transition-all ${
          locating ? 'animate-pulse' : ''
        }`}
        title="Show my location"
        aria-label="Show my location"
      >
        <LocateFixed size={20} className={userLocation ? 'text-[#1A73E8]' : 'text-[#001F3F]'} />
      </button>

      {/* ======================================================
          LOCATION ERROR
      ====================================================== */}

      <AnimatePresence>
        {locError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-3 z-20 max-w-[280px] bg-white shadow-xl border border-red-100 rounded-xl p-3 flex items-start gap-2"
          >
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">{locError}</p>
            <button
              type="button"
              onClick={() => setLocError(null)}
              className="ml-auto p-1 rounded-full hover:bg-slate-100 shrink-0"
              aria-label="Close"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          PROPERTY PREVIEW
      ====================================================== */}

      <AnimatePresence>
        {previewProperty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl p-4 z-40 border border-slate-100"
          >
            <button
              type="button"
              onClick={() => setPreviewProperty(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-100 transition"
              aria-label="Close property preview"
            >
              <X size={16} />
            </button>

            <div className="flex gap-3 pr-6">
              {previewProperty.image && (
                <img
                  src={previewProperty.image}
                  alt={previewProperty.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
              )}

              <div className="flex-1 min-w-0">
                <h4 className="font-black text-[#001F3F] text-sm truncate">
                  {previewProperty.name}
                </h4>

                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin size={10} />
                  {previewProperty.city || 'Location'}
                </p>

                <p className="text-lg font-black text-[#001F3F] mt-1">
                  {previewProperty.price > 0
                    ? `₹${Number(previewProperty.price).toLocaleString('en-IN')}/mo`
                    : 'Contact'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}