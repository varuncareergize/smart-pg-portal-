import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Calendar, ShoppingBag, BarChart3, Plus, Search, 
  ArrowUpRight, UploadCloud, FileText, ShieldCheck 
} from 'lucide-react';

export default function GroceryExpenses() {
  // 1. STATE MANAGEMENT
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    vendor: '',
    category: 'Groceries',
    payment_mode: 'UPI',
    property: 1 // Default property ID
  });
  const [receipt, setReceipt] = useState(null);

  // 2. FETCH DATA FROM API
  const fetchExpenses = async () => {
    try {
      const res = await axios.get('https://smart-pg-backend.onrender.com/expenses/?property_id=1');
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching groceries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 3. DYNAMIC STATS CALCULATION
  const monthlySpend = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const recentSpend = expenses
    .filter(exp => new Date(exp.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  // 4. HANDLE FORM SUBMISSION (With Image Upload)
  const handleRecordExpense = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (receipt) data.append('receipt_image', receipt);

    try {
      await axios.post('https://smart-pg-backend.onrender.com/expenses/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Expense Recorded Successfully!");
      fetchExpenses(); // Refresh list
      setFormData({ ...formData, amount: '', vendor: '' }); // Reset partial form
      setReceipt(null);
    } catch (err) {
      alert("Error recording expense. Check console.");
      console.error(err);
    }
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse">LOADING MESS EXPENSES...</div>;

  return (
    <div className="p-8 space-y-8">
      {/* Header Area */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#001D3D]">Grocery Payments</h1>
          <p className="text-slate-400 text-sm font-medium">Manage and track your mess and tiffin expenses.</p>
        </div>
        <button className="bg-[#00C896] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
          <Plus size={18} /> Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Monthly Grocery Spend" value={`₹${monthlySpend.toLocaleString()}`} icon={<Calendar className="text-emerald-500" />} trend="+12%" />
        <StatCard label="Last 7 Days Spend" value={`₹${recentSpend.toLocaleString()}`} icon={<BarChart3 className="text-blue-500" />} />
        <StatCard label="Total Entries" value={expenses.length} icon={<ShoppingBag className="text-orange-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* New Entry Form */}
        <section className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <form onSubmit={handleRecordExpense}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-lg text-[#001D3D]">New Expense Entry</h3>
              <FileText size={20} className="text-slate-300" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input label="Date" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              <Input label="Amount (₹)" type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="0.00" />
            </div>

            <div className="space-y-1.5 mb-4">
              <Input label="Vendor/Store Name" type="text" value={formData.vendor} onChange={e => setFormData({...formData, vendor: e.target.value})} placeholder="e.g. Local Market" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Select label="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} options={['Vegetables', 'Dairy', 'Groceries', 'Cleaning']} />
              <Select label="Payment Mode" value={formData.payment_mode} onChange={e => setFormData({...formData, payment_mode: e.target.value})} options={['UPI', 'Cash', 'Bank Transfer']} />
            </div>

            <div className="border-2 border-dashed border-slate-100 rounded-2xl p-8 text-center space-y-3 mb-8 hover:bg-slate-50 transition-colors cursor-pointer group relative">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setReceipt(e.target.files[0])} />
              <UploadCloud className={`mx-auto ${receipt ? 'text-[#00C896]' : 'text-slate-300'}`} size={32} />
              <div>
                <p className="text-xs font-bold text-[#001D3D]">{receipt ? receipt.name : 'Click to upload receipt'}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase">PNG, JPG or PDF</p>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#001D3D] text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#00C896] transition-all shadow-xl shadow-blue-900/10">
              <ShieldCheck size={20} /> Record Expense
            </button>
          </form>
        </section>

        {/* Recent Bills Table */}
        <section className="lg:col-span-3 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <h3 className="font-black text-lg text-[#001D3D] mb-8">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Vendor</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {expenses.map((bill) => (
                  <tr key={bill.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 text-xs font-bold text-slate-500">{bill.date}</td>
                    <td className="py-5 text-sm font-black text-[#001D3D]">
                        {bill.vendor}
                        <span className="block text-[9px] text-slate-400 uppercase">{bill.category}</span>
                    </td>
                    <td className="py-5 text-sm font-black text-[#001D3D]">₹{bill.amount}</td>
                    <td className="py-5 text-center">
                      <div className={`w-2 h-2 rounded-full mx-auto ${bill.status === 'Paid' ? 'bg-emerald-500' : 'bg-orange-400'}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- REUSABLE SUB-COMPONENTS ---
const StatCard = ({ label, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
      {trend && <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">{trend}</span>}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black mt-1 text-[#001D3D]">{value}</p>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    <input {...props} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00C896] outline-none transition-all" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    <select {...props} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00C896] outline-none">
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);