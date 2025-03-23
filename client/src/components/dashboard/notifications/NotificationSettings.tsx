import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, Mail, Smartphone, Star } from 'lucide-react';
import { notificationsApi } from '@/services/api/notifications';
import toast from 'react-hot-toast';
import type { NotificationSettings as Settings } from '@/types/notifications';

export const NotificationSettings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<Settings>({
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false,
    priority_alerts: true
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await notificationsService.getNotificationSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error(t('notifications.settings.fetchError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [t]);

  const handleToggle = async (key: keyof Settings) => {
    try {
      const newSettings = {
        ...settings,
        [key]: !settings[key]
      };
      
      await notificationsService.updateNotificationSettings(newSettings);
      setSettings(newSettings);
      toast.success(t('notifications.settings.updateSuccess'));
    } catch (error) {
      console.error('Settings update error:', error);
      toast.error(t('notifications.settings.updateError'));
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center">{t('loading')}...</div>;
  }

  const settingsConfig = [
    {
      key: 'email_notifications',
      icon: Mail,
      title: t('notifications.settings.email'),
      description: t('notifications.settings.emailDesc')
    },
    {
      key: 'push_notifications',
      icon: Bell,
      title: t('notifications.settings.push'),
      description: t('notifications.settings.pushDesc')
    },
    {
      key: 'sms_notifications',
      icon: Smartphone,
      title: t('notifications.settings.sms'),
      description: t('notifications.settings.smsDesc')
    },
    {
      key: 'priority_alerts',
      icon: Star,
      title: t('notifications.settings.priority'),
      description: t('notifications.settings.priorityDesc')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">{t('notifications.settings.title')}</h2>
      
      <div className="space-y-6">
        {settingsConfig.map(({ key, icon: Icon, title, description }) => (
          <div key={key} className="flex items-start gap-4">
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
                    checked={settings[key as keyof Settings]}
                    onChange={() => handleToggle(key as keyof Settings)}
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