import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApplicationCard } from './ApplicationCard';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import type { JobApplication } from '@/types/jobApplication';

interface ApplicationsListProps {
  applications: JobApplication[];
  isLoading: boolean;
}

export const ApplicationsList: React.FC<ApplicationsListProps> = ({
  applications,
  isLoading
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return <LoadingScreen message={t('loading')} />;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-600">{t('dashboard.jobs.noApplications')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          jobTitle={application.job?.title || t('dashboard.jobs.unknownJob')}
        />
      ))}
    </div>
  );
};