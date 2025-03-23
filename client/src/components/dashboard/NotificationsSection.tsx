import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Bell, Settings } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const NotificationsSection = () => {
  const { t } = useLanguage();
  const { notifications, markAsRead, clearAll } = useNotifications();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t('dashboard.notifications')}</h2>
        <div className="flex gap-2">
          <button
            onClick={clearAll}
            className="text-gray-600 hover:text-gray-800"
          >
            {t('notifications.clearAll')}
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <Bell className={`w-5 h-5 ${
                  notification.read ? 'text-gray-400' : 'text-primary'
                }`} />
                <div className="flex-1">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.body}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        {t('notifications.markAsRead')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
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

export default NotificationsSection;