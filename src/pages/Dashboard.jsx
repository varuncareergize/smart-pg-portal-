import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CurrencyRupeeIcon, UserGroupIcon, HomeIcon, 
  ArrowTrendingUpIcon, ClockIcon, CalendarIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for live time
  const [currentTime, setCurrentTime] = useState(new Date());

  // 1. Live Clock Timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Fetch Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tRes, rRes] = await Promise.all([
          fetch('https://smart-pg-backend.onrender.com/tenants/'),
          fetch('https://smart-pg-backend.onrender.com/rooms/')
        ]);
        
        const tData = await tRes.json();
        const rData = await rRes.json();

        setTenants(Array.isArray(tData) ? tData : tData.results || []);
        setRooms(Array.isArray(rData) ? rData : rData.results || []);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format Date and Time
  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  // Calculations
  const activeTenantsCount = tenants.length;
  const totalRoomsCount = rooms.length;
  const totalRevenue = tenants
    .filter(t => t.is_paid)
    .reduce((sum, t) => sum + parseFloat(t.monthly_rent || 0), 0);

  const occupancyRate = totalRoomsCount > 0 
    ? Math.round((activeTenantsCount / totalRoomsCount) * 100) 
    : 0;

  const stats = [
    { label: 'Total Revenue', val: `₹${totalRevenue.toLocaleString()}`, icon: CurrencyRupeeIcon, color: 'text-[#00C896]', bg: 'bg-[#00C896]/10', path: '/tenants' },
    { label: 'Active Tenants', val: activeTenantsCount.toString(), icon: UserGroupIcon, color: 'text-blue-500', bg: 'bg-blue-50', path: '/tenants' },
    { label: 'Total Rooms', val: totalRoomsCount.toString(), icon: HomeIcon, color: 'text-purple-500', bg: 'bg-purple-50', path: '/rooms' },
    { label: 'Occupancy', val: `${occupancyRate}%`, icon: ArrowTrendingUpIcon, color: 'text-orange-500', bg: 'bg-orange-50', path: '/rooms' },
  ];

  const recentTenants = [...tenants].reverse().slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-10 bg-[#F8FAFC]">
      
      {/* Header with Date and Live Time - Premium Bento Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
        <div className="flex flex-col gap-1">
          <h2 className="text-5xl font-black text-[#001D3D] tracking-tighter italic">Executive Overview</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em]">LIVZZ Administrative Gateway</p>
        </div>

        <div className="flex items-center gap-5 bg-white px-8 py-4 rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50 transition-all hover:scale-105">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-[#00C896] uppercase tracking-widest leading-none mb-1">{formattedDate}</span>
            <span className="text-2xl font-black text-[#001D3D] tabular-nums tracking-tight leading-none">{formattedTime}</span>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100">
            <ClockIcon className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Stats Grid - Enhanced Shadows and Radius */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => navigate(stat.path)} 
            className="bg-white p-8 rounded-[40px] border border-slate-50 shadow-xl shadow-slate-200/60 flex flex-col justify-between hover:shadow-2xl hover:border-[#00C896]/40 transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
          >
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 border border-current/10 shadow-inner`}>
              <stat.icon className="w-7 h-7 stroke-[2.5px]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-black text-[#001D3D] tracking-tight">{loading ? '...' : stat.val}</p>
                <span className="text-[#00C896] translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sm font-black italic">VIEW</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area - Modern Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 pb-10">
        
        {/* Table Section - Clean Glass Look */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="font-black text-[#001D3D] text-2xl tracking-tight">Recent Onboardings</h3>
            <button 
              onClick={() => navigate('/tenants')} 
              className="bg-white px-5 py-2 rounded-full shadow-sm border border-slate-100 text-[#00C896] font-black text-[10px] hover:bg-slate-50 transition-colors uppercase tracking-widest"
            >
              View All Residents
            </button>
          </div>
          
          <div className="bg-white rounded-[48px] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50 p-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <th className="px-8 py-6">Resident</th>
                    <th className="px-8 py-6">Location</th>
                    <th className="px-8 py-6">Billing</th>
                    <th className="px-8 py-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-black italic uppercase tracking-widest">Initialising...</td></tr>
                  ) : recentTenants.length === 0 ? (
                    <tr><td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-black italic uppercase tracking-widest">No Active Records</td></tr>
                  ) : (
                    recentTenants.map((tenant) => (
                      <tr key={tenant.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer group" onClick={() => navigate(`/tenants`)}>
                        <td className="px-8 py-6">
                          <p className="font-black text-[#001D3D] text-base group-hover:text-[#00C896] transition-colors">{tenant.full_name}</p>
                          <p className="text-[11px] text-slate-400 font-bold tracking-tight">{tenant.phone}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            <span className="text-xs font-black text-slate-500 uppercase">Room {tenant.room_number || 'NA'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                            tenant.is_paid ? 'bg-[#00C896]/10 text-[#00C896]' : 'bg-red-50 text-red-500'
                          }`}>
                            {tenant.is_paid ? '✓ Paid' : '× Unpaid'}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right font-black text-[#001D3D] text-lg tabular-nums italic">₹{parseFloat(tenant.monthly_rent).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Property Timeline - Dark Premium Mode */}
        <div className="bg-[#001D3D] rounded-[56px] p-10 text-white shadow-[0_32px_64px_-12px_rgba(0,29,61,0.3)] flex flex-col relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C896] blur-[120px] opacity-20"></div>
          
          <h3 className="font-black text-2xl mb-10 text-[#00C896] tracking-tight">Property Timeline</h3>
          <div className="space-y-10 flex-1 relative z-10">
            {recentTenants.slice(0, 3).map((tenant, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#00C896]/50 transition-all group-hover:scale-110 shadow-lg">
                  <ClockIcon className="w-6 h-6 text-[#00C896]" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-black group-hover:text-[#00C896] transition-colors leading-tight">{tenant.full_name}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Onboarded • Room {tenant.room_number}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-6 tracking-[0.3em]">Quick Actions</p>
            <button 
              onClick={() => navigate('/tenants/add')}
              className="group w-full bg-[#00C896] hover:bg-white text-white hover:text-[#001D3D] py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-[#00C896]/20 flex items-center justify-center gap-2"
            >
              Add New Resident
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}