import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';

// Same fallback used on the Home page
const DEFAULT_PROPERTY_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop";

// Resolve a property image the same way Home.jsx does
function resolveImage(image) {
  if (!image) return DEFAULT_PROPERTY_IMAGE;
  return image.startsWith('http') ? image : `${BASE_URL}${image}`;
}

function MiniPropertyCard({ property }) {
  const navigate = useNavigate();
  const imageSrc = resolveImage(property.image);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/property/${property.id}`)}
      className="shrink-0 w-56 bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
    >
      <img
        src={imageSrc}
        alt={property.name}
        className="w-full h-32 object-cover"
        loading="lazy"
        onError={(e) => { e.currentTarget.src = DEFAULT_PROPERTY_IMAGE; }}
      />
      <div className="p-3">
        <h4 className="font-black text-sm text-[#001F3F] truncate">{property.name}</h4>
        <p className="text-xs text-slate-400 mt-0.5">{property.city}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-black text-[#001F3F]">
            {property.price > 0 ? `₹${property.price.toLocaleString()}` : 'Contact'}
          </span>
          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
            <Sparkles size={10} /> {property.aiMatch}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AIRecommendation({ similarProperties, budget, maxBudget }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 240, behavior: 'smooth' });
    }
  };

  const recommendedMin = Math.max(3000, budget - 1000);
  const recommendedMax = maxBudget + 2000;
  const inRangeCount = similarProperties.filter(
    (p) => p.price >= recommendedMin && p.price <= recommendedMax
  ).length;

  if (!similarProperties.length) return null;

  return (
    <div className="space-y-6 mt-8">
      {/* Budget Recommendation */}
      <div className="bg-gradient-to-r from-[#001F3F] to-[#001F3F]/90 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <IndianRupee size={18} className="text-[#FFC107]" />
          <h3 className="font-black text-sm">Budget Recommendation</h3>
        </div>
        <p className="text-sm text-white/80">
          Your budget: <span className="font-black text-[#FFC107]">₹{budget.toLocaleString()}</span>
        </p>
        <p className="text-sm text-white/80 mt-1">
          Recommended range: <span className="font-black">₹{recommendedMin.toLocaleString()} – ₹{recommendedMax.toLocaleString()}</span>
        </p>
        <p className="text-xs font-bold text-[#FFC107] mt-2">
          {inRangeCount} more properties available in this range
        </p>
      </div>

      {/* Similar Properties Carousel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-[#001F3F] flex items-center gap-2">
           
            You may also like
          </h3>
          <div className="flex gap-1">
            <button onClick={() => scroll(-1)} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll(1)} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {similarProperties.map((p) => (
            <MiniPropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
}