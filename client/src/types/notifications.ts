export interface Notification {
  id: string;
  type: 'tender' | 'auction' | 'job' | 'system';
  title: string;
  message: string;
  read: boolean;
  priority: boolean;
  created_at: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  priorityAlerts: boolean;
}