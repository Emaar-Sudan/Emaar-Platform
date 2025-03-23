import { useState, useEffect } from 'react';
import { mapApi } from '@/services/api/map';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRandomCoordinate } from '@/utils/mapUtils';

export const useMapData = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const center: [number, number] = [15.5007, 32.5599]; // Sudan center

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setIsLoading(true);
        const response = await mapService.getMapData();

        // Add coordinates to each item
        const processedData = {
          projects: response.projects.map(project => ({
            ...project,
            coordinates: getRandomCoordinate(center)
          })),
          tenders: response.tenders.map(tender => ({
            ...tender,
            coordinates: getRandomCoordinate(center)
          })),
          auctions: response.auctions.map(auction => ({
            ...auction,
            coordinates: getRandomCoordinate(center)
          })),
          jobs: response.jobs.map(job => ({
            ...job,
            coordinates: getRandomCoordinate(center)
          }))
        };

        setData(processedData);
      } catch (error) {
        console.error('Error fetching map data:', error);
        toast.error(t('map.fetchError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapData();
  }, [t]);

  return {
    data,
    isLoading
  };
};