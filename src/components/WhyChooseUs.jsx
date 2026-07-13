import React from 'react';
import { ShieldCheck, Award, ThumbsUp, Headset } from 'lucide-react';

const WhyChooseUs = () => {
  // Features array representing the reasons to choose the company
  const features = [
    {
      id: 1,
      // Icon flipped to dark slate to pop off the lighter internal container
      icon: <ShieldCheck className="w-8 h-8 text-slate-800" />,
      title: 'Trusted Security',
      description: 'Your safety is our priority. We offer verified listings and secure, transparent transactions throughout the entire process.'
    },
    {
      id: 2,
      icon: <Award className="w-8 h-8 text-slate-800" />,
      title: 'Top-Rated Agents',
      description: 'Work alongside certified real estate professionals who bring years of regional expertise and market insights to the table.'
    },
    {
      id: 3,
      icon: <ThumbsUp className="w-8 h-8 text-slate-800" />,
      title: 'Premium Quality',
      description: 'From luxury villas to cozy apartments, we curate our properties to ensure they meet exceptional living standards.'
    },
    {
      id: 4,
      icon: <Headset className="w-8 h-8 text-slate-800" />,
      title: '24/7 Client Support',
      description: 'Our dedicated support team is always available to answer your queries and assist you before, during, and after your purchase.'
    }
  ];

  return (
    <section className="relative w-full bg-white py-16 px-4 md:px-12 lg:px-24 text-center overflow-hidden border-t border-slate-100">
      {/* Background Accent (Texture color changed to dark dots for the light background) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Header Section */}
      <div className="relative z-10 max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-wide">
          Why Choose Us
        </h2>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
          We pride ourselves on providing an unparalleled experience and setting new benchmarks in the real estate industry.
        </p>
      </div>

      {/* Grid Features Container */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div 
            key={feature.id} 
            className="flex flex-col items-center p-6 rounded-lg bg-slate-50 border border-slate-100 transition-all duration-300 hover:border-slate-200 hover:bg-slate-100/70 group"
          >
            {/* Icon Wrapper with crisp light border details */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-wide">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;