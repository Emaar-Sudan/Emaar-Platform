import { useState, useEffect } from "react";
import { jobsApi } from "@/services/api/jobs";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Job } from "@/types/job";

// هوك لجلب قائمة الوظائف
export const useJobs = (initialFilters = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState(initialFilters);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await jobsApi.getJobs(filters);
        setJobs(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err as Error);
        toast.error(t("jobs.fetchError"));
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters, t]);

  return { jobs, isLoading, error, filters, setFilters };
};

// هوك لجلب تفاصيل وظيفة معينة
export const useJobDetails = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        const data = await jobsApi.getJobDetails(jobId);
        setJob(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError(err as Error);
        toast.error(t("jobs.fetchError"));
        setJob(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) fetchJobDetails();
  }, [jobId, t]);

  return { job, isLoading, error };
};

// تصدير useJobs بشكل افتراضي
export default useJobs;
