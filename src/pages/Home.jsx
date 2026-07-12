import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyGrid from '../components/PropertyGrid';

// 1. Import your local video file from your assets directory
import heroVideo from '../assets/hero-bg.mp4'; 

export default function Home() {
  const navigate = useNavigate();

  const starterHouses = [
    {
      title: "Tranquil Oasis Suites",
      location: "Midtown Manhattan, NY",
      rating: 4.8,
      price: 2700,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Superb Luxury Townhouse",
      location: "Beverly Hills, California",
      rating: 4.9,
      price: 4900,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Stylish Penthouse Studio",
      location: "Downtown Chicago, IL",
      rating: 4.7,
      price: 3200,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const exclusiveUnits = [
    {
      title: "Terrace Horizon Condo",
      location: "Miami Beach, Florida",
      rating: 4.6,
      price: 3500,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Minimalist Modern Space",
      location: "Austin, Texas",
      rating: 4.9,
      price: 2400,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Harmonious Living Suite",
      location: "Seattle, Washington",
      rating: 4.5,
      price: 2900,
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const handleSearchRedirect = () => {
    navigate('/properties');
  };

  return (
    <div className="bg-neutral-50 min-h-screen antialiased text-neutral-800 pb-12">
      <Navbar />
      
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 pt-24 pb-32 overflow-hidden">
        
        {/* 2. Pass the imported video variable to the source tag */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay/Tint */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

        {/* Main Banner Typography */}
        <div className="text-center max-w-4xl mx-auto z-20 text-white mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6 text-white">
            Browse Homes, Apartments <br />& Rentals with Ease
          </h1>
          <button className="inline-flex items-center bg-white/10 backdrop-blur-md text-white border border-white/30 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/20 transition">
            Watch Showcase
          </button>
        </div>

        {/* Floating Forms Stack Overlay Box */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 flex flex-col gap-4 z-30">
          
          <div className="bg-white rounded-full shadow-xl p-3 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-4 text-left">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="text-gray-400">📍</span>
                <span className="font-medium text-gray-800">Location</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="text-gray-400">👤</span>
                <span className="font-medium text-gray-800">Property Type</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="text-gray-400">💰</span>
                <span className="font-medium text-gray-800">Price Range</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="text-gray-400">🏠</span>
                <span className="font-medium text-gray-800">Bedrooms</span>
              </div>
            </div>
            <button 
              onClick={handleSearchRedirect}
              className="w-full md:w-auto bg-neutral-900 text-white font-medium px-8 py-3 rounded-full hover:bg-neutral-800 transition shadow-md whitespace-nowrap"
            >
              Search Now
            </button>
          </div>
          
          <div className="bg-white rounded-[2rem] shadow-lg p-6 border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">🛡️</div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Secure Booking</h4>
                <p className="text-xs text-gray-400">All properties verified</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">💼</div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Home Listing</h4>
                <p className="text-xs text-gray-400">Total support included</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">🤝</div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Smart Agent</h4>
                <p className="text-xs text-gray-400">Hassle-free visits</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">🗺️</div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Premium Map</h4>
                <p className="text-xs text-gray-400">Find filter properties</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="h-44 md:h-28"></div>

      <main className="space-y-6">
        <PropertyGrid title="Browse the Starter Houses" listings={starterHouses} />
        <PropertyGrid title="Exclusive Selection Units" listings={exclusiveUnits} />
      </main>
    </div>
  );
}