import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar backdrop (only shows on mobile when sidebar is open) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar - Always visible on desktop, controlled by state on mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Fixed Header - Always visible */}
      <div className="fixed top-0 right-0 left-0 z-40 lg:left-64">
        <Header setIsOpen={setSidebarOpen} />
      </div>

      {/* Main Content - Scrollable with proper padding */}
      <main className="pt-16 lg:pl-72 min-h-screen">
        <div className="p-6 sm:p-6 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;