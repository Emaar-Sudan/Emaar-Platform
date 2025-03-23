import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { authApi } from '@/services/api/auth';
import type { User } from '@/types/user';

export const useRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const registerCompany = async (data: any) => {
    setIsLoading(true);
    try {
      await authApi.register({
        ...data,
        type: 'company',
        role: 'user'
      });
      toast.success(t('signup.success'));
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || t('signup.error');
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerIndividual = async (data: any) => {
    setIsLoading(true);
    try {
      await authApi.register({
        ...data,
        type: 'individual',
        role: 'user'
      });
      toast.success(t('signup.success'));
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || t('signup.error');
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    registerCompany,
    registerIndividual
  };
};