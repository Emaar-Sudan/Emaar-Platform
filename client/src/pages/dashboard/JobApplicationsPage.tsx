import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { JobCard } from '@/components/dashboard/jobs/JobCard';
import { useJobApplications } from '@/hooks/useJobApplications';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';

const JobApplicationsPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { applications, isLoading } = useJobApplications();

  // Redirect if user is not an individual
  if (!user || user.type !== 'individual') {
    return <Navigate to="/dashboard" />;
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingScreen message={t('loading')} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.jobs.applications')}</h1>
        
        {applications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">{t('dashboard.jobs.noApplications')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <JobCard
                key={application.id}
                application={application}
                onUpdate={() => window.location.reload()}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobApplicationsPage;