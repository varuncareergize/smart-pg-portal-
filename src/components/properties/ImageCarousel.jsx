import React, { useState, useEffect } from 'react';

export default function ImageCarousel({ images, alt, className = '' }) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setCurrent(0);
  }, [images]);

  const goTo = (e, idx) => {
    e.stopPropagation();
    setCurrent(idx);
  };

  const uniqueImages = [...new Set(images)].length > 1 ? images : images;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse z-10" />
      )}
      <img
        src={uniqueImages[current]}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {uniqueImages.length > 1 && (
        <>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {uniqueImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => goTo(e, idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === current ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + uniqueImages.length) % uniqueImages.length); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % uniqueImages.length); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
