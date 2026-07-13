import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Home, Building2, Briefcase, Warehouse, Bed } from 'lucide-react';

const ExploreProperties = () => {
  const scrollContainerRef = useRef(null);

  // Mock data representing the 5 visible property categories
  const properties = [
    { id: 1, name: 'House', icon: <Home className="w-8 h-8 text-white" />, bgImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Apartment', icon: <Building2 className="w-8 h-8 text-white" />, bgImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Office', icon: <Briefcase className="w-8 h-8 text-white" />, bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Villa', icon: <Warehouse className="w-8 h-8 text-white" />, bgImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Room', icon: <Bed className="w-8 h-8 text-white" />, bgImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative w-full bg-[#0b2238] py-16 px-4 md:px-12 lg:px-24 text-center overflow-hidden">
      {/* Optional Topography/Texture Background Accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Header Section */}
      <div className="relative z-10 max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-wide">
          Explore Our Properties
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit donec sollicitudin.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex items-center">
        
        {/* Left Arrow Button */}
        <button 
          onClick={() => handleScroll('left')}
          className="absolute -left-4 md:-left-6 z-20 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition focus:outline-none"
          aria-label="Previous properties"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Properties Grid / Scroll Area */}
        <div 
          ref={scrollContainerRef}
          className="w-full flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {properties.map((property) => (
            <div 
              key={property.id}
              className="relative flex-none w-[220px] sm:w-[240px] md:flex-1 aspect-[4/5] rounded-sm overflow-hidden group cursor-pointer snap-start"
            >
              {/* Background Image */}
              <img 
                src={property.bgImage} 
                alt={property.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Dark Overlay Tint */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>

              {/* Card Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                {/* Icon Wrapper with a subtle outline border */}
                <div className="p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm mb-4 transition-transform duration-300 group-hover:scale-110">
                  {property.icon}
                </div>
                {/* Title */}
                <h3 className="font-semibold text-lg tracking-wider">
                  {property.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={() => handleScroll('right')}
          className="absolute -right-4 md:-right-6 z-20 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition focus:outline-none"
          aria-label="Next properties"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
};

export default ExploreProperties;