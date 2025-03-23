import { useState, useEffect } from 'react';
import { tendersApi, type Tender } from '@/services/api/tenders';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useTenderDetails = (id: string) => {
  const [tender, setTender] = useState<Tender | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        setIsLoading(true);
        const data = await tendersService.getTenderById(id);
        setTender(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tender details:', err);
        setError(err as Error);
        toast.error(t('tenders.detailsError'));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTenderDetails();
    }
  }, [id, t]);

  return {
    tender,
    isLoading,
    error
  };
};