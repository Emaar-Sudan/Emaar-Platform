import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, FileText, X, AlertTriangle, Upload, Building2 } from 'lucide-react';
import { formatDate } from '@/utils/dateFormatters';
import { CancelModal } from './CancelModal';
import { FileUploadModal } from './FileUploadModal';
import type { TenderSubmission } from '@/types/tender';

interface TenderCardProps {
  submission: TenderSubmission;
  onUpdate: () => void;
}

export const TenderCard: React.FC<TenderCardProps> = ({ submission, onUpdate }) => {
  const { t, language } = useLanguage();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

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
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{submission.tender?.title}</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(submission.submission_date, language)}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(submission.status)}`}>
          {t(`dashboard.tenders.status.${submission.status}`)}
        </span>
      </div>

      {/* Additional Tender Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">{t('dashboard.tenders.tenderNumber')}</p>
          <p className="font-medium">{submission.tender?.tender_number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t('dashboard.tenders.deadline')}</p>
          <p className="font-medium">{formatDate(submission.tender?.submission_deadline || '', language)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t('dashboard.tenders.organization')}</p>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-400" />
            <p className="font-medium">{submission.tender?.organization_id}</p>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="space-y-4 border-t border-b py-4 mb-4">
        {/* Technical File */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span>{t('dashboard.tenders.technicalFile')}</span>
          </div>
          {submission.technical_file_url ? (
            <a
              href={submission.technical_file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t('dashboard.tenders.viewFile')}
            </a>
          ) : (
            <span className="text-gray-500">{t('dashboard.tenders.noFile')}</span>
          )}
        </div>

        {/* Financial File */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span>{t('dashboard.tenders.financialFile')}</span>
          </div>
          {submission.financial_file_url ? (
            <a
              href={submission.financial_file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t('dashboard.tenders.viewFile')}
            </a>
          ) : (
            <span className="text-gray-500">{t('dashboard.tenders.noFile')}</span>
          )}
        </div>
      </div>

      {submission.status === 'pending' && (
        <div className="flex gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {t('dashboard.tenders.updateFiles')}
          </button>
          <button
            onClick={() => setShowCancelModal(true)}
            className="flex-1 text-red-600 hover:text-red-700 flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            {t('dashboard.tenders.cancel')}
          </button>
        </div>
      )}

      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        submissionId={submission.id}
        onUpdate={onUpdate}
      />

      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        submission={submission}
        onUpdate={onUpdate}
      />
    </div>
  );
};