import { useState, useEffect } from 'react';
import { auctionsApi } from '@/services/api/auctions';
import type { Auction } from '@/types/auction';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuctionDetails } from "@/hooks/useAuctions";

export const useAuctionDetails = (id: string) => {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setIsLoading(true);
        const data = await auctionsService.getAuctionById(id);
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

export default useAuctionDetails;
