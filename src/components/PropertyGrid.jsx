import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';

export default function PropertyGrid({ title, listings }) {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 mb-10">
        <h2 className="text-3xl font-bold text-gray-900 text-center tracking-tight">
          {title}
        </h2>
        <button
          onClick={() => navigate('/properties')}
          className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          View all properties
        </button>
      </div>
      
      {/* Responsive Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item, index) => (
          <PropertyCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}