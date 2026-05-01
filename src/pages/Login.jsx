import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  /**
   * For the time being, this function bypasses actual server validation
   * and redirects the user directly to the Dashboard.
   */
  const handleLogin = (e) => {
    e.preventDefault(); // Critical: Prevents page refresh
    
    // Log for debugging (optional)
    console.log("Redirecting to Dashboard...");
    
    // Redirects to the root path (Dashboard)
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
      
      {/* BRAND BACKGROUND: Deep Navy top half (#001D3D) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#001D3D] z-0" />
      
      <div className="relative z-10 w-full max-w-md">
        
        {/* BRAND LOGO AREA */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">SmartPG</h1>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Portal Access</p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-900/20 p-10 border border-slate-100">
          
          {/* CARD HEADER */}
          <div className="mb-10 text-center">
            {/* Signature Green (#00C896) Icon Box */}
            <div className="w-16 h-16 bg-[#00C896]/10 text-[#00C896] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-[#001D3D]">Welcome Back</h2>
            <p className="text-slate-400 text-sm font-bold mt-1">Please enter your credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* USERNAME INPUT */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#00C896] transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#001D3D] outline-none focus:ring-4 focus:ring-[#00C896]/10 focus:border-[#00C896] transition-all"
                  placeholder="admin_user"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] font-black text-[#00C896] uppercase tracking-widest hover:underline">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#00C896] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#001D3D] outline-none focus:ring-4 focus:ring-[#00C896]/10 focus:border-[#00C896] transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-[#001D3D]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* REDIRECT BUTTON: Signature SmartGP Green (#00C896) */}
            <button
              type="submit"
              className="w-full bg-[#00C896] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#00b085] shadow-xl shadow-[#00C896]/20 transition-all active:scale-[0.98] mt-4"
            >
              Sign In <ArrowRight size={20} strokeWidth={3} />
            </button>
          </form>

          {/* FOOTER LINK */}
          <div className="mt-10 text-center">
            <p className="text-xs font-bold text-slate-400">
              Need portal access? <span className="text-[#00C896] cursor-pointer hover:underline font-black">Contact Admin</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}