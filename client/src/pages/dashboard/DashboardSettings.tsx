import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { SettingsTabs } from '../../components/dashboard/settings/SettingsTabs';

const DashboardSettings = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.settings.title')}</h1>
        <SettingsTabs />
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;