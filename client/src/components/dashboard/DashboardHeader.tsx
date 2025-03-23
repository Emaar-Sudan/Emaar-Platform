import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotificationBadge from './NotificationBadge';
import UserMenu from './UserMenu';

const DashboardHeader = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 flex items-center justify-between">
      <h1 className="text-xl font-bold text-primary hidden lg:block">
        {t('dashboard.title')}
      </h1>

      <div className="flex items-center gap-4">
        <NotificationBadge />
        <UserMenu user={user} />
      </div>
    </div>
  );
};

export default DashboardHeader;