import React from 'react';
import { 
  CurrencyRupeeIcon, UserGroupIcon, HomeIcon, 
  ArrowTrendingUpIcon, EllipsisHorizontalIcon 
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Total Revenue', val: '₹4,25,000', icon: CurrencyRupeeIcon, color: 'text-sg-green', bg: 'bg-sg-green/10' },
  { label: 'Active Tenants', val: '128', icon: UserGroupIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Total Rooms', val: '150', icon: HomeIcon, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Occupancy', val: '85%', icon: ArrowTrendingUpIcon, color: 'text-orange-500', bg: 'bg-orange-50' },
];

export default function Dashboard() {
  return (
    <div className="container-custom space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-sg-navy">Executive Overview</h2>
        <p className="text-sg-text-muted font-medium">Welcome back, Alex. Here's what's happening today.</p>
      </div>

      {/* Responsive Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-sg-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 stroke-[2px]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-sg-text-muted uppercase tracking-[0.15em] mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-sg-navy">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Table Section */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-sg-navy text-lg">Recent Rent Status</h3>
            <button className="text-sg-green font-bold text-sm">View All</button>
          </div>
          <div className="table-container">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-sg-bg/50 border-b border-sg-border">
                <tr className="text-[10px] font-black text-sg-text-muted uppercase tracking-widest">
                  <th className="px-6 py-4">Tenant</th>
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sg-border">
                {[1, 2, 3].map((_, i) => (
                  <tr key={i} className="hover:bg-sg-bg/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-sg-navy">John Wick</td>
                    <td className="px-6 py-4 text-sm font-semibold text-sg-text-muted">Suite 204</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black">PAID</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-sg-navy">₹12,000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Activity Widget */}
        <div className="bg-sg-navy rounded-[32px] p-8 text-white">
          <h3 className="font-black text-lg mb-6">Property Alerts</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-sg-green mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Room 102 Maintenance</p>
                  <p className="text-xs text-slate-400 font-medium">Requested 2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 bg-white/10 hover:bg-white/20 py-3 rounded-xl font-bold transition-all">
            Open Support Desk
          </button>
        </div>
      </div>
    </div>
  );
}