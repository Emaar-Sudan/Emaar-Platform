import { useState, useEffect } from 'react';
import { jobApplicationsApi } from '@/services/supabase/jobApplications';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'react-hot-toast';
import type { JobApplication } from '@/types/jobApplication';

export const useJobApplications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const data = await jobApplicationsService.getUserApplications();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error(t('dashboard.jobs.fetchError'));
        setApplications([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [t]);

  const refreshApplications = async () => {
    try {
      const data = await jobApplicationsService.getUserApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error refreshing applications:', error);
      toast.error(t('dashboard.jobs.refreshError'));
    }
  };

  return {
    applications,
    isLoading,
    refreshApplications
  };
};