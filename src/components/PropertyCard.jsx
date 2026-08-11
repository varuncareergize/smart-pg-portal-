import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ id = "1", image, title, location, rating, price }) {
  const navigate = useNavigate();

  const handleVisitClick = (e) => {
    e.stopPropagation(); // Prevents triggering any outer card click events
    navigate(`/owner/property/${id}`); // Navigates to your existing dynamic property details route
  };

  return (
    <div 
      onClick={() => navigate(`/owner/property/${id}`)}
      className="bg-white rounded-2xl overflow-hidden group cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition duration-300"
    >
      {/* Image Wrapper */}
      <div className="relative overflow-hidden rounded-t-2xl aspect-[4/3]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Status Badge (e.g., For Rent / For Sale) */}
        <span className="absolute top-3 left-3 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
          For Rent
        </span>
      </div>
      
      {/* Content Area */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 truncate mb-1">{title}</h3>
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <span>📍</span> {location}
        </p>
        
        {/* Bottom Panel Layout matching the side-by-side mockup structure */}
        <div className="flex justify-between items-end border-t border-gray-100 pt-3">
          
          {/* Left Side: Review Stars & Score */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
              <span className="text-amber-500">★</span>
              <span>{rating}</span>
              <span className="text-xs font-normal text-gray-400">(42 Reviews)</span>
            </div>
            {/* Added structural specs layout placeholder matching row images */}
            <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
              <span>🛏️ 3 Beds</span>
              <span>•</span>
              <span>🛁 2 Bath</span>
            </div>
          </div>

          {/* Right Side: Price Stack + "Visit Us" Action Button */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="font-extrabold text-neutral-900 text-lg leading-tight">
                ₹{price.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400">per month</p>
            </div>
            
            <button 
              onClick={handleVisitClick}
              className="bg-emerald-500 text-white font-medium text-xs px-5 py-2 rounded-full hover:bg-emerald-600 transition shadow-sm active:scale-95 duration-200"
            >
              Visit Us
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}