import React, { useState } from 'react';
import { 
  PlusIcon, 
  FunnelIcon, 
  ChevronDownIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

const ticketsData = [
  { id: '#TK-8422', issue: 'Broken HVAC Unit', unit: 'Unit 402 - Building B', category: 'Electrical', priority: 'HIGH', assigned: 'Marco Rossi', status: 'In Progress' },
  { id: '#TK-8421', issue: 'Leaking Kitchen Tap', unit: 'Unit 115 - Main Wing', category: 'Plumbing', priority: 'MEDIUM', assigned: 'Sarah Chen', status: 'Pending' },
  { id: '#TK-8419', issue: 'Cabinet Hinge Loose', unit: 'Unit 209 - East Tower', category: 'Furniture', priority: 'LOW', assigned: 'Unassigned', status: 'Pending' },
  { id: '#TK-8410', issue: 'Main Gate Jammed', unit: 'Common Area', category: 'Security', priority: 'HIGH', assigned: 'Suresh Kumar', status: 'Resolved' },
];

export default function Maintenance() {
  // Filter state can be: 'All', 'Pending', 'In Progress', 'Resolved', or 'HIGH'
  const [filter, setFilter] = useState('All');

  // Counts for the cards
  const openCount = ticketsData.filter(t => t.status !== 'Resolved').length;
  const inProgressCount = ticketsData.filter(t => t.status === 'In Progress').length;
  const highPriorityCount = ticketsData.filter(t => t.priority === 'HIGH').length;
  const resolvedCount = ticketsData.filter(t => t.status === 'Resolved').length;

  // Filtering Logic
  const displayTickets = ticketsData.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'HIGH') return t.priority === 'HIGH';
    return t.status === filter;
  });

  return (
    <div className="container-custom space-y-8 pb-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-sg-navy tracking-tight">Maintenance Management</h2>
          <p className="text-sg-text-muted font-medium mt-1">Track and resolve property issues across your portfolio.</p>
        </div>
        <button className="bg-sg-green text-white px-6 py-3.5 rounded-2xl font-black shadow-lg shadow-sg-green/20 flex items-center gap-2 hover:scale-[1.02] transition-transform">
          <PlusIcon className="w-5 h-5 stroke-[3px]" /> Add New Ticket
        </button>
      </div>

      {/* --- INTERACTIVE 4-CARD SUMMARY GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Open Tickets Card */}
        <button 
          onClick={() => setFilter('All')}
          className={`p-6 rounded-[28px] border transition-all text-left shadow-sm ${filter === 'All' ? 'bg-white border-sg-green ring-2 ring-sg-green/20' : 'bg-white border-sg-border'}`}
        >
          <div className="flex justify-between items-start">
            <div className="p-2 bg-green-50 rounded-xl text-sg-green"><WrenchScrewdriverIcon className="w-6 h-6" /></div>
            <span className="text-[10px] font-black text-sg-green bg-green-50 px-2 py-1 rounded-md">+12%</span>
          </div>
          <h3 className="text-3xl font-black text-sg-navy mt-4">{openCount}</h3>
          <p className="text-[10px] font-black text-sg-text-muted uppercase tracking-widest">Open Tickets</p>
        </button>

        {/* In Progress Card */}
        <button 
          onClick={() => setFilter(filter === 'In Progress' ? 'All' : 'In Progress')}
          className={`p-6 rounded-[28px] border transition-all text-left shadow-sm ${filter === 'In Progress' ? 'bg-blue-500 border-blue-500' : 'bg-white border-sg-border'}`}
        >
          <div className={`p-2 rounded-xl w-fit ${filter === 'In Progress' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-500'}`}><ClockIcon className="w-6 h-6" /></div>
          <h3 className={`text-3xl font-black mt-4 ${filter === 'In Progress' ? 'text-white' : 'text-sg-navy'}`}>{inProgressCount}</h3>
          <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'In Progress' ? 'text-white/70' : 'text-sg-text-muted'}`}>In Execution</p>
        </button>

        {/* High Priority Card */}
        <button 
          onClick={() => setFilter(filter === 'HIGH' ? 'All' : 'HIGH')}
          className={`p-6 rounded-[28px] border transition-all text-left shadow-sm ${filter === 'HIGH' ? 'bg-red-500 border-red-500' : 'bg-white border-red-100'}`}
        >
          <div className={`p-2 rounded-xl w-fit ${filter === 'HIGH' ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500'}`}><ExclamationTriangleIcon className="w-6 h-6" /></div>
          <h3 className={`text-3xl font-black mt-4 ${filter === 'HIGH' ? 'text-white' : 'text-red-600'}`}>{highPriorityCount}</h3>
          <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'HIGH' ? 'text-white/70' : 'text-sg-text-muted'}`}>Requires Attention</p>
        </button>

        {/* Resolved Card */}
        <button 
          onClick={() => setFilter(filter === 'Resolved' ? 'All' : 'Resolved')}
          className={`p-6 rounded-[28px] border transition-all text-left shadow-sm ${filter === 'Resolved' ? 'bg-sg-navy border-sg-navy' : 'bg-white border-sg-border'}`}
        >
          <div className={`p-2 rounded-xl w-fit ${filter === 'Resolved' ? 'bg-white/20 text-white' : 'bg-gray-50 text-sg-navy'}`}><CheckBadgeIcon className="w-6 h-6" /></div>
          <h3 className={`text-3xl font-black mt-4 ${filter === 'Resolved' ? 'text-white' : 'text-sg-navy'}`}>{resolvedCount}</h3>
          <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'Resolved' ? 'text-white/70' : 'text-sg-text-muted'}`}>Completed (MTD)</p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Sub-Header / Current Selection */}
          <div className="flex items-center justify-between px-2">
            <h4 className="text-sm font-black text-sg-navy uppercase tracking-widest">
              Showing: <span className="text-sg-green">{filter} Tickets</span>
            </h4>
            {filter !== 'All' && (
              <button onClick={() => setFilter('All')} className="text-[10px] font-black text-sg-text-muted underline uppercase">Clear Selection</button>
            )}
          </div>

          {/* Ticket List (from Screenshot 2026-05-01 193107.png) */}
          <div className="bg-white rounded-[32px] border border-sg-border overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-sg-bg/30 border-b border-sg-border">
                <tr className="text-[9px] font-black text-sg-text-muted uppercase tracking-widest">
                  <th className="px-6 py-4">Ticket ID</th>
                  <th className="px-6 py-4">Issue Details</th>
                  <th className="px-6 py-4 text-center">Category</th>
                  <th className="px-6 py-4 text-center">Priority</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sg-border">
                {displayTickets.map((ticket) => (
                  <tr key={ticket.id} className="group hover:bg-sg-bg/20 transition-colors">
                    <td className="px-6 py-6 text-xs font-black text-sg-text-muted">{ticket.id}</td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-black text-sg-navy group-hover:text-sg-green transition-colors">{ticket.issue}</p>
                      <p className="text-[10px] font-bold text-sg-text-muted">{ticket.unit}</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="px-3 py-1 bg-sg-bg rounded-lg text-[10px] font-black text-sg-navy uppercase tracking-tighter">{ticket.category}</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                        ticket.priority === 'HIGH' ? 'bg-red-50 text-red-500' : 
                        ticket.priority === 'MEDIUM' ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black ${
                        ticket.status === 'In Progress' ? 'bg-orange-50 text-orange-500' : 
                        ticket.status === 'Resolved' ? 'bg-green-50 text-green-600' : 'bg-sg-bg text-sg-text-muted'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="bg-white p-6 rounded-[32px] border border-sg-border shadow-sm h-fit">
          <h4 className="text-lg font-black text-sg-navy mb-6">Recent Activity</h4>
          <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-sg-border">
            <div className="relative pl-8">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-sg-green flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-sg-green"></div>
              </div>
              <p className="text-[10px] font-black text-sg-text-muted uppercase">10:45 AM TODAY</p>
              <p className="text-xs font-black text-sg-navy mt-1">Ticket #8422 Assigned</p>
              <p className="text-[10px] font-medium text-sg-text-muted">Marco Rossi was assigned to repair in Unit 402.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}