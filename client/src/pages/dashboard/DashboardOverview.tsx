import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { DashboardStats } from '../../components/dashboard/overview/DashboardStats';
import { RecentNotifications } from '../../components/dashboard/overview/RecentNotifications';
import { BidsSection, AuctionsSection } from '../../components/dashboard';
import { useAuth } from '@/contexts/AuthContext';


const DashboardOverview = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* عرض اسم المستخدم في لوحة التحكم */}
        <h1 className="text-2xl font-bold">
          {t('dashboard.welcome', { name: user?.fullName || "User" })} {/* إذا لم يكن الاسم موجودًا، يعرض "User" */}
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

export default DashboardOverview;