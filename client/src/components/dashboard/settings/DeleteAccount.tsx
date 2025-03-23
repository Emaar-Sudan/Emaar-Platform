import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle } from 'lucide-react';
import { profileApi } from '@/services/api/profile';
import toast from 'react-hot-toast';

export const DeleteAccount = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmation !== 'DELETE') {
      toast.error(t('settings.delete.confirmationError'));
      return;
    }

    try {
      setIsDeleting(true);
      await profileService.deleteAccount();
      toast.success(t('settings.delete.success'));
      navigate('/');
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error(t('settings.delete.error'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 text-red-600 mb-6">
        <AlertTriangle className="w-6 h-6" />
        <h3 className="text-lg font-bold">{t('settings.delete.title')}</h3>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-red-700">{t('settings.delete.warning')}</p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">{t('settings.delete.description')}</p>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('settings.delete.confirmation')}
          </label>
          <input
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="DELETE"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleDelete}
          disabled={confirmation !== 'DELETE' || isDeleting}
          className={`w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors ${
            (confirmation !== 'DELETE' || isDeleting) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isDeleting ? t('settings.delete.deleting') : t('settings.delete.confirm')}
        </button>
      </div>
    </div>
  );
};