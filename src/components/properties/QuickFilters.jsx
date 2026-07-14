import React from 'react';
import { motion } from 'framer-motion';
import { QUICK_FILTER_OPTIONS } from '../../utils/propertyHelpers';

export default function QuickFilters({ activeFilters, onToggle }) {
  return (
    <div className="sticky top-[120px] md:top-[128px] z-30 bg-slate-50/95 backdrop-blur-sm py-3 -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {QUICK_FILTER_OPTIONS.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <motion.button
              key={filter.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(filter.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                isActive ? 'chip-active' : 'chip-inactive'
              }`}
            >
              {filter.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
