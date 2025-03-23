import { useState, useEffect } from 'react';
import { resultsApi } from '@/services/api/results';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Result } from '@/types/results';

export const useResults = (initialFilters = {}) => {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState(initialFilters);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const data = await resultsApi.getResults(filters);
        setResults(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError(err as Error);
        toast.error(t('results.fetchError'));
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [filters, t]);

  return { results, isLoading, error, filters, setFilters };
};