import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // إضافة الاستيراد هنا
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { dir } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isRTL = dir === 'rtl';

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md">
        <div className="flex items-center px-4 h-16">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <DashboardHeader />
        </div>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 ${
          sidebarOpen 
            ? 'translate-x-0' 
            : isRTL 
              ? 'translate-x-full'
              : '-translate-x-full'
        }`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-16 flex items-center px-4 border-b">
          {/* Replace text with logo */}
          <Link to="/" className="inline-flex items-center">
            <img
              src="/assets/logo.png"
              alt="Emaar Platform Logo"
              className="h-16 object-contain"
            />
          </Link>
        </div>
        <DashboardSidebar onItemClick={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className={`pt-16 ${isRTL ? 'lg:pr-64' : 'lg:pl-64'} transition-all duration-300`}>
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
