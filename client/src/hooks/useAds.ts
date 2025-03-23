import { useState, useEffect } from 'react';
import { adsApi, type Ad } from '@/services/api/ads';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useAds = (placement: string) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    let mounted = true;

    const fetchAds = async () => {
      try {
        const data = await adsApi.getAdsByPage(placement);
        if (mounted) {
          setAds(data);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
        if (mounted) {
          toast.error(t('ads.fetchError'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAds();

    return () => {
      mounted = false;
    };
  }, [placement, t]);

  return {
    ads,
    isLoading
  };
};