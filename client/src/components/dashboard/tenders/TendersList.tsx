import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TenderCard } from './TenderCard';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import type { TenderSubmission } from '@/types/tender';

interface TendersListProps {
  tenders: TenderSubmission[];
  isLoading: boolean;
  onUpdate: () => void;
}

export const TendersList: React.FC<TendersListProps> = ({
  tenders,
  isLoading,
  onUpdate
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return <LoadingScreen message={t('loading')} />;
  }

  if (!tenders || tenders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-600">{t('dashboard.tenders.noSubmissions')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tenders.map((submission) => (
        <TenderCard
          key={submission.id}
          submission={submission}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};