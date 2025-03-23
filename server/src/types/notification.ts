export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'tender' | 'auction' | 'job' | 'system';
  read: boolean;
  priority: boolean;
  created_at: string;
}

export interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  priority_alerts: boolean;
}