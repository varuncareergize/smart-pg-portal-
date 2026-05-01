import React, { useState } from 'react';
import { 
  UserGroupIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

const staffData = [
  { id: 1, name: 'Suresh Kumar', role: 'Property Manager', email: 'suresh@smartgp.com', phone: '+91 98765 43210', status: 'Active' },
  { id: 2, name: 'Rahul Sharma', role: 'Maintenance Lead', email: 'rahul@smartgp.com', phone: '+91 98765 43211', status: 'On Leave' },
  { id: 3, name: 'Priya Singh', role: 'Finance Admin', email: 'priya@smartgp.com', phone: '+91 98765 43212', status: 'Active' },
  { id: 4, name: 'Amit Verma', role: 'Security Head', email: 'amit@smartgp.com', phone: '+91 98765 43213', status: 'Active' },
];

export default function Staff() {
  const [filter, setFilter] = useState('All'); // 'All', 'Active', 'On Leave'

  // Calculations for the cards
  const activeCount = staffData.filter(s => s.status === 'Active').length;
  const leaveCount = staffData.filter(s => s.status === 'On Leave').length;

  // Filtered logic for the list
  const displayStaff = filter === 'All' 
    ? staffData 
    : staffData.filter(s => s.status === filter);

  return (
    <div className="container-custom space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-sg-navy tracking-tight">Team Directory</h2>
          <p className="text-sg-text-muted font-medium">Manage staff roles and attendance status.</p>
        </div>
        <button className="w-full sm:w-auto bg-sg-navy text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-sg-navy/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
          <PlusIcon className="w-5 h-5 stroke-[3px]" /> Add Member
        </button>
      </div>

      {/* --- INTERACTIVE SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Active Staff Card */}
        <button 
          onClick={() => setFilter(filter === 'Active' ? 'All' : 'Active')}
          className={`relative overflow-hidden p-6 rounded-[32px] border transition-all text-left group ${
            filter === 'Active' ? 'bg-sg-green border-sg-green shadow-xl' : 'bg-white border-sg-border'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'Active' ? 'text-white/80' : 'text-sg-text-muted'}`}>On-Duty Staff</p>
              <h3 className={`text-4xl font-black mt-1 ${filter === 'Active' ? 'text-white' : 'text-sg-navy'}`}>{activeCount}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${filter === 'Active' ? 'bg-white/20 text-white' : 'bg-green-50 text-sg-green'}`}>
              <CheckBadgeIcon className="w-8 h-8" />
            </div>
          </div>
          {filter === 'Active' && <div className="absolute bottom-2 right-6 text-[10px] font-black text-white/60 uppercase">Active Filter</div>}
        </button>

        {/* On Leave Card */}
        <button 
          onClick={() => setFilter(filter === 'On Leave' ? 'All' : 'On Leave')}
          className={`relative overflow-hidden p-6 rounded-[32px] border transition-all text-left group ${
            filter === 'On Leave' ? 'bg-orange-500 border-orange-500 shadow-xl' : 'bg-white border-sg-border'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'On Leave' ? 'text-white/80' : 'text-sg-text-muted'}`}>On Leave / Break</p>
              <h3 className={`text-4xl font-black mt-1 ${filter === 'On Leave' ? 'text-white' : 'text-sg-navy'}`}>{leaveCount}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${filter === 'On Leave' ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-500'}`}>
              <ClockIcon className="w-8 h-8" />
            </div>
          </div>
          {filter === 'On Leave' && <div className="absolute bottom-2 right-6 text-[10px] font-black text-white/60 uppercase">Active Filter</div>}
        </button>
      </div>

      {/* List Sub-header */}
      <div className="flex items-center justify-between px-2">
        <h4 className="text-sm font-black text-sg-navy uppercase tracking-widest">
          {filter} <span className="text-sg-green">Members</span>
        </h4>
        {filter !== 'All' && (
          <button onClick={() => setFilter('All')} className="text-[10px] font-black text-sg-text-muted underline uppercase hover:text-sg-navy transition-colors">Reset View</button>
        )}
      </div>

      {/* Responsive Staff List */}
      <div className="bg-white rounded-[40px] border border-sg-border shadow-sm overflow-hidden">
        <div className="divide-y divide-sg-border">
          {displayStaff.map((staff) => (
            <div key={staff.id} className="p-6 hover:bg-sg-bg/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Profile & Name */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${
                  staff.status === 'Active' ? 'bg-sg-green/10 text-sg-green' : 'bg-orange-100 text-orange-500'
                }`}>
                  {staff.name.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-black text-sg-navy leading-tight">{staff.name}</p>
                  <p className="text-xs font-bold text-sg-text-muted uppercase tracking-wider">{staff.role}</p>
                </div>
              </div>

              {/* Contact Info (Hidden on very small screens, visible on md+) */}
              <div className="hidden lg:flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4 text-sg-green" />
                  <span className="text-sm font-bold text-sg-navy">{staff.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-sg-green" />
                  <span className="text-sm font-bold text-sg-navy">{staff.phone}</span>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex items-center justify-between md:justify-end gap-6">
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  staff.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {staff.status}
                </div>
                <button className="p-3 bg-sg-bg hover:bg-sg-navy hover:text-white rounded-xl transition-all">
                  <EllipsisVerticalIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}

          {displayStaff.length === 0 && (
            <div className="py-24 text-center">
              <UserGroupIcon className="w-12 h-12 text-sg-border mx-auto mb-4" />
              <p className="text-sg-text-muted font-bold">No staff found for current selection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}