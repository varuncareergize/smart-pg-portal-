import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer'; // Added Footer reference

export default function Layout() {
  return (
    // 1. Added dark:bg-[#000814] for the global background
    // 2. Added dark:text-slate-200 to set a default light text color for dark mode
    <div className="flex min-h-screen bg-[#F0F2F5] dark:bg-[#000814] text-slate-900 dark:text-slate-200 transition-colors duration-300">
      
      {/* Sidebar - Positioned fixed or sticky depending on your CSS */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-transparent p-4 lg:p-8">
          {/* 
             The Outlet renders your pages like Visitors, Dashboard, etc. 
             Setting bg-transparent here ensures the dark:bg-[#000814] from 
             the parent div shows through.
          */}
          <Outlet /> 
        </main>

        {/* 
           Including the Footer here ensures it stays at the bottom of 
           the content area for every page.
        */}
        <Footer />
      </div>
    </div>
  );
}