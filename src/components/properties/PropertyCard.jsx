import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Star, Heart, Phone, MessageCircle, Eye,
  CheckCircle, Sparkles, Wifi, Utensils, Wind, Shirt, Shield,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

const AMENITY_ICONS = {
  WiFi: Wifi,
  Food: Utensils,
  AC: Wind,
  Laundry: Shirt,
  Security: Shield,
};

const BADGE_STYLES = {
  verified: 'bg-emerald-500/90 text-white',
  choice: 'bg-[#FFC107] text-[#001F3F]',
  instant: 'bg-blue-500/90 text-white',
  brokerage: 'bg-purple-500/90 text-white',
};

export default function PropertyCard({
  property,
  isSaved,
  isCompared,
  isHighlighted,
  onToggleSave,
  onToggleCompare,
  onHover,
  onLeave,
}) {
  const navigate = useNavigate();

  const handleBookVisit = (e) => {
    e.stopPropagation();
    navigate(`/property/${property.id}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/property/${property.id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => onHover?.(property.id)}
      onMouseLeave={() => onLeave?.()}
      className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer ${
        isHighlighted
          ? 'border-[#FFC107] shadow-lg shadow-[#FFC107]/20 ring-2 ring-[#FFC107]/30'
          : 'border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#001F3F]/10'
      }`}
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* Image Section */}
      <div className="relative h-52 m-3 rounded-2xl overflow-hidden">
        <ImageCarousel images={property.images} alt={property.name} className="group" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
          {property.badges?.slice(0, 2).map((badge) => (
            <span
              key={badge.type}
              className={`text-[10px] font-black px-2.5 py-1 rounded-lg backdrop-blur-sm ${BADGE_STYLES[badge.type]}`}
            >
              {badge.type === 'verified' && '✓ '}
              {badge.type === 'choice' && '⭐ '}
              {badge.type === 'instant' && '⚡ '}
              {badge.type === 'brokerage' && '₹ '}
              {badge.label}
            </span>
          ))}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave?.(property.id); }}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={16}
            className={isSaved ? 'fill-red-500 text-red-500' : 'text-slate-400'}
          />
        </button>

        {/* Compare */}
        <label
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-600 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => onToggleCompare?.(property.id)}
            className="accent-[#FFC107] w-3 h-3"
          />
          Compare
        </label>
      </div>

      {/* Property Info */}
      <div className="px-4 pb-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h3 className="font-black text-[#001F3F] text-base truncate group-hover:text-[#FFC107] transition-colors">
              {property.name}
            </h3>
            <p className="text-xs font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-[#FFC107] shrink-0" />
              {property.city}, {property.state}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[#FFC107] text-[#001F3F] px-2 py-1 rounded-lg text-xs font-black shrink-0">
            <Star size={12} fill="#001F3F" />
            {property.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-bold text-slate-500">
          <span>{property.metroDistance < 1000 ? `${property.metroDistance}m` : `${(property.metroDistance / 1000).toFixed(1)}km`} from Metro</span>
          <span>{property.collegeDistance < 1000 ? `${property.collegeDistance}m` : `${(property.collegeDistance / 1000).toFixed(1)}km`} from College</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black text-[#001F3F]">
            {property.price > 0 ? `₹${property.price.toLocaleString()}` : 'Contact'}
          </span>
          {property.price > 0 && <span className="text-xs font-bold text-slate-400">/month</span>}
          {property.deposit > 0 && (
            <span className="text-[10px] font-bold text-slate-400 ml-auto">
              Deposit ₹{property.deposit.toLocaleString()}
            </span>
          )}
        </div>

        {/* Amenities */}
        <div className="flex gap-1.5 flex-wrap">
          {property.amenities?.slice(0, 5).map((a) => {
            const Icon = AMENITY_ICONS[a];
            return (
              <span
                key={a}
                className="flex items-center gap-1 text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100"
              >
                {Icon && <Icon size={10} />}
                {a}
              </span>
            );
          })}
        </div>

        {/* AI Recommendation */}
        <div className="bg-gradient-to-r from-[#001F3F]/5 to-[#FFC107]/10 rounded-xl p-3 border border-[#FFC107]/20">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles size={14} className="text-[#FFC107]" />
            <span className="text-xs font-black text-[#001F3F]">{property.aiMatch}% AI Match</span>
          </div>
          <p className="text-[10px] font-bold text-slate-500 mb-1">Why this property?</p>
          <div className="flex flex-wrap gap-1">
            {property.aiReasons?.slice(0, 3).map((reason) => (
              <span key={reason} className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                <CheckCircle size={10} /> {reason}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleBookVisit}
            className="flex-1 py-2.5 bg-[#FFC107] text-[#001F3F] font-black text-xs rounded-xl hover:shadow-lg hover:shadow-[#FFC107]/30 transition-shadow"
          >
            Book Visit
          </button>
          <button
            onClick={handleViewDetails}
            className="px-3 py-2.5 bg-slate-50 text-[#001F3F] font-bold text-xs rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <Eye size={14} /> Details
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-2.5 bg-slate-50 text-[#001F3F] rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <Phone size={14} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
