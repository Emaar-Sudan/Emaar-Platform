import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Bell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import axios from 'axios'; // نستخدم axios لجلب البيانات من API

export const RecentNotifications = () => {
  const { t } = useLanguage();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['recentNotifications'],
    queryFn: async () => {
      const { data } = await axios.get('/api/recent-notifications'); // استدعاء API
      return data;
    }
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{t('dashboard.recentNotifications')}</h2>
        <Bell className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {t('notifications.empty')}
          </div>
        )}
      </div>
    </div>
  );
};
