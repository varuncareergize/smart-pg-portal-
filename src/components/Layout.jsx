import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavbarInside from './NavbarInside'; // Import your new navbar

export default function Layout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVBAR INSIDE DASHBOARD */}
        <NavbarInside />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-8">
          <Outlet /> {/* This is where Dashboard, Tenants, etc. render */}
        </main>
      </div>
    </div>
  );
}