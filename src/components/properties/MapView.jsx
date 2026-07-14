import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MapView — Google Maps integration structure.
 * Replace the mock map background with Google Maps API:
 *   <GoogleMap mapContainerStyle={...} center={center} zoom={12}>
 *     {properties.map(p => <Marker key={p.id} position={p.coords} onClick={...} />)}
 *   </GoogleMap>
 */
export default function MapView({
  properties,
  highlightedId,
  onMarkerHover,
  onMarkerLeave,
  onMarkerClick,
  visible = true,
}) {
  const [previewProperty, setPreviewProperty] = useState(null);

  if (!visible) return null;

  const handleMarkerClick = (property) => {
    setPreviewProperty(property);
    onMarkerClick?.(property.id);
  };

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[calc(100vh-220px)] rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
      {/* Mock map background — swap with Google Maps container */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23e8f0e8' width='400' height='400'/%3E%3Cpath d='M0 80h400M0 160h400M0 240h400M0 320h400M80 0v400M160 0v400M240 0v400M320 0v400' stroke='%23c5d5c5' stroke-width='1'/%3E%3Cpath d='M50 50 Q150 100 250 60 T400 120' fill='none' stroke='%23a8c8a8' stroke-width='8'/%3E%3Cpath d='M30 300 Q200 250 370 320' fill='none' stroke='%23b8d4f0' stroke-width='6'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 z-10">
        Map View • {properties.length} properties
      </div>

      {/* Price markers */}
      {properties.map((property) => {
        const isHighlighted = highlightedId === property.id;
        const pos = property.mapPosition || { top: '50%', left: '50%' };
        return (
          <motion.button
            key={property.id}
            initial={{ scale: 0 }}
            animate={{ scale: isHighlighted ? 1.15 : 1 }}
            className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
              isHighlighted ? 'z-30' : ''
            }`}
            style={{ top: pos.top, left: pos.left }}
            onMouseEnter={() => onMarkerHover?.(property.id)}
            onMouseLeave={() => onMarkerLeave?.()}
            onClick={() => handleMarkerClick(property)}
          >
            <div
              className={`px-2.5 py-1 rounded-lg text-xs font-black shadow-lg transition-all ${
                isHighlighted
                  ? 'bg-[#FFC107] text-[#001F3F] scale-110 shadow-[#FFC107]/40'
                  : 'bg-[#001F3F] text-white hover:bg-[#FFC107] hover:text-[#001F3F]'
              }`}
            >
              {property.price > 0 ? `₹${(property.price / 1000).toFixed(0)}k` : 'Ask'}
            </div>
            <div
              className={`w-2 h-2 mx-auto rotate-45 -mt-1 ${
                isHighlighted ? 'bg-[#FFC107]' : 'bg-[#001F3F]'
              }`}
            />
          </motion.button>
        );
      })}

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
