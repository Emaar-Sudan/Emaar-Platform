import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Bell, Mail, Smartphone, Star } from 'lucide-react';
import { useNotifications } from '../../../hooks/useNotifications';
import toast from 'react-hot-toast';

export const NotificationsSettings = () => {
  const { t } = useLanguage();
  const { settings, updateSettings } = useNotifications();

  const handleToggle = async (key: string) => {
    try {
      await updateSettings({ ...settings, [key]: !settings[key] });
      toast.success(t('notifications.settingsUpdated'));
    } catch (error) {
      toast.error(t('notifications.settingsError'));
    }
  };

  const notificationTypes = [
    {
      id: 'emailNotifications',
      icon: Mail,
      title: t('notifications.emailNotifications'),
      description: t('notifications.emailDescription')
    },
    {
      id: 'pushNotifications',
      icon: Bell,
      title: t('notifications.pushNotifications'),
      description: t('notifications.pushDescription')
    },
    {
      id: 'smsNotifications',
      icon: Smartphone,
      title: t('notifications.smsNotifications'),
      description: t('notifications.smsDescription')
    },
    {
      id: 'priorityAlerts',
      icon: Star,
      title: t('notifications.priorityAlerts'),
      description: t('notifications.priorityDescription')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">{t('notifications.settings')}</h2>
      
      <div className="space-y-6">
        {notificationTypes.map(({ id, icon: Icon, title, description }) => (
          <div key={id} className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-gray-50">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{title}</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings[id]}
                    onChange={() => handleToggle(id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};