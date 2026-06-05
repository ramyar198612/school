import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Check your real path to Sidebar

export default function MainLayout({ currentRole, changeRole }) {
  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      
      {/* Pass down the state variables directly into the sidebar components */}
      <Sidebar currentRole={currentRole} changeRole={changeRole} />
      
      {/* This renders the dynamic page elements based on the URL paths */}
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      
    </div>
  );
}