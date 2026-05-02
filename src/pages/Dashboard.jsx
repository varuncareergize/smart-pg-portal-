import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CurrencyRupeeIcon, UserGroupIcon, HomeIcon, 
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Total Revenue', val: '₹4,25,000', icon: CurrencyRupeeIcon, color: 'text-[#00C896]', bg: 'bg-[#00C896]/10', path: '/payments' },
  { label: 'Active Tenants', val: '128', icon: UserGroupIcon, color: 'text-blue-500', bg: 'bg-blue-50', path: '/tenants' },
  { label: 'Total Rooms', val: '150', icon: HomeIcon, color: 'text-purple-500', bg: 'bg-purple-50', path: '/rooms' },
  { label: 'Occupancy', val: '85%', icon: ArrowTrendingUpIcon, color: 'text-orange-500', bg: 'bg-orange-50', path: '/analytics' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1 pt-8">
        <h2 className="text-3xl font-black text-[#001D3D]">Executive Overview</h2>
        <p className="text-slate-400 font-medium italic">SmartPG Administrative Gateway</p>
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
                <p className="text-2xl font-black text-[#001D3D]">{stat.val}</p>
                <span className="text-[#00C896] opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">Details →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
        {/* Table Section */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-[#001D3D] text-lg">Recent Rent Status</h3>
            <button 
              onClick={() => navigate('/rent-history')} 
              className="text-[#00C896] font-bold text-sm hover:underline"
            >
              View All
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
                    <th className="px-6 py-4">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3].map((_, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#001D3D]">Mullavanam Guest</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-500">Suite {100 + i}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black">PAID</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#001D3D]">₹12,000</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Alerts */}
        <div className="bg-[#001D3D] rounded-[40px] p-8 text-white shadow-2xl shadow-blue-900/20">
          <h3 className="font-black text-lg mb-6 text-[#00C896]">Property Alerts</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 items-start group cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-[#00C896] mt-2 shrink-0 group-hover:animate-ping" />
                <div>
                  <p className="text-sm font-bold group-hover:text-[#00C896] transition-colors">Maintenance Request</p>
                  <p className="text-xs text-slate-400 font-medium">Trivandrum Facility</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/support')}
            className="w-full mt-8 bg-white/10 hover:bg-[#00C896] text-white py-4 rounded-2xl font-black transition-all active:scale-95"
          >
            Open Support Desk
          </button>
        </div>
      </div>
    </div>
  );
}