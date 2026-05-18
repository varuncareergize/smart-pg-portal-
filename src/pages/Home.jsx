import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Search, Star, Wifi, Coffee, Wind, 
  Shield, Dumbbell, Zap, Tv, Heart, ArrowRight, Sparkles
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- STYLED ANIMATION CONSTANTS ---
const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// --- STATIC HOUSING PORTFOLIO CATEGORIES ---
const CATEGORIES = [
  { name: 'Living', icon: <Tv size={22} className="text-indigo-400"/> },
  { name: 'Dining', icon: <Coffee size={22} className="text-emerald-400"/> },
  { name: 'Bedroom', icon: <Wind size={22} className="text-violet-400"/> },
  { name: 'Security', icon: <Shield size={22} className="text-sky-400"/> },
  { name: 'Premium', icon: <Star size={22} className="text-amber-400"/> },
  { name: 'Kitchen', icon: <Coffee size={22} className="text-pink-400"/> },
  { name: 'Fitness', icon: <Dumbbell size={22} className="text-teal-400"/> },
  { name: 'Utilities', icon: <Zap size={22} className="text-orange-400"/> },
];

export default function Home() {
  const navigate = useNavigate();
  const featuredSectionRef = useRef(null);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://smart-pg-backend.onrender.com/properties/all/');
        const data = await response.json();
        setProperties(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const scrollToFeatured = () => {
    featuredSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-[#06040F] text-white font-sans antialiased overflow-x-hidden relative">
      
      {/* Background Ambient Mesh Filters */}
      <div className="absolute top-0 left-0 w-full h-[120vh] bg-gradient-to-b from-[#0B081F]/40 to-transparent pointer-events-none z-10" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <Navbar />

      {/* =========================================================
          SECTION 1: HIGH-IMPACT PREMIUM HERO (Ref: crib1.jpg architecture)
         ========================================================= */}
      <section className="relative min-h-screen flex items-center justify-start px-6 md:px-16 lg:px-24 overflow-hidden pt-20">
        
        {/* Render Background Layer - Deep Isometric 3D Mockup Visual Backing */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[#06040F] via-[#06040F]/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1800" 
            className="w-full h-full object-cover object-right brightness-[0.22] contrast-[1.05] saturate-[0.65]"
            alt="Premium Architectural Grid Backing"
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mt-12">
          {/* <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-violet-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-300 tracking-wide mb-8 shadow-inner"
          >
            <Sparkles size={13} className="text-amber-400 animate-pulse" />
            <span>Premium Shared Living Environments</span>
          </motion.div> */}

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
          >
            Luxury Living. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">Redefined.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed mt-6 mb-10"
          >
            LIVZZ connects you with verified, high-end properties featuring modern automation, elite amenities, and professional operational management across top metropolitan hubs.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => navigate('/properties')}
              className="bg-[#2D2675] hover:bg-[#393096] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-[0_12px_40px_rgba(45,38,117,0.4)] flex items-center gap-3 group active:scale-[0.98] border border-white/10"
            >
              Explore Stays
              <Search size={16} className="group-hover:scale-105 transition-transform" />
            </button>
            <button 
              onClick={scrollToFeatured}
              className="px-8 py-4 border border-white/20 hover:border-white text-white rounded-xl text-xs tracking-wider uppercase font-bold transition-all bg-white/[0.02] active:scale-[0.98]"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>


      {/* =========================================================
          SECTION 2: EXPLORE BY SPACES (Ref: carb4.png Grid Architecture)
         ========================================================= */}
      <section className="py-32 bg-[#F8FAFC] text-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#2D2675] leading-tight">
                Explore LIVZZ Spaces
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-xs font-bold tracking-widest uppercase mt-2">
                Curated asset ecosystems designed around your lifestyle
              </p>
            </motion.div>
          </div>

          {/* Symmetrical High-Fidelity App Card Grid Configuration */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {CATEGORIES.map((cat, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col items-start justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(45,38,117,0.06)] hover:border-slate-200 transition-all duration-300 group min-h-[140px]"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                  {cat.icon}
                </div>
                <div className="w-full flex items-center justify-between mt-4 pt-2 border-t border-slate-50">
                  <span className="text-sm font-bold text-[#2D2675] tracking-tight">{cat.name}</span>
                  <ArrowRight size={14} className="text-indigo-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* =========================================================
          SECTION 3: FEATURED PREMIUM LISTINGS
         ========================================================= */}
      <section ref={featuredSectionRef} className="py-32 px-6 md:px-16 max-w-7xl mx-auto scroll-mt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-20 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Featured Collections</h2>
            <p className="text-slate-400 font-light mt-2">Verified luxury ecosystems for modern scaling operators</p>
          </motion.div>
          <motion.button 
            onClick={() => navigate('/properties')}
            whileHover={{ x: 3 }} 
            className="px-6 py-3 border border-white/20 hover:border-white text-white rounded-xl text-xs tracking-wider uppercase font-bold transition-all bg-white/[0.02] flex items-center gap-2"
          >
            View All Properties <ArrowRight size={14}/>
          </motion.button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {properties.map((p) => (
              <motion.div 
                key={p.id} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/property/${p.id}`)}
                className="bg-gradient-to-b from-white/[0.04] to-transparent rounded-3xl overflow-hidden shadow-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 cursor-pointer group"
              >
                {/* Image Aspect Module */}
                <div className="relative h-72 overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                    src={p.image || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"} 
                    className="w-full h-full object-cover brightness-[0.75] contrast-[1.02]" 
                    alt={p.name} />
                  <div className={`absolute top-5 left-5 ${p.availability === 'Occupied' ? 'bg-[#2D2675]' : 'bg-emerald-600'} text-white text-[10px] font-bold px-4 py-1.5 rounded-md tracking-wider uppercase border border-white/10 shadow-xl`}>
                    {p.availability || 'Available'}
                  </div>
                  <div className="absolute top-5 right-5 bg-black/40 p-2.5 rounded-xl backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-slate-950 transition-all">
                    <Heart size={16} />
                  </div>
                </div>

                {/* Content Details Block */}
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">{p.name}</h3>
                      <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5 uppercase tracking-wide">
                        <MapPin size={13} className="text-indigo-400"/> {p.location || 'Hub Location'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 rounded-lg text-amber-400 font-bold text-xs">
                      <Star size={13} fill="currentColor" /> {p.rating || '4.8'}
                    </div>
                  </div>

                  {/* Icon Utilities Tray */}
                  <div className="grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-5">
                    <div className="flex flex-col items-center gap-2 text-slate-400 bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl">
                      <Wifi size={14} className="text-indigo-400" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">High Wifi</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-slate-400 bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl">
                      <Wind size={14} className="text-indigo-400" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Climate AC</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-slate-400 bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl">
                      <Coffee size={14} className="text-indigo-400" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Meals Tray</span>
                    </div>
                  </div>

                  {/* CTA Footer Row */}
                  <div className="pt-2 flex justify-between items-center border-t border-white/[0.06]">
                    <div>
                      <span className="text-2xl font-black text-white tracking-tight">₹{p.price || '12,500'}</span>
                      <span className="text-[10px] text-slate-400 font-bold ml-1 tracking-widest">/MO</span>
                    </div>
                    <button className="bg-[#2D2675] hover:bg-[#393096] border border-white/10 text-white px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>


      {/* =========================================================
          SECTION 4: OPERATIONAL PORTFOLIO BLUEPRINT CTA
         ========================================================= */}
      <section className="px-6 md:px-16 mb-32 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#120E2E] via-[#0B081F] to-[#06040F] border border-white/[0.08] rounded-[32px] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
        >
          <div className="relative z-10 text-center lg:text-left space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">Maximize Your Asset.</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light max-w-xl">
              List your premium property ecosystem with LIVZZ to instantly bridge operations with our corporate network layers.
            </p>
          </div>
          <motion.button 
            onClick={() => navigate('/list-property')}
            className="relative z-10 bg-white hover:bg-slate-100 text-[#06040F] px-10 py-5 rounded-xl font-bold text-sm tracking-wider uppercase shadow-xl transition-all whitespace-nowrap active:scale-[0.98]"
          >
            Partner With Us
          </motion.button>
          <div className="absolute -right-22 -top-22 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}