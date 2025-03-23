import { executeQuery, transaction } from '../config/database';
import { logger } from '../utils/logger';
import type { Notification, NotificationSettings } from '../types/notification';

export const notificationService = {
  async getNotifications(userId: string, filters = {}) {
    try {
      let query = `
        SELECT n.* 
        FROM notifications n
        WHERE n.user_id = ?
      `;
      const params: any[] = [userId];

      if (filters.read !== undefined) {
        query += ' AND n.read = ?';
        params.push(filters.read);
      }

      if (filters.type) {
        query += ' AND n.type = ?';
        params.push(filters.type);
      }

      query += ' ORDER BY n.created_at DESC';

      const notifications = await executeQuery<Notification[]>(query, params);
      return notifications;
    } catch (error) {
      logger.error('Error fetching notifications:', error);
      throw error;
    }
  },

  async getNotificationById(id: string) {
    try {
      const [notification] = await executeQuery<Notification[]>(
        `SELECT * FROM notifications WHERE id = ?`,
        [id]
      );
      return notification;
    } catch (error) {
      logger.error('Error fetching notification:', error);
      throw error;
    }
  },

  async createNotification(notificationData: Partial<Notification>) {
    return transaction(async (connection) => {
      try {
        const [result] = await connection.execute(
          `INSERT INTO notifications (
            user_id, title, message, type, read, priority, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            notificationData.user_id,
            notificationData.title,
            notificationData.message,
            notificationData.type,
            false, // default value for read is false
            notificationData.priority || false,
            new Date(),
          ]
        );

        return { id: result.insertId, ...notificationData };
      } catch (error) {
        logger.error('Error creating notification:', error);
        throw error;
      }
    });
  },

  async markAsRead(id: string) {
    return transaction(async (connection) => {
      try {
        await connection.execute(
          `UPDATE notifications SET read = true WHERE id = ?`,
          [id]
        );
      } catch (error) {
        logger.error('Error marking notification as read:', error);
        throw error;
      }
    });
  },

  async deleteNotification(id: string) {
    try {
      const [result] = await executeQuery(
        'DELETE FROM notifications WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      logger.error('Error deleting notification:', error);
      throw error;
    }
  },

  async getUserNotificationSettings(userId: string) {
    try {
      const [settings] = await executeQuery<NotificationSettings[]>(
        `SELECT * FROM notification_settings WHERE user_id = ?`,
        [userId]
      );
      return settings;
    } catch (error) {
      logger.error('Error fetching user notification settings:', error);
      throw error;
    }
  },

  async updateUserNotificationSettings(userId: string, settingsData: NotificationSettings) {
    return transaction(async (connection) => {
      try {
        const [existingSettings] = await connection.execute(
          `SELECT * FROM notification_settings WHERE user_id = ?`,
          [userId]
        );

        if (existingSettings.length > 0) {
          await connection.execute(
            `UPDATE notification_settings SET 
              email_notifications = ?, push_notifications = ?, 
              sms_notifications = ?, priority_alerts = ?
            WHERE user_id = ?`,
            [
              settingsData.email_notifications,
              settingsData.push_notifications,
              settingsData.sms_notifications,
              settingsData.priority_alerts,
              userId
            ]
          );
        } else {
          await connection.execute(
            `INSERT INTO notification_settings (
              user_id, email_notifications, push_notifications, 
              sms_notifications, priority_alerts
            ) VALUES (?, ?, ?, ?, ?)`,
            [
              userId,
              settingsData.email_notifications,
              settingsData.push_notifications,
              settingsData.sms_notifications,
              settingsData.priority_alerts
            ]
          );
        }
      } catch (error) {
        logger.error('Error updating notification settings:', error);
        throw error;
      }
    });
  }
};
