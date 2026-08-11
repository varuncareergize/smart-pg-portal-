import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Briefcase,
  Handshake,
  Map,
  Search,
  MapPin,
  Home as HomeIcon,
  DollarSign,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import Navbar from '../components/Navbar';
import PropertyGrid from '../components/PropertyGrid';
import ExploreProperties from '../components/ExploreProperties';
import Footer from '../components/Footer';
import WhyChooseUs from '../components/WhyChooseUs';
import { apiFetch, BASE_URL } from '../api';
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';

// High-quality fallback image when backend returns image: null
const DEFAULT_PROPERTY_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop";

const galleryImages = [
  { src: image1, alt: 'Open-plan dining and living space', position: 'center center' },
  { src: image2, alt: 'Curved wood feature wall and lounge chair', position: 'center center' },
  { src: image3, alt: 'Living room with expansive mountain view', position: 'center center' },
  { src: image4, alt: 'Modern interior with sculptural staircase', position: 'center 58%' },
];

export default function Home() {
  const navigate = useNavigate();

  // Search Bar State
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // API State
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from Django Backend
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFetch('/owner/properties/', { method: 'GET' });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error(`Authentication Failed (HTTP ${response.status}): The provided Token is either invalid or expired.`);
        }
        if (response.status === 500) {
          throw new Error(`Django Server Error (HTTP 500): Check your Django terminal console for Python traceback errors.`);
        }
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        // Process and normalize response data
        const formattedData = result.data
          .filter((item) => item.is_active !== false) // Filter for active properties
          .map((item) => {
            // Construct human-readable location
            const hasValidCity = item.city && item.city !== "undefined" && item.city !== "null";
            const formattedLocation = hasValidCity
              ? `${item.location_name}, ${item.city}`
              : item.location_name || "Location N/A";

            let formattedImage = DEFAULT_PROPERTY_IMAGE;
            if (item.image) {
              formattedImage = item.image.startsWith('http')
                ? item.image
                : `${BASE_URL}${item.image}`;
            }

            return {
              id: item.id,
              title: item.name,
              location: formattedLocation,
              rating: item.rating ? parseFloat(item.rating) : 4.0,
              price: item.price ? parseFloat(item.price) : 0,
              image: formattedImage,
              propertyType: item.property_type
            };
          });

        setProperties(formattedData);
      } else {
        setProperties([]);
      }
    } catch (err) {
      console.error("Exact React Fetch Error:", err);
      setError(err.message || "Failed to establish a connection with the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/properties?location=${encodeURIComponent(location)}&type=${propertyType}&price=${priceRange}`);
  };

  const featureBadges = [
    {
      icon: ShieldCheck,
      title: "Secure Booking",
      subtitle: "100% verified listings",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: Briefcase,
      title: "Full-Service Listing",
      subtitle: "End-to-end support",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Handshake,
      title: "Smart Agent Matching",
      subtitle: "Hassle-free visits",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Map,
      title: "Interactive Maps",
      subtitle: "Filter by neighborhood",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <div className="bg-neutral-50/50 min-h-screen antialiased text-neutral-800 font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#f4f0e8]">
        <div className="relative h-full overflow-hidden rounded-b-[2rem] bg-[#151515] shadow-[0_25px_60px_-30px_rgba(0,0,0,0.45)] sm:rounded-b-[3rem]">
          {/* Four supplied images, clipped together as one curved gallery. */}
          <div className="absolute inset-x-0 bottom-0 h-[62%] overflow-hidden">
            <div className="grid h-full grid-cols-2 gap-px bg-white md:grid-cols-4">
              {galleryImages.map((image) => (
                <div key={image.src} className="h-full min-h-0 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="block h-full w-full object-cover"
                    style={{ objectPosition: image.position }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/35 via-transparent to-black/10" />

          {/* Curved white editorial panel */}
          <div className="absolute inset-x-0 top-0 z-10 h-[55%] bg-[#fdfbf6] [clip-path:ellipse(108%_88%_at_50%_0%)] sm:h-[57%]" />
          <div className="absolute inset-x-0 top-0 z-20 flex h-[39%] translate-y-6 flex-col items-center justify-center px-5 pt-14 text-center sm:h-[41%] sm:translate-y-8 sm:px-12 sm:pt-12">
            <h1 className="max-w-5xl text-[clamp(2.15rem,5.8vw,6.25rem)] font-black tracking-[-0.075em] leading-[0.88] text-[#111111]">
              Browse Homes, Apartments<br className="hidden sm:inline" />
              <span className="block">& Rentals with Ease</span>
            </h1>
          </div>

          {/* Floating search panel */}
          <div className="absolute inset-x-0 bottom-[5%] z-30 mx-auto w-[calc(100%-1.5rem)] max-w-7xl sm:w-[calc(100%-4rem)]">
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 items-center gap-2 rounded-[1.4rem] border border-white/70 bg-white/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:grid-cols-2 sm:gap-3 sm:rounded-[1.75rem] sm:p-4 lg:grid-cols-4 lg:rounded-[2rem]"
            >
            {/* Location Input */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 focus-within:border-neutral-800 transition">
              <MapPin className="w-5 h-5 text-neutral-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Kadugodi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-neutral-800 focus:outline-none placeholder:text-neutral-400 placeholder:font-normal truncate"
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 focus-within:border-neutral-800 transition">
              <HomeIcon className="w-5 h-5 text-neutral-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-neutral-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="Co-living">Co-living</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">PG</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
            </div>

            {/* Price Range Dropdown */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 focus-within:border-neutral-800 transition">
              <DollarSign className="w-5 h-5 text-neutral-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">Budget Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-neutral-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">Any Price</option>
                  <option value="5000-10000">₹5,000 - ₹10,000 / mo</option>
                  <option value="10000-15000">₹10,000 - ₹15,000 / mo</option>
                  <option value="15000+">₹15,000+ / mo</option>
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="w-full h-full min-h-[52px] bg-[#111111] hover:bg-[#2a2a2a] text-white font-semibold rounded-2xl px-6 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <Search className="w-4 h-4" />
              <span>Search Stay</span>
            </button>
          </form>
          </div>
        </div>
      </section>

      {/* Feature Strip Section */}
      <section className="relative z-20 pb-12 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureBadges.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-neutral-50 transition duration-200 group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm leading-snug">{item.title}</h4>
                    <p className="text-xs text-neutral-400 font-medium mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Dynamic API Properties Section */}
        <section className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-neutral-500">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-800" />
              <p className="text-sm font-medium">Fetching available properties...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 bg-red-50/90 rounded-3xl border border-red-200 text-center max-w-2xl mx-auto shadow-sm">
              <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
              <h3 className="font-bold text-neutral-900 mb-1">Backend Connection Issue</h3>
              <p className="text-xs text-red-600 max-w-md mb-4 font-mono bg-red-100/60 p-3 rounded-xl border border-red-200 break-words">
                {error}
              </p>
              <button
                onClick={fetchProperties}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-sm active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Connection</span>
              </button>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16 text-neutral-500 text-sm bg-neutral-100/50 rounded-3xl border border-dashed border-neutral-200">
              No properties available right now.
            </div>
          ) : (
            <PropertyGrid title="Featured Properties" listings={properties} />
          )}
        </section>

        {/* Explore Properties Section */}
        <section className="pt-4">
          <ExploreProperties />
        </section>

        {/* Why Choose Us Section */}
        <section className="pt-4">
          <WhyChooseUs />
        </section>
      </main>

      {/* Floating Chatbot Widget */}
      {/* <Travelchatbot /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
