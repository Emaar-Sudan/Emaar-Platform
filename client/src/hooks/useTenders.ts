import { useState, useEffect } from 'react';
import { tendersApi } from '@/services/api/tenders';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Tender } from '@/types/tender';

export const useTenders = (initialFilters = {}) => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState(initialFilters);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        setIsLoading(true);
        const data = await tendersApi.getTenders(filters);
        setTenders(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tenders:', err);
        setError(err as Error);
        toast.error(t('tenders.fetchError'));
        setTenders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenders();
  }, [filters, t]);

  return { tenders, isLoading, error, filters, setFilters };
};