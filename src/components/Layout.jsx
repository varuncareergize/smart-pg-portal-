import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // or wherever your sidebar is

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#F0F2F5]">
      {/* Sidebar stays fixed on the left */}
      <Sidebar />
      
      {/* Content area on the right */}
      <main className="flex-1 h-screen overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}