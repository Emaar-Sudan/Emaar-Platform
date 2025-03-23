import { useState, useEffect } from 'react';
import { projectsApi, type Project } from '@/services/api/projects';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useProjectDetails = (projectId: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        const data = await projectsService.getProjectById(projectId);
        setProject(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError(err as Error);
        toast.error(t('projects.detailsError'));
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId, t]);

  return {
    project,
    isLoading,
    error
  };
};