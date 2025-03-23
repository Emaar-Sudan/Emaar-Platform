import { useState, useEffect } from 'react';
import { jobsApi } from '@/services/api/jobs';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Job } from '@/types/job';
import { useJobDetails } from "@/hooks/useJobs";

export const useJobDetails = (id: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        const data = await jobsApi.getJobById(id);
        setJob(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError(err as Error);
        toast.error(t('jobs.detailsError'));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id, t]);

  return {
    job,
    isLoading,
    error
  };
};

export default useJobDetails;