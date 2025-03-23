import api from './index';
import type { User } from '@/types/user';

export const profileApi = {
  async getUserProfile() {
    const { data } = await api.get('/users/me');
    return data;
  },

  async updateProfile(updates: Partial<User>) {
    const { data } = await api.patch('/users/profile', updates);
    return data;
  },

  async updatePassword(currentPassword: string, newPassword: string) {
    const { data } = await api.post('/users/change-password', {
      currentPassword,
      newPassword
    });
    return data;
  },

  async deleteAccount() {
    await api.delete('/users/me');
  }
};