import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/overview/DashboardStats';
import { RecentNotifications } from '@/components/dashboard/overview/RecentNotifications';
import { BidsSection, AuctionsSection } from '@/components/dashboard';

const DashboardPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">
          {t('dashboard.welcome', { name: user.name })}
        </h1>
        
        {/* Stats Cards */}
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Notifications */}
          <RecentNotifications />

          <div className="space-y-8">
            {/* Recent Bids */}
            <BidsSection />
            
            {/* Recent Auctions */}
            <AuctionsSection />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;