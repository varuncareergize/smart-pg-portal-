import React, { useState } from 'react';
import { 
  CurrencyRupeeIcon, 
  ClockIcon, 
  ArrowDownTrayIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const paymentsData = [
  { id: 'TXN-1001', tenant: 'Arjun Reddy', room: '101', amount: '12,000', date: '01 May 2024', status: 'Paid', method: 'UPI' },
  { id: 'TXN-1002', tenant: 'Sarah Khan', room: '202', amount: '14,000', date: '02 May 2024', status: 'Pending', method: '-' },
  { id: 'TXN-1003', tenant: 'Vikram Singh', room: '105', amount: '8,500', date: '01 May 2024', status: 'Paid', method: 'Cash' },
  { id: 'TXN-1004', tenant: 'Rahul Mehta', room: '304', amount: '9,500', date: '05 May 2024', status: 'Pending', method: '-' },
];

export default function Payments() {
  const [filter, setFilter] = useState('All');

  const totalRevenue = paymentsData
    .filter(p => p.status === 'Paid')
    .reduce((acc, curr) => acc + parseInt(curr.amount.replace(',', '')), 0);

  const pendingAmount = paymentsData
    .filter(p => p.status === 'Pending')
    .reduce((acc, curr) => acc + parseInt(curr.amount.replace(',', '')), 0);

  const displayPayments = filter === 'All' 
    ? paymentsData 
    : paymentsData.filter(p => p.status === filter);

  return (
    <div className="container-custom space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-sg-navy tracking-tight">Payments</h2>
          <p className="text-sg-text-muted font-medium">Track your collection and financial health.</p>
        </div>
        <button className="w-full sm:w-auto bg-sg-navy text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
          <ArrowDownTrayIcon className="w-5 h-5" /> Download Report
        </button>
      </div>

      {/* --- INTERACTIVE SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={() => setFilter(filter === 'Paid' ? 'All' : 'Paid')}
          className={`p-6 rounded-[32px] border transition-all text-left ${
            filter === 'Paid' ? 'bg-sg-green border-sg-green shadow-xl shadow-sg-green/20' : 'bg-white border-sg-border'
          }`}
        >
          <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'Paid' ? 'text-white/80' : 'text-sg-text-muted'}`}>Revenue Collected</p>
          <div className="flex justify-between items-end mt-2">
            <h3 className={`text-3xl font-black ${filter === 'Paid' ? 'text-white' : 'text-sg-navy'}`}>₹{totalRevenue.toLocaleString()}</h3>
            <CheckCircleIcon className={`w-8 h-8 ${filter === 'Paid' ? 'text-white/40' : 'text-sg-green/20'}`} />
          </div>
        </button>

        <button 
          onClick={() => setFilter(filter === 'Pending' ? 'All' : 'Pending')}
          className={`p-6 rounded-[32px] border transition-all text-left ${
            filter === 'Pending' ? 'bg-red-500 border-red-500 shadow-xl shadow-red-500/20' : 'bg-white border-sg-border'
          }`}
        >
          <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'Pending' ? 'text-white/80' : 'text-sg-text-muted'}`}>Pending Dues</p>
          <div className="flex justify-between items-end mt-2">
            <h3 className={`text-3xl font-black ${filter === 'Pending' ? 'text-white' : 'text-sg-navy'}`}>₹{pendingAmount.toLocaleString()}</h3>
            <ClockIcon className={`w-8 h-8 ${filter === 'Pending' ? 'text-white/40' : 'text-red-500/20'}`} />
          </div>
        </button>
      </div>

      {/* Search & List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-xs font-black text-sg-navy uppercase tracking-widest">
            Recent Transactions {filter !== 'All' && <span className="text-sg-green ml-1">• {filter}</span>}
          </h4>
        </div>

        <div className="bg-white rounded-[32px] border border-sg-border overflow-hidden shadow-sm">
          <div className="divide-y divide-sg-border">
            {displayPayments.map((pay) => (
              <div key={pay.id} className="p-5 flex items-center justify-between group hover:bg-sg-bg/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pay.status === 'Paid' ? 'bg-sg-green/10 text-sg-green' : 'bg-red-50 text-red-500'}`}>
                    <CurrencyRupeeIcon className="w-6 h-6 stroke-[2.5px]" />
                  </div>
                  <div>
                    <p className="font-black text-sg-navy leading-tight">{pay.tenant}</p>
                    <p className="text-[10px] font-bold text-sg-text-muted uppercase">Room {pay.room} • {pay.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-sg-navy leading-tight">₹{pay.amount}</p>
                  <p className={`text-[9px] font-black uppercase tracking-tighter ${pay.status === 'Paid' ? 'text-sg-green' : 'text-red-500'}`}>
                    {pay.status === 'Paid' ? `${pay.method}` : 'Overdue'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}