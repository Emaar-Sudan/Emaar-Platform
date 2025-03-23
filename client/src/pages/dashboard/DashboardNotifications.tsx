import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { NotificationsList } from '@/components/dashboard/notifications/NotificationsList';
import { NotificationSettings } from '@/components/dashboard/notifications/NotificationSettings';

const DashboardNotifications = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.notifications.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <NotificationsList />
          </div>
          <div>
            <NotificationSettings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardNotifications;