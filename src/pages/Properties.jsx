import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Star, ShieldCheck, ArrowRight, Loader2, XCircle, Filter } from 'lucide-react';

import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Properties() {
  const [properties, setProperties] = useState([]); 
  const [loading, setLoading] = useState(true);    
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Stays');
  const [maxPrice, setMaxPrice] = useState(30000);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/properties/all/');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'All Stays' || p.property_type === selectedType;
      const priceVal = parseFloat(p.price);
      const matchesPrice = priceVal === 0 || priceVal <= maxPrice;

      return matchesSearch && matchesType && matchesPrice;
    });
  }, [properties, searchTerm, selectedType, maxPrice]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black text-[#001F3F] leading-tight"
            >
              Find Your <span className="text-[#FFC107]">Perfect</span> Space.
            </motion.h1>
            <p className="text-slate-500 mt-4 font-medium text-lg">
              {loading ? "Discovering spaces..." : `Showing ${filteredProperties.length} curated stays based on your filters.`}
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full md:w-[400px] relative group"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#001F3F] transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Search area, building or city..."
              className="w-full pl-16 pr-8 py-6 bg-white rounded-3xl outline-none shadow-lg shadow-slate-200/50 border border-transparent focus:border-[#FFC107] focus:ring-4 focus:ring-[#FFC107]/5 transition-all font-bold text-[#001F3F]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar: Glassmorphism Design */}
          <aside className="lg:sticky lg:top-32 h-fit space-y-8 bg-white/60 backdrop-blur-md p-8 rounded-[32px] border border-white shadow-xl shadow-slate-200/40">
            {/* <div className="flex items-center gap-3 text-[#001F3F] mb-4">
               <Filter size={18} className="text-[#FFC107]" />
               <h3 className="font-black uppercase tracking-widest text-sm">Filters</h3>
            </div> */}

            <div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Stay Category</h4>
              <div className="flex flex-wrap lg:flex-col gap-3">
                {['All Stays', 'PG', 'Hostel', 'Coliving'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
                      selectedType === type 
                      ? 'bg-[#001F3F] text-[#FFC107] shadow-lg shadow-blue-900/20 translate-x-2' 
                      : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Budget: ₹{maxPrice.toLocaleString()}</h4>
              <input 
                type="range" 
                min="5000" 
                max="50000" 
                step="500" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FFC107]"
              />
              <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <span>Min ₹5k</span>
                <span>Max ₹50k</span>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-[500px] bg-slate-200 rounded-[40px] animate-pulse" />)}
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                <AnimatePresence>
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((p) => (
                      <PropertyCard key={p.id} property={p} />
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="col-span-full py-32 flex flex-col items-center text-center"
                    >
                      <div className="bg-slate-100 p-8 rounded-full mb-6">
                        <XCircle size={64} className="text-slate-300" />
                      </div>
                      <h3 className="text-2xl font-black text-[#001F3F]">No stays found in this range</h3>
                      <p className="text-slate-400 mt-2 font-medium">Try adjusting your filters or search term.</p>
                      <button 
                        onClick={() => {setSearchTerm(''); setSelectedType('All Stays'); setMaxPrice(50000)}}
                        className="mt-8 text-[#FFC107] font-black border-b-2 border-[#FFC107] hover:text-[#001F3F] hover:border-[#001F3F] transition-all pb-1"
                      >
                        Reset All Filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
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
      variants={itemVariants}
      whileHover={{ y: -15 }}
      onClick={() => navigate(`/property/${property.id}`)}
      className="group bg-white rounded-[44px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,31,63,0.15)] transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-[320px] overflow-hidden m-4 rounded-[32px]">
        <img 
          src={property.image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          alt={property.name} 
        />
        <div className="absolute top-6 left-6">
          <div className="bg-[#001F3F]/90 backdrop-blur-md text-white text-[11px] font-black px-5 py-2.5 rounded-2xl flex items-center gap-2 border border-white/20">
            <ShieldCheck size={16} className="text-[#FFC107]" /> {property.property_type}
          </div>
        </div>
      </div>

      <div className="px-10 pb-10 pt-4">
        <div className="flex justify-between items-start mb-6">
          <div className="max-w-[70%]">
            <h3 className="text-2xl font-black text-[#001F3F] line-clamp-1 group-hover:text-[#FFC107] transition-colors">{property.name}</h3>
            <p className="text-sm font-bold text-slate-400 mt-2 flex items-center gap-2 truncate">
              <MapPin size={16} className="text-[#FFC107] shrink-0" /> {property.city}, {property.state}
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FFC107] text-[#001F3F] px-4 py-2 rounded-2xl text-xs font-black shadow-lg shadow-[#FFC107]/20">
            <Star size={14} fill="#001F3F" /> {property.rating || "4.5"}
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {property.tags && property.tags.map(tag => (
            <span key={tag} className="text-[10px] font-black bg-slate-50 text-slate-500 px-4 py-2 rounded-xl uppercase border border-slate-100 whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-100">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Starting from</p>
            <span className="text-3xl font-black text-[#001F3F]">
                {parseFloat(property.price) > 0 ? `₹${parseFloat(property.price).toLocaleString()}` : "Contact"}
            </span>
            {parseFloat(property.price) > 0 && <span className="text-sm font-bold text-slate-400 ml-1">/mo</span>}
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-[#001F3F] rounded-2xl flex items-center justify-center text-[#FFC107] shadow-xl hover:bg-[#FFC107] hover:text-[#001F3F] transition-all"
          >
            <ArrowRight size={24} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}