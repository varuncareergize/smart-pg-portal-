  import React, { useState, useEffect } from 'react';
  import { useNavigate, Link, useLocation } from 'react-router-dom';
  import { 
    BellIcon, 
    ArrowRightOnRectangleIcon, 
    UserCircleIcon,
    HomeIcon
  } from '@heroicons/react/24/outline';

  export default function NavbarInside() {
    const navigate = useNavigate();
    const location = useLocation();
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch unread notifications
    const fetchUnread = async () => {
      try {
        // Changed to local URL if testing locally, keep Render URL if live
        const response = await fetch('http://127.0.0.1:8000/notifications/');
        if (response.ok) {
          const data = await response.json();
          // Count items where is_read is false
          const unread = data.filter(note => !note.is_read).length;
          setUnreadCount(unread);
        }
      } catch (err) {
        console.error("Error fetching notifications count", err);
      }
    };

    useEffect(() => {
      fetchUnread();
      
      // Refresh every 20 seconds to keep the badge updated
      const interval = setInterval(fetchUnread, 20000);
      return () => clearInterval(interval);
    }, [location.pathname]); // Refresh count when switching pages

    const handleLogout = () => {
      localStorage.removeItem('token'); 
      navigate('/login');
    };

    return (
      <nav className="bg-white border-b border-slate-100 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        
        {/* --- LEFT: DYNAMIC BRANDING --- */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 group">
          
            <div className="hidden sm:block">
            
            </div>
          </Link>
        </div>

        {/* --- RIGHT: UTILITIES --- */}
        <div className="flex items-center gap-2 md:gap-5">
          
          {/* NOTIFICATION ICON */}
          <button 
            onClick={() => navigate('/notifications')}
            className={`relative p-2 rounded-full transition-all duration-300 ${
              location.pathname === '/notifications' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-slate-400 hover:bg-slate-50 hover:text-[#00C896]'
            }`}
          >
            <BellIcon className="w-6 h-6" />
            
            {/* Pulsing Red Badge */}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white text-[8px] font-bold text-white items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </span>
            )}
          </button>

          {/* ADMIN PROFILE */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-100 ml-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <UserCircleIcon className="w-6 h-6 text-slate-400" />
            </div>
            <span className="hidden lg:block text-xs font-black text-[#001D3D] uppercase tracking-tight">
              Owner Panel
            </span>
          </div>

          {/* LOGOUT */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group"
            title="Logout"
          >
            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Logout</span>
            <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </nav>
    );
  }