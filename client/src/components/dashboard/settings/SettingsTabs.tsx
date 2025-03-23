import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { User, Shield, Trash2 } from 'lucide-react';
import { AccountSettings } from './AccountSettings';
import { SecuritySettings } from './SecuritySettings';
import { DeleteAccount } from './DeleteAccount';

export const SettingsTabs = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: t('settings.tabs.account'), icon: User },
    { id: 'security', label: t('settings.tabs.security'), icon: Shield },
    { id: 'delete', label: t('settings.tabs.delete'), icon: Trash2 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b">
        <div className="flex">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'account' && <AccountSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'delete' && <DeleteAccount />}
      </div>
    </div>
  );
};