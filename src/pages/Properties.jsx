import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Search, SlidersHorizontal, Star, Zap, ShieldCheck } from 'lucide-react';

const PROPERTY_DATA = [
  {
    id: 1,
    name: 'Emerald Heights',
    location: 'Koramangala, Bangalore',
    price: '8,500',
    type: 'PG',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    tags: ['Verified', 'Wifi']
  },
  {
    id: 2,
    name: 'Skyline Residency',
    location: 'Gurgaon, NCR',
    price: '12,000',
    type: 'Hostel',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    tags: ['Luxury', 'Verified']
  },
  {
    id: 3,
    name: 'Sunset Lofts',
    location: 'Viman Nagar, Pune',
    price: '9,800',
    type: 'Coliving',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
    tags: ['AC', 'Gym']
  },
];

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering logic (Basic implementation)
  const filteredProperties = PROPERTY_DATA.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#001D3D] tracking-tight">Explore Stays</h1>
            <p className="text-slate-500 font-medium mt-1">Found {filteredProperties.length} premium properties in your area.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Search by area or name..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#00C896]/10 focus:border-[#00C896] transition-all font-bold text-[#001D3D]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-4 bg-white border border-slate-100 rounded-2xl text-[#001D3D] hover:bg-slate-50 transition-colors shadow-sm">
              <SlidersHorizontal size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            <div>
              <h4 className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest mb-4 ml-1">Stay Type</h4>
              <div className="space-y-3">
                {['All Stays', 'PG', 'Hostel', 'Coliving'].map(filter => (
                  <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-md border-slate-200 text-[#00C896] focus:ring-[#00C896]" />
                    <span className="text-sm font-bold text-slate-500 group-hover:text-[#001D3D] transition-colors">{filter}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest mb-4 ml-1">Price Range</h4>
              <input type="range" className="w-full accent-[#00C896]" />
              <div className="flex justify-between mt-2 text-[10px] font-black text-slate-400">
                <span>₹5,000</span>
                <span>₹30,000+</span>
              </div>
            </div>
          </aside>

          {/* Property Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PropertyCard({ property }) {
  const navigate = useNavigate(); // 2. Initialize navigate in the card

  const handleNavigate = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div 
      onClick={handleNavigate} // 3. Make the whole card clickable
      className="bg-white rounded-[40px] overflow-hidden border border-slate-100 group shadow-sm hover:shadow-2xl hover:shadow-[#001D3D]/5 transition-all duration-500 cursor-pointer active:scale-[0.99]"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={property.image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          alt={property.name} 
        />
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="bg-[#00C896] text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-green-900/20">
            <ShieldCheck size={12} /> VERIFIED
          </div>
        </div>
        <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#00C896] transition-all">
          <Zap size={18} fill="currentColor" />
        </button>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-black text-[#001D3D] group-hover:text-[#00C896] transition-colors">{property.name}</h3>
            <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase tracking-widest">
              <MapPin size={12} className="text-[#00C896]" /> {property.location}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg text-xs font-black">
            <Star size={12} fill="currentColor" /> {property.rating}
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {property.tags.map(tag => (
            <span key={tag} className="text-[10px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-full uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div>
            <span className="text-2xl font-black text-[#001D3D]">₹{property.price}</span>
            <span className="text-xs font-bold text-slate-400"> / month</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevents double navigation trigger from the card click
              handleNavigate();
            }}
            className="bg-[#001D3D] text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-[#00C896] hover:scale-105 transition-all active:scale-95 shadow-xl shadow-blue-900/10"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}