import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Building2, AlertTriangle, X, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '@/utils/dateFormatters';
import { CancelModal } from './CancelModal';
import type { JobApplication } from '@/types/jobApplication';

interface JobCardProps {
  application: JobApplication;
  onUpdate: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ application, onUpdate }) => {
  const { t, language } = useLanguage();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'under_review':
        return AlertTriangle;
      case 'shortlisted':
        return CheckCircle;
      case 'accepted':
        return CheckCircle;
      case 'rejected':
        return X;
      default:
        return AlertTriangle;
    }
  };

  const StatusIcon = getStatusIcon(application.status);

  if (!application.job) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${getStatusColor(application.status)}`}>
            <StatusIcon className="w-6 h-6" />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">{application.job.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(application.application_date, language)}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
            {t(`dashboard.jobs.status.${application.status}`)}
          </span>
          {application.status === 'pending' && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="block mt-2 text-sm text-red-600 hover:text-red-700"
            >
              {t('dashboard.jobs.cancel')}
            </button>
          )}
        </div>
      </div>

      {/* تفاصيل إضافية */}
      <div className="mt-6 pt-4 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* عرض اسم المنظمة */}
          {application.job.organization && (
            <div>
              <p className="text-sm text-gray-500">{t('dashboard.jobs.organization')}</p>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <p className="font-medium">{application.job.organization}</p>
              </div>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-500">{t('dashboard.jobs.type')}</p>
            <p className="font-medium">{t(`jobs.types.${application.job.type}`)}</p>
          </div>
        </div>
      </div>

      {/* نافذة إلغاء الطلب */}
      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        applicationId={application.id}
        onUpdate={onUpdate}
      />
    </div>
  );
};
