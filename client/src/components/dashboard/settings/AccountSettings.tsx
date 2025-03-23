import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, Mail, Phone, MapPin } from 'lucide-react';
import { profileApi } from '@/services/api/profile';
import toast from 'react-hot-toast';

export const AccountSettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo_url: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getUserProfile();
        setProfile(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          photo_url: data.photo_url || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(t('settings.account.fetchError'));
      }
    };

    fetchProfile();
  }, [t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await profileService.updateProfile(formData);
      setIsEditing(false);
      toast.success(t('settings.account.updateSuccess'));
    } catch (error) {
      console.error('Update error:', error);
      toast.error(t('settings.account.updateError'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return <div className="p-6 text-center">{t('loading')}...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Photo */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={formData.photo_url || '/assets/default-avatar.png'}
            alt={formData.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle photo upload
                }
              }}
            />
          </label>
        </div>
        <div>
          <h3 className="font-semibold">{t('settings.account.photo')}</h3>
          <p className="text-sm text-gray-500">{t('settings.account.photoHint')}</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('settings.account.name')}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            <Mail className="inline-block w-4 h-4 mr-1" />
            {t('settings.account.email')}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            <Phone className="inline-block w-4 h-4 mr-1" />
            {t('settings.account.phone')}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isLoading}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="btn-primary px-4 py-2"
              disabled={isLoading}
            >
              {isLoading ? t('common.saving') : t('common.save')}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn-primary px-4 py-2"
          >
            {t('common.edit')}
          </button>
        )}
      </div>
    </form>
  );
};