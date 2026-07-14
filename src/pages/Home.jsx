import React from 'react';
import {
  ShieldCheck,
  Briefcase,
  Handshake,
  Map,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import PropertyGrid from '../components/PropertyGrid';
import ExploreProperties from '../components/ExploreProperties';
import Footer from '../components/Footer';
import WhyChooseUs from '../components/WhyChooseUs';
// 1. Import your local video file from your assets directory
import heroVideo from '../assets/hero-bg.mp4';

export default function Home() {
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
      </section>

      {/* Feature Strip — sits below the video, above the listings */}
      <div className="relative z-30 w-full max-w-5xl mx-auto px-4 -mt-4 md:-mt-10 flex flex-col gap-4">

          <div className="bg-white rounded-3xl md:rounded-[2rem] shadow-lg p-4 md:p-6 border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-neutral-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Secure booking</h4>
                <p className="text-xs text-gray-400">All properties verified</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-neutral-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Home listing</h4>
                <p className="text-xs text-gray-400">Total support included</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Handshake className="w-5 h-5 text-neutral-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Smart agent</h4>
                <p className="text-xs text-gray-400">Hassle-free visits</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Map className="w-5 h-5 text-neutral-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Premium map</h4>
                <p className="text-xs text-gray-400">Find filter properties</p>
              </div>
            </div>
          </div>

      </div>

      <div className="h-10 md:h-12"></div>

      <main className="space-y-6">
        <PropertyGrid title="Browse the Starter Houses" listings={starterHouses} />

        <PropertyGrid title="Exclusive Selection Units" listings={exclusiveUnits} />
         <ExploreProperties />
         <WhyChooseUs />
      </main>

      <Footer />
    </div>
  );
}