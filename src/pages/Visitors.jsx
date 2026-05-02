import React, { useState, useMemo } from 'react';
import { 
  Users, Clock, LogIn, ShieldAlert,
  ArrowRight, CreditCard, Home, CheckCircle2,
  UserCheck, XCircle
} from 'lucide-react';

export default function Visitors() {
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'Checked In', 'Overstayed', 'Expected'

  const stats = [
    { label: 'Active Visitors Today', value: '24', type: 'Checked In', icon: <Users size={20} className="text-emerald-500" /> },
    { label: 'Overstayed Guests', value: '03', type: 'Overstayed', alert: true, icon: <Clock size={20} className="text-orange-500" /> },
    { label: 'Expected Arrivals', value: '18', type: 'Expected', icon: <LogIn size={20} className="text-blue-500" /> },
  ];

  const visitorLogs = [
    { id: 1, name: 'Rahul Kumar', phone: '+91 98765 43210', purpose: 'Relative', resident: 'Aditya Verma', room: '402-B', timeIn: '10:30 AM', status: 'Checked In', isOverstay: false },
    { id: 2, name: 'Manish Kumar', phone: '+91 88888 77777', purpose: 'Delivery', resident: 'Arjun Mehta', room: '105', timeIn: '08:15 AM', status: 'Checked In', isOverstay: true },
    { id: 3, name: 'Pooja Sharma', phone: '+91 77777 66666', purpose: 'Maintenance', resident: 'Office', room: 'Admin-01', timeIn: 'Exp: 02:00 PM', status: 'Expected', isOverstay: false },
    { id: 4, name: 'Anita Desai', phone: '+91 99999 88888', purpose: 'Relative', resident: 'S. Nair', room: '202', timeIn: '09:45 AM', status: 'Checked In', isOverstay: false },
  ];

  // Logic to filter the list based on the top cards
  const filteredVisitors = useMemo(() => {
    if (activeFilter === 'All') return visitorLogs;
    if (activeFilter === 'Overstayed') return visitorLogs.filter(v => v.isOverstay);
    return visitorLogs.filter(v => v.status === activeFilter);
  }, [activeFilter]);

  const handleSelect = (id) => {
    setSelectedVisitor(selectedVisitor === id ? null : id);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black text-[#001D3D]">Visitor Management</h1>
          {activeFilter !== 'All' && (
            <button 
              onClick={() => setActiveFilter('All')}
              className="flex items-center gap-2 bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase hover:bg-slate-200 transition-colors"
            >
              <XCircle size={12} /> Clear Filter: {activeFilter}
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid - Clickable for Filtering */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => setActiveFilter(stat.type)}
            className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 ${
              activeFilter === stat.type 
              ? 'bg-[#00C896] border-[#00C896] shadow-lg shadow-emerald-500/20' 
              : 'bg-white border-slate-100 hover:border-emerald-200'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${activeFilter === stat.type ? 'bg-white/20 text-white' : 'bg-slate-50 text-[#00C896]'}`}>
                {stat.icon}
              </div>
              {stat.alert && !activeFilter === stat.type && (
                <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-1 rounded-lg uppercase">Urgent</span>
              )}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${activeFilter === stat.type ? 'text-white/80' : 'text-slate-400'}`}>
              {stat.label}
            </p>
            <p className={`text-2xl font-black mt-1 ${activeFilter === stat.type ? 'text-white' : 'text-[#001D3D]'}`}>
              {stat.value}
            </p>
          </div>
        ))}
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col justify-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Monthly</p>
          <p className="text-2xl font-black text-[#001D3D] mt-1">482</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Table Section */}
        <div className="lg:col-span-3 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 flex justify-between items-center border-b border-slate-50">
            <div>
              <h3 className="font-black text-lg text-[#001D3D]">Activity Log</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Showing {activeFilter} Records</p>
            </div>
            {selectedVisitor && (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl animate-in fade-in zoom-in">
                <UserCheck size={16} className="text-[#00C896]" />
                <span className="text-xs font-bold text-[#00C896]">Visitor Selected</span>
              </div>
            )}
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-4 pb-4">Visitor</th>
                  <th className="px-4 pb-4">Room</th>
                  <th className="px-4 pb-4">Time In</th>
                  <th className="px-4 pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredVisitors.map((log) => (
                  <tr 
                    key={log.id} 
                    onClick={() => handleSelect(log.id)}
                    className={`group cursor-pointer transition-all duration-200 ${
                      selectedVisitor === log.id ? 'bg-emerald-50/50' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                          selectedVisitor === log.id ? 'bg-[#00C896] text-white' : 'bg-slate-100 text-[#001D3D]'
                        }`}>
                          {log.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#001D3D]">{log.name}</p>
                          <p className="text-[10px] font-bold text-slate-400">{log.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 font-bold text-sm text-[#001D3D]"><Home size={14} className="inline mr-2 text-slate-300"/>{log.room}</td>
                    <td className="px-4 py-5 text-sm font-bold text-slate-500">{log.timeIn}</td>
                    <td className="px-4 py-5">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                        log.isOverstay ? 'bg-orange-100 text-orange-600' : 
                        log.status === 'Checked In' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {log.isOverstay ? 'Overstayed' : log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-[#001D3D] p-6 rounded-[32px] space-y-3">
            <h4 className="text-white/40 font-black text-[10px] uppercase tracking-widest">
              {selectedVisitor ? 'Actions for Selected' : 'General Actions'}
            </h4>
            
            {selectedVisitor ? (
              <button className="w-full flex items-center justify-between bg-orange-500 text-white p-4 rounded-2xl font-black text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                <span>Force Check Out</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button className="w-full flex items-center justify-between bg-[#00C896] text-white p-4 rounded-2xl font-black text-sm hover:scale-105 transition-all">
                <span>New Visitor Entry</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          <div className="bg-red-50 p-6 rounded-[32px] border border-red-100">
             <div className="flex items-center gap-3 text-red-600 mb-2">
              <ShieldAlert size={20} />
              <h4 className="font-black text-xs uppercase tracking-widest">Emergency</h4>
            </div>
            <p className="text-sm font-black text-[#001D3D]">Varun, call Security</p>
            <p className="text-xs font-bold text-red-500 mt-1">+91 100-ADMIN</p>
          </div>
        </div>
      </div>
    </div>
  );
}