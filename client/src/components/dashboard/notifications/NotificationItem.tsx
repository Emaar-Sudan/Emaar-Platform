import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Gavel, Briefcase, Bell, Check, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import type { Notification } from '@/types/notifications';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
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
      return Bell;
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete
}) => {
  const { language } = useLanguage();
  const Icon = getNotificationIcon(notification.type);

  return (
    <div className={`flex items-start gap-4 p-4 rounded-lg ${
      notification.read ? 'bg-gray-50' : 'bg-blue-50'
    }`}>
      <div className="p-2 rounded-lg bg-white shadow">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium text-gray-900">
              {notification.title}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {notification.message}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500"
                title="Mark as read"
              >
                <Check className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => onDelete(notification.id)}
              className="p-1 rounded-full text-gray-400 hover:text-red-500"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(notification.created_at), {
            addSuffix: true,
            locale: language === 'ar' ? ar : enUS
          })}
        </p>
      </div>
    </div>
  );
};