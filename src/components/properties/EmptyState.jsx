import React from 'react';
import { SearchX, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import PropertyCard from './PropertyCard';

export default function EmptyState({ recommendations, savedIds, compareIds, onToggleSave, onToggleCompare }) {
  return (
    <div className="col-span-full py-12">
      <div className="text-center max-w-lg mx-auto mb-10">
        <div className="w-20 h-20 bg-[#FFC107]/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <SearchX size={36} className="text-[#FFC107]" />
        </div>
        <h3 className="text-2xl font-black text-[#001F3F]">No exact matches found</h3>
        <p className="text-slate-500 mt-2 font-medium">Try adjusting your search to discover more stays</p>

        <div className="mt-6 text-left bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Try:</p>
          {[
            { icon: TrendingUp, text: 'Increasing your budget range' },
            { icon: MapPin, text: 'Searching nearby locations' },
            { icon: Sparkles, text: 'Browsing similar properties below' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Icon size={16} className="text-[#FFC107]" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div>
          <h4 className="font-black text-[#001F3F] mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#FFC107]" />
            Recommended for you
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.slice(0, 4).map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                isSaved={savedIds.includes(p.id)}
                isCompared={compareIds.includes(p.id)}
                onToggleSave={onToggleSave}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
