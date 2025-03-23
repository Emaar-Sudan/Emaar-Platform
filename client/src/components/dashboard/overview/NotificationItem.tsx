import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { FileText, Gavel, Briefcase, Calendar } from 'lucide-react';
import { formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { Notification } from '../../../types/notifications';

interface NotificationItemProps {
  notification: Notification;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'tender':
      return FileText;
    case 'auction':
      return Gavel;
    case 'job':
      return Briefcase;
    default:
      return Calendar;
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { language } = useLanguage();
  const Icon = getNotificationIcon(notification.type);

  const getFormattedDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        return 'Invalid date';
      }
      return formatDistanceToNow(date, {
        addSuffix: true,
        locale: language === 'ar' ? ar : enUS
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg ${
        notification.read ? 'bg-gray-50' : 'bg-blue-50'
      }`}
    >
      <div className="p-2 rounded-lg bg-white shadow">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">
          {notification.title}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {notification.message}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {getFormattedDate(notification.created_at)}
        </p>
      </div>
    </div>
  );
};