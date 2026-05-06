import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, SlidersHorizontal, Star, Zap, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

// Import your brand-new Navbar component
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const PROPERTY_DATA = [
  {
    id: 1,
    name: 'Emerald Heights',
    location: 'Koramangala, Bangalore',
    price: 8500, // Changed to Number for easier math
    type: 'PG',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    tags: ['Verified', 'Wifi']
  },
  {
    id: 2,
    name: 'Skyline Residency',
    location: 'Gurgaon, NCR',
    price: 12000,
    type: 'Hostel',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    tags: ['Luxury', 'Verified']
  },
  {
    id: 3,
    name: 'Sunset Lofts',
    location: 'Viman Nagar, Pune',
    price: 9800,
    type: 'Coliving',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
    tags: ['AC', 'Gym']
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Stays');
  const [maxPrice, setMaxPrice] = useState(30000);

  // Memoized filter logic for performance
  const filteredProperties = useMemo(() => {
    return PROPERTY_DATA.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All Stays' || p.type === selectedType;
      const matchesPrice = p.price <= maxPrice;

      return matchesSearch && matchesType && matchesPrice;
    });
  }, [searchTerm, selectedType, maxPrice]);

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      <Navbar />

      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-black text-[#001F3F] tracking-tight">Explore Stays</h1>
            <p className="text-slate-500 font-medium mt-2">
              Found <span className="text-[#001F3F] font-bold">{filteredProperties.length} premium properties</span> in your area.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 w-full md:w-auto"
          >
            <div className="relative flex-1 md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FFC107] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search by area or name..."
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[24px] outline-none shadow-sm focus:ring-4 focus:ring-[#FFC107]/10 focus:border-[#FFC107] transition-all font-bold text-[#001F3F]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-5 bg-[#001F3F] text-white rounded-[24px] hover:bg-[#002d5c] transition-all shadow-xl shadow-blue-900/20 active:scale-95">
              <SlidersHorizontal size={24} />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-10">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <h4 className="text-[11px] font-black text-[#001F3F] uppercase tracking-[0.2em] mb-6">Stay Type</h4>
              <div className="space-y-4">
                {['All Stays', 'PG', 'Hostel', 'Coliving'].map(filter => (
                  <label key={filter} className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="radio" // Changed to radio for single selection
                        name="stayType"
                        checked={selectedType === filter}
                        onChange={() => setSelectedType(filter)}
                        className="peer appearance-none w-6 h-6 rounded-lg border-2 border-slate-200 checked:bg-[#001F3F] checked:border-[#FFC107] transition-all cursor-pointer" 
                      />
                      <Zap size={12} className="absolute left-1.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <span className={`text-sm font-bold transition-colors ${selectedType === filter ? 'text-[#001F3F]' : 'text-slate-500'} group-hover:text-[#001F3F]`}>
                      {filter}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[11px] font-black text-[#001F3F] uppercase tracking-[0.2em]">Budget</h4>
                <span className="text-xs font-black text-[#001F3F]">Under ₹{maxPrice.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="5000"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#001F3F]" 
              />
              <div className="flex justify-between mt-4 text-[11px] font-black text-slate-400">
                <span>₹5,000</span>
                <span>₹30,000+</span>
              </div>
            </motion.div>
          </aside>

          {/* Property Grid */}
          <motion.div 
            className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full py-20 text-center"
                >
                  <p className="text-slate-400 font-bold uppercase tracking-widest">No properties match your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PropertyCard({ property }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      layout
      variants={fadeInUp}
      whileHover={{ y: -12 }}
      onClick={() => navigate(`/property/${property.id}`)}
      className="bg-white rounded-[40px] overflow-hidden border border-slate-100 group shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-72 overflow-hidden">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={property.image} 
          className="w-full h-full object-cover" 
          alt={property.name} 
        />
        <div className="absolute top-6 left-6">
          <div className="bg-[#001F3F] text-white text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
            <ShieldCheck size={14} className="text-[#FFC107]" /> VERIFIED STAY
          </div>
        </div>
        <button className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full text-[#001F3F] hover:bg-[#FFC107] transition-all">
          <Heart size={18} />
        </button>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-black text-[#001F3F] group-hover:text-[#FFC107] transition-colors">{property.name}</h3>
            <p className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-2 uppercase tracking-widest">
              <MapPin size={14} className="text-[#FFC107]" /> {property.location}
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FFC107]/10 text-[#001F3F] px-3 py-1.5 rounded-xl text-xs font-black">
            <Star size={14} fill="#FFC107" className="text-[#FFC107]" /> {property.rating}
          </div>
        </div>

        <div className="flex gap-2 mb-10">
          {property.tags.map(tag => (
            <span key={tag} className="text-[10px] font-black bg-slate-50 text-slate-400 px-4 py-1.5 rounded-full uppercase tracking-tighter border border-slate-100">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
          <div>
            <span className="text-3xl font-black text-[#001F3F]">₹{property.price.toLocaleString()}</span>
            <span className="text-xs font-bold text-slate-400 ml-1">/ mo</span>
          </div>
          <button className="bg-[#001F3F] text-white px-8 py-4 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-blue-900/20 transition-all flex items-center gap-2">
            Details <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}