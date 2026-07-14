import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Sparkles } from 'lucide-react';

export default function CompareDrawer({ properties, onRemove, onClose, isOpen }) {
  if (!isOpen || properties.length === 0) return null;

  const fields = [
    { key: 'price', label: 'Rent', render: (p) => p.price > 0 ? `₹${p.price.toLocaleString()}/mo` : 'Contact' },
    { key: 'deposit', label: 'Deposit', render: (p) => p.deposit > 0 ? `₹${p.deposit.toLocaleString()}` : 'None' },
    { key: 'location', label: 'Location', render: (p) => `${p.city}, ${p.state}` },
    { key: 'distance', label: 'Distance', render: (p) => `${p.metroDistance}m from Metro` },
    { key: 'amenities', label: 'Amenities', render: (p) => p.amenities?.join(', ') || '—' },
    { key: 'rating', label: 'Rating', render: (p) => (
      <span className="flex items-center gap-1"><Star size={12} fill="#FFC107" className="text-[#FFC107]" />{p.rating.toFixed(1)}</span>
    )},
    { key: 'aiMatch', label: 'AI Match', render: (p) => (
      <span className="flex items-center gap-1"><Sparkles size={12} className="text-[#FFC107]" />{p.aiMatch}%</span>
    )},
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-[200] bg-white border-t border-slate-200 shadow-2xl max-h-[70vh] overflow-auto"
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-black text-[#001F3F]">
            Compare Properties ({properties.length}/4)
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left text-xs font-black text-slate-400 uppercase p-3 w-32">Feature</th>
                {properties.map((p) => (
                  <th key={p.id} className="p-3 text-left min-w-[160px]">
                    <div className="relative">
                      <button
                        onClick={() => onRemove(p.id)}
                        className="absolute -top-1 -right-1 p-1 bg-slate-100 rounded-full hover:bg-red-100"
                      >
                        <X size={12} />
                      </button>
                      <img src={p.image} alt={p.name} className="w-full h-24 object-cover rounded-xl mb-2" />
                      <p className="font-black text-sm text-[#001F3F] truncate">{p.name}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.key} className="border-t border-slate-50">
                  <td className="p-3 text-xs font-bold text-slate-500">{field.label}</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 text-xs font-semibold text-[#001F3F]">
                      {field.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
