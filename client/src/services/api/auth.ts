import api from './index';
import type { User } from '@/types/user';

export const authApi = {
  async login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('authToken', data.session.access_token);
    return data.user;
  },

  async register(userData: Partial<User>) {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  async getCurrentUser() {
    const { data } = await api.get('/users/me');
    return data;
  },

  async logout() {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
  }
};