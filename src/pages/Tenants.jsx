import React, { useState } from 'react';
import { 
  UsersIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  PlusIcon,
  PhoneIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const tenantsData = [
  { id: 1, name: 'Arjun Reddy', room: '101', property: 'Sterling Heights', phone: '+91 98231 00221', rentStatus: 'Paid' },
  { id: 2, name: 'Sarah Khan', room: '202', property: 'Green View', phone: '+91 91120 44556', rentStatus: 'Unpaid' },
  { id: 3, name: 'Vikram Singh', room: '105', property: 'Sterling Heights', phone: '+91 88776 55443', rentStatus: 'Paid' },
  { id: 4, name: 'Rahul Mehta', room: '304', property: 'Green View', phone: '+91 77665 44332', rentStatus: 'Unpaid' },
];

export default function Tenants() {
  const [filter, setFilter] = useState('All'); // 'All', 'Paid', 'Unpaid'

  // Counts
  const paidCount = tenantsData.filter(t => t.rentStatus === 'Paid').length;
  const unpaidCount = tenantsData.filter(t => t.rentStatus === 'Unpaid').length;

  // Filtered List
  const displayTenants = filter === 'All' 
    ? tenantsData 
    : tenantsData.filter(t => t.rentStatus === filter);

  return (
    <div className="container-custom space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-sg-navy">Tenants</h2>
        <button className="bg-sg-green text-white p-3 rounded-xl shadow-lg shadow-sg-green/20">
          <PlusIcon className="w-6 h-6 stroke-[3px]" />
        </button>
      </div>

      {/* --- INTERACTIVE SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Paid Card */}
        <button 
          onClick={() => setFilter(filter === 'Paid' ? 'All' : 'Paid')}
          className={`relative overflow-hidden p-6 rounded-[32px] border transition-all text-left group ${
            filter === 'Paid' ? 'bg-sg-green border-sg-green shadow-xl' : 'bg-white border-sg-border'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'Paid' ? 'text-white/80' : 'text-sg-text-muted'}`}>Paid Tenants</p>
              <h3 className={`text-4xl font-black mt-1 ${filter === 'Paid' ? 'text-white' : 'text-sg-navy'}`}>{paidCount}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${filter === 'Paid' ? 'bg-white/20 text-white' : 'bg-green-50 text-sg-green'}`}>
              <CheckCircleIcon className="w-8 h-8" />
            </div>
          </div>
          {filter === 'Paid' && <div className="absolute bottom-2 right-6 text-[10px] font-black text-white/60 uppercase">Filtering Applied</div>}
        </button>

        {/* Unpaid Card */}
        <button 
          onClick={() => setFilter(filter === 'Unpaid' ? 'All' : 'Unpaid')}
          className={`relative overflow-hidden p-6 rounded-[32px] border transition-all text-left group ${
            filter === 'Unpaid' ? 'bg-red-500 border-red-500 shadow-xl' : 'bg-white border-sg-border'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'Unpaid' ? 'text-white/80' : 'text-sg-text-muted'}`}>Unpaid Dues</p>
              <h3 className={`text-4xl font-black mt-1 ${filter === 'Unpaid' ? 'text-white' : 'text-sg-navy'}`}>{unpaidCount}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${filter === 'Unpaid' ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500'}`}>
              <ExclamationCircleIcon className="w-8 h-8" />
            </div>
          </div>
          {filter === 'Unpaid' && <div className="absolute bottom-2 right-6 text-[10px] font-black text-white/60 uppercase">Filtering Applied</div>}
        </button>
      </div>

      {/* List Header */}
      <div className="flex items-center justify-between px-2">
        <h4 className="text-sm font-black text-sg-navy uppercase tracking-widest">
          Showing: <span className="text-sg-green">{filter} Residents</span>
        </h4>
        {filter !== 'All' && (
          <button onClick={() => setFilter('All')} className="text-[10px] font-black text-sg-text-muted underline uppercase">Clear Filter</button>
        )}
      </div>

      {/* Responsive List View */}
      <div className="space-y-4">
        {displayTenants.map((tenant) => (
          <div key={tenant.id} className="bg-white p-5 rounded-[28px] border border-sg-border shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white ${tenant.rentStatus === 'Paid' ? 'bg-sg-green' : 'bg-red-500'}`}>
                {tenant.name.charAt(0)}
              </div>
              <div>
                <p className="font-black text-sg-navy group-hover:text-sg-green transition-colors">{tenant.name}</p>
                <p className="text-[10px] font-bold text-sg-text-muted uppercase">Room {tenant.room} • {tenant.property}</p>
              </div>
            </div>
            
            <div className="hidden sm:block text-right">
              <p className={`text-xs font-black uppercase ${tenant.rentStatus === 'Paid' ? 'text-sg-green' : 'text-red-500'}`}>
                {tenant.rentStatus}
              </p>
              <p className="text-[10px] font-bold text-sg-text-muted">{tenant.phone}</p>
            </div>

            <button className="p-3 bg-sg-bg rounded-xl text-sg-navy">
              <PhoneIcon className="w-5 h-5" />
            </button>
          </div>
        ))}

        {displayTenants.length === 0 && (
          <div className="py-20 text-center bg-white rounded-[32px] border border-dashed border-sg-border">
             <p className="text-sg-text-muted font-bold">No tenants found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}