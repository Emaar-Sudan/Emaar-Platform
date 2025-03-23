import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, X } from 'lucide-react';
import { jobApplicationsApi } from '@/services/api/jobApplications';
import toast from 'react-hot-toast';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
}

export const CancelModal: React.FC<CancelModalProps> = ({
  isOpen,
  onClose,
  applicationId,
}) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = async () => {
    try {
      setIsSubmitting(true);
      await jobApplicationsService.cancelApplication(applicationId);
      toast.success(t('dashboard.jobs.cancelSuccess'));
      onClose();
    } catch (error) {
      console.error('Error canceling application:', error);
      toast.error(t('dashboard.jobs.cancelError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">{t('dashboard.jobs.cancelTitle')}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            {t('dashboard.jobs.cancelConfirmation')}
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isSubmitting ? t('common.processing') : t('common.confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};