import { useState, useEffect } from 'react';
import { projectsApi } from '@/services/api/projects';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Project } from '@/types/project';

export const useProjects = (initialFilters = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState(initialFilters);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectsApi.getProjects(filters);
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err as Error);
        toast.error(t('projects.fetchError'));
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [filters, t]);

  return { projects, isLoading, error, filters, setFilters };
};