import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Header = ({ setIsOpen }) => {
  const { handleLogout, admin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U'; // Default if no name
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const logout = async () => {
    await handleLogout();
    navigate("/");
  }

  return (
    <header className="relative bg-gradient-to-r from-white/90 via-slate-50/95 to-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-xl shadow-slate-900/5">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

      <div className="relative flex items-center justify-between h-16 px-6">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-white/70 backdrop-blur-sm transition-all duration-200 ring-1 ring-slate-200/40 hover:ring-slate-300/60 hover:shadow-md hover:shadow-slate-200/50 transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Page title or breadcrumb */}
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Dashboard
            </h2>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-5">

          {/* Notification bell */}
          <button className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-white/60 backdrop-blur-sm transition-all duration-200 ring-1 ring-slate-200/40 hover:ring-slate-300/60 hover:shadow-md hover:shadow-slate-200/50 transform hover:scale-105 active:scale-95 group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Notification indicator */}
            <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 ring-2 ring-white shadow-sm"></span>
            </span>
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-800">
                {admin?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500">
                {admin?.username || 'user@example.com'}
              </p>
            </div>

            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 ring-2 ring-white/50 backdrop-blur-sm">
              <span className="text-white font-bold text-sm drop-shadow-sm">
                {getUserInitials(admin?.name)}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-200 ring-1 ring-white/20 hover:scale-105 active:scale-95 backdrop-blur-sm group"
          >
            <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent"></div>
    </header>
  );
};

export default Header;