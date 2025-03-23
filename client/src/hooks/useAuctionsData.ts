import { useQuery } from '@tanstack/react-query';
import { auctionsApi, type AuctionFilters } from '@/services/api/auctions';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useAuctionsData = (filters: AuctionFilters = {}) => {
  const { t } = useLanguage();

  const { data: auctions = [], isLoading, error } = useQuery({
    queryKey: ['auctions', filters],
    queryFn: () => auctionsService.getAuctions(filters),
    onError: () => {
      toast.error(t('auctions.fetchError'));
    }
  });

  return {
    auctions,
    isLoading,
    error
  };
};