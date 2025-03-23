import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NotificationItem } from './NotificationItem';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import { useNotifications } from '@/hooks/useNotifications';

export const NotificationsList: React.FC = () => {
  const { t } = useLanguage();
  const { notifications, isLoading, markAsRead, deleteNotification } = useNotifications();

  if (isLoading) {
    return <LoadingScreen message={t('loading')} />;
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-600">{t('notifications.empty')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={markAsRead}
          onDelete={deleteNotification}
        />
      ))}
    </div>
  );
};