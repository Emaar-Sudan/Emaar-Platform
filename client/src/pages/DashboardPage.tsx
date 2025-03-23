import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import {
  DashboardSidebar,
  DashboardHeader,
  ProfileSection,
  AuctionsSection,
  BidsSection,
  NotificationsSection,
  RecentActivities
} from '../components/dashboard';

const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-8">
            {t('dashboard.welcome', { name: user.name })}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <ProfileSection />
              <AuctionsSection />
              <BidsSection />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <NotificationsSection />
              <RecentActivities />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;