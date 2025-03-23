import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import toast from 'react-hot-toast';

export const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const { t } = useLanguage();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success(t('login.success'));
    } catch (error) {
      toast.error(t('login.googleError'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-5 h-5"
      />
      {t('login.continueWithGoogle')}
    </button>
  );
};