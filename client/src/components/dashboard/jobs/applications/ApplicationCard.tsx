import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, FileText, X, AlertTriangle } from 'lucide-react';
import { formatDate } from '@/utils/dateFormatters';
import { CancelModal } from './CancelModal';
import type { JobApplication } from '@/types/jobApplication';

interface ApplicationCardProps {
  application: JobApplication;
  jobTitle: string;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, jobTitle }) => {
  const { t, language } = useLanguage();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{jobTitle}</h3>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(application.application_date, language)}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
          {t(`dashboard.jobs.status.${application.status}`)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <a 
            href={application.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {t('dashboard.jobs.viewResume')}
          </a>
        </div>

        {application.cover_letter && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">{application.cover_letter}</p>
          </div>
        )}
      </div>

      {application.status === 'pending' && (
        <button
          onClick={() => setShowCancelModal(true)}
          className="mt-4 text-red-600 hover:text-red-700 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          {t('dashboard.jobs.cancelApplication')}
        </button>
      )}

      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        applicationId={application.id}
      />
    </div>
  );
};