import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Search, Star, Wifi, Coffee, Wind, 
  Shield, Dumbbell, Zap, Brush, Tv, Heart, ArrowRight
} from 'lucide-react';

// Import the specific UULYV Navbar and Footer
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// --- DATA ---
const CATEGORIES = [
  { name: 'Living', icon: <Tv size={24}/> },
  { name: 'Dining', icon: <Coffee size={24}/> },
  { name: 'Bedroom', icon: <Wind size={24}/> },
  { name: 'Security', icon: <Shield size={24}/> },
  { name: 'Premium', icon: <Star size={24}/> },
  { name: 'Kitchen', icon: <Coffee size={24}/> },
  { name: 'Fitness', icon: <Dumbbell size={24}/> },
  { name: 'Utilities', icon: <Zap size={24}/> },
];

const PROPERTY_LIST = [
  {
    id: 1,
    status: 'OCCUPIED',
    statusColor: 'bg-[#001F3F]',
    name: 'Skyline Residency',
    location: 'Hitech City, Hyderabad',
    rating: '4.8',
    price: '18,000',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    amenities: [{ icon: <Wifi size={14}/>, label: 'High Speed' }, { icon: <Coffee size={14}/>, label: '3 Meals' }, { icon: <Wind size={14}/>, label: 'Full AC' }]
  },
  {
    id: 2,
    status: 'VACANT',
    statusColor: 'bg-[#FFC107]',
    name: 'The Urban Hive',
    location: 'Koramangala, Bengaluru',
    rating: '4.5',
    price: '12,500',
    image: 'https://images.unsplash.com/photo-1555854816-809728590f5b?auto=format&fit=crop&q=80&w=800',
    amenities: [{ icon: <Wind size={14}/>, label: 'Laundry' }, { icon: <Shield size={14}/>, label: '24/7 Sec' }, { icon: <Dumbbell size={14}/>, label: 'Gym' }]
  },
  {
    id: 3,
    status: 'MAINTENANCE',
    statusColor: 'bg-[#D32F2F]',
    name: 'Elite Mansion',
    location: 'Powai, Mumbai',
    rating: '4.9',
    price: '22,000',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800',
    amenities: [{ icon: <Zap size={14}/>, label: 'Backup' }, { icon: <Brush size={14}/>, label: 'Daily Clean' }, { icon: <Tv size={14}/>, label: 'Common TV' }]
  }
];

export default function Home() {
  const navigate = useNavigate();
  
  // 1. Create a reference to attach to the Featured Collections section
  const featuredSectionRef = useRef(null);

  // 2. Define the smooth scroll function
  const scrollToFeatured = () => {
    featuredSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans overflow-x-hidden">
      
      {/* --- INTEGRATED BRAND NAVBAR --- */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-start px-8 md:px-24 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Hero Background"
          />
        </motion.div>
        
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-[#FFC107] text-[#001F3F] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6"
          >
            Premium Shared Living
          </motion.div>
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-6 leading-tight text-white tracking-tighter"
          >
            Luxury Living. <br/>
            <span className="text-[#FFC107]">Redefined.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl"
          >
            UULYV connects you with verified, high-end properties featuring modern amenities and professional management across India's top tech hubs.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => navigate('/properties')}
              className="bg-[#FFC107] text-[#001F3F] px-10 py-5 rounded-2xl font-black flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform active:scale-95 text-sm uppercase tracking-widest"
            >
              Explore Stays <Search size={18} strokeWidth={3}/>
            </button>
            <button 
              onClick={scrollToFeatured} // Modified to scroll instead of page navigation
              className="bg-white/10 backdrop-blur-md border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-white hover:bg-white/20 transition-all text-sm uppercase tracking-widest"
            >
              List Property
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- EXPLORE BY SPACES --- */}
      <section className="py-32 bg-white text-center">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="text-4xl font-black text-[#001F3F] mb-4">Explore UULYV Spaces</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-16">Curated living environments for every lifestyle</p>
        </motion.div>

        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 px-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {CATEGORIES.map((cat) => (
            <motion.div 
              key={cat.name} 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center gap-4 cursor-pointer group"
            >
              <div className="bg-slate-50 p-6 rounded-[24px] text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-[#FFC107] transition-all duration-500 shadow-sm">
                {cat.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#001F3F] transition-colors">{cat.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- FEATURED LISTINGS --- */}
      {/* 3. Attach the ref to this section container */}
      <section ref={featuredSectionRef} className="py-24 px-8 md:px-24 max-w-[1400px] mx-auto scroll-mt-28">
        <div className="flex justify-between items-end mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black text-[#001F3F]">Featured Collections</h2>
            <p className="text-slate-500 font-medium mt-2">Verified stays for the modern tech professional</p>
          </motion.div>
          <motion.button 
            onClick={() => navigate('/properties')}
            whileHover={{ x: 5 }} 
            className="bg-[#001F3F] text-[#FFC107] px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
          >
            View All <ArrowRight size={16}/>
          </motion.button>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {PROPERTY_LIST.map((p) => (
            <motion.div 
              key={p.id} 
              variants={fadeInUp}
              whileHover={{ y: -12 }}
              onClick={() => navigate(`/property/${p.id}`)}
              className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 cursor-pointer group"
            >
              <div className="relative h-80 overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={p.image} 
                  className="w-full h-full object-cover" 
                  alt={p.name} 
                />
                <div className={`absolute top-6 left-6 ${p.statusColor} text-white text-[10px] font-black px-5 py-2 rounded-full tracking-[0.2em] shadow-lg`}>
                  {p.status}
                </div>
                <div className="absolute top-6 right-6 bg-white/90 p-3 rounded-full backdrop-blur-md shadow-md hover:bg-[#FFC107] hover:text-[#001F3F] transition-all">
                  <Heart size={20} />
                </div>
              </div>

              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-[#001F3F] group-hover:text-[#FFC107] transition-colors">{p.name}</h3>
                    <p className="text-slate-400 text-[10px] font-black flex items-center gap-1 mt-2 uppercase tracking-widest">
                      <MapPin size={14} className="text-[#FFC107]"/> {p.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#FFC107]/10 px-3 py-1.5 rounded-xl text-[#001F3F] font-black text-xs">
                    <Star size={14} fill="#FFC107" className="text-[#FFC107]"/> {p.rating}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 border-t border-slate-50 pt-8">
                  {p.amenities.map((am, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 text-slate-400 group-hover:text-[#001F3F] transition-colors">
                      <div className="p-3 bg-slate-50 rounded-2xl">{am.icon}</div>
                      <span className="text-[9px] font-black uppercase tracking-tighter">{am.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-between items-center">
                  <div className="text-3xl font-black text-[#001F3F]">
                    ₹{p.price}<span className="text-xs text-slate-400 font-bold ml-1 tracking-widest">/MO</span>
                  </div>
                  <button className="bg-[#001F3F] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#FFC107] hover:text-[#001F3F] transition-all active:scale-95">
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- OWN A PROPERTY CTA SECTION --- */}
      <section className="px-8 md:px-24 mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#001F3F] rounded-[60px] p-20 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Maximize Your Asset.</h2>
            <p className="text-slate-400 text-lg font-medium max-w-lg">
              List your property with UULYV and access our premium network of corporate professionals and students.
            </p>
          </div>
          <motion.button 
            onClick={scrollToFeatured} // Modified to scroll here as well
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 md:mt-0 relative z-10 bg-[#FFC107] text-[#001F3F] px-14 py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-colors"
          >
            Partner With Us
          </motion.button>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#FFC107]/5 rounded-full blur-3xl"></div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}