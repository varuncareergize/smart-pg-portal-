import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CurrencyRupeeIcon, UserGroupIcon, HomeIcon, 
  ArrowTrendingUpIcon, ClockIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tRes, rRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/tenants/'),
          fetch('http://127.0.0.1:8000/rooms/')
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

  // 2. Calculate Dynamic Stats
  const activeTenantsCount = tenants.length;
  const totalRoomsCount = rooms.length;
  
  // Calculate revenue from tenants who have "is_paid" as true
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

  // 3. Get Recent 5 Tenants for the table
  const recentTenants = [...tenants].reverse().slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1 pt-8">
        <h2 className="text-3xl font-black text-[#001D3D] italic">Executive Overview</h2>
        <p className="text-slate-400 font-medium uppercase text-[10px] tracking-tighter">SmartPG Administrative Gateway</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => navigate(stat.path)} 
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-[#00C896]/30 transition-all cursor-pointer active:scale-95 group"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon className="w-6 h-6 stroke-[2px]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-black text-[#001D3D]">{loading ? '...' : stat.val}</p>
                <span className="text-[#00C896] opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">View →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
        
        {/* Table Section: Recent Onboardings */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-[#001D3D] text-lg">Recent Onboardings</h3>
            <button 
              onClick={() => navigate('/tenants')} 
              className="text-[#00C896] font-bold text-sm hover:underline uppercase tracking-widest text-[10px]"
            >
              View All Residents
            </button>
          </div>
          
          <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Tenant</th>
                    <th className="px-6 py-4">Room</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Rent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan="4" className="px-6 py-10 text-center text-slate-400 font-bold italic">Loading data...</td></tr>
                  ) : recentTenants.length === 0 ? (
                    <tr><td colSpan="4" className="px-6 py-10 text-center text-slate-400 font-bold italic">No residents registered yet.</td></tr>
                  ) : (
                    recentTenants.map((tenant) => (
                      <tr key={tenant.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/tenants`)}>
                        <td className="px-6 py-4">
                          <p className="font-bold text-[#001D3D]">{tenant.full_name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{tenant.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-slate-500">Room {tenant.room_number || 'NA'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                            tenant.is_paid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {tenant.is_paid ? 'PAID' : 'UNPAID'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-[#001D3D]">₹{parseFloat(tenant.monthly_rent).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: System Updates */}
        <div className="bg-[#001D3D] rounded-[40px] p-8 text-white shadow-2xl shadow-blue-900/20 flex flex-col">
          <h3 className="font-black text-lg mb-6 text-[#00C896]">Property Timeline</h3>
          <div className="space-y-6 flex-1">
            {recentTenants.slice(0, 3).map((tenant, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <ClockIcon className="w-5 h-5 text-[#00C896]" />
                </div>
                <div>
                  <p className="text-sm font-bold group-hover:text-[#00C896] transition-colors">{tenant.full_name} moved in</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase">Room {tenant.room_number}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Quick Actions</p>
            <button 
              onClick={() => navigate('/tenants/add')}
              className="w-full bg-[#00C896] hover:bg-white hover:text-[#001D3D] text-white py-4 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-[#00C896]/20"
            >
              Add New Resident
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}