import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Wrench, 
  ShieldCheck, 
  Wifi, 
  Utensils, 
  CreditCard, 
  UserCheck, 
  BarChart3, 
  Smartphone,
  ArrowRight
} from 'lucide-react';

const TENANT_SERVICES = [
  {
    title: "High-Speed Connectivity",
    desc: "Enterprise-grade Wi-Fi with dedicated bandwidth for students and remote professionals.",
    icon: <Wifi size={32} />,
  },
  {
    title: "On-Demand Maintenance",
    desc: "Raise a ticket in seconds. Our in-house team ensures repairs within 24 working hours.",
    icon: <Wrench size={32} />,
  },
  {
    title: "Premium Meal Plans",
    desc: "Nutritious, home-cooked meals prepared in hygienic kitchens with multiple menu options.",
    icon: <Utensils size={32} />,
  },
  {
    title: "Secure Payments",
    desc: "Pay rent and deposits seamlessly through our integrated, encrypted payment gateway.",
    icon: <CreditCard size={32} />,
  }
];

const OWNER_SERVICES = [
  {
    title: "Tenant Verification",
    desc: "We handle rigorous background checks and KYC documentation to ensure peace of mind.",
    icon: <UserCheck size={32} />,
  },
  {
    title: "Yield Optimization",
    desc: "Smart pricing algorithms to ensure your property stays occupied at the best market rates.",
    icon: <BarChart3 size={32} />,
  },
  {
    title: "Tech-Enabled Management",
    desc: "Monitor your property's performance and maintenance logs through our Owner App.",
    icon: <Smartphone size={32} />,
  },
  {
    title: "Asset Protection",
    desc: "Comprehensive insurance and regular audits to maintain the physical health of your property.",
    icon: <ShieldCheck size={32} />,
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-40 pb-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-black text-[#001D3D] mb-6 tracking-tight">Our Services</h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            From seamless living experiences for tenants to effortless asset management for owners, we’ve got everything covered.
          </p>
        </div>
      </section>

      {/* For Tenants Section - Now full width with 4 columns */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[2px] w-12 bg-[#00C896]" />
          <h2 className="text-sm font-black text-[#00C896] uppercase tracking-[0.2em]">For Residents</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TENANT_SERVICES.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* For Owners Section - Full width with dark theme */}
      <section className="py-24 bg-[#001D3D] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-12 bg-[#00C896]" />
            <h2 className="text-sm font-black text-[#00C896] uppercase tracking-[0.2em]">For Property Owners</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {OWNER_SERVICES.map((service, index) => (
              <ServiceCard key={index} {...service} dark />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="py-24 text-center px-4">
        <div className="max-w-5xl mx-auto bg-slate-50 rounded-[48px] p-16 border border-slate-100 shadow-sm">
          <h3 className="text-3xl font-black text-[#001D3D] mb-4">Ready to experience SmartGP?</h3>
          <p className="text-slate-500 font-medium mb-10 max-w-lg mx-auto">Whether you're looking for a room or looking to list your property, we're here to help.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#00C896] text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-green-900/10 active:scale-95">
              Get Started <ArrowRight size={20} />
            </button>
            <button className="bg-white text-[#001D3D] border border-slate-200 px-10 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all active:scale-95">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/**
 * Reusable Service Card Component
 * Optimized for a grid layout without a sidebar
 */
function ServiceCard({ icon, title, desc, dark = false }) {
  return (
    <div className={`group p-8 rounded-[40px] transition-all duration-500 h-full ${
      dark 
      ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00C896]/30' 
      : 'bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:border-[#00C896]/20'
    }`}>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:-translate-y-2 duration-500 ${
        dark ? 'bg-[#00C896]/20 text-[#00C896]' : 'bg-green-50 text-[#00C896]'
      }`}>
        {React.cloneElement(icon, { size: 32, strokeWidth: 2.5 })}
      </div>
      <h4 className={`text-xl font-black mb-4 ${dark ? 'text-white' : 'text-[#001D3D]'}`}>
        {title}
      </h4>
      <p className={`text-sm leading-relaxed font-medium transition-colors ${
        dark ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-600'
      }`}>
        {desc}
      </p>
    </div>
  );
}