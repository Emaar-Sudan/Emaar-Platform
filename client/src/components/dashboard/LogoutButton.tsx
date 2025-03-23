import React from 'react';
import { LogOut } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

export const LogoutButton = () => {
  const { t } = useLanguage();
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="w-full flex items-center gap-3 px-4 py-2 mt-4 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
    >
      <LogOut className="w-5 h-5" />
      <span>{t('dashboard.logout')}</span>
    </button>
  );
};