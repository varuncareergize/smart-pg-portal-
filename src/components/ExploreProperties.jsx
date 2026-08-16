import React from 'react';
import { ArrowUpRight, BedDouble, Building2, Home, Landmark, Warehouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExploreProperties = () => {
  const navigate = useNavigate();

  const propertyCategories = [
    {
      id: 'house',
      title: 'House',
      description: 'Find a place that feels like home.',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      path: '/properties?type=house',
    },
    {
      id: 'apartment',
      title: 'Apartments',
      description: 'Modern spaces for city living.',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85',
      path: '/properties?type=apartment',
    },
    {
      id: 'office',
      title: 'Office',
      description: 'Workspaces made for progress.',
      icon: Landmark,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
      path: '/properties?type=office',
    },
    {
      id: 'villa',
      title: 'Villa',
      description: 'Exceptional comfort and privacy.',
      icon: Warehouse,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85',
      path: '/properties?type=villa',
    },
    {
      id: 'room',
      title: 'Room',
      description: 'Comfortable stays that fit your needs.',
      icon: BedDouble,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
      path: '/properties?type=room',
    },
  ];

  return (
    <section className="bg-[#f3f5f7] px-4 py-12 sm:px-6 md:py-16 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/80 bg-[#faf9f7] px-5 py-12 shadow-[0_18px_55px_rgba(15,35,56,0.08)] sm:px-8 md:px-12 md:py-16">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#b57a45]">Explore our properties</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#122238] sm:text-4xl md:text-5xl">
            Every space, verified.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-6">
          {propertyCategories.map(({ id, title, description, icon: Icon, image, path }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(path)}
              className="group relative aspect-square w-full overflow-hidden rounded-2xl text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#b57a45]/40"
              aria-label={title}
            >
              <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17202a]/95 via-[#17202a]/18 to-transparent" />

              <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-[#122238] transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-5 text-white sm:p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur-md">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xl font-semibold sm:text-2xl">{title}</span>
                  <span className="mt-1 block text-sm text-white/75">{description}</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreProperties;
