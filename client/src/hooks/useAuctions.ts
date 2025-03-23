import { useState, useEffect } from 'react';
import { auctionsApi } from '@/services/api/auctions';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Auction } from '@/types/auction';

export const useAuctions = (initialFilters = {}) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState(initialFilters);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setIsLoading(true);
        const data = await auctionsApi.getAuctions(filters);
        setAuctions(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching auctions:', err);
        setError(err as Error);
        toast.error(t('auctions.fetchError'));
        setAuctions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, [filters, t]);

  return { auctions, isLoading, error, filters, setFilters };
};

export const useAuctionDetails = (id: string) => {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setIsLoading(true);
        const data = await auctionsApi.getAuctionById(id);
        setAuction(data);
      } catch (error) {
        console.error('Error fetching auction details:', error);
        toast.error(t('auctions.fetchError'));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAuctionDetails();
    }
  }, [id, t]);

  return {
    auction,
    isLoading
  };
};