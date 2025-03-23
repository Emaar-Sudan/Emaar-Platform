import { executeQuery } from '../config/database';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';
import type { User } from '../types/user';

export const userService = {
  async getUserProfile(userId: string) {
    try {
      const [user] = await executeQuery<User[]>(
        `SELECT u.*, 
          CASE 
            WHEN u.type = 'company' THEN cp.business_name 
            ELSE ip.national_id 
          END as profile_info
        FROM users u
        LEFT JOIN company_profiles cp ON u.id = cp.user_id
        LEFT JOIN individual_profiles ip ON u.id = ip.user_id
        WHERE u.id = ?`,
        [userId]
      );
      return user;
    } catch (error) {
      logger.error('Error fetching user profile:', error);
      throw error;
    }
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    try {
      const allowedUpdates = ['name', 'phone', 'photo_url'];
      const updateFields = Object.entries(updates)
        .filter(([key]) => allowedUpdates.includes(key))
        .map(([key, value]) => `${key} = ?`);
      
      if (updateFields.length === 0) {
        throw new Error('No valid fields to update');
      }

      const query = `
        UPDATE users 
        SET ${updateFields.join(', ')}, updated_at = NOW()
        WHERE id = ?
      `;

      const values = [...Object.values(updates), userId];
      await executeQuery(query, values);

      return this.getUserProfile(userId);
    } catch (error) {
      logger.error('Error updating profile:', error);
      throw error;
    }
  },

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    try {
      const [user] = await executeQuery<User[]>(
        'SELECT password FROM users WHERE id = ?',
        [userId]
      );

      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        throw new Error('Current password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await executeQuery(
        'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?',
        [hashedPassword, userId]
      );
    } catch (error) {
      logger.error('Error updating password:', error);
      throw error;
    }
  },

  async deleteAccount(userId: string) {
    try {
      await executeQuery('DELETE FROM users WHERE id = ?', [userId]);
    } catch (error) {
      logger.error('Error deleting account:', error);
      throw error;
    }
  }
};