// === useJobApplication.ts ===
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { jobApplicationsApi } from '@/services/supabase/jobApplications';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

interface JobApplicationFormData {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: File;
}

export const useJobApplication = (jobId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const submitApplication = async (formData: JobApplicationFormData) => {
    try {
      setIsSubmitting(true);

      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        toast.error(t('login.required'));
        navigate('/login');
        return;
      }

      // Upload resume first
      const { url: resumeUrl, error: uploadError } = await jobApplicationsService.uploadResume(formData.resume);
      
      if (uploadError || !resumeUrl) {
        throw new Error(uploadError?.message || 'Resume upload failed');
      }

      // Submit application
      await jobApplicationsService.submitApplication({
        job_id: jobId,
        name: formData.name,
        email: user.email!,
        phone: formData.phone,
        cover_letter: formData.coverLetter,
        resume_url: resumeUrl
      });

      toast.success(t('jobs.application.success'));
      navigate(`/jobs/${jobId}`);
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(t('jobs.application.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitApplication
  };
};
