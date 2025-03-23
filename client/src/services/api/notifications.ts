import api from './index';
import type { Notification, NotificationSettings } from '@/types/notifications';

export const notificationsApi = {
  async getUserNotifications() {
    const { data } = await api.get('/notifications');
    return data as Notification[];
  },

  async markAsRead(notificationId: string) {
    await api.patch(`/notifications/${notificationId}/read`);
  },

  async getNotificationSettings() {
    const { data } = await api.get('/notifications/settings');
    return data as NotificationSettings;
  },

  async updateNotificationSettings(settings: NotificationSettings) {
    const { data } = await api.patch('/notifications/settings', settings);
    return data as NotificationSettings;
  }
};