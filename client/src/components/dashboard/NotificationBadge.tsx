import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const NotificationBadge: React.FC = () => {
  const { unreadCount } = useNotifications();

  return (
    <button className="relative p-2 text-gray-600 hover:text-primary">
      <Bell className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
      )}
    </button>
  );
};

export default NotificationBadge;