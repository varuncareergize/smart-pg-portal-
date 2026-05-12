import React, { useState, useEffect } from 'react';
import { BellIcon, BanknotesIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/notifications/');
      const data = await response.json();
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    await fetch('http://127.0.0.1:8000/notifications/', { method: 'POST' });
    fetchNotifications(); // Refresh list
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#001D3D]">Activity Log</h1>
          <p className="text-slate-500">Track payments and complaints</p>
        </div>
        <button 
          onClick={markAllRead}
          className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-400">Loading activity...</div>
        ) : notifications.length === 0 ? (
          <div className="p-10 text-center text-slate-400">No recent activity.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {notifications.map((note) => (
              <div key={note.id} className={`p-6 flex items-start gap-4 ${!note.is_read ? 'bg-blue-50/30' : ''}`}>
                <div className={`p-3 rounded-2xl ${note.notification_type === 'PAYMENT' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {note.notification_type === 'PAYMENT' ? <BanknotesIcon className="w-6 h-6" /> : <ChatBubbleLeftRightIcon className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#001D3D]">{note.tenant_name}</h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mt-1">{note.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}