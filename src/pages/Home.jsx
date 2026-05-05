import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  MapPin, 
  Home as HomeIcon, 
  ChevronDown, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Headphones, 
  ArrowRight 
} from 'lucide-react';

const FEATURED_STAYS = [
  {
    id: 1,
    name: 'Emerald Heights',
    location: 'Koramangala, Bangalore',
    price: '8,500',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    name: 'Skyline Residency',
    location: 'Gurgaon, NCR',
    price: '12,000',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Sunset Lofts',
    location: 'Viman Nagar, Pune',
    price: '9,800',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
  }
];

export default function Home() {
  const navigate = useNavigate();
  
  // --- Search State ---
  const [location, setLocation] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStayType, setSelectedStayType] = useState('Stay Type');
  const stayOptions = ['PG', 'Coliving', 'Hostel', 'Studio Apartment'];

  // --- Search Handler ---
  const handleSearch = () => {
    // Construct query parameters
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (selectedStayType !== 'Stay Type') params.append('type', selectedStayType);

    // Navigate to properties page with query string (e.g., /properties?location=pune&type=PG)
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <header className="pt-40 pb-20 px-4 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-black text-[#001D3D] tracking-tight leading-[1.1]">
            Find Your Perfect Stay with SmartPG
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Discover premium PGs and hostels designed for students and professionals. Managed with precision, lived with comfort.
          </p>

          {/* Search Bar Container */}
          <div className="mt-12 bg-white p-2 rounded-[32px] shadow-2xl shadow-blue-900/5 border border-slate-100 flex flex-col md:flex-row items-center gap-2">
            
            {/* Location Input */}
            <div className="flex-1 flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r border-slate-100 w-full text-left">
              <MapPin className="text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Where do you want to stay?" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Search on Enter key
                className="w-full outline-none font-bold text-[#001D3D] placeholder:text-slate-300 bg-transparent" 
              />
            </div>

            {/* Stay Type Dropdown */}
            <div className="flex-1 relative w-full">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-6 py-4 border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HomeIcon className="text-slate-300" size={20} />
                  <span className={`font-bold ${selectedStayType === 'Stay Type' ? 'text-slate-300' : 'text-[#001D3D]'}`}>
                    {selectedStayType}
                  </span>
                </div>
                <ChevronDown className={`text-slate-300 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} size={18} />
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {stayOptions.map((option) => (
                      <div 
                        key={option}
                        onClick={() => {
                          setSelectedStayType(option);
                          setIsDropdownOpen(false);
                        }}
                        className="px-6 py-3.5 text-left font-bold text-[#001D3D] hover:bg-slate-50 hover:text-[#00C896] cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="bg-[#00C896] w-full md:w-auto text-white px-10 py-4 rounded-[24px] font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-green-400/20"
            >
              <Search size={20} strokeWidth={3} /> Search
            </button>
          </div>

          {/* Quick Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto">
            {['Student Housing', 'Professional Coliving', 'Luxury Hostels', 'Budget Stays'].map((cat) => (
              <div 
                key={cat} 
                onClick={() => navigate(`/properties?category=${cat.toLowerCase().replace(' ', '-')}`)}
                className="bg-white border border-slate-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:border-[#00C896] cursor-pointer transition-all group"
              >
                <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#00C896]" />
                <span className="font-black text-[#001D3D] text-sm text-left leading-tight">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* --- FEATURED PROPERTIES --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-black text-[#001D3D]">Featured Properties</h3>
              <p className="text-slate-500 font-medium mt-1">Handpicked premium stays across major cities.</p>
            </div>
            <button 
              onClick={() => navigate('/properties')}
              className="text-[#00C896] font-black text-sm flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest"
            >
              View all <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_STAYS.map((p) => (
              <div 
                key={p.id} 
                onClick={() => navigate(`/property/${p.id}`)}
                className="bg-white rounded-[40px] overflow-hidden border border-slate-100 group shadow-sm hover:shadow-2xl hover:border-[#00C896]/20 transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={p.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={p.name} 
                  />
                  <div className="absolute top-4 left-4 bg-[#00C896]/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> VERIFIED
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-xl font-black text-[#001D3D] group-hover:text-[#00C896] transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-1 uppercase tracking-widest">
                         <MapPin size={12}/> {p.location}
                      </p>
                    </div>
                    <div className="bg-green-50 text-[#00C896] font-black px-3 py-1 rounded-lg text-sm group-hover:bg-[#00C896] group-hover:text-white transition-all">
                      ₹{p.price}/mo
                    </div>
                  </div>
                  <div className="h-[1px] bg-slate-100 w-full mb-6" />
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-2">
                       {[1, 2, 3].map((icon) => (
                         <div key={icon} className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                           <div className="w-3 h-3 bg-slate-200 rounded-sm" />
                         </div>
                       ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      +4 more
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-black text-[#001D3D]">Why Choose SmartPG?</h3>
          <p className="text-slate-500 font-medium mt-4 max-w-xl mx-auto">
            We redefine property management with a focus on trust, technology, and tenant satisfaction.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-12 rounded-[44px] border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-50 text-[#00C896] rounded-2xl flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={32}/>
              </div>
              <h4 className="text-xl font-black text-[#001D3D] mb-4">Hassle-free Booking</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Simple digital agreements and instant confirmation. No more endless visits or broker calls.
              </p>
            </div>
            
            <div className="bg-white p-12 rounded-[44px] border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-50 text-[#00C896] rounded-2xl flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={32}/>
              </div>
              <h4 className="text-xl font-black text-[#001D3D] mb-4">Verified Properties</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every listing on our platform undergoes a rigorous 50-point quality check by our team.
              </p>
            </div>

            <div className="bg-white p-12 rounded-[44px] border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-50 text-[#00C896] rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Headphones size={32}/>
              </div>
              <h4 className="text-xl font-black text-[#001D3D] mb-4">24/7 Support</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our dedicated concierge team is always available to resolve your issues in under 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- OWNER CALL-TO-ACTION --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto bg-[#001D3D] rounded-[48px] p-16 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Own a Property?</h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Maximize your rental yield and experience stress-free management with our professional services.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="bg-[#00C896] text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-green-400/20 hover:scale-105 transition-transform active:scale-95">
                List Your Property
              </button>
              <button 
                onClick={() => navigate('/services')}
                className="bg-white/5 text-white px-10 py-5 rounded-2xl font-black border border-white/10 hover:bg-white/10 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}