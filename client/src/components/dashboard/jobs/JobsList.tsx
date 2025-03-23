import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { JobCard } from './JobCard';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import type { JobApplication } from '@/types/jobApplication';

interface JobsListProps {
  applications: JobApplication[];
  isLoading: boolean;
}

export const JobsList: React.FC<JobsListProps> = ({ applications, isLoading }) => {
  const { t } = useLanguage();

  if (isLoading) {
    return <LoadingScreen message={t('loading')} />;
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-600">{t('dashboard.jobs.noApplications')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {applications.map((application) => (
        <JobCard 
          key={application.id} 
          application={application}
          onUpdate={() => window.location.reload()}
        />
      ))}
    </div>
  );
};