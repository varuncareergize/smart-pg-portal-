import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapPin, X, LocateFixed, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, Marker, Circle, useJsApiLoader } from '@react-google-maps/api';

/**
 * MapView — real Google Maps integration.
 *
 * ENV VARIABLE:
 * This reads your API key from an environment variable so it's never
 * hardcoded in source. Set ONE of these in your .env file depending on
 * your build tool, then restart your dev server:
 *
 *   Create React App:  REACT_APP_GOOGLE_MAPS_KEY=your_key_here
 *   Vite:               VITE_GOOGLE_MAPS_KEY=your_key_here
 *   Next.js:             NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here
 *
 * Update the GOOGLE_MAPS_API_KEY constant below to match whichever one
 * you're using.
 *
 * PROPERTY DATA SHAPE:
 * Each property now needs real coordinates instead of mapPosition %:
 *   { id, name, city, image, price, coords: { lat: 12.9716, lng: 77.5946 } }
 * If you currently only have addresses, run them through the Geocoding
 * API once and store lat/lng on the property record.
 */

// Pick the line that matches your build tool, delete the others
const GOOGLE_MAPS_API_KEY =
  (typeof process !== 'undefined' && process.env?.REACT_APP_GOOGLE_MAPS_KEY) || // CRA
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_MAPS_KEY) || // Vite
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GOOGLE_MAPS_KEY) || // Next.js
  '';

const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 }; // India, used until user location resolves

const mapContainerStyle = { width: '100%', height: '100%' };

// Optional: a quieter, more premium map style (feel free to tweak or remove)
const mapStyles = [
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
];

export default function MapView({
  properties,
  highlightedId,
  onMarkerHover,
  onMarkerLeave,
  onMarkerClick,
  visible = true,
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [previewProperty, setPreviewProperty] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // { lat, lng, accuracy }
  const [locError, setLocError] = useState(null);
  const [locating, setLocating] = useState(false);

  const onLoad = useCallback((mapInstance) => setMap(mapInstance), []);
  const onUnmount = useCallback(() => setMap(null), []);

  // One-off "center on me" — triggered by the Locate button
  const locateMe = () => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by this browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setUserLocation(loc);
        setLocError(null);
        setLocating(false);
        map?.panTo({ lat: loc.lat, lng: loc.lng });
        map?.setZoom(15);
      },
      (err) => {
        setLocError(
          err.code === err.PERMISSION_DENIED
            ? 'Location access was denied. Enable it in your browser settings to see your position on the map.'
            : err.message
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Optional: live-updating position as the user moves.
  // Remove this effect if you only want a one-time "locate me" click.
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setLocError(null);
      },
      (err) => setLocError(err.message),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleMarkerClick = (property) => {
    setPreviewProperty(property);
    onMarkerClick?.(property.id);
  };

  const mapCenter = useMemo(
    () => (userLocation ? { lat: userLocation.lat, lng: userLocation.lng } : DEFAULT_CENTER),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // only set center on first load; afterwards the user pans/zooms freely
  );

  if (!visible) return null;

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 text-sm p-6 text-center">
        Missing Google Maps API key. Set REACT_APP_GOOGLE_MAPS_KEY (or the
        equivalent for your build tool) in your .env file and restart the dev server.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 text-sm p-6 text-center">
        Failed to load Google Maps. Check that your API key is valid, billing
        is enabled, and Maps JavaScript API is turned on.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 text-sm">
        Loading map…
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[calc(100vh-220px)] rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: mapStyles,
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* Property markers */}
        {properties.map((property) => {
          const isHighlighted = highlightedId === property.id;
          if (!property.coords) return null; // skip properties without real coords
          return (
            <Marker
              key={property.id}
              position={property.coords}
              onMouseOver={() => onMarkerHover?.(property.id)}
              onMouseOut={() => onMarkerLeave?.()}
              onClick={() => handleMarkerClick(property)}
              zIndex={isHighlighted ? 999 : 1}
              icon={{
                path: 'M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z',
                fillColor: isHighlighted ? '#FFC107' : '#001F3F',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 1.5,
                scale: isHighlighted ? 1.8 : 1.5,
                anchor: window.google ? new window.google.maps.Point(12, 22) : undefined,
              }}
            />
          );
        })}

        {/* User's real location — blue dot + accuracy circle, Google-Maps style */}
        {userLocation && (
          <>
            <Marker
              position={{ lat: userLocation.lat, lng: userLocation.lng }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#1a73e8',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }}
              zIndex={1000}
            />
            <Circle
              center={{ lat: userLocation.lat, lng: userLocation.lng }}
              radius={userLocation.accuracy}
              options={{
                fillColor: '#1a73e8',
                fillOpacity: 0.15,
                strokeColor: '#1a73e8',
                strokeOpacity: 0.3,
                strokeWeight: 1,
              }}
            />
          </>
        )}
      </GoogleMap>

      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 z-10 pointer-events-none">
        Map View • {properties.length} properties
      </div>

      {/* "Locate me" button — top right, like Google Maps' own target icon */}
      <button
        onClick={locateMe}
        disabled={locating}
        className={`absolute top-3 right-3 z-10 bg-white p-2.5 rounded-full shadow-md hover:bg-slate-50 transition-colors ${
          locating ? 'animate-pulse' : ''
        }`}
        title="Show my location"
      >
        <LocateFixed size={18} className={userLocation ? 'text-[#1a73e8]' : 'text-[#001F3F]'} />
      </button>

      {/* Location error toast */}
      <AnimatePresence>
        {locError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 right-3 z-20 max-w-[240px] bg-white shadow-lg border border-red-100 rounded-xl px-3 py-2 flex items-start gap-2"
          >
            <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-600 leading-snug">{locError}</p>
            <button
              onClick={() => setLocError(null)}
              className="ml-auto p-0.5 rounded-full hover:bg-slate-100 shrink-0"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Property preview popup */}
      <AnimatePresence>
        {previewProperty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl p-4 z-40 border border-slate-100"
          >
            <button
              onClick={() => setPreviewProperty(null)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-slate-100"
            >
              <X size={16} />
            </button>
            <div className="flex gap-3">
              <img
                src={previewProperty.image}
                alt={previewProperty.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-[#001F3F] text-sm truncate">{previewProperty.name}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin size={10} /> {previewProperty.city}
                </p>
                <p className="text-lg font-black text-[#001F3F] mt-1">
                  {previewProperty.price > 0 ? `₹${previewProperty.price.toLocaleString()}/mo` : 'Contact'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}