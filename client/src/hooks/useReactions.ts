import { useState } from 'react';
import { reactionsApi } from '@/services/api/reactions';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useReactions = (resultId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();

  const addReaction = async (type: string) => {
    if (!user) {
      toast.error(t('login.required'));
      return;
    }

    try {
      setIsLoading(true);
      await reactionsService.addReaction(resultId, type);
      toast.success(t('results.reactionSuccess'));
    } catch (error) {
      console.error('Reaction error:', error);
      toast.error(t('results.reactionError'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addReaction,
    isLoading
  };
};