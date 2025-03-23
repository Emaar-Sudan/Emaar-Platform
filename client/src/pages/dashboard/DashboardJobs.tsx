import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { JobsList } from '@/components/dashboard/jobs/JobsList';
import { useJobApplications } from '@/hooks/useJobApplications';

const DashboardJobs = () => {
  const { t } = useLanguage();
  const { applications, isLoading } = useJobApplications();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.jobs.title')}</h1>
        <JobsList 
          applications={applications} 
          isLoading={isLoading} 
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardJobs;