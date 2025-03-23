import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/services/api/auth';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { User } from '@/types/user';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authApi.login(email, password);
      toast.success(t('auth.loginSuccess'));
      navigate('/');
      return user;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('auth.loginError'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      await authApi.register(userData);
      toast.success(t('auth.registrationSuccess'));
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(t('auth.registrationError'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      toast.success(t('auth.logoutSuccess'));
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('auth.logoutError'));
    }
  };

  return {
    isLoading,
    login,
    register,
    logout
  };
};