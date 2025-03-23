import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { TendersList } from '@/components/dashboard/tenders/TendersList';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import { tenderSubmissionsApi } from '@/services/api/tenderSubmissions';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const DashboardTenders = () => {
  const { t } = useLanguage();

  const { data: submissions, isLoading, error, refetch } = useQuery({
    queryKey: ['tenderSubmissions'],
    queryFn: () => tenderSubmissionsService.getUserSubmissions(),
    onError: () => {
      toast.error(t('dashboard.tenders.fetchError'));
    }
  });

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-red-600">{t('dashboard.tenders.error')}</p>
          <button 
            onClick={() => refetch()}
            className="mt-4 text-primary hover:underline"
          >
            {t('common.tryAgain')}
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.tenders.title')}</h1>
        {isLoading ? (
          <LoadingScreen message={t('loading')} />
        ) : (
          <TendersList 
            tenders={submissions || []} 
            isLoading={isLoading}
            onUpdate={refetch}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardTenders;