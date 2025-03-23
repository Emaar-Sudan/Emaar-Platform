import { useState, useEffect } from 'react';
import { newsApi, type News } from '@/services/api/news';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useNewsDetails = (id: string) => {
  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        setIsLoading(true);
        const newsData = await newsService.getNewsById(id);
        setNews(newsData);

        if (newsData) {
          const relatedData = await newsService.getRelatedNews(id, newsData.type);
          setRelatedNews(relatedData);
        }
      } catch (error) {
        console.error('Error fetching news details:', error);
        toast.error(t('news.detailsError'));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchNewsDetails();
    }
  }, [id, t]);

  return {
    news,
    relatedNews,
    isLoading
  };
};