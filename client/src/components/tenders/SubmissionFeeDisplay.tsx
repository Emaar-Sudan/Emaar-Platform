import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DollarSign } from 'lucide-react';

interface SubmissionFeeDisplayProps {
  fee: number | undefined | null;
}

const SubmissionFeeDisplay: React.FC<SubmissionFeeDisplayProps> = ({ fee }) => {
  const { t } = useLanguage();

  if (fee === undefined || fee === null || isNaN(fee)) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-gray-400" />
            <span className="font-medium">{t('tenders.submission.noFee')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <span className="font-medium">{t('tenders.submission.fee')}</span>
        </div>
        <span className="text-xl font-bold">
          {fee.toLocaleString()} {t('currency')}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {t('tenders.submission.feeNote')}
      </p>
    </div>
  );
};

export default SubmissionFeeDisplay;