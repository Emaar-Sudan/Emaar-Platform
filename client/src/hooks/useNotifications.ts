import { useState, useEffect } from 'react';
import { notificationsApi } from '@/services/api/notifications';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Notification } from '@/types/notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationsApi.getUserNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error(t('notifications.fetchError'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId: string) => {
    try {
      await notificationsApi.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
      toast.success(t('notifications.markedAsRead'));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error(t('notifications.markAsReadError'));
    }
  };

  return {
    notifications,
    isLoading,
    markAsRead,
    refreshNotifications: fetchNotifications
  };
};